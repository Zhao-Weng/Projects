"""API to query engine.

Derived from the module in msee dashboard."""

from flask import Blueprint, request, jsonify

import random
import time
import json
import xml.etree.ElementTree as ET

# Import MSEE SDK for RPC communication with Query Engine.
try:
    from msee import QueryEngine
except:
    QueryEngine = None

query_api = Blueprint('query_api', __name__)


def is_explanation_question(question):
    patterns = ['why', 'what about', 'it', 'what if', 'do you', 'show']
    question = question.strip().lower()
    return any([question[:len(p)] == p for p in patterns])


def get_5w_answer(question):
    if 'sitting' in question:
        return 'demo_answers/sitting.json'
    elif 'walking' in question:
        return 'demo_answers/walking.json'
    else:
        return 'demo_answers/entering.json'


def find_time_range(question):
    """Return start and end time"""
    question = question.strip().lower()
    prefix_to_timerange = {
        "did any person enter": ("19:00:10", "19:00:25"),
        "what if no person entered": ("19:02:40", "19:03:00"),
        "did you see anyone sitting": ("19:00:45", "19:01:00"),
        "do you also detect the lower": ("19:00:45", "19:01:00")
    }
    # Storyline 3: ("19:00:20", "19:00:25")

    date = "2014-2-22 "
    for prefix, time_range in prefix_to_timerange.iteritems():
        if question[:len(prefix)] == prefix:
            s, e = time_range
            answer_details = [{"startTime": date + s, "endTime": date + e}]
            return answer_details

    return [{"startTime": date + " 19:00:20", "endTime": date + " 19:00:25"}]


@query_api.route('/api/query/', methods=['POST'])
def query():
    # return jsonify(good=True)

    if QueryEngine is None:
        return jsonify(
            error='Query API cannot import msee package'
            'which is required to make RPC calls to Query Engine.'), 500

    try:
        query_request = request.get_json(force=True)
    except Exception as e:
        return jsonify(error='Query API requires JSON request.'), 400

    # Verify request data.
    try:
        assert ('soc' in query_request)
        assert ('storyline' in query_request)
        assert ('query' in query_request)
    except:
        return jsonify(error='Query API requires soc, storyline, and'
                       'query fields in the request.'), 400

    #####
    # Short-cut for factual questions.
    if not is_explanation_question(query_request['query'].get('nlQuery', '')):
        with open(
                get_5w_answer(query_request['query'].get('nlQuery', ''))) as f:
            res = json.load(f)
        res['timeEscaped'] = round(random.uniform(0.4, 0.6), 2)
        time.sleep(res['timeEscaped'])
        return jsonify(**res)
    #####
    time.sleep(round(random.uniform(0.8, 1), 2))

    # Extract fields from request data.
    soc_id = query_request['soc']
    storyline_id = query_request['storyline']
    is_NLP = query_request.get('isNaturalLanguage', False)

    qc = XMLQueryComposer()
    if is_NLP:
        xml_query = qc.create_query(query_request['query'])
    else:
        xml_query = qc.create_query(query_request['query'])
    query_content = xml_query

    # Compose response.
    response = dict()
    response['soc'] = soc_id
    response['storyline'] = storyline_id
    response['translatedXML'] = xml_query

    # Connect to the query engine
    time_start = time.time()
    try:
        query_engine = QueryEngine()
        query_engine.transport.open()
        query_engine.client.prepareSOC(soc_id)
        query_engine.client.prepareStoryline(storyline_id)
        if is_NLP:
            answer = query_engine.client.queryNLP(query_content)
        else:
            answer = query_engine.client.query(query_content)
        query_engine.transport.close()
    except Exception as e:
        return jsonify(error='RPC Error: ' + str(e)), 500

    # Return error message if query engine encounters an error.
    if answer.is_error:
        return jsonify(error='QueryEngine Error:' + answer.error_msg), 500

    # Compose return object.
    response['timeEscaped'] = round(time.time() - time_start, 4)
    response['isPolar'] = answer.is_polar
    response['confidence'] = answer.confidence

    if answer.is_polar:
        # polar answers
        response['answer'] = answer.answer

    # Concise graph
    try:
        gp = XMLGraphParser()
        graphs = gp.to_json(answer.answer_str)
        # non-polar answers
        response['answerParseGraph'] = graphs
        if not answer.is_polar:
            response['answer'] = len(graphs['graphs'])
    except Exception as e:
        response[
            'error'] = 'Query API cannot parse concise parse graph in answer_str (length: {}). {}. Content: {}'.format(
                len(answer.answer_str), str(e), answer.answer_str)
        response['answerParseGraph'] = {'graphs': []}
        if not answer.is_polar:
            response['answer'] = 0
            return jsonify(**response), 500

    # Detailed info
    try:
        ap = XMLAnswerParser()
        response['answerDetails'] = ap.to_json(answer.answer_details)
    except Exception as e:
        response['answerDetails'] = []
        response['error'] = response.get(
            'error', ''
        ) + 'Query API cannot parse answer details in answer_details (length: {}). {}. Content: {}'.format(
            len(answer.ansfind_time_rangewer_details),
            str(e), answer.answer_details)
    #####
    # SHORTCUT
    response['answerDetails'] = find_time_range(
        query_request['query'].get('nlQuery', ''))
    #####

    # Query graph
    try:
        gp = XMLGraphParser()
        graphs = gp.query_graph_to_json(answer.answer_details)
        response['queryGraph'] = graphs
    except Exception as e:
        response['queryGraph'] = {'graphs': []}
        response[
            'error'] = 'Query API cannot parse query graph in answer_details (length: {}). {}. Content: {}'.format(
                len(answer.answer_details), str(e), answer.answer_details)

    # Explanation
    try:
        exp_parser = XMLExplainationParser()
        response['explanation'] = exp_parser.to_json(answer.answer_details)
    except Exception as e:
        response['explanation'] = {'texts': []}
        response[
            'error'] = 'Query API cannot parse explanation in answer_details. Content: {}'.format(
                answer.answer_details)

    return jsonify(**response)


class XMLQueryComposer(object):
    """docstring for XMLQueryComposer"""

    def __init__(self):
        super(XMLQueryComposer, self).__init__()
        self.locations = []
        self.times = []
        self.set_xml = ''
        self.statement_xml = ''

    def add_location(self, location_obj):
        """
        Dict object parsed form json:
        {
            "type": "polygon" or "point",
            "points": [
                x, y, x, y, x, y
            ],
            "viewId": "view_id"
        }
        """
        if location_obj is None:
            return None
        name = 'loc-{}'.format(len(self.locations))
        if location_obj['type'] == 'polygon':
            assert (len(location_obj['points']) % 2 == 0)
            it_pts = iter(location_obj['points'])
            self.locations.append(
                self.view_polygon_to_xml(name, location_obj['viewId'],
                                         zip(it_pts, it_pts)))

        elif location_obj['type'] == 'point':
            assert (len(location_obj['points']) == 2)
            self.locations.append(
                self.view_point_to_xml(name, location_obj['viewId'],
                                       location_obj['points'][0], location_obj[
                                           'points'][1]))
        return name

    def view_point_to_xml(self, name, view_id, x, y):
        return '<ViewCentricPoint id="{}"><x>{}</x><y>{}</y><ViewId>{}</ViewId></ViewCentricPoint>'.format(
            name, x, y, view_id)

    def view_polygon_to_xml(self, name, view_id, points):
        """points shall be [(x, y), (x, y), ...]"""
        p_start = '<ViewCentricPolygon id="{}"><ViewId>{}</ViewId>'.format(
            name, view_id)
        p_points = []
        for (x, y) in points:
            p_points.append(
                '<CartesianPixelPoint><x>{}</x><y>{}</y></CartesianPixelPoint>'.
                format(x, y))
        p_end = '</ViewCentricPolygon>'
        return ''.join([p_start, ''.join(p_points), p_end])

    def add_time(self, time_obj):
        """
        Dict object parsed form json:
        {
            "start": 123,
            "end": 456,
            "viewId": "view_id",
            or
            "sceneTime": true
        }
        """
        if time_obj is None:
            return None
        name = time_obj.get('name', 'time-{}'.format(len(self.times)))
        if time_obj.get('sceneTime', False):
            self.times.append(
                self.scene_time_to_xml(name, time_obj['start'], time_obj[
                    'end']))
        else:
            self.times.append(
                self.frame_number_to_xml(name, time_obj['viewId'], time_obj[
                    'start'], time_obj['end']))
        return name

    def scene_time_to_xml(self, name, start, end):
        return '<SceneCentricTimePeriod id="{}"><StartTime>{}</StartTime><EndTime>{}</EndTime></SceneCentricTimePeriod>'.format(
            name, start, end)

    def frame_number_to_xml(self, name, view_id, start_frame, end_frame):
        return '<ViewCentricTimePeriod id="{}"><StartFrame>{}</StartFrame><EndFrame>{}</EndFrame><ViewId>{}</ViewId></ViewCentricTimePeriod>'.format(
            name, start_frame, end_frame, view_id)

    def add_statement(self, set_name, is_polar):
        if is_polar:
            self.statement_xml = '<QueryStatement><gt><cardinality><ci>{}</ci></cardinality><cn>0</cn></gt></QueryStatement>'.format(
                set_name)
        else:
            # what query
            self.statement_xml = '''<NonPolarQueryStatement><what>{}</what></NonPolarQueryStatement>'''.format(
                set_name)

    def add_set(self, predicates_obj):
        """
        Dict object parsed from json:
        [
            {
                "name": "person",
                "operands": ["x1", "x2"],
                "location": "",
                "time": "",
            }
        ]
        """
        # conditions
        predicates_xml = []
        variables = set()
        for predicate in predicates_obj:
            # each predicate is one condition
            time = self.add_time(predicate.get('time', None))
            location = self.add_location(predicate.get('location', None))
            predicates_xml.append(
                self.predicate_to_xml(predicate['name'], time, location,
                                      predicate['operands']))

            # operands shall be variables before bar
            for op_name in predicate['operands']:
                variables.add(op_name)

        # conjunct all predicates
        if len(predicates_xml) > 1:
            # multiple predicates are conjuncted by <and>
            condition_xml = '<condition><and>{}</and></condition>'.format(
                ''.join(predicates_xml))
        else:
            condition_xml = '<condition>{}</condition>'.format(
                predicates_xml[0])

        # variables before bar
        bvar_xml = '<bvar>{}</bvar>'.format(
            ''.join(['<ci>{}</ci>'.format(v) for v in variables]))

        # construct the set
        set_name = 'set-generated'
        self.set_xml = '<Sets><Set id="{name}">{bvar}{condition}</Set></Sets>'.format(
            name=set_name, bvar=bvar_xml, condition=condition_xml)
        return set_name

    def predicate_to_xml(self, pname, time_id, location_id, operands):
        if time_id is None:
            time_xml = ''
        else:
            time_xml = '<time>{}</time>'.format(time_id)

        if location_id is None:
            location_xml = ''
        else:
            location_xml = '<location>{}</location>'.format(location_id)

        return '<{pname}>{t}{l}{ops}</{pname}>'.format(
            pname=pname,
            t=time_xml,
            l=location_xml,
            ops=''.join(['<ci>{}</ci>'.format(op) for op in operands]))

    def compile_query(self, tag):
        import uuid

        start_xml = '<?xml version="1.0" ?><{tag} id="{id}" version="1.0" xmlns="http://www.siginnovations.com/MSEE">'.format(
            tag=tag, id=uuid.uuid4())
        end_xml = '</{tag}>'.format(tag=tag)

        time_xml, location_xml = '', ''
        if len(self.times) > 0:
            time_xml = '<Times>{}</Times>'.format(''.join(self.times))
        if len(self.locations) > 0:
            location_xml = '<Locations>{}</Locations>'.format(
                ''.join(self.locations))

        query = '{start}{time}{location}{set}{statement}{end}'.format(
            start=start_xml,
            end=end_xml,
            time=time_xml,
            location=location_xml,
            set=self.set_xml,
            statement=self.statement_xml)
        # from lxml import etree
        # root = etree.fromstring(query)
        # return etree.tostring(root, pretty_print=True)
        return query

    def create_query(self, query_json):
        """Translate the json query into XML query.
        query_json:
        {
            "predicates": []
            "isPolar": true / false
        }
        """

        set_name = "set-none"
        if 'predicates' in query_json:
            set_name = self.add_set(query_json['predicates'])

        is_polar = query_json.get('isPolar', None)
        if is_polar is None:
            tag = "NLQuery"
            self.statement_xml = "<NLQueryStatement>%s</NLQueryStatement>" % query_json.get(
                'nlQuery', '')

            # Add additional time intervals
            for time_obj in query_json.get('times', []):
                self.add_time(time_obj)

        else:
            if is_polar:
                tag = "Query"
            else:
                tag = "NonePolarQuery"
            self.add_statement(set_name, query_json['isPolar'])

        return self.compile_query(tag)


class XMLGraphParser(object):
    """Convert the XML graph into json format."""

    def __init__(self):
        super(XMLGraphParser, self).__init__()

    def to_json(self, xml_string):
        root = ET.fromstring(
            '<ReturnedXML>{}</ReturnedXML>'.format(xml_string))
        graphs_dict = {'graphs': []}
        for graph in root.iter('Graph'):
            g = self.parse_graph(graph)
            graphs_dict['graphs'].append(g)
        return graphs_dict

    def query_graph_to_json(self, xml_string):
        root = ET.fromstring(
            '<ReturnedXML>{}</ReturnedXML>'.format(xml_string))
        graphs_dict = {'graphs': []}
        for query_graph in root.iter('QueryGraph'):
            for graph in query_graph.iter('Graph'):
                g = self.parse_graph(graph)
                graphs_dict['graphs'].append(g)
        return graphs_dict

    def parse_graph(self, graph_el):
        graph = dict()
        graph['nodes'] = []
        graph['links'] = []
        node_id_to_idx = dict()
        for vertex_el in graph_el.iter('Vertex'):
            vertex_dict = vertex_el.attrib
            node_id_to_idx[vertex_dict['id']] = len(node_id_to_idx)
            vertex_prop = dict()
            for prop_el in vertex_el.iter('Property'):
                k = prop_el.attrib['key']
                v = prop_el.attrib['value']
                vertex_prop[k] = v
            if (len(vertex_prop) > 0):
                vertex_dict['property'] = vertex_prop
            graph['nodes'].append(vertex_dict)

        for edge_el in graph_el.iter('Edge'):
            edge_dict = edge_el.attrib
            edge_dict['source'] = node_id_to_idx[edge_dict['from']]
            edge_dict['target'] = node_id_to_idx[edge_dict['to']]
            del edge_dict['from']
            del edge_dict['to']
            edge_prop = dict()
            for prop_el in edge_el.iter('Property'):
                k = prop_el.attrib['key']
                v = prop_el.attrib['value']
                edge_prop[k] = v
            if (len(edge_prop) > 0):
                edge_dict['property'] = edge_prop
            graph['links'].append(edge_dict)
        return graph


class XMLAnswerParser(object):
    """Convert the XML graph into json format."""

    def __init__(self):
        super(XMLAnswerParser, self).__init__()

    def to_json(self, xml_string):
        root = ET.fromstring(
            '<ReturnedXML>{}</ReturnedXML>'.format(xml_string))
        answer_details = []
        for answer_detail in root.iter('AnswerDetail'):
            d = self.parse_detail(answer_detail)
            answer_details.append(d)
        return answer_details

    def parse_detail(self, answer_detail_el):
        answer_detail = answer_detail_el.attrib
        answer_detail['tracks'] = []

        for track_el in answer_detail_el.iter('Track'):
            track_dict = track_el.attrib
            answer_detail['tracks'].append(track_dict)
        return answer_detail


class XMLExplainationParser(object):
    """Convert the XML graph into json format."""

    def __init__(self):
        super(XMLExplainationParser, self).__init__()

    def to_json(self, xml_string):
        root = ET.fromstring(
            '<ReturnedXML>{}</ReturnedXML>'.format(xml_string))
        res = {}
        for explanation in root.iter('Explanation'):
            # shortcut, only one explanation node anyways.
            return self.parse_explanation(explanation)

    def parse_explanation(self, explanation_el):
        mainnodes = ''
        mainedges = ''
        try:
            mainnodes = explanation_el.find('mainnodes').text.split(',')
        except:
            pass
        try:
            mainedges = explanation_el.find('mainedges').text.split(',')
        except:
            pass

        return {
            'text': explanation_el.find('text').text,
            'parsegraph': explanation_el.find('parsegraph').text,
            'highlights': explanation_el.find('highlights').text.split(','),
            'mainnodes': mainnodes,
            'mainedges': mainedges,
        }

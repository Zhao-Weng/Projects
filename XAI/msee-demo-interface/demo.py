import urllib
import urllib2
import json
import os
import hashlib

from flask import Flask, render_template, abort, request, jsonify

from query import query_api
import config
import ontology

app = Flask(__name__)
app.register_blueprint(query_api)
ont = ontology.Ontology()


def url_get(url):
    if not os.path.exists(config.cache_dir):
        os.mkdir(config.cache_dir)
    url_hash = hashlib.md5(url).hexdigest()
    cfile_path = os.path.join(config.cache_dir, url_hash)
    if os.path.isfile(cfile_path):
        return open(cfile_path, 'r').read()
    c = urllib2.urlopen(url).read()
    open(cfile_path, 'w').write(c)
    return c


def get_socs(collection_name='Non-Polar Demo'):
    soc_manifest_url = "%s/manifest" % (config.soc_url_base)
    c = url_get(soc_manifest_url)
    res = {}
    for collection in json.loads(c)['collections']:
        if collection['name'] == collection_name:
            for e in collection['socs']:
                res[e['id']] = e['name']
    return res


def get_soc_metadata_json(soc_id):
    soc_metadata_url = "%s/%s/metadata.json" % (config.soc_url_base, soc_id)
    md = json.loads(url_get(soc_metadata_url))
    for e in md['views']:
        md['views'][e]['url'] = "%s/%s/videos/small/%s.mp4" % (
            config.soc_url_base, soc_id, e)
        md['views'][e]['allScript'] = '/static/data/%s%s.json' % (
            config.all_script_prefix, e)
    return json.dumps(md).encode('utf-8')


@app.route('/')
@app.route('/vtt/')
def index():
    paths_to_files = {
        '/': 'demo.html',
        '/vtt/': 'demo.html',
        '/xai/': 'demo_xai.html'
    }

    socs = get_socs()
    soc_id = socs.keys()[5]
    soc_metadata = get_soc_metadata_json(soc_id)
    return render_template(
        paths_to_files[request.path],
        socs=socs,
        soc_id=soc_id,
        soc_metadata=soc_metadata,
        objs=ont.objs,
        ont=ont.get_graph(), )


@app.route('/<collection_name>/')
@app.route('/<collection_name>/<soc_id>/')
def demo(collection_name, soc_id='auditorium'):
    collections_to_templates = {
        'vtt': 'demo.html',
        'xai': 'demo_xai.html'
    }

    socs = get_socs(collection_name)
    if soc_id in socs:
        try:
            soc_metadata = get_soc_metadata_json(soc_id)
        except:
            # return "Cannot get soc metadata for '%s'" % soc_id
            soc_metadata = {}
        return render_template(
            collections_to_templates[collection_name],
            socs=socs,
            soc_id=soc_id,
            soc_metadata=soc_metadata,
            objs=ont.objs,
            ont=ont.get_graph(), )
    else:
        return 'Invalid soc: %s/%s' % (collection_name, soc_id)


#  @app.route('/api/query/', methods=['POST'])
#  def api_query():
#  query = json.dumps(request.get_json(force=True))
#  # query = request.values.get('query', '')
#  try:
#  req = urllib2.Request(config.query_api_url, query)
#  res = urllib2.urlopen(req).read()
#  return res
#  except urllib2.HTTPError, error:
#  return error.read()


@app.route('/api/query2/', methods=['POST'])
def api_query2():
    soc_id = request.values.get('soc_id', '')
    storyline = request.values.get('storyline', '')
    xml = request.values.get('xml', '')
    query_data = json.dumps({
        "soc": soc_id,
        "storyline": storyline,
        "query": xml,
        "isNaturalLanguage": "false"
    })
    try:
        req = urllib2.Request(config.query_api_url, query_data)
        res = urllib2.urlopen(req).read()
        return res
    except urllib2.HTTPError, error:
        return error.read()


@app.route('/api/questions/', methods=['POST'])
def api_questions():
    insts = request.get_json(force=True)
    objs = {}
    for i in insts:
        if i['object'] not in objs:
            objs[i['object']] = []
        objs[i['object']].append(i['name'])
    attrs = ont.get_attributes(objs.keys())
    rels = ont.get_relationships_list(objs.keys())

    q_attr = []
    for o in attrs:
        for a in attrs[o]:
            for inm in objs[o]:
                q_attr.append(inm + ' ' + a)

    q_rel = []
    for e in rels:
        for r in e[2]:
            for inm1 in objs[e[0]]:
                for inm2 in objs[e[1]]:
                    q_rel.append(inm1 + ' ' + r + ' ' + inm2)

    return jsonify(
        attribute=q_attr,
        relationship=q_rel, )


@app.route('/api/questions2/', methods=['POST'])
def api_questions2():
    insts = request.get_json(force=True)
    objs = set()
    for i in insts:
        objs.add(i['object'])
    attrs = ont.get_attributes(objs)
    rels = ont.get_relationships_dict(objs)
    rels_new = {}
    for e in rels:
        rels_new[e[0] + ' ' + e[1]] = rels[e]

    return jsonify(
        attribute=attrs,
        relationship=rels_new, )


if __name__ == '__main__':
    app.run(debug=True, host=config.host, port=config.port)

import ontology_config
import json


class Ontology(object):
    def __init__(self):
        self.obj_attrs = ontology_config.objects_attributes
        self.objs = self.obj_attrs.keys()
        self.rels = ontology_config.relationships
        self.node_type = {}
        for t in ontology_config.node_type:
            for a in ontology_config.node_type[t]:
                self.node_type[a] = t

        self.obj_obj_rels = {}
        for r in self.rels:
            for e in self.rels[r]:
                for i in xrange(2):
                    if type(e[i]) == str:
                        e[i] = set([e[i]])
                    else:
                        e[i] = set(e[i])
                for o1 in e[0]:
                    for o2 in e[1]:
                        if (o1, o2) not in self.obj_obj_rels:
                            self.obj_obj_rels[(o1, o2)] = set()
                        self.obj_obj_rels[(o1, o2)].add(r)

    def get_attributes(self, obj):
        if type(obj) == str:
            obj = [obj]
        res = {}
        for o in obj:
            res[o] = self.obj_attrs[o]
        return res

    def get_relationships_dict(self, obj):
        if type(obj) == str:
            obj = set([obj])
        else:
            obj = set(obj)
        res = {}
        for o1 in obj:
            for o2 in obj:
                if (o1, o2) in self.obj_obj_rels:
                    res[(o1, o2)] = list(self.obj_obj_rels[(o1, o2)])
        return res

    def get_relationships_list(self, obj):
        rels = self.get_relationships_dict(obj)
        res = []
        for e in rels.keys():
            res.append([e[0], e[1], rels[e]])
        return res

    def get_graph(self):
        nodes = []
        links = []
        node_id = dict()
        for o in self.objs:
            nodes.append({
                'name': o,
                'class': 'node-object',
                'id': 'node-'+o,
            })
            node_id[o] = len(node_id)

        for o in self.obj_attrs:
            for a in self.obj_attrs[o]:
                aid = o+'-'+a
                cls = 'node-attr'
                if a in self.node_type:
                    cls = 'node-'+self.node_type[a].lower()
                nodes.append({
                    'name': a,
                    'class': cls,
                    'id': 'node-'+aid,
                })
                node_id[aid] = len(node_id)
                links.append({
                    'source': node_id[o],
                    'target': node_id[aid],
                    'class': 'attr',
                    'id': 'link-'+aid,
                })

        for o1 in self.objs:
            for o2 in self.objs:
                if (o1, o2) in self.obj_obj_rels:
                    for r in self.obj_obj_rels[(o1, o2)]:
                        rid = o1+'-'+r+'-'+o2
                        cls = 'node-rel'
                        if r in self.node_type:
                            cls = 'node-'+self.node_type[r].lower()
                        nodes.append({
                            'name': r,
                            'class': cls,
                            'id': 'node-'+rid,
                        })
                        node_id[rid] = len(node_id)
                        links.append({
                            'source': node_id[o1],
                            'target': node_id[rid],
                            'class': 'rel-1',
                            'id': 'link-'+rid+'-1'
                        })
                        links.append({
                            'source': node_id[rid],
                            'target': node_id[o2],
                            'class': 'rel-2',
                            'id': 'link-'+rid+'-2'
                        })
        return json.dumps({
            'nodes': nodes,
            'links': links,
            'nodeID': node_id,
        })


if __name__ == '__main__':
    ont = Ontology()
    print ont.get_attributes('person')
    print ont.get_attributes('ball')
    print ont.get_relationships(['person', 'ball', 'disk'])

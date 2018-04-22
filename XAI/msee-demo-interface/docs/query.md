# Query API

This API sends a query to the query engine and returns the answer.

- URL: `api/query/`
- Method: `POST`

```
{
    "soc": "this-is-soc-id",
    "storyline": "this-is-a-storyline-line",
    "query": "The query.",
    "isNaturalLanguage": false
}
```

## Fields

| Fields           | Descriptions                                                                                     |
| --               | --                                                                                               |
| soc              | Required. The soc id to query.                                                                   |
| storyline        | Required. The storyline id to which this query belongs to.                                       |
| query            | Required. The format language query (json object) or natural language query. See examples below. |
| isNatualLanguage | Optional. Indicates whether the query is in natural language. Default `false`                    |


### Formal Language Query

```
"query": {
        "isPolar": false,
        "predicates": [
            {
                "name": "person",
                "operands": ["person"],
                "time": {
                    "name": "time-0"     optional, will assign automatically
                    "start": 1400,        or "2013-05-13T12:31:05.000Z"
                    "end": 1600,             "2013-05-13T12:34:05.000Z"
                    "viewId": "view-HC3"     "sceneTime": true
                },
                "location": {
                    "type": "polygon" or "point",
                    "points": [
                        x1, y1, x2, y2, x3, y3, x4, y4
                    ],
                    "viewId": "view_id"
                }
            }
        ]
    }
}
```

### Natual Language Query

```
"query": {
        "nlQuery": "What is John doing at time-0?",
        "predicates": [
            Same as formal language queries.
            Just include all the defined objects so far.
        ],
        "times": [      addtional times for the query
            {
                "name": "time-0",
                "start": 1400,        or "2013-05-13T12:31:05.000Z"
                "end": 1600,             "2013-05-13T12:34:05.000Z"
                "viewId": "view-HC3"     "sceneTime": true
            }
        ]
}
```

## Response  (200)
Optional. Indicates whethOptional. Indicates whether the query is in natural language. Defaulter the query is in natural language. Default
```
{
    "soc": "this-is-soc-id",
    "storyline": "this-is-a-storyline-line",
    "isPolar": true,
    "answer": false,    or number of graphs returned (in non-polar cases)
    "answerParseGraph": { Concise parse graphs related to this query },
    "answerDetails": [ Detailed intermediate results ],
    "queryGraph": { Query graph translated },
    "confidence": 0.80,
    "timeEscaped": 3.004,
    "explanation": {
      "text": "a string of explanation",
      "parsegraph": "a string in DOT format representing a parse graph",
      "highlights": ["person1", "upperbody1"],    // a list of nodes ids
    }
}
```

| Field            | Description                                                                                                               |
| -------          | -------------                                                                                                             |
| answers          | Polar answer or the number of graphs returned.                                                                            |
| answerParseGraph | Concise parse graph demonstrating the subgraphs related to queries. A object in D3 graph JSON format. See examples below. |
| answerDetails    | Details about which tracks are relevant to the query.                                                                     |
| queryGraph       | The query graph translated from Cypher. Has the same format as answerParseGraph.                                          |
| explanation      | Interactive explanations.                                                                                                 |

```
"answerParseGraph":
{
  "graphs": [
    {
      "nodes": [
        {
          "id": "bc568c45-7b41-49b0-93f4-62bb0895cb3a",
          "property": {
            "x": "103",
            "label": "person"
          }
        },
        {
          "id": "bc568c45-7b41-49b0-93f4-62bb0895cb3a_Move_"
        }
      ],
      "links": [
        {
          "source": 0,
          "target": 1,
          "type": "AGENT"
        },
        {
          "source": 0,
          "target": 1,
          "type": "AGENT",
          "property": {
            "x": "103",
            "label": "person"
          }
        }
      ]
    }
  ]
}
```

```
"answerDetails": [
  {
    "startTime": "",
    "endTime": "",
    tracks: [
      {
        "id": "id of the track",
        "vid": "corresponding vertex id",
        "bvar": "binding variable",
      }
    ]
  },
  {
    "startTime": "",
    "endTime": "",
    tracks: [
      {
        "id": "id of the track",
        "vid": "corresponding vertex id",
        "bvar": "binding variable",
      }
    ]
  }
]
```

### Query Engine SDK Interface
#### answer_str

The graph is converted from the XML format returned by Query Engine.
This is the assumed format for `answer.answer_str`:

```xml
<Graphs>
  <!-- a subgraph -->
  <Graph>
    <Vertices>
      <Vertex id="" type="">
        <!-- Other properties here. For example: -->
        <Property key="ViewId" value="view-Contour2"/>
      </Vertex>
    </Vertices>
    <Edges>
      <Edge type="" from="", to="">
          <!-- Other properties here.-->
      </Edge>
    </Edges>
  </Graph>
  <!&mdash; Next subgraph -->
  <Graph>...</Graph>
</Graphs>
```

#### answer_details

This is the assumed format for `answer.answer_details`:

```xml
<QueryGraph>
  <!-- Query graphs -->
</QueryGraph>
<AnswerDetails>
  <!-- The answer detail corresponding to the first parse graph -->
  <AnswerDetail startTime="(please use scene time)" endTime="(please use scene time)">
    <Track id="(id of the trajectory to visualize)"
           vid="(which vertex in the graph does this track to; this id may be the same with track id)"
           bvar="(which variable in the query does it bind to)"/>
    <Track id="" vid="" bvar=""/>
  </AnswerDetail>

  <!-- The answer detail corresponding to the second parse graph -->
  <AnswerDetail startTime="" endTime="">
    <Track id="" vid="" bvar=""/>
  </AnswerDetail>

  <!-- Note: The # of <AnswerDetail> shall match the # of <Graph> in answer_str and in the corresponding order. -->

</AnswerDetails>
<Explanation>
  <text>"explanation text"</text>
  <parsegraph>"a parse graph in dot format"</parsegraph>
  <highlights>"node1,node2,node3"</highlights>
</Explanation>
```

## Errors (500)

```
{
    "soc": "this-is-soc-id",
    "storyline": "this-is-a-storyline-line",
    "errorMsg": "Error message returned from query engine."
}
```



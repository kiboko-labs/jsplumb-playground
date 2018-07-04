requirejs.config({
    baseUrl: 'bower_components',
    paths: {
        app: '../scripts',
        jsplumb: 'jsplumb/dist/js/jsplumb',
        crypto: 'crypto/crypto',
        uuidjs: 'uuid-js/lib/uuid',
        rng: 'uuid/rng',
        jquery: 'jquery/dist/jquery',
        underscore: 'underscore/underscore',
        backbone: 'backbone/backbone'
    },
    shim: {
        jsplumb: {
            exports: 'jsPlumb'
        },
        jquery: {
            exports: 'jQuery'
        },
        backbone: {
            deps: [ 'jquery', 'underscore' ],
            exports: 'Backbone'
        },
        uuidjs: {
            exports: 'UUIDjs'
        }
    }
});

requirejs([
    'jsplumb',
    'app/graph/view/node',
    'app/graph/model/node',
    'app/graph/model/node/database',
    'app/graph/model/node/input-file',
    'app/graph/model/node/tmap',
    'app/graph/model/relation'
], function(
    jsPlumb,
    NodeView,
    NodeModel,
    DatabaseModel,
    InputFileModel,
    TMapModel,
    RelationModel
) {
    jsPlumb.ready(function() {
        var container = document.querySelector('.container');
        var instance = jsPlumb.getInstance();
        instance.setContainer(container);

        instance.importDefaults({
            PaintStyle : {
                strokeWidth: 4,
                stroke: 'rgba(200, 0, 0, 0.75)'
            },
            Connector: ["Flowchart", { cornerRadius: 5 } ],
            DragOptions : { cursor: "crosshair" },
            Endpoints : [ [ "Dot", { radius: 4 } ], [ "Rectangle", { radius: 8 } ] ],
            EndpointStyles : [{ fill:"#225588" }, { fill:"#558822" }],
            Overlays: [
                [ "Arrow", { foldback: 0.2 } ]
            ]
        });

        var nodes = [
            new NodeView({
                model: new InputFileModel('CSV'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new DatabaseModel('RDBMS'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new TMapModel('TMap'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new NodeModel('Sit', 'file-export'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new NodeModel('Amet', 'recycle'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new NodeModel('Consecutir', 'save'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new InputFileModel('CSV'),
                jsPlumb: instance
            })
        ];

        nodes.map(function(item){
            item.render()
                .insertInto(container)
                .makeDraggable();
        });

        nodes[0].moveTo(100, 100);
        nodes[1].moveTo(300, 100);
        nodes[2].moveTo(200, 300);
        nodes[3].moveTo(100, 500);
        nodes[4].moveTo(300, 500);
        nodes[5].moveTo(300, 700);
        nodes[6].moveTo(400, 100);

        nodes[0].connectTo(nodes[2], new RelationModel('Relation 0 -> 2'));
        nodes[1].connectTo(nodes[2], new RelationModel('Relation 1 -> 2'));

        nodes[6].connectTo(nodes[4], new RelationModel('Relation 6 -> 4'));

        nodes[2].connectTo(nodes[3], new RelationModel('Relation 2 -> 3'));
        nodes[2].connectTo(nodes[4], new RelationModel('Relation 2 -> 4'));

        nodes[4].connectTo(nodes[5], new RelationModel('Relation 4 -> 5'));
    });
});

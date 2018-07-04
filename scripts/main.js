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
    'app/graph/model/node/camille',
    'app/graph/model/relation',
    'app/graph/model/node/test'
], function(
    jsPlumb,
    NodeView,
    NodeModel,
    CamilleModel,
    RelationModel,
    TestModel
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
                model: new CamilleModel('camille', 'save'),
                jsPlumb: instance
            }),
            new NodeView({
                model: new TestModel('test', 'save'),
                jsPlumb: instance
            }),

        ];

        nodes.map(function(item){
            item.render()
                .insertInto(container)
                .makeDraggable();


        });

        nodes[0].moveTo(100, 100);
        nodes[0].moveTo(300, 800);

        nodes[0].colorTo("red","blue");

        nodes[1].colorTo("blue","red");

        nodes[0].connectTo(nodes[1], new RelationModel(' 1 -> 2 '));



    });
});

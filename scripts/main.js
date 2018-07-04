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
    'app/graph/model/node'
], function(
    jsPlumb,
    NodeView,
    NodeModel
) {
    jsPlumb.ready(function() {
        var container = document.querySelector('.container');
        var instance = jsPlumb.getInstance();
        instance.setContainer(container);

        var nodes = [
            new NodeView({
                model: new NodeModel('Lorem'),
                parent: container,
                endpointRender: {
                    endpoint: "Dot",
                    anchor: [ "Perimeter", { shape: "Diamond" } ]
                }
            }, instance),
            new NodeView({
                model: new NodeModel('Ipsum'),
                parent: container,
                endpointRender: {
                    endpoint: "Dot",
                    anchor: [ "Perimeter", { shape: "Diamond" } ]
                }
            }, instance),
            new NodeView({
                model: new NodeModel('Ipsum'),
                parent: container,
                endpointRender: {
                    endpoint: "Dot",
                    anchor: [ "Perimeter", { shape: "Diamond" } ]
                }
            }, instance),
            new NodeView({
                model: new NodeModel('Ipsum'),
                parent: container,
                endpointRender: {
                    endpoint: "Dot",
                    anchor: [ "Perimeter", { shape: "Diamond" } ]
                }
            }, instance)
        ];

        nodes.map(function(item){
            item.render();
        });

        instance.connect({
            source: nodes[0].endpoint,
            target: nodes[1].endpoint,
            connector: [
                "Bezier", {
                    curviness: 175
                }
            ],
            paintStyle: {
                strokeWidth: 5,
                stroke: 'brown'
            },
            overlays: [
                [ "Arrow", { foldback: 0.2 } ],
                [ "Label", { cssClass: "labelClass" } ]
            ]
        });
    });
});

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
                model: new NodeModel('Lorem', 'file-import'),
                parent: container
            }, instance),
            new NodeView({
                model: new NodeModel('Ipsum', 'database'),
                parent: container
            }, instance),
            new NodeView({
                model: new NodeModel('Dolor', 'file-export'),
                parent: container
            }, instance),
            new NodeView({
                model: new NodeModel('Sit', 'save'),
                parent: container
            }, instance)
        ];

        nodes.map(function(item){
            item.render()
                .makeDraggable()
                .makeEndpoint({
                    endpoint: 'Dot',
                    anchor: [ 'Perimeter', { shape: 'Diamond' } ]
                });
        });

        nodes[0].connectTo(nodes[1], 'Relation 0 -> 1');
        nodes[1].connectTo(nodes[2], 'Relation 1 -> 2');
        nodes[2].connectTo(nodes[3], 'Relation 2 -> 3');
        nodes[3].connectTo(nodes[0], 'Relation 3 -> 0');
    });
});

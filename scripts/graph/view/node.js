define([
    'backbone',
    'underscore',
    'jsplumb',
    'uuidjs',
    'app/graph/model/node'
], function(
    Backbone,
    _,
    jsPlumb,
    UUID,
    NodeModel
) {
    var Node = Backbone.View.extend({
        template: _.template(
            '<div class="node" id="<%= id %>">' +
                '<span class="fa fa-<%= icon %>"></span>' +
                '<span class="label"><%= label %></span>' +
            '</div>'
        ),

        endpointOptions: {
            isSource: true,
            isTarget: true
        },

        initialize: function(options, jsPlumbInstance) {
            this.model = options.model || new NodeModel();
            this.jsPlumb = jsPlumbInstance || jsPlumb;
            this.parent = options.parent || document.body;
            this.options = options;

            this.id = UUID.create();
        },
        
        render: function() {
            this.$el.html(this.template(_.extend(
                {
                    id: this.id
                },
                this.model.attributes
            )));

            this.parent.appendChild(this.el);

            return this;
        },

        makeDraggable: function() {
            this.jsPlumb.draggable(this.$el, {
                grid: [10, 10]
            });

            return this;
        },

        makeEndpoint: function(endpointRender) {
            this.endpoint = this.jsPlumb.addEndpoint(
                this.el,
                endpointRender,
                _.extend(
                    Node.endpointOptions,
                    this.options.endpointOptions
                )
            );

            return this;
        },

        connectTo: function(node, label) {
            this.jsPlumb.connect({
                source: this.endpoint,
                target: node.endpoint,
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
                    [ "Label", { label: label || 'Connection', cssClass: "labelClass" } ]
                ]
            });

            return this;
        }
    });

    Node.endpointOptions = {
        isSource: true,
        isTarget: true
    };

    return Node;
});

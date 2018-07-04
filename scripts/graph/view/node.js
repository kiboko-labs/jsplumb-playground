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
                '<div class="circle">' +
                    '<span class="fa fa-<%= icon %>"></span>' +
                '</div>' +
                '<span class="label"><%= label %></span>' +
            '</div>'
        ),

        endpointOptions: {
            isSource: true,
            isTarget: true
        },

        initialize: function(options) {
            this.model = options.model || new NodeModel();
            this.options = options;
            this.jsPlumb = options.jsPlumb || jsPlumb;

            this.id = UUID.create();
        },

        _recalculate: function() {
            if (this.el.parentElement) {
                this.jsPlumb.revalidate(this.el);
            }
        },
        
        render: function() {
            this.$el.html(this.template(_.extend(
                {
                    id: this.id
                },
                this.model.attributes
            )));

            this._recalculate();

            return this;
        },

        moveTo: function(top, left) {
            this.$el.css({
                top: top,
                left: left
            });

            this._recalculate();

            return this;
        },

        makeDraggable: function() {
            this.jsPlumb.draggable(this.el, {
                grid: [10, 10]
            });

            this._recalculate();

            return this;
        },

        addEndpoint: function(endpointRender) {
            return this.jsPlumb.addEndpoint(
                this.el.querySelector('.circle'),
                endpointRender,
                {
                    isSource: true,
                    isTarget: true
                }
            );
        },

        addSourceEndpoint: function(endpointRender) {
            return this.jsPlumb.addEndpoint(
                this.el.querySelector('.circle'),
                endpointRender,
                {
                    isSource: true,
                    isTarget: false
                }
            );
        },

        addTargetEndpoint: function(endpointRender) {
            return this.jsPlumb.addEndpoint(
                this.el.querySelector('.circle'),
                endpointRender,
                {
                    isSource: false,
                    isTarget: true
                }
            );
        },

        connectTo: function(node, relation) {
            this.jsPlumb.connect({
                source: this.addSourceEndpoint({
                    endpoint: [ 'Dot', { radius: 4 } ],
                    anchor: [ 'Perimeter', { shape: 'Circle' } ],
                    maxConnections: 1,
                    onMaxConnections: function(endpoint, originalEvent) {
                        console.log("element is ", endpoint.element, "maxConnections is", endpoint.maxConnections);
                    }
                }),
                target: node.addTargetEndpoint({
                    endpoint: [ 'Rectangle', { width: 8, height: 8 } ],
                    anchor: [ 'Perimeter', { shape: 'Diamond' } ],
                    maxConnections: -1,
                    onMaxConnections: function(endpoint, originalEvent) {
                        console.log("element is ", endpoint.element, "maxConnections is", endpoint.maxConnections);
                    }
                }),
                overlays: [
                    [ "Label", { label: relation.get('label') || 'Connection', cssClass: "label" } ]
                ]
            });

            this._recalculate();

            return this;
        },

        insertInto: function(parentNode) {
            parentNode.appendChild(this.el);
            this._recalculate();

            return this;
        }
    });

    Node.endpointOptions = {
        isSource: true,
        isTarget: true
    };

    return Node;
});

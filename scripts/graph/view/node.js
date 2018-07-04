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
                '<span class="fa fa-database"></span>' +
                '<span class="label"><%= label %></span>' +
            '</div>'
        ),

        endpointOptions: {
            isSource:true,
            isTarget:true
        },

        initialize: function(options, jsPlumbInstance) {
            this.model = options.model || new NodeModel();
            this.jsPlumb = jsPlumbInstance || jsPlumb;
            this.parent = options.parent || document.body;
            this.options = options;

            this.id = UUID.create();
        },
        
        render: function () {
            this.$el.html(this.template(_.extend(
                {
                    id: this.id
                },
                this.model.attributes
            )));

            this.endpoint = this.jsPlumb.addEndpoint(
                this.$el,
                this.options.endpointRender,
                _.extend(
                    Node.endpointOptions,
                    this.options.endpointOptions
                )
            );

            this.parent.appendChild(this.el);

            this.jsPlumb.draggable(this.$el, {
                grid: [10, 10]
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

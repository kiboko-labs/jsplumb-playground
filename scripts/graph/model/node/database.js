define([
    'backbone',
    'underscore',
    'app/graph/model/node'
], function(
    Backbone,
    _,
    NodeModel
) {
    var DatabaseModel = NodeModel.extend({
        initialize: function(label) {
            DatabaseModel.__super__.initialize.apply(this, [label, 'database']);
        }
    });

    return DatabaseModel;
});

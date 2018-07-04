define([
    'backbone',
    'underscore',
    'app/graph/model/node'
], function(
    Backbone,
    _,
    NodeModel
) {
    var TMapModel = NodeModel.extend({
        initialize: function(label) {
            TMapModel.__super__.initialize.apply(this, [label, 'random']);
        }
    });

    return TMapModel;
});

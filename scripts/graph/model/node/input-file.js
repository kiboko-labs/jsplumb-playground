define([
    'backbone',
    'underscore',
    'app/graph/model/node'
], function(
    Backbone,
    _,
    NodeModel
) {
    var InputFileModel = NodeModel.extend({
        initialize: function(label) {
            InputFileModel.__super__.initialize.apply(this, [label, 'file-import']);
        }
    });

    return InputFileModel;
});

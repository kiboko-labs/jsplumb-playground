define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
) {
    return Backbone.Model.extend({
        initialize: function(label) {
            this.set('label', label);
        }
    });
});

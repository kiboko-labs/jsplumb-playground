define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
) {
    return Backbone.Model.extend({
        initialize: function(label, icon) {
            this.set('label', label);
            this.set('icon', icon || 'database');
        }
    });
});

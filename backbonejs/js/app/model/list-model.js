window.List = Backbone.Model.extend({
     urlRoot:"http://localhost:3000/lists.json"
});

window.ListCollection = Backbone.Collection.extend({
    model: List,
    url: 'http://localhost:3000/lists.json'
});
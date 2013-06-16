window.Item = Backbone.Model.extend({
     //urlRoot:"http://localhost:8000/api/v1/items"
     urlRoot:"http://localhost:3000/api/v1/items"
});

window.ItemCollection = Backbone.Collection.extend({
    model: Item,
    //url: 'http://localhost:8000/api/v1/items'
    url:"http://localhost:3000/api/v1/items"
});
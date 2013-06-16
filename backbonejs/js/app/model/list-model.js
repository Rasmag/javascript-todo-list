window.List = Backbone.Model.extend({
    //urlRoot:"http://localhost:8000/api/v1/lists"
    urlRoot:"http://localhost:3000/api/v1/lists"
});

window.ListCollection = Backbone.Collection.extend({
    model: List,
    //url:"http://localhost:8000/api/v1/lists"
    url: "http://localhost:3000/api/v1/lists"
});
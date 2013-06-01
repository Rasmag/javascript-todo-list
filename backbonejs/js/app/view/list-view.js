window.TodoEditItemView = Backbone.View.extend({
    tagName: 'div',
    template:_.template($('#edit-input-item').html()),

    initialize:function () {
        
    },

    events:{
        "click #delete":"deleteItem",
        "blur .itemTask": "updateItem"
    },

    updateItem: function(){
        this.model.set({
            name:$('#item-'+this.model.get('id')).val()
        });
    },

    deleteItem:function (eventName) {
        
    },

    render:function (eventName) {
         $(this.el).html(this.template({item: this.model.toJSON()}));
        return this;
    }
});

window.ListView = Backbone.View.extend({

    template:_.template($('#list').html()),
    
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    populateData:function () {
        this.model.fetch();
    },

    close:function () {
        $(this.el).unbind();
        $(this.el).empty();
    }

});

window.NewListView = Backbone.View.extend({
    template:_.template($('#new-list').html()),

    initialize:function () {
        this.model.bind("change:id", this.navigateHome ,this);
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    },

    events:{
        "submit #form-list":"createList"
    },

    createList:function () {
        this.model.set({
            name:$('#name').val()
        });
        this.model.save();
        return false;
    },

    navigateHome: function (list){
        app.navigate('/',true);
    }

});

window.EditListView = Backbone.View.extend({
    model: new ItemCollection(),
    template:_.template($('#edit-list').html()),

    initialize:function (models, list) {
        this.list = list;
        this.model.bind("change:id", this.navigateHome ,this);
        this.model.bind("reset", this.onItems, this);
        this.list.bind("sync", this.navigateTodo, this);
    },

    onItems: function(){
        this.$('#edit-items-opened').empty()
        _.each(this.model.models, function (item) {
            this.$('#edit-items-opened').append(new TodoEditItemView({model:item}).render().el);
        }, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template({list: this.list.toJSON()}));
        return this;
    },

    events:{
        "submit #form-editList":"editList"        
    },

    
    editList:function () {
        //uddate items
        _.each(this.model.models, function (item) {
            item.save();
        });

        var textDescription= $('#description').val();
        var taskEdited = $('#nameTask').val();
        this.list.set({name: taskEdited, description : textDescription});
        this.list.save();
        return false;
    },
    
    navigateTodo: function(){
        app.navigate('/lists/'+this.list.id+'/items',true);
    },

    navigateHome: function (list){
        app.navigate('/',true);
    }
});
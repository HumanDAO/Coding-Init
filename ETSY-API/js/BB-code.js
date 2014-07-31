//1. Collection calls fetch() 
//2. fetch gets etsy listings and creates Models for you 
//3. Models will need to create their own view in the initialize function()

EtsyListings = Backbone.Collection.extend({
    model: ETSYListing,
    api_key: "4a53qesm1vkbho586qara8kf",
    query: 'backbone.js tutorials',

    url: function() {
        return 'https://openapi.etsy.com/v2/listings/active.js?api_key=' + this.api_key + '&callback=?';
    },
    // Because Etsy doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
        console.log(resp.results);
        return resp.results;
    },

    // you will create a view and a model to show in the HTML

    initialize: function() {
        this.on('change', function(model) {
            console.log(model);
        });

        this.on('add', function(model) {
            console.log(model);
        });
    }
});

Listings = new TIYClass();
Listings.fetch().then(function() {
        ....SOMETHING HERE
});
Listings.each(function(data) {
data.save()
});
})




ETSYListing = Backbone.View.extend({
    initialize: function() {
        $('body').append(this.el);
        this.render();
        this.model.view = this; //2
    },
    tagName: 'div', // default is div
    // className: 'whatever',
    render: function() {
        var data = _.extend({}, this.model.attributes, {
            SOMWTHINGS HERE// time: new Date()
        });
        this.el.innerHTML = this.template(data);
    },
    template: _.template('./templates/listings.tmpl'),
    // events: {
    //     'click a': 'render',
    // },
});

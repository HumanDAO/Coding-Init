//  _____ ______   ________  ________  _______    ___          
// |\   _ \  _   \|\   __  \|\   ___ \|\  ___ \  |\  \         
// \ \  \\\__\ \  \ \  \|\  \ \  \_|\ \ \   __/| \ \  \        
//  \ \  \\|__| \  \ \  \\\  \ \  \ \\ \ \  \_|/_ \ \  \       
//   \ \  \    \ \  \ \  \\\  \ \  \_\\ \ \  \_|\  \ \  \____  
//    \ \__\    \ \__\ \_______\ \_______\ \_______ \ \_______\
//     \|__|     \|__|\|_______|\|_______|\|_______| \|_______|


Item = Backbone.Model.extend({
    // urlRoot: function() {
    //     return [
    //         'https://openapi.etsy.com/v2/listings/active.js?',
    //         'api_key=',
    //         // this.api_key,
    //         '4a53qesm1vkbho586qara8kf',
    //         '&includes=MainImage',
    //         '&callback=?'
    //     ].join('');
    // },

    initialize: function() {

        this.display = new Display({ //changed var to this.
            model: this
        })
    },

    defaults: {
        Status: 'new item',
        Release_Year: '2014'
    }
})


//   #####                                                           
// #     #  ####  #      #      ######  ####  ##### #  ####  #    # 
// #       #    # #      #      #      #    #   #   # #    # ##   # 
// #       #    # #      #      #####  #        #   # #    # # #  # 
// #       #    # #      #      #      #        #   # #    # #  # # 
// #     # #    # #      #      #      #    #   #   # #    # #   ## 
//  #####   ####  ###### ###### ######  ####    #   #  ####  #    # 



ItemCollection = Backbone.Collection.extend({
    url: function() {
        return [
            'https://openapi.etsy.com/v2/listings/active.js?',
            'api_key=',
            // this.api_key,
            '4a53qesm1vkbho586qara8kf',
            '&includes=MainImage',
            '&callback=?'
        ].join('');
    },

    model: Item,

    initialize: function(model) {
        this.fetch(this.model.results);
        console.info(this.model);
        // return model.results;
    }

})


// ██╗   ██╗██╗███████╗██╗    ██╗
// ██║   ██║██║██╔════╝██║    ██║
// ██║   ██║██║█████╗  ██║ █╗ ██║
// ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║  
//  ╚████╔╝ ██║███████╗╚███╔███╔╝
//   ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ 


Display = Backbone.View.extend({
    // url: '/collections/people',

    // el: $('body'),
    // initialize: function() {
    //     this.items = new Items(null, {
    //         view: this
    //     }),

    // showMe: function() {
    //         var Template = ._template('./listings.tmpl');
    //         var item_model = new Item({
    //             name: Template
    //         });
    //         //Add a new item model to our item collection
    //         this.items.add(item_model);
    //     },

    // additemList: function(model) {
    //         //The parameter passed is a reference to the model that was added
    //         $("#items-list").append("<li>" + model.get('name') + "</li>"); //also model.attributes.name
    //         //Use .get to receive attributes of the model
    //     }

    //Create a items collection when the view is initialized.
    //Pass it a reference to this view to create a connection between the two


    //############################

    // el: $('body'),
    tagName: 'div',

    initialize: function() {
        $('body').append(this.el); //
        this.render();
        // this.model.view = this; //2
    },


    getTemplate: function(url) {
        return $.get(url).then(function(templateCode) {
            // self.templates[url] = _.template(tmpl);
            return _.template(templateCode);
        });
    },


    // getTemplate: this.Template('./templates/listings.tmpl'),


    render: function() {
        var that = this;
        console.log(this.model.attributes);
        $.when(this.getTemplate('./listings.tmpl')).then(function(tmpl) {
                var actualHTMLstring = tmpl(that.model.attributes);
                that.$el.html(actualHTMLstring);
                return that;
            });
    }
});

var item1 = new Item({
    Condition: "Good One"
});




///////############################################################################################


// Person = Backbone.Model.extend({
//     urlRoot: '/collections/people',
//     initialize: function() {}
// })

// PeopleCollection = Backbone.Collection.extend({
//     url: '/collections/people',
//     model: Person
// })

// people = new PeopleCollection();
// people.fetch();
//Etsy discussion (Backbone vs. vanilla JS):

var EtsyListingView = Backbone.View.extend({
    tagName: 'a',
    initialize: function() {
        this.el.setAttribute('href', '#listing/'+this.model.get('listing_id'));
        $('[role="ListingContainer"]').append(this.el);
        this.render();
    },
    render: function() {
        var self = this;
        $.when(this.getTemplate('/templates/listing.html')).then(function(tmpl) {
            self.el.innerHTML = tmpl(self.model.attributes);
        });
    },
    getTemplate: function(url) {
        if (!EtsyListingView.prototype.templates){
            EtsyListingView.prototype.templates = {};
        }
        if(!EtsyListingView.prototype.templates[url]) {
            return $.get(url).then(function(tmpl) {
                tmpl = _.template(tmpl);
                EtsyListingView.prototype.templates[url] = tmpl;
                return tmpl;
            });
        } else {
            var dfd = $.Deferred();
            dfd.resolve(EtsyListingView.prototype.templates[url]);
            return dfd;
        }
    }
});

var EtsyListing = Backbone.Model.extend({
    initialize: function() {
        this.view = new EtsyListingView({ model: this });
    }
});

var EtsyListings = Backbone.Collection.extend({

    api_key: "aavnvygu0h5r52qes74x9zvo", // put your api key here!
    url: function() {
        return [
            'https://openapi.etsy.com/v2/listings/active.js?',
            'api_key=',
            this.api_key,
            '&includes=MainImage',
            '&callback=?'
        ].join('');
    },
    // Because Etsy doesn't return an array of models by default we need
    // to point Backbone.js at the correct property
    parse: function(resp, xhr) {
        return _.filter(resp.results, function(listing){
            return !!listing.MainImage;
        });
    },

    fetchListings: function(){
        $('[role="ListingContainer"]').empty();
        this.fetch();
    },

    model: EtsyListing // you will create a view and a model to show in the HTML

});

listings = new EtsyListings();



var _Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "listing/:id": "listing"
    },
    index: function(){
        listings.fetchListings();
    },
    listing: function(){}
});

router = new _Router();
if( !Backbone.history.start() ){
    router.navigate("", {trigger: true});
}
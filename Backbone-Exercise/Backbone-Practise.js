// Person = Backbone.Model.extend({
//     // urlRoot: '/collections/people', //not going to work until we have a REST server
//     initialize: function() {
//         console.log("Backbone for you " + this.get('name'));

//         this.bind("invalid", function(model, error) {
//             alert(error);
//         });

//         this.on("change:name", function(model) {
//             alert("name changed from:" + model._previousAttributes.name + " to " + model.get('name'));
//         });

//     },

//     defaults: {
//         name: 'Not defined',
//         age: 0,
//         height: '1\'0"'
//     },

//     validate: function(attributes) {
//         // console.log(attributes);
//         if (attributes.age < 0) {
//             this.attributes.name = "Invalid";
//             return "We have reset you!";
//         }
//     },

//     bringDonuts: function(model) {
//         if (model) {
//             console.log(model);
//             this.set('broughtDonuts', true);

//         }
//     }
// });

// roberto = new Person({
//     name: "Roberto",
//     age: -1
// });

// keya = new Person({
//     name: "Keya",
//     height: '6\'4"'
// });

// person = new Person();
// person.set({name:"Mama Mia", age: 23});

// keya.set(true);

// // matt.save().then(function(){ // not going to work until we have a REST server
// // ...
// //});
// 
// });


///#########################################################################


// Friend = Backbone.Model.extend({
//     //Create a model to hold friend atribute
//     name: null
// });

// Friends = Backbone.Collection.extend({
//     //This is our Friends collection and holds our Friend models
//     initialize: function(models, options) {
//         this.bind("add", options.view.addFriendLi);
//         //Listen for new additions to the collection and call a view function if so
//     }
// });

// AppView = Backbone.View.extend({
//     el: $("body"),
//     initialize: function() {
//         this.friends = new Friends(null, {
//             view: this
//         });
//         //Create a friends collection when the view is initialized.
//         //Pass it a reference to this view to create a connection between the two
//     },
//     events: {
//         "click #add-friend": "showPrompt",
//     },
//     showPrompt: function() {
//         var friend_name = prompt("Who is your friend?");
//         var friend_model = new Friend({
//             name: friend_name
//         });
//         //Add a new friend model to our friend collection
//         this.friends.add(friend_model);
//     },
//     addFriendLi: function(model) {
//         //The parameter passed is a reference to the model that was added
//         $("#friends-list").append("<li>" + model.get('name') + "</li>");
//         //Use .get to receive attributes of the model
//     }
// });

// var appview = new AppView;


///#########################################################################


Item = Backbone.Model.extend({
    // urlRoot: 'http://Etsy',
    urlRoot: function() {
        return [
            'https://openapi.etsy.com/v2/listings/active.js?',
            'api_key=',
            // this.api_key,
            '4a53qesm1vkbho586qara8kf',
            '&includes=MainImage',
            '&callback=?'
        ].join('');
    },
    
    initialize: function() {
        var that = this;
        $.when(this.fetch()).then(function() {
            var display = new Display({
                model: that
            });
        });
    },
    defaults: {
        description: 'QERT',
        release: 'new'
    }
})

ItemCollection = Backbone.Collection.extend({
    // url: '/collections/people',
    model: Item


})



Display = Backbone.View.extend({
    // url: '/collections/people',
    tagName: 'div',
    initialize: function() {
        $('body').append(this.el);
        this.render();
        this.model.view = this; //2
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
        console.log(this.model.attributes)
        $.when(this.getTemplate('./listings.tmpl'))
            .then(function(tmpl) {
                var actualHTMLstring = tmpl(that.model.attributes);
                that.$el.html(actualHTMLstring);
                return that;
            });
    }
});

var item1 = new Item({
    description: "RIUY",
    release: "new"
});
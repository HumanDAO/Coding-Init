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
// person.set({
//     name: "Mama Mia",
//     age: 23
// });

// keya.set(true);

// // matt.save().then(function(){ // not going to work until we have a REST server
// // ...
// //});

// });


//#########################################################################


Item = Backbone.Model.extend({
    // Create a model to hold item atribute
    name: null
});

Items = Backbone.Collection.extend({
    //This is our items collection and holds our item models
    initialize: function(models, options) {
        this.bind('add', options.view.additemList);
        //Listen for new additions to the collection and call a view function if so
    }
});

AppView = Backbone.View.extend({
    el: $("body"),
    initialize: function() {
        this.items = new Items(null, {
            view: this
        });
        //Create a items collection when the view is initialized.
        //Pass it a reference to this view to create a connection between the two
    },
    events: {
        "click #add-item": "showPrompt",
    },
    showPrompt: function() {
        var item_name = prompt("What is your item?");
        var item_model = new Item({name: item_name});
        //Add a new item model to our item collection
        this.items.add(item_model);
    },
    additemList: function(model) {
        //The parameter passed is a reference to the model that was added
        $("#items-list").append("<li>" + model.get('name') + "</li>"); //tried adding this.item_model.name but doesn't work!
        //Use .get to receive attributes of the model
    }
});


var appview = new AppView;
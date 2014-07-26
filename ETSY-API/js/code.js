function EtsyClient(options) {
    if (!options) {
        throw new Error("Missing an options argument to EtsyClient()");
    }
    if (!options.api_key) {
        throw new Error("Yo dawg, I heard you like APIs. Y U NO APIKEY!?!?");
    }

    this.etsy_url = "https://openapi.etsy.com/";
    this.version = options.api_version || "v2/";
    this.api_key = options.api_key;
    this.complete_api_url = this.etsy_url + this.version;
    this.templates = {};
  
    // create a div container for EVARTHING
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  
    // handle events on container
    // this.handleClickEvents();
  
    // print the listings template
    // this.showListings();

    this.setupRouting();
}

 EtsyClient.prototype.setupRouting = function(){
    var self = this;

    Path.map("#/").to(function() {
        self.showListings();
    });
    Path.map("#/listing/:id").to(function() {
        // console.log(this);
        self.showListing(this.params.id);
    });

    Path.map("#/item/:id").to(function() {
        // console.log(this);
        self.showListing(this.params.id);
    });


    // set the default hash
    Path.root("#/");
    Path.listen();
}

/**  
 * -----------------------------------------------------------------------------------------
 * API FUNCTIONS (LISTINGS, LISTING, USER)
 * -----------------------------------------------------------------------------------------
 * All these return Promises (i.e. from $.get(), $.getJSON(), $.Deferred())
 */

function pipeResults(d){ return d; }

EtsyClient.prototype.getActiveListings = function() {
    var self = this;

    var URIs = [
        this.complete_api_url,
        '/listings',
        '/active',
        ".js?api_key=",
        this.api_key,
        "&includes=MainImage",
        "&callback=?"
    ];

    return $.getJSON(URIs.join('')).then(pipeResults);
}

EtsyClient.prototype.getListing = function(id) {
    var URIs = [
        this.complete_api_url,
        '/listings',
        '/'+ id,   
        ".js?api_key=",
        this.api_key,
        "&includes=MainImage",
        "&callback=?"
    ];

    return $.getJSON(URIs.join('')).then(pipeResults);
}

EtsyClient.prototype.getUser = function(user_id){
    // users/:user_id/profile
    var URIs = [
        this.complete_api_url,
        '/users',
        '/' + user_id,
        "/profile",
        ".js?api_key=",
        this.api_key,
        "&includes=MainImage",
        "&callback=?"
    ];

    return $.getJSON(URIs.join('')).then(pipeResults);
}


/**
 * -----------------------------------------------------------------------------------------
 * TEMPLATE-GRABBING FUNCTIONS
 * -----------------------------------------------------------------------------------------
 * All these return Promises (i.e. from $.get(), $.getJSON(), $.Deferred())
 */

EtsyClient.prototype.getTemplate = function(url) {
    var self = this;
    if (!window._ || !window._.template) throw new Error("Did you forget to load lodash?");
    return $.get(url).then(function(tmpl) {
        // self.templates[url] = _.template(tmpl);
        return _.template(tmpl);
    });
}

/**
 * -----------------------------------------------------------------------------------------
 * UI FUNCTIONS
 * -----------------------------------------------------------------------------------------
 * All these use the Promises from the other functions in a $.when()
 */

EtsyClient.prototype.showListings = function() {
    var self = this;
    $.when(
        this.getTemplate('./templates/listings.tmpl'),
        this.getActiveListings()
    ).then(function(template, data) {
        data.results = _.filter(data.results, function(item){
            return !!item.MainImage;
        });
        self.container.innerHTML = template(data);
    });
}

EtsyClient.prototype.showListing = function(id) {
    var self = this;
    $.when(
        this.getTemplate('./templates/listing.tmpl'),
        this.getListing(id)
    ).then(function(template, data) {
        
        self.getUser(data.results[0].user_id).then(function(user){
            data.results[0].User = user.results[0];
            console.log(data);
            self.container.innerHTML = template(data.results[0]);
        });
    // self.container.innerHTML = template(data.results[0]);
    // console.log(data.results);

    });
}


// EtsyClient.prototype.handleClickEvents = function() {
    
//     var self = this;
    
//     $(this.container).on('click', '.container > div', function() {
//         console.log('clicking on:');
//         console.log(this);
//         self.showListing(this.getAttribute('listing'));
//     });
    
//     $(this.container).on('click', '.back', function() {
//         self.showListings();
//         console.log(this);

//     });
//     $(window).on('keydown', function(e) {
//         if(e.which === 27) self.showListings();
//     });
// }

/**
 * -----------------------------------------------------------------------------------------
 * THE APP ENTRY POINT
 * -----------------------------------------------------------------------------------------
 * All these use the Promises from the other functions in a $.when()
 */

window.onload = app;

function app() {
    var etsy = new EtsyClient({
        api_key: "4a53qesm1vkbho586qara8kf"
    });
}

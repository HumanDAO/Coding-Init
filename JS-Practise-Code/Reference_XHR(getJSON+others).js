$(function() {

    function EtsyClient(option) {
        this.etsy_api_request = "https://openapi.etsy.com/v2/";
        this.api_version = "v2/";
          this.api_key = "2s69xib2039fs6asqnkosxfo"; //Roberto's key
        this.option = option;
        console.log(option);
    }

    EtsyClient.prototype.ActiveListings_Request = function() {
        var model = "listings/";
        var filter = "active";
        var url = this.etsy_api_request + model + filter + ".js?" + "includes=MainImage" + "&api_key=" + this.api_key + "&callback=?";
        // return $.getJSON(url).then(function(data){
        //     return data.results;
        // });

        var json = $.getJSON(url);
        var listingsTempl = $.get('/templates/listings.tmpl');
    
        return $.when(json, listingsTempl).then(function(data_result, tmpl_result) {
        // console.log(data.result, templ_result);

        var data = data_result[0];
        var tmpl_text = tmpl_result[0];
        var templateFn = _.template(tmpl_text);
        var html_DOM = templateFn(data);

        $('#listings').append(html_DOM);
    });
    }

    EtsyClient.prototype.IndividualListing_Request = function(id) {
        var model = "listings/";
        var url = this.etsy_api_request + model + id + ".js?includes=MainImage" + "&api_key=" + this.api_key + "&callback=?";
        // return $.getJSON(url).then(function(data){
        // return data.results;

        var json = $.getJSON(url);
        // console.log(json);
        var listingTempl = $.get('/templates/listing.tmpl');
        
        return $.when(json, listingTempl).then(function(data_result, tmpl_result) {
        // console.info(data.result, templ_result);

        var data = data_result[0];
        var tmpl_text = tmpl_result[0];
        var templateFn = _.template(tmpl_text);
        var html_DOM = templateFn(data);

        $('#listing').append(html_DOM);

        });
    }


    $("button").click(function(){
            $("#listings").hide("slow",function(){
            });
            var El = $("button");
            El.innerText = 'Unhide';
        });


        $("button").click(function(){
            $("#listing").show("slow");
            // console.log($("button"));
        var El = $("button");
            El.innerText = 'Hide';
    });



    var Listings = new EtsyClient();

    // document.getElementById('#test').textContent = 

    $.when(
        Listings.ActiveListings_Request(), 
        Listings.IndividualListing_Request()
        ).then(function(listings, listing){
        console.log(listing, listings);
        });


});
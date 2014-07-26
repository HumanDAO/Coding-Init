// Promises are Easier to Read
// Let's say we want to grab some data from the HipsterJesus API and add it to our page. This API responds with data that looks like this:

// {
//   "text": "<p>Lorem ipsum...</p>",
//   "params": {
//     "paras": 4,
//     "type": "hipster-latin"
//   }
// }
// Using a callback, we write something like this:


$.getJSON('http://hipsterjesus.com/api/', function(data) {
  $('body').append(data.text);
});

// If you're experienced with jQuery, you'll recognize we're making a GET request and expecting JSON in the response body. We're also passing in a callback function that takes the response JSON and adds it to the document.

// Another way to write this is to use the promise object returned by the getJSON method. You can attach a callback to this object directly.

var promise = $.getJSON('http://hipsterjesus.com/api/');

promise.done(function(data) {
  $('body').append(data.text);
});


// Like the callback example, this appends the result of the API request to the document when the request is successful. But what happens if the request fails? We can also attach a fail handler to our promise.


var promise = $.getJSON('http://hipsterjesus.com/api/');

promise.done(function(data) {
  $('body').append(data.text);
});

promise.fail(function() {
  $('body').append('<p>Oh no, something went wrong!</p>');
});


// Most people remove the promise variable, which makes it a little easier to tell what the code does at a glance.


$.getJSON('http://hipsterjesus.com/api/')

.done(function(data) {
  $('body').append(data.text);
})

.fail(function() {
  $('body').append('<p>Oh no, something went wrong!</p>');
});



// jQuery also includes an always event handler that's called regardless if the request succeed or fails.


$.getJSON('http://hipsterjesus.com/api/')

.done(function(data) {
  $('body').append(data.text);
})
.fail(function() {
  $('body').append('<p>Oh no, something went wrong!</p>');
})
.always(function() {
  $('body').append('<p>I promise this will always be added!.</p>');
});



// With promises, the order of the callbacks is respected. We're guaranteed to have our done callback called first, then our fail callback, and finally our always callback.

// Better APIs
// Let's say we want to create a wrapper object for the HipsterJesus API. We'll add a method, html, to return the HTML data that comes down from the API. Rather than having this method take in a handler that's called when the request is resolved, we can just have the method return a promise object.

var hipsterJesus = {
  html: function() {
    return $.getJSON('http://hipsterjesus.com/api/').then(function(data) {
      return data.text;
    });
  }
};


// The cool thing about this is we can pass around our promise object without worrying about when or how it resolves its value. Any code that needs the return value of the promise can just register a callback with done.

// The then method allows us to modify the result of a promise and pass it to the next handler in the chain. This means we can now use our new API like this:


hipsterJesus.html().done(function(html) {
  $("body").append(html);
});

// Until recently, one of the killer features of AngularJS was that templates could bind directly to promises. In an Angular controller, this looked like:


$scope.hipsterIpsum = $http.get('http://hipsterjesus.com/api/');


// Then, it was as simple as writing {{ hipsterIpsum.text }} in a template. When the promise resolved, Angular would automatically update the view. Unfortunately, the Angular team has deprecated this feature. For now, it can be enabled by calling $parseProvider.unwrapPromises(true). I hope Angular and other frameworks include this feature going forward (I'm looking at you Ember).

// Chaining
// The best part about promises is you can chain them! Let's say we want to add a method to our API that returns an array of paragraphs.

var hipsterJesus = {

  html: function() {
    return $.getJSON('http://hipsterjesus.com/api/').then(function(data) {
      return data.text;
    });
  },

  paragraphs: function() {
    return this.html().then(function(html) {
      return html.replace(/<[^>]+>/g, "").split("");
    });
  }
};


// We've left our HTML method the same, and we're using it in the paragraphs method. Because the return value of a promise's callback is passed to the next callback in the chain, we're free to create small, functional methods that change the data as it's passed through them.

// We can chain promises as many times as we want. Let's add a method for sentences.

var hipsterJesus = {

  html: function() {
    return $.getJSON('http://hipsterjesus.com/api/').then(function(data) {
      return data.text;
    });
  },

  paragraphs: function() {
    return this.html().then(function(html) {
      return html.replace(/<[^>]+>/g, "").split("");
    });
  },

  sentences: function() {
    return this.paragraphs().then(function(paragraphs) {
      return [].concat.apply([], paragraphs.map(function(paragraph) {
        return paragraph.split(/. /);
      }));
    });
  }
};


// Multiple calls
// Probably the most notable feature of promises is the ability to combine multiple API calls. When using callbacks, what happens if you need to make two API calls at once? You'll probably end up writing something like this:

var firstData = null;
var secondData = null;

var responseCallback = function() {

  if (!firstData || !secondData)
    return;

  // do something
}

$.get("http://example.com/first", function(data) {
  firstData = data;
  responseCallback();
});

$.get("http://example.com/second", function(data) {
  secondData = data;
  responseCallback();
});

// With promises, this becomes much easier:

var firstPromise = $.get("http://example.com/first");
var secondPromise = $.get("http://example.com/second");

$.when(firstPromise, secondPromise).done(function(firstData, secondData) {
  // do something
});
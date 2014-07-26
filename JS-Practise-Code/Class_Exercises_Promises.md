$(function(){ // same as saying window.onload = ....

	// we can screw with the $ namespace...
	// $.getJSON = function(){
	// 	alert("Yea, well screw you");
	// }

	// jQuery API: http://api.jquery.com/
	// lodash API: http://lodash.com/

	// demonstrating that jQuery can get DOM elements
	document.querySelector('.profile'); // find .profile
	$('.profile'); // also finds .profile

	// just some variables
	var github_usernames = ["matthiasak", 'joeybergeron'];
	var github_url = "https://api.github.com/users/";

	// downloads the entire JSON text
	// github_data is a Promise
	window.github_data = $.getJSON(github_url + github_usernames[0]);

	// $ methods / functions
	//
	// $.get(url, {})
	// $.getJSON(url, {})
	//
	// $.ajax({
	//
	// })

	console.log(window.github_data);

	(window.github_data).fail(function(promise_obj, error_type, error_message){
		console.log("fail....", promise_obj.status, error_message);
	}).then(function(data, successMessage, promise_obj){
		console.log(data);
		console.log("IT'S SO FLUFFY!!!!");
		console.log("IT'S REALLY FLUFFY!!!!");
		console.log("IT'S REALLY FLUFFY!!!!");
		return data.login;
	}).then(function(data){
		// console logs the responseText
		console.log(data);
		// not returning data, so the next .then() will not get the data
	}).then(function(data){
		console.log(data);
	});



// 	OBJECT PROMISES

	// parallel downloads
	$.when(
		$.getJSON(github_url + github_usernames[0]),
		$.getJSON(github_url + github_usernames[1])
	).then(function(results_matt, results_joey){
		console.log(results_matt[0], results_joey[0])
		console.log("ALL DONE!")
	})


	// are we WINNING?
	// $.when...
	// maybe it should be $.WINNING ??
	// create a new property on $ "namespace" / "wrapper object"
	$.WINNING = $.when;

	$.WINNING(
		$.getJSON(github_url + github_usernames[0]),
		$.getJSON(github_url + github_usernames[1])
	).then(function(results_matt, results_joey){
		console.log("WINNING! Tiger's blood...")
	})



// VARIADIC BEHAVIOUR

	function sumAllNumbersonly(){
		var numbers = [].slice.call(arguments);
		var sum = 0;
		numbers.forEach(function(n){
		if(typeof n !== "numbers"){
			throw new Error ("Shuut");
	}
	});
		console.log(sum);
	}

	sumAllNumbersonly(1, , 2, 3, 4);
	sumAllNumbersonly(1, 2, 3, "a");



// ERROR CHECKING

	function sumWithErrorHandling(){
		try{
			sumAllNumbersonly(1, 2, 3, "a");
		} catch(e){
			alert('whoops');
		}
	}

	sumWithErrorHandling();

	function askForNumber(){
		var number = prompt("please provide a number:");
		try{ handleResponse(number);
		} catch (e){
			console.log(e, e.stack); //e is an object, e.stack is the sequence of events from the error
			askForANumber(); //recursion
		}
	}

	function handleResponse(number){
		number = parseFloat(number);
		if(typeof number !== "number" || Number.isNaN(number)){
			throw new Error ("Shuuut!");
		}
		alert ('You typed in '+number+'!');
	}

	askforNumber();

});

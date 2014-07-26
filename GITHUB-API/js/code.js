var i = 0;
var github_username = [];
//var person_info;

$(function() {
    update();
});

function update() {
    github_username = ["atroppe", "davidjfreedman", "joeybergeron", "Keya-Moradi", "khalidadil", "matthiasak", "robdesousa"];
    var github_url = "https://api.github.com/users/";

    var url = github_url + github_username[i];
    var person_info = $.getJSON(url);

    var html_templates = $('#mytemplate')[0].textContent;

    var fillTemplate = _.template(html_templates);

    person_info.then(function(data) {
        var github_html = fillTemplate(data);
        /*$(".dynamic").remove();*/
        $(".card").remove();
        $('body').append(github_html);
        return data;
    }).then(hireable).then(bindEventstoArrows);
};

function bindEventstoArrows() {
    	/*document.querySelector('.next_arrow').addEventListener('click', next_person);
    	document.querySelector('.prev_arrow').addEventListener('click', prev_person);*/
        document.querySelector('.triangle-right').addEventListener('click', next_person);
        document.querySelector('.triangle-left').addEventListener('click', prev_person);
}

function next_person() {
    if (i === github_username.length - 1) {
        i = 0;
    } else {
        i += 1;
    }
	update();
}

function prev_person() {
    if (i === 0) {
        i = (github_username.length - 1);
    } else {
        i -= 1;
    }
    update();
}

function hireable(data){
    if (data.hireable){
        $('.hire').html("<p>Ready to work!</p>");
    }
    else{
        $('.hire').html("<p>Hired already!</p>");
    }
}
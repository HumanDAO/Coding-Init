$(function() {

    var person = prompt("Pick your Github username from the list below:");

    var ImgBank = [
        'robdesousa',
        'Keya-Moradi',
        'Matthiasak',
        'KhalidAdil',
        'joeybergeron',
        'atroppe',
        'davidjfreedman',
        'graym'
    ];

    function pickuser(user) {
        var iuser = parseInt(user);
        console.log(iuser);
        if (typeof iuser === 'number' && iuser >= 0 && iuser <= (ImgBank.length - 1)) {
            console.log(ImgBank[iuser]);
            return ImgBank[iuser];
        } else {
            return (window.alert("Sorry, No such user exists!"));
        }
    }

    var url = "https://api.github.com/users/" + pickuser(person);

    //Extracts the Github JSON Document Object
    var github_data = $.getJSON(url);

    var Fn_Created_From_Template_Utility = _.template($('#github_profile')[0].textContent);

    //Puts the data from Github in the Template Function and inserts it in Card class.
    github_data.then(function(data_from_github) {
        $('body').append(Fn_Created_From_Template_Utility(data_from_github));


        var slideR = document.querySelector("#right");
        slideR.addEventListener('click', SlidePicR);

        var slideL = document.querySelector("#left");
        slideL.addEventListener('click', SlidePicL);

        var n = 0;

        function SlidePicR(change) {
            if (n < (ImgBank.length-1))
                n++;
            else
                n = 0;
            document.getElementById("profile").src = data_from_github["avatar_url"];
        }

        function SlidePicL(change) {
            if (n > 0)
                n--;
            else
                n = (ImgBank.length-1);
            document.getElementById("profile").src = data_from_github["avatar_url"];
        }

    });

});
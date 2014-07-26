$(function() {
    // setInterval(init, 1000);

    setInterval(function() {
        var time = new Date();
        time.setTime(time.getTime() + 1000);
        var onTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        // $('.Time')[0].innerText = onTime; //calls time.toString() behintime the scenes
        changeRGB(time);
    }, 1000);

    function changeRGB(time) {
        r = parseInt(time.getHours() / 24 * 255);
        g = parseInt(time.getMinutes() / 60 * 255);
        b = parseInt(time.getSeconds() / 60 * 255);

        var color = 'rgb(' + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
        document.getElementById('Time').style.backgroundColor = color;
       
    }

});

// function slideup() {
// //     document.getElementById('slideu').scrollIntoView();    
// // };

// var target = document.getElementById("slideu");
// target.parentNode.scrollTop = target.offsetTop;
// };
// function slidedown() {
//     document.getElementById('slided').scrollIntoView();
//     window.setTimeout( function () { slideup(); }, 2000 );
// };

// slidedown();

// });
window.onload = app;

function Counter(){
	this.h1 = document.querySelector('h1');
    this.startButton = document.querySelector('#start');
  	this.stopButton = document.querySelector('#stop');
  	this.handleEvents();
}

Counter.prototype.handleEvents = function(){
    var self = this;
    this.startButton.addEventListener('click', function(){
        self.start();
    });
    this.stopButton.addEventListener('click', function(){
        self.stop();
    });
}

Counter.prototype.start = function(){
    console.log(this.isCounting)
  	var self = this;
    if(this.isCounting) {
      return;
    }
  	// set running to ...
    this.isCounting = setInterval(function(){
        self.count();
    }, 1000);
}

Counter.prototype.stop = function(){
  	console.log(this.isCounting)
    if(!this.isCounting){
        return;
    }
  	// set running to ...
    clearInterval(this.isCounting);
    this.isCounting = false;
}

Counter.prototype.count = function(){
  var d = new Date(),
      h = d.getHours(),
      m = d.getMinutes(),
      s = d.getSeconds(),
      times = [h, m, s];
  
  this.printTime(times);
}

Counter.prototype.printTime= function(times){
  this.h1.textContent = times.join(':');
  document.body.style['background-color'] = 'rgb(' + this.convertToRGB(times[0], times[1], times[2]).join(',') + ')';
}

Counter.prototype.convertToRGB = function (h, m, s){
  var r = Math.round(h / 24 * 255);
  var g = Math.round(m / 60 * 255);
  var b = Math.round(s / 60 * 255);
  return [r,g,b];
}

function app(){
  var c = new Counter();
}

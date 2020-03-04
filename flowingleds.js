var Gpio = require('onoff').Gpio;
var leds = [
	new Gpio(4,'out'),
	new Gpio(17,'out'),
	new Gpio(27,'out'),
	new Gpio(22,'out')];
var indexCount = 0;
var dir = "up";
var flowInterval = setInterval(flowingLeds,100);
function flowingLeds(){
	leds.forEach(function(currentValue){
		currentValue.writeSync(0);
	});
	if(indexCount == 0) dir = "up";
	if(indexCount >= leds.length) dir = "down";
	if(dir == "down") indexCount--;
	leds[indexCount].writeSync(1);
	if(dir == "up") indexCount++;
};
function unexportOnClose(){
	clearInterval(flowInterval);
	leds.forEach(function(currentValue){
		currentValue.writeSync(0);
		currentValue.unexport();
	});
};
process.on('SIGINT',unexportOnClose);

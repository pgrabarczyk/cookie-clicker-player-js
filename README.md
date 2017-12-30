# cookie-clicker-player-js
Autoplay scripts for game "cookie clicker" //http://orteil.dashnet.org/cookieclicker/

Fast description:
- buyUpgrades() - buying upgrades for all money
- buyProducts() - buying products for all money (from most expensive to the chepests)
- checkExtras() - checking is golden cookie or other extra is visible, if so then activate it
- play() - use all functions to autoplay

All you need is just paste javascript code into browser console.

The fastest way is to copy-paste this script onto your broweser console:
```
var scriptTag = document.createElement('script');
scriptTag.src = "https://rawgit.com/pgrabarczyk/cookie-clicker-player-js/master/play.js";
document.body.appendChild(scriptTag);
```

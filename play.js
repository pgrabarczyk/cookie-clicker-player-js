// GENERAL
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var cookie = document.getElementById("bigCookie");

// BUY PRODUCT
const maxProductId = 14;

function getMostExpensiveUnclockedProductId() {
	var products = document.getElementsByClassName("product unlocked");
	var lastProductId = products.length-1;	
	return lastProductId;
}

function getMostExpensiveProductId() {
	var products = document.getElementsByClassName("product unlocked enabled");
	var lastProductId = products.length-1;
	return lastProductId; 
}

function isMakeSenseToUpgradeProduct() {
	var productId = getMostExpensiveProductId();
	return isProductOwnedLessThan(productId);
}

function isProductOwnedLessThan(productId, threshold = 31) {
	if( productId === maxProductId ) {
		return true;
	}
	var productOwned = document.getElementById("productOwned" + productId);
	return (productOwned.innerHTML < threshold);
}

async function buyProducts(sleepTime = 1) {
	while( getMostExpensiveProductId() != -1 && ( maxProductId === getMostExpensiveUnclockedProductId() || isMakeSenseToUpgradeProduct()) ) {
		var productId = "product" + getMostExpensiveProductId();
		var product = document.getElementById(productId);
		product.click();
		await sleep(sleepTime);
	}
}

// BUY UPGRADES

async function buyUpgrades(sleepTime = 1) {
	var upgrades = document.getElementById("upgrades");
	for( i=0; i< upgrades.childNodes.length ; i++) {
		var upgrade = upgrades.childNodes[i];
		if( upgrade.classList.contains("enabled") ) {
			upgrade.click();
			await sleep(sleepTime);
			buyUpgrades();
			break;
		}
	}
}

// EXTRAS

async function checkExtras(sleepTime = 1) {
	var extras = document.getElementById('shimmers');
	if( extras.childNodes.length > 0 ) {
		for(i=0;i<extras.childNodes.length;i++) {
			var element = extras.childNodes[i];
			console.log('Found shimmer :-)');
			element.click();
			await sleep(sleepTime);
		}
	}
}

// PLAY

async function play(loopTimes = 100, sleepTime = 1) {
	
	while(true) {
	
		for(i=0;i<loopTimes;i++) {
			cookie.click();
			await sleep(sleepTime);
			checkExtras();
		}
		
		buyUpgrades();
		buyProducts();
	}
}

play()

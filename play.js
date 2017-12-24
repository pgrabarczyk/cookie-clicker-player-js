function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var cookie = document.getElementById("bigCookie");

function buyUpgrade() {
	var firstUpgrade = document.getElementById("upgrade0");
	firstUpgrade.click()
}

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
	var productOwned = document.getElementById("productOwned" + productId);
	console.log(productOwned.innerHTML)
	return (productOwned.innerHTML < threshold)
}

async function buyProducts(sleepTime = 1) {
	while( getMostExpensiveProductId() != -1 && isMakeSenseToUpgradeProduct() ) {
		var productId = "product" + getMostExpensiveProductId();
		var product = document.getElementById(productId);
		product.click();
		await sleep(sleepTime);
	}
}

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

async function play(loopTimes = 10000, sleepTime = 1) {
	
	while(true) {
	
		for(i=0;i<loopTimes;i++) {
			//console.log('click');
			cookie.click();
			await sleep(sleepTime);
			checkExtras();
		}
		
		buyUpgrade();
		buyProducts();
	}
}
play()


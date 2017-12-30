// GENERAL
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var cookie = document.getElementById("bigCookie");

// BUY PRODUCT

function getMostProfitableProduct() {
	var maxProfitProductId = getMostExpensiveUnclockedProductId();
	var maxProfitRatio = getProfitRatio(maxProfitProductId);

	for(i=0; i< maxProfitProductId; i++) {
		var tmpProfitRatio = getProfitRatio(i);
		if( maxProfitRatio > tmpProfitRatio) {
			maxProfitRatio = tmpProfitRatio;
			maxProfitProductId = i;
		}
	}
	return maxProfitProductId;
}

function getProfitRatio(productId) {
	return getPriceForProduct(productId) / cookiesPerProduct(productId) ;
}

function getPriceForProduct(productId) {
	return Game.ObjectsById[productId].price;
}

function cookiesPerProduct(productId) {



	Game.Toggle('format','formatButton','Short numbers OFF','Short numbers ON','0')

	var tooltip = Game.ObjectsById[productId].tooltip();
	tooltip = tooltip.replace(/&bull;/g,'');

	var parser = new DOMParser();

	var tooltipDOM = parser.parseFromString(tooltip , "text/xml");

	var children = tooltipDOM.childNodes[0].childNodes;
	for( i=0; i< children.length; i++) {

		if( children[i].tagName === 'div' && children[i].classList.contains("data") ) {
			var stringToCut = children[i].innerHTML;
			stringToCut = stringToCut.substring(3 + stringToCut.search("<b>") );
			stringToCut = stringToCut.substring(0, stringToCut.search("</b>") );
			stringToCut = stringToCut.replace(/,/g,'');
			return parseInt(stringToCut);
		}

	}



	Game.Toggle('format','formatButton','Short numbers OFF','Short numbers ON','1');
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
	const maxProductId = 14;
	if( productId === maxProductId ) {
		return true;
	}
	var productOwned = document.getElementById("productOwned" + productId);
	return (productOwned.innerHTML < threshold);
}

async function buyProducts(sleepTime = 1) {
	while( getMostExpensiveProductId() != -1 && isMakeSenseToUpgradeProduct() ) {
		var productId = "product" + getMostExpensiveProductId();
		var product = document.getElementById(productId);
		product.click();
		await sleep(sleepTime);
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

async function play(loopTimes = 10000, sleepTime = 1) {
	
	while(true) {
	
		for(i=0;i<loopTimes;i++) {
			//console.log('click');
			cookie.click();
			await sleep(sleepTime);
			checkExtras();
		}
		
		buyUpgrades();
		buyProducts();
	}
}

play()

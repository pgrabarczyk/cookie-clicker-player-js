// GENERAL
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var cookie = document.getElementById("bigCookie");

// MANUAL LOAD bigint lib: https://raw.githubusercontent.com/silentmatt/javascript-biginteger/master/biginteger.js

// BUY PRODUCT

function getMostProfitableProductId() {

	var lastId = getMostExpensiveUnclockedProductId();
	if( lastId === -1) return -1;

	var maxProfitProductId = lastId;
	var maxProfitRatio = getProfitRatio(maxProfitProductId);
//	printProductIdAndValue(maxProfitProductId, maxProfitRatio);
	for(a=0; a < lastId; a++) {
		var tmpProfitRatio = getProfitRatio(a);
//		printProductIdAndValue(a, tmpProfitRatio );
		if( maxProfitRatio.compare( tmpProfitRatio ) < 0) {
			maxProfitRatio = tmpProfitRatio;
			maxProfitProductId = a;
		}
	}
//	printProductIdAndValue("MAX" + maxProfitProductId , maxProfitRatio);
	return maxProfitProductId;
}

function printProductIdAndValue(productId, value) {
	console.log(productId + " = " + value.toString() );
}

function getProfitRatio(productId) { //if bigger than less profitable
	var cookiesPerProduct = getCookiesPerProduct(productId);
	var priceForProduct = getPriceForProduct(productId);
//	printProductIdAndValue("COST " + productId, priceForProduct  );
//	printProductIdAndValue("GENE " + productId, cookiesPerProduct );
	if( cookiesPerProduct.compare(BigInteger.ZERO) === 0 ) return 0;
	return priceForProduct.divide( cookiesPerProduct );
}

function getPriceForProduct(productId) {
	return BigInteger(Game.ObjectsById[productId].price);
}

function getCookiesPerProduct(productId) {
	//Game.Toggle('format','formatButton','Short numbers OFF','Short numbers ON','0')

	var tooltip = Game.ObjectsById[productId].tooltip();
	tooltip = tooltip.replace(/&bull;/g,'');

	var parser = new DOMParser();
	var tooltipDOM = parser.parseFromString(tooltip , "text/xml");
	var children = tooltipDOM.childNodes[0].childNodes;

	var result = BigInteger(1);
	for( i=0; i< children.length; i++) {

		if( children[i].tagName === 'div' && children[i].classList.contains("data") ) {
			var stringToCut = children[i].innerHTML;
			stringToCut = stringToCut.substring(3 + stringToCut.search("<b>") );
			stringToCut = stringToCut.substring(0, stringToCut.search("</b>") );
			stringToCut = stringToCut.replace(/,/g,'');
			result = BigInteger(stringToCut);
			break;
		}

	}

	//Game.Toggle('format','formatButton','Short numbers OFF','Short numbers ON','1');
	return result;
}


function getMostExpensiveUnclockedProductId() {
	var products = document.getElementsByClassName("product unlocked");
	var lastProductId = products.length-1;	
	return lastProductId;
}

function canBuyProduct(productId) {
	var product = document.getElementById("product" + productId);
	return product.classList.contains("enabled");
}

async function buyProducts(sleepTime = 1) {
	var mostProfitableProductId = getMostProfitableProductId();
	if( mostProfitableProductId === -1) return false;
	while( canBuyProduct(mostProfitableProductId ) ) {
		var product = document.getElementById("product" + mostProfitableProductId );

		product.click();
		await sleep(sleepTime);

		mostProfitableProductId = getMostProfitableProductId();
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

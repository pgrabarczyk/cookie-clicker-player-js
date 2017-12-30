function getMostProfitableProduct() {
	//TODO iterate of all unlocked and calculate var cashPerCookie = getPriceForProduct / cookiesPerProduct;
}

function getPriceForProduct(productId) {
	return Game.ObjectsById[productId].price;
}

function cookiesPerProduct(productId) {
	var tooltip = Game.ObjectsById[productId].tooltip();
	tooltip = tooltip.replace(/&bull;/g,'');

	var parser = new DOMParser();
	var tooltipDOM = parser.parseFromString(tooltip , "text/xml");

	var children = tooltipDOM.childNodes[0].childNodes;
	for( i=0; i< children.length; i++) {
		if( children[i].tagName === 'div' && children[i].classList.contains("data") ) {
			console.log( children[i] );
			//TODO cut price from text then return as var
		}
	}
}

cookiesPerProduct(0);

function getMostProfitableProduct() {
	//TODO
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
			console.log( children[i] );
			var stringToCut = children[i].innerHTML;
			stringToCut = stringToCut.substring(3 + stringToCut.search("<b>") );
			stringToCut = stringToCut.substring(0, stringToCut.search("</b>") );
			stringToCut = stringToCut.replace(/,/g,'');
			return parseInt(stringToCut);
		}

	}



	Game.Toggle('format','formatButton','Short numbers OFF','Short numbers ON','1');
}

 function createCart() {

    if( sessionStorage.getItem('cart') == null ) {
        console.log("hi")
        var cart = {};
        cart.items = [];

        sessionStorage.setItem( 'cart', JSON.stringify( cart ) );
        sessionStorage.setItem( 'total', "0" );
    }
}

function processAddToCart(item) {
    var cart = sessionStorage.getItem( 'cart' );
    var cartObject = JSON.parse( cart );
    var cartCopy = cartObject;
    var items = cartCopy.items;
    items.push( item );
    console.log(cartCopy);
    sessionStorage.setItem( 'cart', JSON.stringify( cartCopy ) );
}

function addToCart(data) {
    //Total cost
    var total = parseInt(sessionStorage.getItem('total'));
    total += parseInt(data.price);
    sessionStorage.setItem('total', total);
    console.log(total)

    var cart = JSON.parse(sessionStorage.getItem( 'cart' )).items;
    var currentAmount = 1;
    for (var i = 0; i < cart.length; i++) {
        var obj = cart[i];
        if (obj.name == data.name) {
            currentAmount += parseInt(obj.amount);
        }
    }

    processAddToCart(
        {
            name: data.name,
            price: data.price,
            colour: data.colour,
            amount: parseInt(currentAmount)
        }
    )
}
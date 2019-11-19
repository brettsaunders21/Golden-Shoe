 function createCart() {

    if( sessionStorage.getItem('cart') == null ) {
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
    sessionStorage.setItem( 'cart', JSON.stringify( cartCopy ) );
}

function addToCart(data) {
    //Total cost
    var total = parseInt(sessionStorage.getItem('total'));
    total += parseInt(data.price);
    sessionStorage.setItem('total', total);

    var cartobj = JSON.parse(sessionStorage.getItem( 'cart' ));
    var cart = cartobj.items
    var add = true;
    for (var i = 0; i < cart.length; i++) {
        var obj = cart[i];
        if (obj.name == data.name) {
            add = false;
            var copy = cartobj;
            copy.items[i].amount += 1;
            sessionStorage.setItem('cart',JSON.stringify(copy));
        }
    }

    if (add) {
        processAddToCart(
            {
                name: data.name,
                price: data.price,
                colour: data.colour,
                amount: 1,
                size: 4
            }
        )
    }
}

function displayCart() {
    var cartobj = JSON.parse(sessionStorage.getItem( 'cart' ));
    var items = cartobj.items;
    var amount = 0;

    items.forEach(function(item) {
        amount +=1;
        var details = $(' <a href="javascript:void(0);" onclick="selected(\''+item.name+'\');" class="list-group-item list-group-item-action flex-column align-items-start">' +
            ' <div class="d-flex w-100 justify-content-between">' +
            '<h5 class="mb-1" style="font-size: xx-large">'+ item.name +'</h5>' +
            '<small style="font-size: x-large">x'+ item.amount +'</small>' +
            '</div>' +
            '<p class="mb-1" style="font-size: large ">Price: £'+ item.price +'.00.</p>' +
            ' <small style="font-size: medium">Colour: ' + item.colour +'</small>' +
            '<br/>' +
            '<small style="font-size: medium">Size: '+ item.size +'</small>' +
            '</a>');
        details.appendTo('#checkout')
    });
    if (amount == 0) {
        var details = $('<br/><br/><br/><h5 style="text-align: center">There are no items in your cart. Please add some before you checkout!</h5><br/><br/><br/><br/>');
        details.appendTo('#checkout')
    }
}

function removeFromCart(item) {
    var cartobj = JSON.parse(sessionStorage.getItem( 'cart' ));
    var cartcopy = cartobj;
    for (var i = 0; i < cartcopy.items.length; i++) {
        if (cartcopy.items[i].name == item) {
            var total = parseInt(sessionStorage.getItem('total'));
            total = total - cartcopy.items[i].price;
            sessionStorage.setItem('total',total);
            if (cartcopy.items[i].amount > 1) {
                cartcopy.items[i].amount -= 1;
            } else {
                cartcopy.items.splice(i,1);
            }
        }
    }
    sessionStorage.setItem('cart',JSON.stringify(cartcopy));
}
function addtocart(id) {
    alert(id);
    $.ajax({
        "url": "/product/addcart",
        "method": "GET",
        "data":{id: id}
    }).done(function(response) {
        console.log(response);
        $("#subtotal").html('$' + response.subtotal);
        $("#estotal").html('$' + (parseFloat(response.subtotal)+5));
        $("#spannoofitem").html("(" + response.noofitem + " items)");

        $("#inccart").html(response.carthtml);
        $("#cartwnd").css("opacity", "1");
    })
}

function removeItem(self, id) {
    //alert(id);
    let removeddiv = $(self).parent().parent().parent();
    console.log(removeddiv.html());
    removeddiv.remove();
    
    $.ajax({
        "url": "product/removeitem",
        "method": "GET",
        "data":{id: id}
    }).done(function(response){
        console.log(response);
        $("#spannoofitem").html("(" + response.noofitem + " items)");
        $("#subtotal").html(response.subtotal);
    })
    
}

function removeItem(self, id) {
    //alert(id);
    let removeddiv = $(self).parent().parent().parent();
    console.log(removeddiv.html());
    removeddiv.remove();
    alert(2);
    $.ajax({
        "url": "product/removeitem",
        "method": "GET",
        "data":{id: id}
    }).done(function(response){
        console.log(response);
        $("#spannoofitem").html("(" + response.noofitem + " items)");
        $("#subtotal").html(response.subtotal);
    })
    
}

function changeQuantity(self, id, num) {
    
    $.ajax({
        "url": "changequantity",
        "method": "GET",
        "data":{id: id, num: num}
    }).done(function(response){
        alert("changeQuantity done");
        console.log(response);
        $("#spannoofitem").html("(" + response.noofitem + " items)");
        $("#subtotal").html(response.subtotal);
        $("#estotal").html('$' + (parseFloat(response.subtotal)+5));
        if(response.action == "remove") {
            let removeddiv = $(self).parent().parent().parent();
            console.log(removeddiv.html());
            removeddiv.remove();
        } else {
            console.log($(self).parent().children('span').html());
            $(self).parent().children('span').html(response.newquantity);
        }
    })       
       
}

function closeCart(){
    $("#cartwnd").css("opacity", "0");
}
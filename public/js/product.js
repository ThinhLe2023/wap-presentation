function addtocart(id) {
    $.ajax({
        "url": "/product/addcart",
        "method": "GET",
        "data":{id: id}
    }).done(function(response) {
        console.log(response);
        $("#subtotal").html('$' + response.subtotal);
        $("#estotal").html('$' + (parseFloat(response.subtotal)+5));
        $("#spannoofitem").html("(" + response.noofitem + " items)");
        $(".cartlength").html(response.noofitem);

        $("#inccart").html(response.carthtml);
        $("#cartwnd").css("visibility", "visible");
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
        $(".cartlength").html(response.noofitem);
    })
    
}

function changeQuantity(self, id, num) {
    
    $.ajax({
        "url": "changequantity",
        "method": "GET",
        "data":{id: id, num: num}
    }).done(function(response){
        console.log(response);
        $("#spannoofitem").html("(" + response.noofitem + " items)");
        $("#subtotal").html(response.subtotal);
        $("#estotal").html('$' + (parseFloat(response.subtotal)+5));
        $(".cartlength").html(response.noofitem);
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
    $("#cartwnd").css("visibility", "hidden");
}

$(function() {
    $("#smallimgs div img")
        .mouseover(function() { 
            $("#smallimgs div img").each(function(i, ele) {
                $(ele).parent().css("border-color", "#fff");
            })
            $(this).parent().css("border-color", "blue");
            let src = $(this).attr("src");
            //alert(src);
            $("#mainimg").attr("src", src);
        
        })
        .mouseout(function() {
            let mainimg = $("input[name='mainimg']").val();
            $("#mainimg").attr("src", mainimg);
            $("#smallimgs div img").each(function(i, ele) {
                if($(ele).attr("src") == mainimg) {
                    $(ele).parent().css("border-color", "blue");
                } else {
                    $(ele).parent().css("border-color", "#fff");
                }
            })
        })
        .click(function() {
            let src = $(this).attr("src");
            $("#mainimg").attr("src", src);
            $("input[name='mainimg']").val(src);
            $(this).parent().css("border-color", "blue");
        });
   });

   function saveOrder() {
    $.ajax({
        "url": "/product/saveorder",
        "method": "GET",
        "data":{contact: $("#contactInfoId").val()}
    }).done(function(response) {
        $('#ordercart').css('display', 'none');
        $("#ordermsg").html("Thank you for shopping with us");
        $('#msg').css('display', '');
        $(".menu-quantity").css("display", "none");
        $("#btnorder").css("display", "none");
        $(".cartlength").html(response.noofitem);
        
        console.log(response);       
    })
   }
function refreshProducts(loading) {
  if(loading.length == 1 && loading[0].id ==='loadingId'){
    $.ajax({
      'url': "/allProducts",
      'type': 'GET',
      'data': {},
      'success': handleSuccessFn,
      'error': handleErrorFn
    });
  }
}

function handleSuccessFn(data) {
  let html = '';
  console.log(data);
  if(Array.isArray(data)){
    for (const item of data) {
      html += '<article class="card product-item" style="width: 400px; padding-top: 20px;"><header class="card__header">';
      html += '<h1 class="product__title">' + item.title;
      html += '</h1></header><div class="card__image">';
      html += '<img src="' + item.imageUrl[0] + '" alt="A' + item.title + '">';
      html += '</div> <div class="card__content"> <h2 class="product__price"> $' + item.price;
      html += '</h2><p class="product__description">' + item.description;
      html += '</p> </div> <div class="card__actions">  <button class="btn" onclick="addToCart(\''+ item._id +'\')">Add to Cart</button> </div>';
      html += '</article>';
    }
  }

  $('#loadingId').css('display', 'none');
  $('#productContainer').html(html);
}

function handleErrorFn(shr, error, message) {
  alert(message);
}

// function searchProductByName() {
//   let text = $('#searchTextId').val();
//   //console.log(text);
//   $.ajax({
//     'url': "/getProductByName/" + text,
//     'type': 'GET',
//     'data': {},
//     'success': handleSuccessFn,
//     'error': handleErrorFn
//   });
// }


function addToCart(itemId){
  $.ajax({
    'url': "/product/addcart",
    'type': 'GET',
    "data":{id: itemId},
    'success': function() {alert('Added Successful!!!')},
    'error': function() {alert('Added Failed!!!')}
  });
}

let timoutId;
function searchText(input) {
  let text = $(input).val();
  if(text.length > 0) {
    $("#searchResult").show();
    $("#searchLoading").show();
    if(timoutId) {
      clearTimeout(timoutId);
    }
    timoutId = setTimeout(() => {
      $.ajax({
        'url': "/getProductByName/" + text,
        'type': 'GET',
        'data': {},
        'success': (data) => {
          $("#searchLoading").hide();
          let html = ''
          for(obj of data) {
            html += '<div class="searchContainItem">';
            html += '<a href="/product/detail?id='+obj._id+'"> <img src="/'+obj.imageUrl[0]+'" style="width: 70px;"/> </a>';
            html += '<div>';
            html += '<p style="color: blue;">'+ obj.title +'</p>';
            html += '<p style="color: red;" >Price : '+obj.price+' $</p>';
            html += '</div>';
            html += '</div>';
          }
          $("#searchContain").html(html);
        },
        'error': handleErrorFn
      });
    }, 300);
  } else {
    $("#searchResult").hide();
    $("#searchContain").html('');
  }
}

$(document).ready(() => {
  $("#searchResult").hide();
});
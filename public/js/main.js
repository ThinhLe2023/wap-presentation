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
      html += '</h1></header><div class="card__image" onclick="forwardToProductDetail({id: `'+item._id+'`})">';
      if(!item.imageUrl) {item.imageUrl = [`images/download.png`];}
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

function searchProductByName() {
  let text = $('#searchTextId').val();
  //console.log(text);
  $.ajax({
    'url': "/getProductByName/" + text,
    'type': 'GET',
    'data': {},
    'success': handleSuccessFn,
    'error': handleErrorFn
  });
}


function addToCart(itemId){
  $.ajax({
    'url': "/product/addcart",
    'type': 'GET',
    "data":{id: itemId},
    'success': function() {alert('Added Successful!!!')},
    'error': function() {alert('Added Failed!!!')}
  });
}

function pullDataFromWalmart(category,url){
  console.log('url' , url);
  $.ajax({
    'url': url,
    'type': 'GET',
    "data":{},
    'headers':{
      "authority":"www.walmart.com",
      'accept':'application/json',
      'accept-language':'en-US',
      'content-type':'application/json',
      'device_profile_ref_id':'USe_YTOogOp7zFh0kIr8Kx9DL8jpHBMMHo6R',
      'wm_qos.correlation_id':'K0zFt24W2z9vC7Lh_p0s1_kpw_cIOORmAqGu',
      'x-apollo-operation-name':'Deals',
      'x-o-bu':'WALMART-US',
      'x-o-correlation-id':'K0zFt24W2z9vC7Lh_p0s1_kpw_cIOORmAqGu',
      'x-o-gql-query':'query Deals',
      'x-o-mart':'B2C',
      'x-o-platform':'rweb',
      'x-o-platform-version':'us-web-1.114.0-9de3e781c23dceb65ff4fca56388d3906b82cb68-0206',
      'x-o-segment':'oaoh'
    },
    'success': (data) => handleWalmartData(category, data),
    'error': handleErrorFn
  });
}

function handleWalmartData(categoryId, walmart){
  let rs = walmart.data.search.searchResult.itemStacks[0].itemsV2;
  for (const item of rs) {
    // let images = [];
    // images.push(item.imageInfo.thumbnailUrl.split('jpeg')[0] + 'jpeg');
    let desc = item.shortDescription.split('</li>')[0].replace('<li>', '');
    let body = {
      walmart_id:item.usItemId,  title : desc,price : item.priceInfo.currentPrice.price,
      discount : 5, description: item.name ,category:categoryId, files : item.imageInfo.thumbnailUrl.split('jpeg')[0] + 'jpeg' }
    console.log(body);
    $.ajax({
      'url': "/admin/product",
      'type': 'POST',
      'data': body,
      'success': function() {console.log('success')},
      'error': function() {console.log('failed')}
    });
  }
}


function forwardToProductDetail(itemId) {
  $(location).attr('href', "/product/detail?id="+itemId.id);
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
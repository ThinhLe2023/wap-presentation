const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

//backdrop.addEventListener('click', backdropClickHandler);
//menuToggle.addEventListener('click', menuToggleClickHandler);

function filterProduct(category) {
  console.log('filterProduct');
  $('#productContainer').html('');
  $.ajax({
    'url': "/filter/" + category,
    'type': 'GET',
    'data': {},
    'success': handleSuccessFn,
    'error': handleErrorFn
  });
}

function handleSuccessFn(data) {
  let html = '<article class="card product-item" style="width: 400px; padding-top: 20px;"><header class="card__header">';
  for (const item of data) {
    console.log(item.title, JSON.stringify(item));
    //let item = {"_id":1,"title":"iphone 1","price":14.5,"discount":5,"description":"FORGED IN TITANIUM.","category":1,"imageUrl":["https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg","https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg"]};               
    html += '<h1 class="product__title">' + item.title;
    html += '</h1></header><div class="card__image">';
    html += '<img src="' + item.imageUrl[0] + '" alt="A' + item.title + '">';
    html += '</div> <div class="card__content"> <h2 class="product__price">' + item.price;
    html += '</h2><p class="product__description">' + item.description;
    html += '</p> </div> <div class="card__actions">  <button class="btn">Add to Cart</button> </div>';
  }
  html += '</article>';
  $('#productContainer').html(html);
}

function handleErrorFn(shr, error, message) {
  alert(message);
}
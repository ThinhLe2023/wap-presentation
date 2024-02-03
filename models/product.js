const getDb = require('../util/database').getDb;
const listProduct = [];

class Product {
    constructor(title, price, discount, description,category, imageUrl) {
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
    }
    save() {
        const db = getDb();
        db.collection('products').insertOne(this).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }
    static getAllProduct() {
        return listProduct;
    }

    static getAllProductByCategory(category) {
        return listProduct.filter((ele) => {
            return ele.category == category;
        });
    }
}

listProduct.push(new Product('iphone 1',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',1,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 2',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',1,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 3',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',2,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 4',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',2,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 5',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',3,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 6',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',3,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 7',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',4,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 8',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',4,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 9',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',4,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));
listProduct.push(new Product('iphone 10',14.5, 5.0,'FORGED IN TITANIUM - iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back.',4,['https://nhadepso.com/wp-content/uploads/2023/02/hinh-nen-hoa-huong-duong-dep-cho-dien-thoai_1-768x1707.jpg', 'https://i.pinimg.com/1200x/57/b6/ac/57b6ac33b262f70e245c426ca70453c2.jpg'] ));

module.exports = Product;
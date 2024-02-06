const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, discount, description,category, imageUrl, id) {
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
        this._id = id;
    }
    save() {
        const db = getDb();
        let objDB = db;
        if (this._id) {
            this._id = new mongodb.ObjectId(this._id);
            objDB = db.collection('products')
                      .updateOne({_id : this._id}, {$set: this});
        } else {
            objDB = db.collection('products').insertOne(this);
        }
        return objDB.then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    }
    static getAllProduct() {
        const db = getDb();
        return db.collection('products').find().toArray().then(products => {
            console.log(products);
            return products;
        }).catch( e => {
            console.log(e);
        });
    }

    static getAllProductByCategory(category) {
        const db = getDb();
        return db.collection('products').find({'category': category}).toArray().then(products => {
            //console.log(products);
            return products;
        }).catch( e => {
            console.log(e);
        });
    }

    static getAllProductByTitle(title) {
        const db = getDb();
        return db.collection('products').find({'title': new RegExp(title, 'i')}).toArray().then(products => {
            //console.log(products);
            return products;
        }).catch( e => {
            console.log(e);
        });
    }
    static getProductById(id) {
        const db = getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next().then(product => {
            console.log(product);
            return product;
        }).catch( e => {
            console.log(e);
        });
    }
    static deleteById(id) {
        const db = getDb();
            return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
        .then(result => {
            //console.log(result);
            return result;
        }).catch( e => {
            console.log(e);
            return e;
        });
    }
 }
 
module.exports = Product;

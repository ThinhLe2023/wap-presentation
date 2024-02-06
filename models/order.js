const mongodb = require('mongodb');
const Product = require('./product');
const getDb = require('../util/database').getDb;
const collectionName = 'orders'

class Order {
    // list product with just ID and amount
    constructor(contactInfo, listProduct) {
        this.contactInfo = contactInfo;
        this.products = [];
        if (listProduct.length > 0) {
            for(let product of listProduct) {
                this.products.push({ proId : new mongodb.ObjectId(product._id), amount: product.amount});
            }
        }
    }
    save() {
        const db = getDb();
        return db.collection(collectionName).insertOne(this).then(result => {
            console.log(result);
            return result;
        }).catch(e => {
            console.log(e);
        });
    }
    static async getAllOrders() {
        const db = getDb();
        let orders = await db.collection(collectionName).find().toArray();
        for( let order of orders) {
            for (let idx = 0 ; idx < order.products.length; idx ++) {
                let proInfo = await Product.getProductById(order.products[idx].proId.toString());
                order.products[idx] = {...proInfo, amount: order.products[idx].amount};
            }
        }
        return orders;
    }

    static deleteById(id) {
        const db = getDb();
            return db.collection(collectionName).deleteOne({_id: new mongodb.ObjectId(id)})
        .then(result => {
            //console.log(result);
            return result;
        }).catch( e => {
            console.log(e);
            return e;
        });
    }
}
module.exports = Order;
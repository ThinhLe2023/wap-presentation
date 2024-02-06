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
    static getAllOrders() {
        const db = getDb();
        return db.collection(collectionName).find().toArray()
                .then(orders => orders)
                .then( (orders) =>
                    {
                        // console.log(orders);
                         let resultOrder = [];
                         for (let order of orders) {
                             resultOrder.push(
                                 {_id : order._id, products: order.products.map(e => {
                                     return Product.getProductById(e.proId.toString()).then( obj => {
                                         let result = {...obj, amount: e.amount};
                                         return result;
                                     });
                                 }) }
                             );
                         }
                         console.log(' adsfasdfasdf asdfasdfasdf ==============',resultOrder);
                         return resultOrder;
                     }
                )
                .catch( e => {
            console.log(e);
        });
    }
}
module.exports = Order;
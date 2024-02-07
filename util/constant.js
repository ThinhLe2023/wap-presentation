const {v4 : uuidv4} = require('uuid')

exports.category =  [{id : '1', name : "Phones"},
                    {id : '2', name : "Laptops"}, 
                    {id : '3', name : "Accessories"}, 
                    {id : '4', name : "Others"} ];
exports.adminLogin = [{username: 'user1', password: '12345678', cookies: uuidv4()},
                    {username: 'user2', password: '12345678', cookies: uuidv4()}];

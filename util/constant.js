const {v4 : uuidv4} = require('uuid')

exports.category =  [{id : '1', name : "prdocut type 1"},
                    {id : '2', name : "prdocut type 2"}, 
                    {id : '3', name : "prdocut type 3"}, 
                    {id : '4', name : "prdocut type 4"} ];
exports.adminLogin = [{username: 'user1', password: '12345678', cookies: uuidv4()},
                    {username: 'user2', password: '12345678', cookies: uuidv4()}];

const userList = require('../util/constant').adminLogin;
exports.login = (req, res, next) => {
    console.log(userList);
    if (req.method == 'POST') {
        let username = req.body.username;
        let password = req.body.password;
        // check had set username and password
        
        if(username && password) {
            let user = userList.filter((e) => e.username == username && e.password == password)
            if (user.length > 0) {
                res.redirect('/admin/home');
            } else {
                res.render('login', {error: 'Username or password is incorrect!'})
            }
        } else {
            res.redirect('back');
        }
    } else {
        res.render('login', {error: ''});
    }
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}
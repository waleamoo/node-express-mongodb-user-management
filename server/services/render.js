const axios = require('axios'); // allow us to make a get request 

exports.homeRoutes = (req, res) => {
    axios.get("http://localhost:3000/api/users")
        .then(function(response){
            // console.log(response); // gives full details about response 
            res.render('index', { users : response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_user = (req, res) => {
    res.render('add_user')
}

exports.update_user = (req, res) => {
    axios.get("http://localhost:3000/api/users", { params : { id : req.query.id }})
        .then(function(userdata){
            res.render('update_user', { user : userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}





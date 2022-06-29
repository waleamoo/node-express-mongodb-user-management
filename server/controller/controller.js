var Userdb = require('../model/model');
// create and save new user 
exports.create = (req, res) => {
    // validate request 
    if (!req.body) {
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }
    // new user 
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })
    // save user in the database 
    user
        .save(user)
        .then(data => {
            res.redirect('/add-user');
            // res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Some error occurred while creating a create operation"});
        });
}
// retrieve and return all user / retrive and return a single user 
exports.find = (req, res) => {
    if (req.query.id) { // localhost:3000/api/users?id=rnfh8590030
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message : `User with id ${id} not found`})
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send(`Error retrieving user with id ${id}`)
            })
    }else{
        // get the data from the database 
        Userdb.find() // returns a promise 
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error occured retrieving user information"})
        })
    }
    
}

// update a new identified user by user id 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message : "Data to update can not be empty!"});
        return;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false}) // returns a promise
        .then(data => {
            if (!data) {
                res.status(404).send({ message : `Cannot update user with ${id}. Maybe user not found`})
            }else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message : "Error updating user information" })
        })
}
// delete a user with specified user id 
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id) // returns a promise 
        .then(data => {
            if (!data) {
                res.status(404).send({ message : `Cannot delete user with ${id}. Maybe id is wrong`})
            } else {
                res.send({ message : "User deleted successfully"})
            }
        })
        .catch(err => {
            res.status(500).send({ message : `Could not delete user with ${id}`})
        })
}





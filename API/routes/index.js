const express = require('express');
const router = express.Router();
const crudUser = require('../controllers/userController');

module.exports = function () {
    
    router.get('/',
        crudUser.getUsers
    );

    router.get('/:id',
        crudUser.getUser
    )
    router.post('/',
        crudUser.createUser
    );

    router.delete('/:id',
        crudUser.deleteUser
    );

    router.put('/:id',
        crudUser.updateUser
    );

  
    
    return router;
}
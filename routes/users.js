const express = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Include a name').not().isEmpty(),
    check('email', 'Include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({min:6})
], async (request, response) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = request.body;

    try{
        let user = await User.findOne({email});

        if(user) { return response.status(400).json({message: 'User already exists', errorCode: 1})}

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            response.json({token});
        });
    }
    catch (error){
        console.error(error.message);
        response.status(500).send('Server error');
    }
});

module.exports = router;
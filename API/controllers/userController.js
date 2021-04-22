const User = require('../models/User');

exports.getUsers =  async (req, res ,next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(404).json({message : error.message});
        next();
    }
}


exports.createUser = async(req, res ,next) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(200).json({message : 'user created'});
    } catch (error) {
        res.status(404).json({message : error.message});
        next();
    }
}


exports.deleteUser = async(req ,res ,next) => {
    try {
        await User.findOneAndDelete({_id: req.params.id});
        res.status(200).json({message : 'user delete'});
    } catch (error) {
        res.status(404).json({message : error.message});
        next();
    }
}


exports.getUser = async (req, res ,next) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({message : error.message});
        next();
    }
}

exports.updateUser = async (req ,res ,next) => {
    try {
        const user = await User.findOneAndUpdate({_id: req.params.id} , req.body,{
            new: true
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message : error.message});
        next();
    }
}
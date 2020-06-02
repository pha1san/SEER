const DBUser = require('../models/dbUser.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../roles');

async function hashPassword(password){
    return await bcrypt.hash(password, 10);
}
async function passwordValidator(plainPass, hashedPass){
    return await bcrypt.compare(plainPass, hashedPass);
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const hashedPass = await hashPassword(password);
        const newUser = new User({ username, password: hashedPass, role: role || "searcher" });
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
    data: newUser,
    accessToken
    })
    } catch (error) {
    next(error)
    }
}

exports.login = async (req, res, next) =>{
    try{
        const {username, password } = req.body;
        const dbUser = await DBUser.findOne({username});

        if(!dbUser) return next(new Error('User does not exist!'));
        const validPass = await passwordValidator(password, dbUser.password);
        
        if(!validPass) return next(new Error('Incorrect password!'));
        const accessToken = jwt.sign({userId: dbUser._id}, process.env.JWT_SECRET, { expiresIn: "1d"});
        await DBUser.findByIdAndUpdate(dbUser._id, {accessToken})
        res.status(200).json({
            data: {username: dbUser.username, role: dbUser.role}, accessToken
        }) 
    } catch(error){
        next(error);
    }
}

exports.getUsers = async(req, res, next) => {
    const dbUsers = await DBUser.find({});
    res.status(200).json({
        data: dbUsers
    });
}

exports.getUser = async(req, res, next) =>{
    try{
        const userId = req.params.userID;
        const dbUser = await DBUser.findById(userId);
        if(!dbUser) return next(new Error('User does not exist!'));
        res.status(200).json({
            data: dbUser
        });
    } catch(error){
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try{
        const update = req.body
        const userId = req.params.userId;
        await DBUser.findByIdAndUpdate(userId, update);
        const dbUser = await DBUser.findById(userId)
        res.status(200).json({
            data: dbUser,
            message: 'User updated.'
        });
    } catch(error){
        next(error);
    }
}

exports.deleteUser = async(req, res, next) =>{
    try{
        const userID = req.params.userId;
        await DBUser.findByIdAndDelete(userId);
        req.status(200).json({
            data: null,
            message: 'User deleted.'
        });
    } catch(error){
        next(error)
    }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try{
            const permission = roles.can(req.dbUser.role)[action](resource);

            if(!permission.granted){
                return res.status(401).json({
                    error: "You don't have permission to perform this action."
                });
            }
            next()
        }   catch(error){
            next(error)
        }
    }
}

exports.allowIfLoggedin = async (req, res, next) =>{
    try{
        const dbUser = res.locals.loggedInUser;
        if(!dbUser)
            return res.status(401).json({
                error: "You must be logged in."
            });
            req.dbUser = dbUser;
            next();
    } catch(error){
        next(error);
    }
}
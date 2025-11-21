const UserService = require("../service/userService")

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create({
            email : req.body.email,
            password : req.body.password
        });
        return res.status(201).json({
            data : response,
            message : 'user is successfully created.',
            success : true,
            error : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {},
            message : 'Something went wrong.',
            success : false,
            error : error
        });
    }
}


const signIn = async (req,res) => {
    console.log("METHOD:", req.method);
    console.log("BODY:", req.body);
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data : response,
            message : 'user is successfully signIn.',
            success : true,
            error : {}
        });
    } catch (error) {
        console.log("ERROR IN SIGNIN:", error);
        return res.status(500).json({
            data : {},
            message : 'Something went wrong.',
            success : false,
            error : error
        });
    }
}

module.exports = {
    create,
    signIn
}
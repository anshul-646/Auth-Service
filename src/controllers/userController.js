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

module.exports = {
    create
}
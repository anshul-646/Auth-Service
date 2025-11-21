const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            message : 'Something went wrong',
            data : {},
            error : 'User email or password is missing',
            success : false
        });
    }
}

module.exports = {
    validateUserAuth
}
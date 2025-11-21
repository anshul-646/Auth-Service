const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {JWT_KEY} = require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository = new UserRepository;
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getUserByEmail(email);

            if (!user) {
                console.log("User not found");
                throw { error: "User not found" };
            }

            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error : 'Incorrect password'};
            }

            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in signIn process");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn : '1d'});
            return    result;
        } catch (error) {
            console.log("Something went wrong while creating Token");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return    response;
        } catch (error) {
            console.log("Something went wrong in verifying token");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return  bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }
}

module.exports = UserService;
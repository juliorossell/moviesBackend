import jwt  from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["auth-access-token"];
        if(!token) throw({ message: 'token no provided'});
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        const user = await User.findById(req.userId, { password: 0});
        if(!user) throw({message: 'user not found'})
        next();    
    } catch (error) {
        res.status(403).json(error);
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const userFound = await User.findById(req.userId);
        if(!userFound) throw({ message: 'user not found'});
        const roles = await Role.find({ _id: {$in: userFound.roles}})
        const findRol = roles.find(x => x.name === config.ADMIN ) ;
        if(!findRol) throw({ message: 'the rol does not have the permissions'})
        next();
    } catch (error) {
        res.status(403).json(error);
    }

}
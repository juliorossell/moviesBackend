import User from "../models/User";
import jwt from 'jsonwebtoken'
import config from "../config";
import Role from '../models/Role'
import Log from "../models/Log";

export const signUp = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        const userFound = await User.findOne({ email });
        if(userFound) throw( {message: 'user already registered'} );
        
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        })

        if(roles && roles.length) {
            const rolesFound = await Role.find({name: {$in: roles }});
            if (rolesFound && rolesFound.length) {
                newUser.roles = rolesFound.map(role => role._id);
            } else{ 
                throw( {message: 'role not encountred'} );
            }
            
        } else {
            const role = await Role.findOne({name: 'user'});
            newUser.roles = [role._id];
        }

        const userSaved = await newUser.save();

        const token = jwt.sign({id: userSaved._id }, config.SECRET, {
            expiresIn: '7d' 
        });

        const newLog = new Log( {
            user:  userSaved._id,
            token,
            status: true,
            userAgent: req.headers['user-agent'] || 'unknow'
            
        })
        await newLog.save();

        res.status(201).json( { token, userInfo: userSaved })
    } catch (error) {
        res.status(400).json(error);
    }
}


export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email }).populate("roles");

        if(!userFound) throw( {message: 'user not found'} );

        const matchPassword = await User.comparePassword(password, userFound.password);

        if(!matchPassword) throw( {message: 'invalid password'} );

        // consultar si existe su sesión
        const logFound = await Log.findOne({ user: userFound._id });

        if(logFound) {
            await Log.findByIdAndDelete(logFound._id)
            const token = jwt.sign({id: userFound._id }, config.SECRET, {
                expiresIn: '7d' 
            });
            const newLog = new Log( {
                user: userFound._id,
                token,
                status: true,
                userAgent: req.headers['user-agent'] || 'unknow'
            })
            await newLog.save();
            res.status(200).json( { token, userInfo: userFound })
         
        } else {
            const token = jwt.sign({id: userFound._id }, config.SECRET, {
                expiresIn: 180 // 24 hours
            });
            const newLog = new Log( {
                user: userFound._id,
                token,
                status: true,
                userAgent: req.headers['user-agent'] || 'unknow'
            })
            await newLog.save();
            res.status(200).json( { token,  userInfo: userFound  })
        }
        
        

    } catch (error) {
        res.status(401).json(error);
    }
}


export const logout = async (req, res) => {
    try {
        const token = req.headers["auth-access-token"];
        if(!token) throw({ message: 'token no provided'});
        const decoded = jwt.decode(token, config.SECRET);
        const user = await User.findById(decoded.id, { password: 0});
        const logFound = await Log.findOne({ user: user._id });
        await Log.findByIdAndUpdate(logFound._id, { status: false})
        res.status(200).json('sesion destroyed');
    } catch (error) {
        res.status(400).json(error);
    }

}
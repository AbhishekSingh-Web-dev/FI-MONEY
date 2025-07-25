import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const register = async (req, res)=>{
    const {username , password} = req.body;

    try{
        let user = await User.findOne({username})

        if(user){
            return res.status(409).json({msg:"User already exist"})
        }

        user= new User({
            username,
            password,
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user:{
                id:user.id,
            },
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.json({access_token: token})
            }
        )
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}


export const login = async (req,res)=>{
    const {username, password} = req.body;

    try{
        let user = await User.findOne({username})

        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        const payload = {
            user:{
                id:user.id,
            },
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn:'1h'},
            (err,token)=>{
                if(err) throw err;
                res.json({access_token:token})
            }
        )

    }catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
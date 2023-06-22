import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = (req,res)=>{
    const q = 'SELECT * FROM user WHERE username = ?'

    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        // const { password, ...other } = data[0];
        // res.cookie("access_token", token, {
        //   httpOnly: true,
        //   secure: true
        // })
        
        res.json({message:"Welcome Back!",token:token});
      });
    };
export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };

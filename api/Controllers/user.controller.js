import User from "../Models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client();

// signup or createuser controller code 
export const createUser = async (req, res, next) => {
    try {
        const { name, email, phone, password,isAdmin} = req.body;
        const existingUser = await User.findOne({ email })

        if (!name || !email || !phone || !password) {
            return res.status(404).json({ message: "require all fields", success: false })
        }

        if (existingUser) return res.status(401).json({ message: "User already exists", success: false })
        if(password.length < 6) return res.status(400).json({ success: false, message: "Password must have more than 6 characters!" });
        // Assuming the password is hashed elsewhere before saving to the database
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(req.body.password, saltRounds)
        const newUser = new User({
            ...req.body,
            password:hashPassword,
            authSource: 'random' // Set authSource to 'random' for users registered through your application
        })
        await newUser.save();
        res.status(201).json({ message: "user successfully registered", data: newUser })
    } catch (err) {
        return next(err)
    }
}

// signin code starts here 
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // check for invalid entries 
        if (!email || !password) return res.status(400).json({ success: false, message: "Invalid entries email or password" });

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ success: false, message: "User Not Found!" });
        if(password.length < 6) return res.status(400).json({ success: false, message: "Password must have more than 6 characters!" });
        if (user) {
            //comparing password 
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch === false) return res.status(401).send({ success: false, message: "Password Incorrect!" })
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET, // process.env.jwtsecret
                {
                    expiresIn: "2h"
                }
            );
            user.token = token
            user.password = undefined

            res.status(200).cookie("token", token).json({
                success: true,
                token,
                user
            })
        }
    } catch (err) {
        res.status(500).send("Server Error")
    }
}

// authenticateWithGoogle code starts here 
export const authenticateWithGoogle = async (req, res) => {
    const { credential, client_id } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: client_id,
        });
        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;
        const userid = payload["sub"];
        let user = await User.findOne({ email:email });
        if (user) {           
            return res.status(200).json(user)
        } else{
            // Create a user if they do not exist
            user = await User.create({
                email: email,
                name: `${given_name} ${family_name}`,
                image: picture,
                authSource: 'google' // Set authSource to 'google' for users authenticated via Google
            })
        }
        // Generate a JWT token
        const token = jwt.sign({ user }, process.env.JWT_SECRET);
        res.status(200).cookie('token', token, { http: true }).json(user);
    } catch (err) {
        res.status(400).json({ err });
    }
}

export const update = async (req, res, next) => {
    console.log(req.body)
    try {
        const { id } = req.params;
        const userData = req.body;
        
        // Ensure that the image field is set as a string, not an object
        const image = req.body.img || ''; // Assuming image is a string, if not, adjust accordingly

        const data = { ...userData, image }; // Set the image field correctly

        const userUpdate = await User.findByIdAndUpdate(id, data, { new: true });
        
        res.status(200).json({
            success: true,
            userUpdate
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();

        if(!allUsers) {
            return res.status(404).json({success:false, message:"No Users Found!"})
        } 

        res.status(200).json({success:true, data:allUsers})
    } catch (error) {
        return res.status(501).json({success:false, message:"internal server error"})
    }
}

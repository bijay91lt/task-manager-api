const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {email, password, role} = req.body;
    if(!email || !password) return res.status(400).json({error: 'Email & password required'});

    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({ error: 'Email already exists'});
        const user = new User({email, password, role});
        await user.save();

        res.status(201).json({message: 'User registered successfully'});
    } catch (err){
        res.status(500).json({ error: 'Registration failed'});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({error: 'Invalid email'});

        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({error: 'Invalid password'});

        const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({token});
    } catch (err){
        res.status(500).json({error: 'Login failed'});
    }
};
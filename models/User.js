const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type: String , required: true, unique: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user'}
});

//Hash password before saving
userSchema.pre('save', async function(){
    if(!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 10);
})

//compare password method
userSchema.methods.comparePassword = function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

modile.exports = mongoose.model('User', userSchema);
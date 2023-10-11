const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Please tell us your name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true,"please provide an email"],
    unique: true,
    lowercase:true
  },
  password: {
    type: String,
    required: [true,"please provide a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true,"please confirm password"],
    validate:{
        validator:function(el){
            return el ===this.password;
        },
        message:"Passwords do not match"
    },
  },
  address:String,
  private_Key:String,
  mneumonic:String,
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm=undefined;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre("save", function(next){
    if(!this.isModified("password")|| this.isNew) return next();

    this.passwordChangedAt=Date.now()-1000;
    next()
})

User.pre(/^find/, function(next){
    this.find({active:{$ne:false}})
    next()
}

)

// Method to compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};


userSchema.methods.changedPasswordAfter= function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTinestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp< changedTinestamp
    }

return false
}

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Counter = require('./counter');

const userSchema = new mongoose.Schema(
  {
    gymId: {
      type: String,
      required: true,
    },
    registerationNumber: {
      type : Number,
      // default: 0,
      // required: true,
    },
    role: {
      type: String,
      enum: ['user', 'owner', 'admin'],
      default: 'user',
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      // validator: [isEmail, 'Please enter a valid email'],
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: [5, 'Minimum password length is 5 characters'],
    },
  },
  { timestamps: true }
);

// firing a function before saving a document
userSchema.pre('save', function (next) {
  const user = this;
  const salt = bcrypt.genSaltSync(8);
  const encryptPassword = bcrypt.hashSync(user.password, salt);
  user.password = encryptPassword;
  next();
});

// userSchema.post('save', async function(next) {
//   const user = this;
//   let counter = await Counter.findOneAndUpdate(
//     {gymId : id},
//     {"$inc": {"seq":1}},
//     {new: true}
//     );
//     console.log(counter);
//   if(!counter) {
//     counter = await Counter.create(
//       {
//         gymId: gym.gymId,
//         seq: 1,
//       });
//   }
//   user.registerationNumber = counter.seq;
//   next();
// })

module.exports = mongoose.model('User', userSchema);

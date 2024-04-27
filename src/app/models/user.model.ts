import mongoose from "mongoose";
interface User {
    username: string;
    email: string;
    password: string;
    fullName: string;
    profilePicture?: string; // optional
    isDoctor?: boolean; // optional
    role: 'user' | 'admin';
    isVerified?: boolean; // optional
    verifyCode: string;
    verifyCodeExpiry: Date;
  }
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
   

    profilePicture: {
      type: String // Store the URL of the profile picture
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    role: {
      type: String,
      enum: ['user', 'admin'], // Define possible roles for the user
      default: 'user'
    },
    
    isVerified:{
        type:Boolean,
        default:false
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify Code is required'],
      },
      verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
      },
  },{timestamps:true});
  
  // Create the User model using the userSchema
  const User = (mongoose.models.User as mongoose.Model<User>)|| mongoose.model('User', userSchema);

  export default User
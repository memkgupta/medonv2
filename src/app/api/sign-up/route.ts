import User from "@/app/models/user.model";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import connect from "@/lib/dbConnect";
import bcrypt from "bcryptjs"
export async function POST(request:Request) {
    await connect()
    try {
        const {username,email,password,fullName} = await request.json()
        const existingVerifiedUserByUsername = await User.findOne({username:username,isVerified:true})
        if(existingVerifiedUserByUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{
                status:400
            });
        }
        const existingUserByEmail = await User.findOne({email:email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({success:false,message:"Account already exists with this email"},{status:400})

            }
            else{
        
                    const hashedPassword = await bcrypt.hash(password,10);
                    existingUserByEmail.password = hashedPassword
                    existingUserByEmail.verifyCode = verifyCode;
                    existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                    await existingUserByEmail.save();
                
            }
        }
        else{
            const hashedPassword  = await bcrypt.hash(password,10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new User({
                username,email,password:hashedPassword,verifyCode,verifyCodeExpiry:expiryDate,fullName:fullName
            });

            await newUser.save();
        }
      const emailResponse = await sendVerificationEmail(email,username,verifyCode);
      if(!emailResponse.success){
return Response.json({
    success:false,
    message:emailResponse.message
},{status:500});

      }
console.log(emailResponse)
      return Response.json({success:true,message:"User created successfully. Please verify your account"},{status:201})
    } catch (error) {
        console.error("Error registering user: ",error)
    return Response.json({
        success:true,
        message:"Error registering user"
    },{status:500})
    }
}
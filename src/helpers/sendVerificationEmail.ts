import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

 interface ApiResponse {
    success: boolean;
    message: string;
    
  };
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
  ): Promise<ApiResponse> {
    try {
     const res = await resend.emails.send({
        from: 'mayankkumargupta03@gmail.com',
        to: email,
        subject: 'Medon Verification Code',
        react: VerificationEmail({username,otp:verifyCode}),
      });
      console.log(res)
      return { success: true, message: 'Verification email sent successfully.' };
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      return { success: false, message: 'Failed to send verification email.' };
    }
  }
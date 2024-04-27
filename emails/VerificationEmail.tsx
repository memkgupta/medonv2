
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
<>
<div className="max-w-xl mx-auto p-8 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4">OTP Verification</h1>
      

        <p className="mb-6">
        Hi {username},
      </p>
      <p className="mb-6">Please use the following OTP to verify your email:</p>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">OTP:</h2>
        <p className="text-3xl font-bold">{otp}</p>
      </div>
      <p>If you didn't request this OTP, please ignore this email.</p>
    </div>
</>
    );
  }
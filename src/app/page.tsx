"use client";

import LoginButton from "./Login/page"; 

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome!</h1>
        <p className="text-center text-gray-600 mb-6">
          Sign up or log in to continue
        </p>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <LoginButton/>
        </div>

       
      </div>
    </div>
  );
}

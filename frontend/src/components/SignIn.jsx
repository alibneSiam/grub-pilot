import React from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const SignIn = () => {
  const handleButtonLogin = () => {
    document.cookie = "g_state=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
  };

  return (
    <div className="py-4 flex flex-col items-center gap-4">
      <button
        onClick={handleButtonLogin}
        className="text-center cursor-pointer relative inline-block px-4 py-2
          bg-transparent font-semibold
          before:block before:absolute before:-inset-1
          before:-skew-y-5 before:bg-orange-400
          before:transition-all before:duration-1000 before:ease-out
          hover:before:skew-y-0 hover:before:bg-orange-500
        "
      >
        <span className="relative text-black font-bold">
          Sign in with Commure Google
        </span>
      </button>
    </div>
  );
};

export default SignIn;

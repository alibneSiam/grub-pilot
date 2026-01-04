import React from "react"

const SignIn = () => {
  return (
    <div className="py-4">
    <button className="text-center cursor-pointer">
      Sign in with{" "}
      <span
        className="
          relative inline-block px-2
          before:block before:absolute before:-inset-1
          before:-skew-y-5 before:bg-orange-400
          before:transition-all before:duration-1000 before:ease-out
          hover:before:skew-y-0 hover:before:bg-orange-500
        "
      >
        <span className="relative text-black font-bold">
          Commure Google
        </span>
      </span>{" "}
      account
    </button>
    </div>

  )
}

export default SignIn

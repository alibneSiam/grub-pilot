import UpdateUser from "./UpdateUser";

const SignIn = ({ user }) => {
  const handleButtonLogin = () => {
    document.cookie = "g_state=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
  };

  return (
    <div className="py-8 flex justify-center items-center flex-col gap-4">
      {user ? <UpdateUser googleUser={user} />
      : (
        <button className="text-center cursor-pointer relative inline-block p-4
          bg-transparent font-semibold w-90
          before:block before:absolute before:-inset-1
          before:-skew-y-3 before:bg-orange-400
          before:transition-all before:duration-1000 before:ease-out
          hover:before:-skew-y-0 hover:before:bg-orange-500"
          onClick={handleButtonLogin}>
          <span className="relative text-black font-bold">
            Sign in with Commure Google
          </span>
        </button>
      )}
    </div>
  );
};

export default SignIn;


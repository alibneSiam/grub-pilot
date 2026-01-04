import { useState } from "react";

const UpdateUser = ({ googleUser }) => {
  const [userExist, setUserExist] = useState(true);
  const isCommureEmail = googleUser.email.endsWith("@commure.com");

  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 text-left">
      
      <div className="flex flex-col items-center text-right mr-16 lg:mr-32">
        <img
          src={googleUser.picture}
          alt={googleUser.name}
          className="w-32 h-32 mb-8 rounded-full"
        />
        <div>
          <p className="font-semibold text-xl">Hello {googleUser.name}!</p>
          <p className="text-sm text-gray-300">{googleUser.email}</p>
        </div>
      </div>

      {isCommureEmail ? (
        <form className="flex flex-col space-y-4 w-full max-w-sm">
          {userExist && (
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter Old Password"
              className="w-full px-3 py-2 rounded-md bg-black/40 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}

          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            className="w-full px-3 py-2 rounded-md bg-black/40 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            className="w-full px-3 py-2 rounded-md bg-black/40 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 rounded-md font-semibold bg-orange-400 text-black hover:bg-orange-500 transition-all duration-300"
          >
            {userExist ? "Update Password" : "Set Password"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-sm rounded-full px-4 py-4 text-white font-bold text-center rounded-md">
          <div className="tenor-gif-embed" data-postid="1482602579291311529" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/pepe-pepe-the-frog-disappointed-disappointed-pepe-tired-gif-1482602579291311529">Pepe Pepe The Frog GIF</a>from <a href="https://tenor.com/search/pepe-gifs">Pepe GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;

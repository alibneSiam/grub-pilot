import { useGoogleOneTapLogin } from "@react-oauth/google";

const GoogleOneTap = ({ onUser }) => {
  const decodeJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  };

  useGoogleOneTapLogin({
    onSuccess: ({ credential }) => {
      const decoded = decodeJwt(credential);

      const user = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        sub: decoded.sub,
      };

      onUser(user);
    },
    cancel_on_tap_outside: false,
  });

  return null;
};

export default GoogleOneTap;

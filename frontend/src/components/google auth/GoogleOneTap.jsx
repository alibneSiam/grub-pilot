import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

const GoogleOneTap = ({ onSuccess }) => {
  const [attempt, setAttempt] = useState(0);

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log("One Tap success:", credentialResponse);
      onSuccess?.(credentialResponse);
    },
    onError: () => {
      console.log("One Tap dismissed or failed, retrying...");
      setTimeout(() => setAttempt((prev) => prev + 1), 3000);
    },
    cancel_on_tap_outside: false,
  });

  return <div id="google-one-tap-container"></div>;
};

export default GoogleOneTap;

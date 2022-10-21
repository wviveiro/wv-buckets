import { useState } from "react";
import { useAuth } from "../../controllers/authenticator";
import { setGlobalSettings } from "../../utils/global-settings";
import { LoadGoogleArgs } from "./types";

const loadGoogle = ({ onInitClient, onAuthenticate }: LoadGoogleArgs) => {
  const initGoogle = () => {
    const gsiScript = document.createElement("script");
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.async = true;
    gsiScript.defer = true;
    document.head.appendChild(gsiScript);
  };

  if (!window.google) initGoogle();

  const initClient = () => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: ({ access_token }) => {
        onAuthenticate(access_token);
      },
    });

    onInitClient(client);
  };

  const verifyLoader = (counter = 0) => {
    if (window.google) {
      initClient();
      return;
    }

    if (counter > 100) {
      console.log("Initialiser error: Google not initialised");
      return false;
    }
    setTimeout(() => verifyLoader(counter + 1), 500);
  };

  verifyLoader();
};

export const useLoadGoogle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [, { checkIfLoggedIn }] = useAuth();

  const onClickGoogleButton = () => {
    setLoading(true);
    loadGoogle({
      onInitClient: (client) => {
        setLoading(false);
        client.requestAccessToken();
      },
      onAuthenticate: (access_token: string) => {
        setGlobalSettings({ access_token });
        checkIfLoggedIn();
      },
    });
  };

  return {
    disabled: loading,
    onClickGoogleButton,
  };
};

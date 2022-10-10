import { useEffect } from "react";

const loadGoogle = () => {
  const initGoogle = () => {
    const gsiScript = document.createElement("script");
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.async = true;
    gsiScript.defer = true;
    document.head.appendChild(gsiScript);
  };

  if (!window.google) initGoogle();

  const initClient = () => {
    console.log("INIT TOKENN", import.meta.env);
    const client = google.accounts.oauth2.initTokenClient({
      client_id:
        "675058980808-b9q0g6alse6745s8bvg6oubmb2s3l5rf.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (tokenResponse) => {
        console.log("TOKEN RESPONSE", { tokenResponse });
      },
    });

    client.requestAccessToken();
  };

  const verifyLoader = (counter = 0) => {
    if (window.google) {
      initClient();
      return;
    }

    if (counter > 100) {
      return false;
    }
    setTimeout(() => verifyLoader(counter + 1), 500);
  };

  verifyLoader();
};

export const useLoadGoogle = () => {
  useEffect(() => {
    loadGoogle();
  }, []);
};

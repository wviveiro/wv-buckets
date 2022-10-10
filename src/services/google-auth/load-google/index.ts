import { getGlobalSettings } from "../../../utils/global-settings";
import type { LoadGoogleProps } from "./types";

export const onLoadGoogle = ({
  onLoadToken,
  onLoadClient,
}: LoadGoogleProps) => {
  const initGoogle = () => {
    const gsiScript = document.createElement("script");
    gsiScript.src = "https://accounts.google.com/gsi/client";
    gsiScript.async = true;
    gsiScript.defer = true;
    document.head.appendChild(gsiScript);
  };

  if (!window.google) initGoogle();

  const initClient = () => {
    const { client_id } = getGlobalSettings();
    const client = google.accounts.oauth2.initTokenClient({
      client_id,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      callback: (tokenResponse) => {
        onLoadToken(tokenResponse as unknown as string);
      },
    });

    onLoadClient(client);
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

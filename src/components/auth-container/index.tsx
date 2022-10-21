import React, { useEffect } from "react";
import { useAuth } from "../../controllers/authenticator";
import { SplashScreen } from "../splash-screen";
import { AuthContainerProps } from "./types";

export const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  unAuthChildren,
}) => {
  const [{ isInitialised, isLoading, isAuthenticated }, { initialise }] =
    useAuth();

  useEffect(() => {
    if (!isInitialised) {
      initialise();
    }
  }, [isInitialised, initialise]);

  if (!isInitialised) return null;

  if (isLoading) return <SplashScreen hasSpinner>Authenticating</SplashScreen>;

  if (!isAuthenticated) return <>{unAuthChildren}</>;

  return <>{children}</>;
};

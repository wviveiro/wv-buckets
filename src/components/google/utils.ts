export const loadGoogleScripts = () => {
  const googleScript = document.createElement('script');
  googleScript.src = 'https://accounts.google.com/gsi/client';
  const gapiScript = document.createElement('script');
  gapiScript.src = 'https://apis.google.com/js/api.js';
  document.head.appendChild(googleScript);
  document.head.appendChild(gapiScript);

  return new Promise((resolve) => {
    const isLoaded = () => {
      if (window.google && window.gapi) return resolve(true);
      setTimeout(isLoaded, 100);
    };

    isLoaded();
  });
};

export const getGoogle = () => window.google;
export const getGapi = () => window.gapi;

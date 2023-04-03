import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Authenticate: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.opener.parent.postMessage({
      authenticatedReceivedId: id,
    });
  }, [id]);

  return null;
};

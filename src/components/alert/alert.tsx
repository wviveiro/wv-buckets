import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { InnerAlertInterface } from './alert.interface';
import { AlertComponent } from './alert.styled';

export let alert = (
  message: string,
  alert: InnerAlertInterface['variant'] = 'warning'
) => {
  // not implemented
};

export const AlertsCreator = () => {
  const [alerts, setAlerts] = useState<Array<InnerAlertInterface>>([]);

  useEffect(() => {
    alert = (
      message: string,
      alert: InnerAlertInterface['variant'] = 'warning'
    ) => {
      const _alerts = alerts.slice(0);
      _alerts.push({ message, variant: alert });
      setAlerts(_alerts);
    };
  }, []);

  const onClose = (index: number) => {
    return () => {
      const _alerts = alerts.slice(0);
      _alerts.splice(index, 1);
      setAlerts(_alerts);
    };
  };

  return (
    <>
      {alerts.map((alert, i) => (
        <InnerAlert key={i} {...alert} onClose={onClose(i)} />
      ))}
    </>
  );
};

export const InnerAlert: React.FC<InnerAlertInterface> = ({
  message,
  variant,
  onClose,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        if (onClose) onClose();
      }, 500);
    }
  }, [show]);

  return (
    <AlertComponent
      variant={variant}
      show={show}
      onClick={() => setShow(false)}
      style={{ position: 'fixed', bottom: '0' }}
    >
      {message}
    </AlertComponent>
  );
};

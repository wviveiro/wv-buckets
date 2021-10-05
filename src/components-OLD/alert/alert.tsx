import React, { useEffect, useState } from 'react';
import { InnerAlertInterface } from './alert.interface';
import { AlertComponent } from './alert.styled';

export let setAlert = (
  message: string,
  alert: InnerAlertInterface['variant'] = 'warning'
) => {
  // not implemented
};

export const AlertsCreator = () => {
  const [alerts, setAlerts] = useState<Array<InnerAlertInterface>>([]);

  useEffect(() => {
    let mounted = true;
    setAlert = (
      message: string,
      alert: InnerAlertInterface['variant'] = 'warning'
    ) => {
      if (!mounted) return;

      const _alerts = alerts.slice(0);
      _alerts.push({ message, variant: alert });
      setAlerts(_alerts);
    };

    return () => {
      mounted = false;
    };
  }, [alerts]);

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
    let mounted = true;
    setTimeout(() => {
      if (!mounted) return;
      setShow(false);
    }, 3000);

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (!show) {
      setTimeout(() => {
        if (!mounted) return;
        if (onClose) onClose();
      }, 500);
    }
    return () => {
      mounted = false;
    };
  }, [show, onClose]);

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

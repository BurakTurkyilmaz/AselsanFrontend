import React, { useState, useEffect } from "react";

interface AutoCloseAlertProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const AutoCloseAlert: React.FC<AutoCloseAlertProps> = ({
  message,
  duration,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const alertStyle: React.CSSProperties = {
    position: "fixed",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.8)",
    color: "white",
    borderRadius: "5px",
  };

  return visible ? <div style={alertStyle}>{message}</div> : null;
};

export default AutoCloseAlert;

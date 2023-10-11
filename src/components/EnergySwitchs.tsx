import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./energy-switchs.scss";

const EnergySwitchs = () => {
  const [activeButtons, setActiveButtons] = useState<number[]>([]);

  const handleButtonClick = (buttonIndex: number) => {
    if (activeButtons.includes(buttonIndex)) {
      // Eğer tıklanan buton zaten aktifse, deaktive et
      setActiveButtons(activeButtons.filter((index) => index !== buttonIndex));
    } else if (activeButtons.length < 2) {
      // Eğer aktif buton sayısı 2'den azsa, tıklanan butonu aktif et
      setActiveButtons([...activeButtons, buttonIndex]);
    }
  };

  const isButtonActive = (buttonIndex: number) => {
    return activeButtons.includes(buttonIndex);
  };

  const renderButton = (buttonIndex: number, label: string) => {
    const isActive = isButtonActive(buttonIndex);
    return (
      <Button
        key={buttonIndex}
        variant="contained"
        color={isActive ? "success" : "error"}
        onClick={() => handleButtonClick(buttonIndex)}
      >
        {label}
      </Button>
    );
  };

  return (
    <div className="energy-switchs-component">
      <div className="button-container">
        {renderButton(0, "Cooling")}
        {renderButton(1, "Heating")}
        {renderButton(2, "Lights")}
        {renderButton(3, "Robotic Arms")}
      </div>
    </div>
  );
};

export default EnergySwitchs;

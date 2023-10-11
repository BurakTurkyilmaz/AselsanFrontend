import React, { useState, useEffect } from "react";
import "../App.scss";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import Button from "@mui/material/Button";
import AutoCloseAlert from "../components/AutoCloseAlert";
import Product from "../components/Product";
import SodaImage from "../Images/soda.png";
import CokeImage from "../Images/coke.png";
import WaterImage from "../Images/water.png";
import { incrementByAmount, ProductNames, cancel } from "../store/userSlice";

import "./home-page.scss";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const machineCash = useAppSelector((state) => state.counter.machineCash);
  const balance = useAppSelector((state) => state.counter.balance);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [lightsStatus, setLightsStatus] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(300);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Timeout süresi
  const timeOut = 300;

  // Component ilk render edildiğinde ve her saniye çalışan fonksiyon
  useEffect(() => {
    // Tarih ve saat bilgisini güncelleyen fonksiyon
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentDateTime(formattedDateTime);

      // Saat aralığına göre ışık durumunu belirleme
      const currentHour = now.getHours();
      if (currentHour >= 6 && currentHour < 18) {
        setLightsStatus("Lights are off");
      } else {
        setLightsStatus("Lights are on");
      }
    };

    // İlk tarih ve saat bilgisini güncelle
    updateDateTime();

    // Her saniyede bir tarih ve saat bilgisini güncelle
    const intervalId = setInterval(updateDateTime, 1000);

    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(intervalId);
  }, []);

  // Belirli bir süre içinde gösterilen uyarıyı kapatma fonksiyonu
  const closeAlert = () => {
    setAlertVisible(false);
  };

  // Countdown başlatma fonksiyonu
  const startCountdown = () => {
    // Belirli bir süre içinde kalan zamanı güncelleme
    const id = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id);
          dispatch(cancel());
          return timeOut;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Önceki timeout'u temizleme
    if (timeoutId !== null) {
      clearTimeout(timeoutId as unknown as NodeJS.Timeout);
    }

    // Yeni timeout'u ayarlama
    setTimeoutId(id as unknown as number);
  };

  // Timeout'u sıfırlama fonksiyonu
  const resetTimeout = () => {
    // Önceki timeout'u temizleme
    if (timeoutId) {
      clearInterval(timeoutId);
    }

    // Kalan zamanı sıfırlama
    setRemainingTime(timeOut);

    // Yeni timeout'u ayarlama
    const newTimeout = setTimeout(() => {
      dispatch(cancel());
      setTimeoutId(null);
    }, timeOut * 1000);

    setTimeoutId(newTimeout as any);
    startCountdown();
  };
  //Scam protection için alert fonksiyonu
  const showAlert = (message: string, duration: number) => {
    setAlertVisible(true);
    setAlertMessage(message);
    setTimeout(() => {
      setAlertVisible(false);
    }, duration);
  };

  // Para ekleme fonksiyonu
  const addMoney = (value: number) => {
    const result = incrementByAmount(value);
    dispatch(result);

    // Checking for Scamming uyarısı
    showAlert("Checking for Scamming", 3000);

    resetTimeout();
  };

  // İptal butonu fonksiyonu
  const cancelButton = () => {
    dispatch(cancel());
    resetTimeout();
  };

  return (
    <div className="home-page">
      <div className="vending-machine">
        <div className="container">
          <div className="total-money">Your Total Money: {balance} </div>
          <div className="remaining-time">
            Remaining Time: {remainingTime} seconds
          </div>
        </div>
        <div>
          <div>
            <div className="money-buttons-container">
              <Button
                data-testid="add-1-button"
                variant="contained"
                color="success"
                onClick={() => addMoney(1)}
              >
                Add 1 <CurrencyLiraIcon fontSize="small" />
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => addMoney(5)}
              >
                Add 5 <CurrencyLiraIcon fontSize="small" />
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => addMoney(10)}
              >
                Add 10 <CurrencyLiraIcon fontSize="small" />
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => addMoney(20)}
              >
                Add 20 <CurrencyLiraIcon fontSize="small" />
              </Button>
            </div>
            <div className="money-buttons-container">
              <Button variant="contained" color="error" onClick={cancelButton}>
                Cancel Action
              </Button>
            </div>
            {alertVisible && (
              <AutoCloseAlert
                message={alertMessage}
                duration={3000}
                onClose={closeAlert}
              />
            )}
          </div>
        </div>
        <div>Machine Cash: {machineCash} </div>
        <div className="product-container">
          <Product
            productName={ProductNames.Coke}
            image={CokeImage}
            price={35}
          />
          <Product
            productName={ProductNames.Soda}
            image={SodaImage}
            price={45}
          />
          <Product
            productName={ProductNames.Water}
            image={WaterImage}
            price={25}
          />
        </div>
        <div className="current-date-time">
          Current Date and Time: {currentDateTime}
        </div>
        <div className="container">
          <div className="lights-status">Lights Status: {lightsStatus}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  setProductTemperature,
  ProductNames,
  reset,
  setProductAmount,
} from "../store/userSlice";
import EnergySwitchs from "../components/EnergySwitchs";

import "./admin-page.scss";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const machineCash = useAppSelector((state) => state.counter.machineCash);
  const waterTemperature = useAppSelector((state) => state.counter.water.temp);
  const cokeTemperature = useAppSelector((state) => state.counter.coke.temp);
  const sodaTemperature = useAppSelector((state) => state.counter.soda.temp);
  const waterAmount = useAppSelector((state) => state.counter.water.amount);
  const cokeAmount = useAppSelector((state) => state.counter.coke.amount);
  const sodaAmount = useAppSelector((state) => state.counter.soda.amount);
  const [newWaterTemperature, setNewWaterTemperature] = useState("");
  const [newCokeTemperature, setNewCokeTemperature] = useState("");
  const [newSodaTemperature, setNewSodaTemperature] = useState("");
  const [newWaterAmount, setNewWaterAmount] = useState("");
  const [newCokeAmount, setNewCokeAmount] = useState("");
  const [newSodaAmount, setNewSodaAmount] = useState("");

  const handleWaterTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWaterTemperature(event.target.value);
  };

  const handleCokeTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCokeTemperature(event.target.value);
  };

  const handleSodaTemperatureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewSodaTemperature(event.target.value);
  };

  const handleWaterAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWaterAmount(event.target.value);
  };

  const handleCokeAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCokeAmount(event.target.value);
  };

  const handleSodaAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewSodaAmount(event.target.value);
  };

  const updateTemperature = (productName: ProductNames) => {
    let temperature = 0;

    switch (productName) {
      case ProductNames.Water:
        temperature = parseInt(newWaterTemperature, 10);
        setNewWaterTemperature("");
        break;
      case ProductNames.Coke:
        temperature = parseInt(newCokeTemperature, 10);
        setNewCokeTemperature("");
        break;
      case ProductNames.Soda:
        temperature = parseInt(newSodaTemperature, 10);
        setNewSodaTemperature("");
        break;
      default:
        break;
    }

    if (!isNaN(temperature)) {
      dispatch(setProductTemperature({ productName, temperature }));
    }
  };

  const updateProductAmount = (productName: ProductNames) => {
    let amount = 0;

    switch (productName) {
      case ProductNames.Water:
        amount = parseInt(newWaterAmount, 10);
        setNewWaterAmount("");
        break;
      case ProductNames.Coke:
        amount = parseInt(newCokeAmount, 10);
        setNewCokeAmount("");
        break;
      case ProductNames.Soda:
        amount = parseInt(newSodaAmount, 10);
        setNewSodaAmount("");
        break;
      default:
        break;
    }

    if (!isNaN(amount)) {
      dispatch(setProductAmount({ productName, amount }));
    }
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className="admin-page">
      <h2>Admin Page</h2>
      {/* Water Temperature */}
      <div className="input-container">
        <TextField
          type="number"
          label="Enter Water Temperature"
          size="small"
          value={newWaterTemperature}
          onChange={handleWaterTemperatureChange}
          className="text-field"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateTemperature(ProductNames.Water)}
          className="set-amount-button"
        >
          Set Water Temperature
        </Button>
        Water Temperature: {waterTemperature}
      </div>

      {/* Coke Temperature */}
      <div className="input-container">
        <TextField
          type="number"
          label="Enter Coke Temperature"
          size="small"
          variant="outlined"
          value={newCokeTemperature}
          onChange={handleCokeTemperatureChange}
          className="text-field"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateTemperature(ProductNames.Coke)}
          className="set-amount-button"
        >
          Set Coke Temperature
        </Button>
        Coke Temperature: {cokeTemperature}
      </div>

      {/* Soda Temperature */}
      <div className="input-container">
        <TextField
          type="number"
          label="Enter Soda Temperature"
          size="small"
          variant="outlined"
          value={newSodaTemperature}
          onChange={handleSodaTemperatureChange}
          className="text-field"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateTemperature(ProductNames.Soda)}
          className="set-amount-button"
        >
          Set Soda Temperature
        </Button>
        Soda Temperature: {sodaTemperature}
      </div>

      {/* Water Amount */}
      <div className="input-container">
        <TextField
          type="number"
          label="Enter Water Amount"
          size="small"
          variant="outlined"
          value={newWaterAmount}
          onChange={handleWaterAmountChange}
          className="text-field"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateProductAmount(ProductNames.Water)}
          className="set-amount-button"
        >
          Set Water Amount
        </Button>
        Water Amount: {waterAmount}
      </div>

      {/* Coke Amount */}
      <div className="input-container">
        <TextField
          type="number"
          label="Enter Coke Amount"
          size="small"
          variant="outlined"
          value={newCokeAmount}
          onChange={handleCokeAmountChange}
          className="text-field"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateProductAmount(ProductNames.Coke)}
          className="set-amount-button"
        >
          Set Coke Amount
        </Button>
        Coke Amount: {cokeAmount}
      </div>

      {/* Soda Amount */}
      <div className="input-container">
        <TextField
          type="number"
          label="Enter Soda Amount"
          size="small"
          variant="outlined"
          value={newSodaAmount}
          onChange={handleSodaAmountChange}
          className="text-field"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateProductAmount(ProductNames.Soda)}
          className="set-amount-button"
        >
          Set Soda Amount
        </Button>
        Soda Amount: {sodaAmount}
      </div>

      {/* Machine Cash */}
      <div className="machine-cash">Machine Cash: {machineCash}</div>

      {/* Reset Button */}
      <div className="reset-button">
        <Button variant="contained" color="error" onClick={handleReset}>
          Reset Machine
        </Button>
      </div>
      <EnergySwitchs />
    </div>
  );
};

export default AdminPage;

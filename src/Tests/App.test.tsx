import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";

import HomePage from "../pages/HomePage";

// Mock store for the test
const store = configureStore({
  reducer: {
    counter: userReducer,
  },
});

describe("<HomePage />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  });

  it("renders without crashing", () => {
    expect(screen.getByText(/Your Total Money:/i)).toBeInTheDocument();
    expect(screen.getByText(/Remaining Time:/i)).toBeInTheDocument();
  });

  it("displays default balance", () => {
    expect(screen.getByText(/Your Total Money: 0/i)).toBeInTheDocument();
  });

  it("increases balance when money is added", () => {
    fireEvent.click(screen.getByTestId("add-1-button"));
    expect(screen.getByText(/Your Total Money: 1/i)).toBeInTheDocument();
  });

  it("displays the machine cash", () => {
    expect(screen.getByText(/Machine Cash:/i)).toBeInTheDocument();
  });

  it("displays the current date and time", () => {
    expect(screen.getByText(/Current Date and Time:/i)).toBeInTheDocument();
  });
});

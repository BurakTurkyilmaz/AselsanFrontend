import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Sabit sıcaklık değerleri
const TEMP = {
  MAX: 10,
  MIN: 0,
};

// Ürün verilerini tutan tip
type ProductData = {
  amount: number;
  temp: number;
};

// Ürün adlarını içeren enum
export enum ProductNames {
  Water = "water",
  Coke = "coke",
  Soda = "soda",
}

// Ürün miktarını güncelleme işlemi için kullanılan payload tipi
type SetProductAmountPayload = {
  productName: ProductNames;
  amount: number;
};

// Ana durum tipi
export interface CounterState {
  balance: number;
  machineCash: number;
  [ProductNames.Water]: ProductData;
  [ProductNames.Coke]: ProductData;
  [ProductNames.Soda]: ProductData;
}

// Ürün sıcaklığını güncelleme işlemi için kullanılan payload tipi
type SetProductTemperaturePayload = {
  productName: ProductNames;
  temperature: number;
};

// Başlangıç durumu
const initialState: CounterState = {
  balance: 0,
  machineCash: Number(localStorage.getItem("machineCash")) || 0,
  [ProductNames.Water]: {
    amount: Number(localStorage.getItem("waterAmount")) || 5,
    temp: Number(localStorage.getItem("waterTemp")) || 10,
  },
  [ProductNames.Coke]: {
    amount: Number(localStorage.getItem("cokeAmount")) || 5,
    temp: Number(localStorage.getItem("cokeTemp")) || 10,
  },
  [ProductNames.Soda]: {
    amount: Number(localStorage.getItem("sodaAmount")) || 5,
    temp: Number(localStorage.getItem("sodaTemp")) || 10,
  },
};

// Redux slice'ı oluşturuluyor
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Ürün miktarını artıran reducer
    incrementProductAmounth: (state, action: PayloadAction<ProductNames>) => {
      state[action.payload].amount += 1;
    },
    // Ürün miktarını azaltan reducer
    decrementProductAmounth: (state, action: PayloadAction<ProductNames>) => {
      state[action.payload].amount -= 1;
      switch (action.payload) {
        case ProductNames.Water:
          state.machineCash += 25;
          break;
        case ProductNames.Coke:
          state.machineCash += 35;
          break;
        case ProductNames.Soda:
          state.machineCash += 45;
          break;
      }
      localStorage.setItem("machineCash", state.machineCash.toString());
    },
    //Ürün sayısını set eden reducer
    setProductAmount: (
      state,
      action: PayloadAction<SetProductAmountPayload>
    ) => {
      const { productName, amount } = action.payload;
      state[productName].amount = amount;
      localStorage.setItem(`${productName}Amount`, amount.toString());
    },

    // İşlemi iptal eden reducer
    cancel: (state) => {
      state.balance = 0;
    },

    // Miktarı belirtilen değer kadar artıran reducer
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    // Miktarı belirtilen değer kadar azaltan reducer
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.balance -= action.payload;
    },
    // Durumu sıfırlayan reducer
    reset: () => {
      const newState = { ...initialState, machineCash: 0 };
      localStorage.clear();
      return newState;
    },
    // Ürün sıcaklığını belirtilen değere ayarlayan reducer
    setProductTemperature: (
      state,
      action: PayloadAction<SetProductTemperaturePayload>
    ) => {
      const { productName, temperature } = action.payload;
      const product = state[productName];

      // Min ve max sıcaklık sınırları
      const minTemp = TEMP.MIN;
      const maxTemp = TEMP.MAX;

      // Yeni sıcaklık değerini kontrol et
      const newTemp = Math.min(Math.max(temperature, minTemp), maxTemp);

      // Sıcaklık değerini güncelle
      product.temp = newTemp;
      localStorage.setItem(`${productName}Temp`, newTemp.toString());
    },
  },
});

// Action'ları dışa aktarıyoruz
export const {
  incrementByAmount,
  reset,
  setProductAmount,
  cancel,
  setProductTemperature,
  decrementProductAmounth,
  decrementByAmount,
} = userSlice.actions;

// Reducer'ı dışa aktarıyoruz
export default userSlice.reducer;

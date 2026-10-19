"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { loadCart } from "@/redux/cart/action";

function CartLoader() {
  const dispatch = useDispatch();

  // بازیابی سبد از localStorage یک بار هنگام لود برنامه
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  return null;
}

export default function Providers({ children, categories }) {
  return (
    <Provider store={store}>
      <CategoriesProvider categories={categories}>
        <CartLoader />
        {children}
      </CategoriesProvider>
    </Provider>
  );
}
import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/storeContext";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  paczkomatId: string;
  blikCode: string;
  blikPassword: string;
}

export const OrderForm: React.FC = () => {
  const { basket, clearBasket, finalPrice, itemsCount } = useStoreContext();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    paczkomatId: "",
    blikCode: "",
    blikPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const products = basket
      .map(
        (i, index) =>
          `x${i.quantity} ${i.product.name} ${i.strength}MG ${i.capacity}ML ${
            index < basket.length - 1 ? "||" : ""
          }`
      )
      .join(" ");

    const request = {
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      paczkomat_id: formData.paczkomatId,
      blik_code: formData.blikCode,
      blik_password: formData.blikPassword,
      products,
      final_price: finalPrice,
      items_count: itemsCount,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      toast.success("Order placed successfully");
      setTimeout(() => {
        clearBasket();
      }, 4000);
    } else {
      toast.error("Ups... Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen px-2 -mt-40">
      <div className="w-full max-w-sm bg-black bg-opacity-50 rounded-md shadow-lg p-2 border-4 border-black">
        <div className="w-full rounded-md shadow-md p-2 border-4 border-white">
          <h2 className="mb-2 mt-2 text-white step-title text-3xl">Order Form</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="fullName" className="block text-white text-xs font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your Full Name"
                className="w-full px-2 py-1 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-800 text-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-xs font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full px-2 py-1 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-800 text-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-white text-xs font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Your Phone Number"
                className="w-full px-2 py-1 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-800 text-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="paczkomatId" className="block text-white text-xs font-medium mb-1">
                Paczkomat ID
              </label>
              <input
                type="text"
                id="paczkomatId"
                name="paczkomatId"
                value={formData.paczkomatId}
                onChange={handleInputChange}
                placeholder="Paczkomat ID"
                className="w-full px-2 py-1 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-800 text-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="blikCode" className="block text-white text-xs font-medium mb-1">
                BLIK Code
              </label>
              <input
                type="text"
                id="blikCode"
                name="blikCode"
                value={formData.blikCode}
                onChange={handleInputChange}
                placeholder="BLIK Code"
                className="w-full px-2 py-1 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-800 text-xs"
                required
              />
            </div>

            <div>
              <label htmlFor="blikPassword" className="block text-white text-xs font-medium mb-1">
                BLIK Password
              </label>
              <input
                type="password"
                id="blikPassword"
                name="blikPassword"
                value={formData.blikPassword}
                onChange={handleInputChange}
                placeholder="BLIK Password"
                className="w-full px-2 py-1 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-800 text-xs"
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-3xl py-2 md:py-2 px-4 sm:px-6 md:px-8 font-medium inline-block text-white 
                hover:bg-transparent hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 step-title"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

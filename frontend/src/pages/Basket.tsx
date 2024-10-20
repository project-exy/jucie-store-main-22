// src/components/Basket.tsx

import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/storeContext";

export const Basket: React.FC = () => {
  const { basket, finalPrice, itemsCount, changeItemQuantity } =
    useStoreContext();

  if (basket.length <= 0)
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        {/* Center content vertically and horizontally */}
        <div className="text-center">
          <p className="text-4xl my-16">Thank you</p>

          <Link
            to="/juices"
            className="bg-purple-950 rounded-3xl py-3 px-8 font-medium inline-block 
                  mr-4 hover:bg-transparent hover:border-purple-950 hover:text-white duration-300 hover:border border-2 border-white step-title"
          >
            BACK TO SHOPPING
          </Link>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center items-center mt-36">
      {" "}
      {/* Center content vertically and horizontally */}
      <div className="gap-2 font-semibold w-full">
        {" "}
        {/* Restrict width for better centering */}
        <div className="w-full">
          <div className="w-full">
            <table className="w-full text-center">
              <thead>
                <tr className="grid grid-cols-5 gap-4">
                  <th className="text-white">PRODUCT</th>
                  <th className="text-white">PRICE</th>
                  <th className="text-white">AMOUNT</th>
                  <th className="text-white">SUMMARY</th>
                  <th className="text-white">DELETE</th>
                </tr>
              </thead>
            </table>
            <div className="h-72 overflow-y-auto custom-scrollbar">
              <table className="w-full text-center">
                <tbody>
                  {basket.map((i) => (
                    <tr
                      key={i.strength + i.capacity + i.product.id}
                      className="pl-2 grid grid-cols-5 gap-4 items-center"
                    >
                      <td className="flex flex-col items-center justify-center">
                        <img
                          src={i.product.image_url}
                          alt="Ragnarok"
                          className="w-24 h-24"
                        />
                        <p className="text-white">
                          {i.product.name}
                          <br />
                          <span className="text-sm">
                            {i.strength}MG {i.capacity}ML
                          </span>
                        </p>
                      </td>
                      <td className="text-white">{i.price}</td>
                      <td className="text-white">
                        <span className="flex flex-col items-center">
                          <button
                            onClick={() =>
                              changeItemQuantity(i, i.quantity + 1)
                            }
                            className="text-green-500 text-2xl" // Zmiana koloru tekstu na zielony
                          >
                            +
                          </button>
                          {i.quantity}
                          <button
                            onClick={() =>
                              changeItemQuantity(i, i.quantity - 1)
                            }
                            className="text-red-500 text-2xl" // Zmiana koloru tekstu na czerwony
                          >
                            -
                          </button>
                        </span>
                      </td>
                      <td className="text-white">
                        {(i.price * i.quantity).toFixed(2)}
                      </td>
                      <td className="text-white">
                        <button
                          onClick={() => changeItemQuantity(i, 0)}
                          className="text-red-500"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end w-full space-x-4 ml-160 mt-6">
            <p className="text-white text-2xl step-title">SUMMARY</p>
          </div>
          <div className="flex justify-end w-full space-x-4 ml-160">
            <p className="text-white">TOTAL PRICE: {finalPrice}PLN</p>
          </div>
          <div className="flex justify-end w-full space-x-4 ml-160">
            <p className="text-white">TOTAL PRODUCTS: {itemsCount}</p>
          </div>
          <div className="flex justify-between space-x-4 w-full">
            <div className="mt-10 text-white">
              <Link
                to="/juices"
                className="rounded-3xl py-3 px-8 font-medium inline-block 
                mr-4 hover:bg-transparent hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 step-title"
              >
                KEEP SHOPPING
              </Link>
            </div>

            <div className="mt-10 text-white">
              <Link
                to="/order"
                className="rounded-3xl py-3 px-8 font-medium inline-block 
                mr-4 hover:bg-transparent hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 step-title"
              >
                PROCEED TO ORDER
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

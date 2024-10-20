import { useStoreContext } from "../utils/storeContext.tsx";
import { useParams } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BasketItem } from "../types";
import toast from "react-hot-toast";

export const Product = () => {
  const { id } = useParams();
  const { getProductById, prices, addItemToBasket, basket } = useStoreContext();

  const product = getProductById(Number(id));

  const [strength, setStrength] = useState("3");
  const [price, setPrice] = useState(prices[0].price.toString());
  const [quantity, setQuantity] = useState(1);

  const handleButtonClick = () => {
    if (!strength) return;
    const capacity = prices.find((p) => p.price === Number(price))?.capacity;
    if (!capacity) return;

    const basketItem: BasketItem = {
      product: product!,
      strength: Number(strength),
      capacity: capacity,
      price: Number(price),
      quantity: quantity,
    };
    addItemToBasket(basketItem);
    setQuantity(1);
    toast.success(`Added ${product?.name} to the basket`);
  };

  useEffect(() => {
    // Zablokuj przewijanie po zamontowaniu komponentu
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh"; // Zabezpieczenie przed rozszerzaniem body

    // Przywróć możliwość przewijania po odmontowaniu komponentu
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, []);

  useEffect(() => {
    console.log(basket);
  }, [basket]);

  return (
    <div className="flex items-center justify-center relative">
      {" "}
      {/* h-screen zapewnia pełną wysokość okna */}
      <div className="w-full max-w-4xl relative mb-28">
        <div className="absolute -top-20 w-full flex justify-center z-20">
          <h4 className="font-semibold capitalize text-6xl step-title text-white px-6">
            {product?.name}
          </h4>
        </div>
        <div className="relative bg-black bg-opacity-50 p-4 rounded-lg shadow-xl">
          <div className="border-8 border-black rounded-lg flex items-center justify-between p-6">
            <div className="grid grid-cols-1">
              <img
                src={product?.image_url}
                className="w-72 h-72 object-contain"
                alt={product?.name}
              />
              <div className="text-center text-2xl step-title mt-4">
                {price} PLN
              </div>
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <p className="text-lg text-white mb-4 text-left max-w-xs">
                <span className="text-purple-950 text-2xl font-bold">
                  {product?.name}
                </span>
                {product?.description}
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4 items-center">
                  <div>
                    <select
                      id="strength"
                      className="border-solid bg-black border-black border-4 px-5 py-2 rounded cursor-pointer font-bold w-[200px] bg-transparent"
                      value={strength}
                      onChange={(e) => setStrength(e.target.value)}
                    >
                      <option value="3" className="bg-black">
                        3 MG
                      </option>
                      <option value="6" className="bg-black">
                        6 MG
                      </option>
                      <option value="12" className="bg-black">
                        12 MG
                      </option>
                      <option value="18" className="bg-black">
                        18 MG
                      </option>
                    </select>
                  </div>
                  <div>
                    <select
                      id="capacity"
                      className="border-solid bg-black border-black border-4 px-5 py-2 rounded cursor-pointer font-bold w-[200px] bg-transparent"
                      value={price}
                      onChange={(e) => setPrice(e.target?.value)}
                    >
                      {prices?.map((p) => (
                        <option key={p.id} value={p.price} className="bg-black">
                          {p.capacity} ML
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex gap-2">
                    <div className="flex gap-2 rounded-2xl py-2 px-2 ml-24">
                      <button
                        onClick={() =>
                          quantity > 0 && setQuantity((prev) => prev + 1)
                        }
                        className="border-4 border-purple-950 rounded-2xl py-1 px-3 text-2xl
                                                hover:bg-transparent hover:border-white
                                                hover:text-white duration-300 flex items-center justify-center text-white"
                      >
                        +
                      </button>
                      <span className="font-mono text-4xl">{quantity}</span>
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity((prev) => prev - 1)
                        }
                        className="border-4 border-purple-950 rounded-2xl py-1 px-4 text-2xl
                                                hover:bg-transparent hover:border-white
                                                hover:text-white duration-300 flex items-center justify-center text-white"
                      >
                        -
                      </button>
                    </div>
                    <button
                      className="border-4 border-purple-950 rounded-2xl py-2 px-4 
                                            hover:bg-transparent hover:border-white
                                            hover:text-white duration-300 flex items-center justify-center"
                      onClick={handleButtonClick}
                    >
                      <FaShoppingBasket size={36} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

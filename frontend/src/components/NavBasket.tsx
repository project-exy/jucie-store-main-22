import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useStoreContext } from "../utils/storeContext";

interface NavBasketProps {
  onProceed: () => void; // Funkcja do schowania koszyka
}

export const NavBasket = ({ onProceed }: NavBasketProps) => { 
  const { basket, finalPrice, changeItemQuantity } = useStoreContext();

  return (
    <div className="absolute top-16 right-4 flex flex-col rounded-lg backdrop-blur-md
         bg-black bg-opacity-50 p-4 z-50 max-h-96 w-80 border-black border-2 shadow-lg">
      <div className="overflow-y-scroll max-h-64 space-y-4 custom-scrollbar">
        {basket.length > 0 ? (
          basket.map((i) => (
            <div
              key={i.product.id + i.price + i.strength}
              className="flex items-center justify-between gap-3 border-b border-gray-500 pb-2"
            >
              <img src={i.product.image_url} alt={i.product.name} className="w-16 h-16 object-cover" />
              <div className="flex flex-col w-1/2">
                <p className="text-white font-semibold">{i.product.name}</p>
                <p className="text-sm text-gray-300">
                  {i.strength} MG, {i.capacity} ML
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1">
                {/* Ikona "+" */}
                <button
                  className="text-green-500 hover:text-green-700 transition-colors duration-300"
                  onClick={() => changeItemQuantity(i, i.quantity + 1)}
                >
                  <FaPlus size={16} />
                </button>
                <p className="text-white">{i.quantity}</p>
                {/* Ikona "-" */}
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  onClick={() => changeItemQuantity(i, i.quantity - 1)}
                >
                  <FaMinus size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">Your basket is empty</p>
        )}
      </div>

      <div className="mt-2">
        <div className="flex justify-center text-white text-lg font-semibold">
          <span>Total:</span>
          <span>{finalPrice} PLN</span>
        </div>
        <div className="mt-2">
          <Link
           to="/basket"
           onClick={onProceed}
            className="rounded-3xl py-1 px-6 font-medium inline-block 
                mr-4 hover:bg-transparent hover:border-white hover:text-white duration-300 hover:border-2 border-2 border-purple-950 step-title"
         >
           Proceed to Basket
          </Link>
        </div>
      </div>
    </div>
  );
};

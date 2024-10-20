import { FaShoppingBasket } from "react-icons/fa";
import { Product } from "../types";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const ProductTile = ({ product }: { product: Product }) => {
  return (
    <>
      <h4 className="font-semibold capitalize text-3xl step-title text-white">
        {product.name}
      </h4>
      <img src={`${product.image_url}`} className="w-72 h-72 object-contain" />
      <Link
        to={`/juices/${product.id}`}
        className="text-white rounded-3xl py-2 px-8 border-4
             border-purple-950 hover:bg-transparent
              hover:border-white hover:text-white duration-300 
              flex items-center justify-center mt-4"
      >
        <FaShoppingBasket size={32} />
      </Link>
    </>
  );
};
export const LoadingProductTile = () => {
  return (
    <>
      <h4 className="font-semibold capitalize text-3xl step-title text-white">
        JUICE
      </h4>
      <AiOutlineLoading3Quarters
        size={32}
        className="animate-spin duration-300 w-72 h-72 p-12"
      />
      <div
        className="text-white rounded-3xl py-3 px-8 border-4
             border-purple-950 hover:bg-transparent
              hover:border-purple-950 hover:text-white duration-300 
              flex items-center justify-center mt-4"
      >
        <FaShoppingBasket size={32} />
      </div>
    </>
  );
};

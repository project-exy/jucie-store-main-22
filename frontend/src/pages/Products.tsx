import { useStoreContext } from "../utils/storeContext";
import { LoadingProductTile, ProductTile } from "../components/ProductTile";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Products = () => {
  const { products, isLoading } = useStoreContext();
  const loadingProducts = [1, 2, 3, 4, 5, 6];

  // State to track the currently displayed product index (for both mobile and desktop)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle next and previous navigation (for both mobile and desktop)
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Determine the products to display based on the screen size (one for mobile, three for desktop)
  const visibleProducts = products.slice(currentIndex, currentIndex + 3);
  const mobileProduct = products[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-6xl font-bold text-white -mt-12 step-title">
        ULTIMATE
      </h2>

      {/* Mobile View: Single product with arrows */}
      <div className="relative h-auto w-full max-w-xs md:hidden p-6 rounded-lg bg-black bg-opacity-50 border-4 border-black flex items-center justify-center">
        {/* Left Arrow */}
        <button
          className="absolute left-4 bg-white bg-opacity-20 hover:bg-opacity-50 p-4 rounded-full z-10" // Positioned correctly
          onClick={handlePrev}
        >
          <FaChevronLeft size={24} />
        </button>

        <div className="border-4 border-white rounded-lg p-2 flex items-center justify-center"> {/* Increased padding to 2 */}
          <div className="flex justify-center items-center">
            {!isLoading && mobileProduct ? (
              <div className="border-4 border-purple-950 rounded-lg flex flex-col items-center justify-center shadow-lg p-6 min-w-[18rem]">
                <ProductTile product={mobileProduct} />
              </div>
            ) : (
              <div className="border-4 border-black rounded-lg flex flex-col items-center justify-center shadow-lg p-6 min-w-[18rem]">
                <LoadingProductTile />
              </div>
            )}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-4 bg-white bg-opacity-20 hover:bg-opacity-50 p-4 rounded-full z-10" // Positioned correctly
          onClick={handleNext}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Desktop View: Three products with arrows */}
      <div className="relative hidden md:flex h-auto max-w-6xl p-2 rounded-lg bg-black bg-opacity-50 border-4 border-black items-center justify-between">
        {/* Left Arrow */}
        <button
          className="absolute left-4 bg-white bg-opacity-20 hover:bg-opacity-50 p-4 rounded-full z-10" // Positioned correctly
          onClick={handlePrev}
        >
          <FaChevronLeft size={24} />
        </button>

        <div className="border-4 border-white rounded-lg p-6 flex items-center justify-center w-full"> {/* Increased padding to 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
            {!isLoading && products.length > 0 ? (
              visibleProducts.map((prod, index) => (
                <div
                  key={prod.id || index}
                  className="border-4 border-purple-950 rounded-lg flex flex-col items-center justify-center shadow-lg p-6 min-w-[18rem]"
                >
                  <ProductTile product={prod} />
                </div>
              ))
            ) : (
              loadingProducts.map((p) => (
                <div
                  key={p}
                  className="border-4 border-black rounded-lg flex flex-col items-center justify-center shadow-lg p-6 min-w-[18rem]"
                >
                  <LoadingProductTile />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-4 bg-white bg-opacity-20 hover:bg-opacity-50 p-4 rounded-full z-10" // Positioned correctly
          onClick={handleNext}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

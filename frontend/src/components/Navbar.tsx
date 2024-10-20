import { useRef, useEffect, MouseEvent, useState } from "react";
import pjlogo from "../assets/pjlogo.png";
import { Link } from "react-router-dom";
import { FaShoppingBasket, FaBars, FaTimes } from "react-icons/fa";
import { useStoreContext } from "../utils/storeContext";
import { NavBasket } from "./NavBasket";

export const Navbar = () => {
  const { itemsCount } = useStoreContext();
  const [isBasket, setIsBasket] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const basketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (basketRef.current && !basketRef.current.contains(event.target as Node)) {
        setIsBasket(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);

  // Funkcja do zamykania menu
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Funkcja do schowania koszyka
  const handleBasketClose = () => {
    setIsBasket(false);
  };

  return (
    <>
      {/* Efekt rozmycia tła */}
      {isMenuOpen && (
        <div className="blur-background" onClick={handleMenuClose} />
      )}

      <nav className="fixed relative flex justify-between items-center p-4 bg-black bg-opacity-50 border-4 border-black w-full px-4 m-auto rounded-lg shadow-2xl">
        <Link to="/">
          <img src={pjlogo} className="w-40 cursor-pointer" alt="PJ Logo" />
        </Link>

        {/* Menu na komputerze */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-5">
            <li className="list-none inline-block">
              <Link
                to="/how"
                className="no-underline text-white px-2 py-1 pacifico-regular text-3xl hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 rounded-2xl"
              >
                HOW ?
              </Link>
            </li>
            <li className="list-none inline-block">
              <Link
                to="/ProductsTypes"
                className="no-underline text-white px-2 py-1 pacifico-regular text-3xl hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 rounded-2xl"
              >
                JUICES
              </Link>
            </li>
            <li className="list-none inline-block">
              <Link
                to="/contact"
                className="no-underline text-white px-2 py-1 pacifico-regular text-3xl hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 rounded-2xl"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        {/* Hamburger menu (na urządzenia mobilne) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white mr-4 hover:text-purple-500 transition-all duration-300"
          >
            <FaBars size={36} />
          </button>
        </div>

        {/* Koszyk */}
        <div ref={basketRef} className="relative">
          <button
            onClick={() => setIsBasket((prev) => !prev)}
            className="relative hover:text-purple-500 transition-all duration-300"
          >
            <FaShoppingBasket size={36} />
            {itemsCount > 0 && !isBasket && (
              <span className="absolute top-7 bg-purple-800 text-white rounded-full px-1.5 text-sm">
                {itemsCount}
              </span>
            )}
          </button>
          {itemsCount > 0 && isBasket && (
            <NavBasket onProceed={handleBasketClose} />
          )}
        </div>

        {/* Hamburger menu */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 right-0 h-screen flex flex-col items-center justify-center z-20 bg-black bg-opacity-80">
            {/* Krzyżyk do zamknięcia menu */}
            <button
              onClick={handleMenuClose}
              className="absolute top-8 right-16 text-white hover:text-purple-500 transition-all duration-300 z-30"
            >
              <FaTimes size={36} />
            </button>

            <ul className="flex flex-col items-center space-y-2 mt-20 px-4">
              <li>
                <Link
                  to="/how"
                  onClick={handleMenuClose} // Zamknij menu po kliknięciu
                  className="block w-48 rounded-3xl py-2 font-medium mx-auto 
                                hover:bg-transparent hover:border-white hover:text-white duration-300 
                                hover:border-4 border-4 border-purple-950 step-title text-center"
                >
                  HOW ?
                </Link>
              </li>
              <li>
                <Link
                  to="/ProductsTypes"
                  onClick={handleMenuClose} // Zamknij menu po kliknięciu
                  className="block w-48 rounded-3xl py-2 font-medium mx-auto 
                                hover:bg-transparent hover:border-white hover:text-white duration-300 
                                hover:border-4 border-4 border-purple-950 step-title text-center"
                >
                  JUICES
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={handleMenuClose} // Zamknij menu po kliknięciu
                  className="block w-48 rounded-3xl py-2 font-medium mx-auto 
                                hover:bg-transparent hover:border-white hover:text-white duration-300 
                                hover:border-4 border-4 border-purple-950 step-title text-center"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="opacity-0 flex justify-between h-24 items-center p-4 bg-black bg-opacity-50 border-4 border-black w-full mx-2 px-2 m-auto rounded-lg shadow-2xl"></div>
    </>
  );
};

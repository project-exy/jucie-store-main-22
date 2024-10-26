import { useRef, useEffect, useState, useCallback } from "react";
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

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (basketRef.current && !basketRef.current.contains(event.target as Node)) {
      setIsBasket(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
    };
  }, [handleClickOutside]);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleBasketClose = () => {
    setIsBasket(false);
  };

  return (
    <>
      {/* Efekt rozmycia tła */}
      {isMenuOpen && (
        <div className="blur-background" onClick={handleMenuClose} />
      )}

      <div className="w-full px-4 md:px-8">
        <nav className="fixed relative bg-black bg-opacity-50 border-4 border-black w-full rounded-lg shadow-2xl z-30 p-1">
          {/* Wewnętrzny biały border */}
          <div className="relative border-4 border-white rounded-lg p-3">
            <div className="flex justify-between items-center">
              <Link to="/">
                <img src={pjlogo} className="w-40 cursor-pointer" alt="PJ Logo" />
              </Link>

              {/* Menu na komputerze */}
              <div className="hidden md:flex flex-1 justify-center">
                <ul className="flex space-x-5">
                  <li className="list-none inline-block">
                    <Link
                      to="/how"
                      className="no-underline text-white px-2 py-1 step-title text-3xl hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 rounded-2xl"
                    >
                      HOW ?
                    </Link>
                  </li>
                  <li className="list-none inline-block">
                    <Link
                      to="/ProductsTypes"
                      className="no-underline text-white px-2 py-1 step-title text-3xl hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 rounded-2xl"
                    >
                      JUICES
                    </Link>
                  </li>
                  <li className="list-none inline-block">
                    <Link
                      to="/contact"
                      className="no-underline text-white px-2 py-1 step-title text-3xl hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 rounded-2xl"
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
                  className="text-white ml-24 hover:text-purple-500 transition-all duration-300"
                >
                  <FaBars size={36} />
                </button>
              </div>

              {/* Koszyk */}
              <div ref={basketRef} className="relative z-30">
                <button
                  onClick={() => setIsBasket((prev) => !prev)}
                  className="relative hover:text-purple-500 transition-all duration-300"
                >
                  <FaShoppingBasket size={36} />
                  {itemsCount > 0 && !isBasket && (
                    <span className="absolute top-7 bg-purple-800 text-white rounded-full px-1.5 text-sm step-title">
                      {itemsCount}
                    </span>
                  )}
                </button>
                {itemsCount > 0 && isBasket && (
                  <NavBasket onProceed={handleBasketClose} />
                )}
              </div>
            </div>
          </div>

          {/* Hamburger menu */}
          {isMenuOpen && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen flex items-center justify-center z-40 bg-opacity-80 overflow-hidden">
              <div className="relative w-[90%] max-w-[350px] h-[400px] bg-black bg-opacity-70 rounded-lg flex flex-col items-center justify-center overflow-hidden z-50 border-4 border-black">
                {/* Wewnętrzny biały border */}
                <div className="absolute inset-4 border-4 border-white rounded-lg">
                  {/* Krzyżyk do zamknięcia menu */}
                  <button
                    onClick={handleMenuClose}
                    className="absolute top-2 right-2 text-white hover:text-purple-500 transition-all duration-300 z-50"
                  >
                    <FaTimes size={36} />
                  </button>

                  {/* Lista przycisków */}
                  <ul className="flex flex-col items-center space-y-4 px-4 mt-16">
                    <li>
                      <Link
                        to="/how"
                        onClick={handleMenuClose}
                        className="step-title block w-48 rounded-3xl py-2 font-medium mx-auto 
                                  hover:bg-transparent hover:border-white hover:text-white duration-300 
                                  hover:border-4 border-4 border-purple-950 text-center text-3xl"
                      >
                        HOW ?
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ProductsTypes"
                        onClick={handleMenuClose}
                        className="step-title block w-48 rounded-3xl py-2 font-medium mx-auto 
                                  hover:bg-transparent hover:border-white hover:text-white duration-300 
                                  hover:border-4 border-4 border-purple-950 text-center text-3xl"
                      >
                        JUICES
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        onClick={handleMenuClose}
                        className="step-title block w-48 rounded-3xl py-2 font-medium mx-auto 
                                  hover:bg-transparent hover:border-white hover:text-white duration-300 
                                  hover:border-4 border-4 border-purple-950 text-center text-3xl"
                      >
                        CONTACT
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </nav>
        <div className="opacity-0 flex justify-between h-24 items-center p-4 bg-black bg-opacity-50 border-4 border-black w-full rounded-lg shadow-2xl"></div>
      </div>
    </>
  );
};
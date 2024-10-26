import { Link } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";
import { useEffect } from "react";

export const ProductsTypes = () => {
  useEffect(() => {
    // Zablokowanie przewijania
    document.body.style.overflow = 'hidden';

    // Przywrócenie przewijania przy odmontowaniu komponentu
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <MainWrapper>
      <div className="relative flex-grow flex items-center justify-center">
        {/* Zewnętrzny czarny border */}
        <div className="absolute bg-black bg-opacity-50 rounded-lg shadow-2xl border-4 border-black top-8 md:top-24 transform translate-y-[-40px] md:translate-y-[-80px] p-6">
          {/* Wewnętrzny biały border */}
          <div className="relative border-4 border-white rounded-lg p-4 md:p-8">
            {/* Ustawienie siatki przycisków */}
            <h4 className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold capitalize step-title text-white text-xl sm:text-2xl md:text-4xl justify-center mt-4 mb-4">
              <Link
                to="/Products"
                className="border-4 border-purple-950 p-4 sm:p-6 rounded-2xl text-white hover:border-white"
              >
                ULTIMATE
              </Link>
              <Link
                to="/les-creations"
                className="border-4 border-purple-950 p-4 sm:p-6 rounded-2xl text-white hover:border-white"
              >
                LES CREATIONS
              </Link>
              <Link
                to="/hidden-potion"
                className="border-4 border-purple-950 p-4 sm:p-6 rounded-2xl text-white hover:border-white"
              >
                HIDDEN POTION
              </Link>
              <Link
                to="/mystery"
                className="border-4 border-purple-950 p-4 sm:p-6 rounded-2xl text-white hover:border-white"
              >
                MYSTERY
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

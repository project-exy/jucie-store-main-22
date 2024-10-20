import { Link } from "react-router-dom";
import { MainWrapper } from "../components/MainWrapper";

export const ProductsTypes = () => {
  return (
    <MainWrapper>
      <div className="relative flex-grow flex items-center justify-center">
        <div className="absolute bg-black bg-opacity-50 rounded-lg shadow-2xl py-2 border-4 border-black top-12 transform translate-y-[-80px]"> 
          {/* Zmiana: użycie top-12 i translate-y-[-50px] dla przesunięcia w górę */}
          <div className="p-4 rounded-2xl">
            <h4 className="grid font-semibold capitalize step-title text-white text-4xl gap-8 justify-center mt-4 mb-4">
              {/* Przycisk ULTIMATE */}
              <Link
                to="/Products"
                className="border-4 border-purple-950 p-6 mx-6 rounded-2xl text-white hover:border-4 hover:border-white"
              >
                ULTIMATE
              </Link>
              {/* Przycisk LES CREATIONS */}
              <Link
                to="/les-creations"
                className="border-4 border-purple-950 p-6 mx-6 rounded-2xl text-white hover:border-4 hover:border-white"
              >
                LES CREATIONS
              </Link>
              {/* Przycisk HIDDEN POTION */}
              <Link
                to="/hidden-potion"
                className="border-4 border-purple-950 p-6 mx-6 rounded-2xl text-white hover:border-4 hover:border-white"
              >
                HIDDEN POTION
              </Link>
              {/* Przycisk MYSTERY */}
              <Link
                to="/mystery"
                className="border-4 border-purple-950 p-6 mx-6 rounded-2xl text-white hover:border-4 hover:border-white"
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

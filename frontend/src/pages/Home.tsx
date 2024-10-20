import { MainWrapper } from "../components/MainWrapper";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <MainWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mt-0 md:mt-10 mb-80 text-center"> {/* Dodano text-center tutaj */}
          {/* Nagłówek - responsywna wielkość czcionki */}
          <div className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight text-white step-title">
            PROJEKT JUICE
          </div>

          {/* Podtytuł - responsywna wielkość czcionki */}
          <span className="font-semibold text-purple-950 text-4xl sm:text-5xl md:text-6xl block gradient-text pacifico-regular mt-2">
            Level Up Your Vaping
          </span>

          {/* Akapit - responsywna wielkość czcionki */}
          <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold mt-2 pacifico-regular max-w-xs sm:max-w-md md:max-w-lg mx-auto">
            At Projekt Juice, we specialize in crafting premium vape oils using top-quality flavors from the most renowned brands.
          </p>

          {/* Link do produktów - responsywny padding i margines */}
          <div className="mt-4 text-white">
            <Link
              to="/ProductsTypes"
              className="rounded-3xl py-2 md:py-3 px-4 sm:px-6 md:px-8 font-medium inline-block 
                hover:bg-transparent hover:border-white hover:text-white duration-300 hover:border-4 border-4 border-purple-950 step-title"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

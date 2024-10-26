import { MainWrapper } from "../components/MainWrapper";
import { useEffect } from "react";

export const Contact = () => {
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
      <div className="flex-grow flex items-center justify-center py-10 -mt-14 md:py-24">
        {/* Zewnętrzny czarny border */}
        <div className="w-full max-w-screen-sm md:max-w-screen-lg bg-black bg-opacity-50 rounded-lg shadow-2xl p-6 border-4 border-black">
          {/* Wewnętrzny biały border */}
          <div className="relative border-4 border-white rounded-lg p-4 md:p-4">
            <h4 className="grid font-semibold capitalize text-4xl md:text-5xl lg:text-6xl step-title text-white gap-6 md:gap-8 justify-center p-4 md:p-8 mx-4 md:mx-6 rounded-2xl mt-4 md:mt-0">
              <div className="hidden md:flex md:justify-center">
                <span className="text-purple-950">telegram:</span>
                <span className="mx-2">project juice</span>
              </div>
              <div className="hidden md:flex md:justify-center">
                <span className="text-purple-950">signal:</span>
                <span className="mx-2">project juice</span>
              </div>
              <div className="flex flex-col items-center text-center md:hidden">
                <span className="text-purple-950">telegram:</span>
                <span>project juice</span>
              </div>
              <div className="flex flex-col items-center text-center md:hidden">
                <span className="text-purple-950">signal:</span>
                <span>project juice</span>
              </div>
            </h4>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
};

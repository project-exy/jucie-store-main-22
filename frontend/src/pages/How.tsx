import vape from "../assets/vape.png";
import basket from "../assets/basket.png";
import chat from "../assets/chat.png";

export const How = () => {
  return (
    <div className="flex-grow flex items-center justify-center py-10 sm:py-14 md:py-32 mt-2 sm:mt-10 md:mt-2"> {/* Zwiększono py i mt dla większych ekranów */}
      <div className="w-full max-w-screen-lg px-4">
        <div className="relative bg-black bg-opacity-50 rounded-lg shadow-2xl p-6 md:p-8 border-4 border-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-4 border-purple-950 rounded-lg flex flex-col items-center gap-4 p-4">
              <img src={vape} className="w-20 h-20 object-contain" alt="Step 1" />
              <p className="text-white text-lg text-center mt-2 pacifico-regular">
                ADD TO BASKET
              </p>
            </div>
            <div className="border-4 border-purple-950 rounded-lg flex flex-col items-center gap-4 p-4">
              <img src={basket} className="w-20 h-20 object-contain" alt="Step 2" />
              <p className="text-white text-lg text-center mt-2 pacifico-regular">
                FILL UP IMPORTANT INFORMATIONS
              </p>
            </div>
            <div className="border-4 border-purple-950 rounded-lg flex flex-col items-center gap-4 p-4">
              <img src={chat} className="w-20 h-20 object-contain" alt="Step 3" />
              <p className="text-white text-lg text-center mt-2 pacifico-regular">
                W8 FOR YOUR JUICE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

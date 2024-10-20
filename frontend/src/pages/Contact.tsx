import { MainWrapper } from "../components/MainWrapper";

export const Contact = () => {
  return (
    <MainWrapper>
      <div className="flex-grow flex items-center justify-center py-24 md:py-36 mb-80">
        <div className="w-full max-w-screen-sm md:max-w-screen-lg px-4 bg-black bg-opacity-50 rounded-lg shadow-2xl p-6 border-4 border-black">
          <h4 className="grid font-semibold capitalize text-4xl md:text-5xl lg:text-6xl step-title text-white gap-6 md:gap-8 justify-center p-4 md:p-8 mx-4 md:mx-6 rounded-2xl">
            <span>telegram: projekt juice</span>
            <span>signal: projekt juice</span>
          </h4>
        </div>
      </div>
    </MainWrapper>
  );
};

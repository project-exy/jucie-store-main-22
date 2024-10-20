import { MainWrapper } from "../components/MainWrapper";
import walter from "../assets/grocery-image.png"
import { Link } from "react-router-dom";

export const Home = () => {
    return (

        <MainWrapper>
            <div className="mt-48 max-w-xl">

                <h1 className="text-6xl font-semibold mb-4 leading-normal text-white">
                    PROJEKT JUICE
                    <br />
                    <span className="font-light text-purple-950">Level Up Your Vaping</span>
                </h1>
                <p className="text-lg text-white">At Projekt Juice, we specialize in crafting premium vape oils using top-quality flavors from the most renowned brands.</p>
                <div className="mt-10 text-white">
                    <Link to="/juices" className="bg-purple-950 rounded-3xl py-3 px-8 font-medium 
                    inline-block mr-4 hover:bg-transparent hover:border-purple-950
                     hover:text-white duration-300 hover:border border border-transparent">
                        Order Now
                    </Link>
                </div>
                <div className="mt-10">
                    <img src={walter} className="w-1/2 mx-auto xl:w-1/3 xl:absolute bottom-0 right-60" />
                </div>
            </div>
        </MainWrapper>

    );
};


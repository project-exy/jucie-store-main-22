import vape from "../assets/vape.png"
import basket from "../assets/basket.png"
import chat from "../assets/chat.png"
export const How = () => {
    return (
        <div className="flex-grow flex items-center justify-center py-16">
            <div className="w-full max-w-screen-lg px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="border-4 border-white rounded-lg flex flex-col items-center justify-center gap-6 shadow-lg w-full max-w-xs p-6">
                        <img src={vape} className="w-24 h-24 object-contain" alt="Step 1" />
                        <div className="text-center">
                            <h4 className="font-semibold capitalize text-3xl step-title text-white">STEP 1</h4>
                            <p className="text-white text-lg mt-4">WYBIERZ PRODUKT ODPOWIEDNI SMAK MOC ORAZ POJEMNOŚĆ NASTEPNIE DODAJ DO KOSZYKA</p>
                        </div>
                    </div>
                    <div className="border-4 border-white rounded-lg flex flex-col items-center justify-center gap-6 shadow-lg w-full max-w-xs p-6">
                        <img src={basket} className="w-24 h-24 object-contain" alt="Step 2" />
                        <div className="text-center">
                            <h4 className="font-semibold capitalize text-3xl step-title text-white ">STEP 2</h4>
                            <p className="text-white text-lg mt-4">PRZEJDŹ DO KOSZYKA. SFINALIZUJ ZAMÓWIENIE PODAJĄC ADRES PACZKOMATU ORAZ NICK Z APLIKACJI SIGNAL</p>
                        </div>
                    </div>
                    <div className="border-4 border-white rounded-lg flex flex-col items-center justify-center gap-6 shadow-lg w-full max-w-xs p-6">
                        <img src={chat} className="w-24 h-24 object-contain" alt="Step 3" />
                        <div className="text-center">
                            <h4 className="font-semibold capitalize text-3xl step-title text-white">STEP 3</h4>
                            <p className="text-white text-lg mt-4">OCZEKUJ NA ULTRASZYBKĄ ODPOWIEDŹ NA APLIKACJI SIGNAL W CELU SFINALIZOWANIA ZAMÓWIENIA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
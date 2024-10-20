import { Link } from "react-router-dom"
import { useStoreContext } from "../utils/storeContext"

export const NavBasket = () => {
    const { basket, finalPrice, changeItemQuantity } = useStoreContext()
    return (
        <div className="absolute top-16 right-4 flex flex-col rounded-lg backdrop-blur-md
         bg-white bg-opacity-10 p-2 z-50 max-h-96 w-80">
            <div className="overflow-y-scroll">
                {basket.map(i => (
                    <div key={i.product.id + i.price + i.strength}
                        className="flex items-center justify-between gap-1 pr-1 break-words"
                    >
                        <img src={i.product.image_url} className="w-16 h-16" />
                        <p>{i.product.name}</p>
                        <p>{i.strength} MG</p>
                        <p>{i.capacity} ML</p>
                        <span className="flex flex-col">
                            <button onClick={() => changeItemQuantity(i, i.quantity + 1)}>+</button>
                            {i.quantity}
                            <button onClick={() => changeItemQuantity(i, i.quantity - 1)}>-</button>
                        </span>
                    </div>
                ))}
            </div>
            Total: {finalPrice} PLN
            <Link to="/basket" >
                Order
            </Link>
        </div>
    )
}
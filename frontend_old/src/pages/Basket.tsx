import { Link } from "react-router-dom"
import { useStoreContext } from "../utils/storeContext"
import { useState } from "react";
import toast from "react-hot-toast";

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    paczkomatId: string;
    blikCode: string;
    blikPassword: string;
}

export const Basket: React.FC = () => {
    const { basket, clearBasket, finalPrice, itemsCount, changeItemQuantity } = useStoreContext()
    const [isOrderDone, setIsOrderDone] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phoneNumber: '',
        paczkomatId: '',
        blikCode: '',
        blikPassword: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const products = (() => {
            let products = ""
            let counter = 0
            for (let i of basket) {
                counter++
                products = products + ` x${i.quantity} ${i.product.name} ${i.strength}MG ${i.capacity}ML ${counter < basket.length ? "||" : ""} `
            }
            return products
        })()
        const request = {
            full_name: formData.fullName,
            email: formData.email,
            phone_number: formData.phoneNumber,
            paczkomat_id: formData.paczkomatId,
            blik_code: formData.blikCode,
            blik_password: formData.blikPassword,
            products,
            final_price: finalPrice,
            items_count: itemsCount
        }
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                request
            ),
        })
        if (response.ok) {
            toast.success('Order placed successfully')
            setIsOrderDone(true)
            setTimeout(() => {
                clearBasket()
            }, 4000)
        } else {
            toast.error("Ups... Something went wrong")
        }

    }
    if (basket.length <= 0) return (
        <div className="mt-60">
            {isOrderDone
                ? <p className="text-4xl my-16">Thank you for the order</p>
                : <p className="text-4xl my-16">Basket is Empty</p>}
            <Link to="/juices" className="bg-purple-950 rounded-3xl py-3 px-8 font-medium inline-block 
                    mr-4 hover:bg-transparent hover:border-purple-950 hover:text-white duration-300 hover:border border-2 border-white step-title">
                BACK TO SHOPING
            </Link>
        </div>
    )
    return (
        <div className="grid grid-cols-2 gap-2 font-semibold">
            <div className="w-full">
                <div className="w-full">
                    <table className="w-full text-center">
                        <thead>
                            <tr className="grid grid-cols-5 gap-4">
                                <th className="text-white">PRODUCT</th>
                                <th className="text-white">PRICE</th>
                                <th className="text-white">AMOUNT</th>
                                <th className="text-white">SUMMARY</th>
                                <th className="text-white">DELETE</th>
                            </tr>
                        </thead>
                    </table>
                    <div className="h-72 overflow-y-auto">
                        <table className="w-full text-center">
                            <tbody>
                                {basket.map(i => (
                                    <tr key={i.strength + i.capacity + i.product.id} className="pl-2 grid grid-cols-5 gap-4 items-center">
                                        <td className="flex flex-col items-center justify-center">
                                            <img src={i.product.image_url} alt="Ragnarok" className="w-24 h-24" />
                                            <p className="text-white">
                                                {i.product.name}
                                                <br />
                                                <span className="text-sm">
                                                    {i.strength}MG {i.capacity}60ML
                                                </span>
                                            </p>
                                        </td>
                                        <td className="text-white">{i.price}</td>
                                        <td className="text-white">
                                            <span className="flex flex-col items-center">
                                                <button onClick={() => changeItemQuantity(i, i.quantity + 1)}>+</button>
                                                {i.quantity}
                                                <button onClick={() => changeItemQuantity(i, i.quantity - 1)}>-</button>
                                            </span>
                                        </td>
                                        <td className="text-white">{(i.price * i.quantity).toFixed(2)}</td>
                                        <td className="text-white">
                                            <button onClick={() => changeItemQuantity(i, 0)}>X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex justify-center w-full space-x-4 ml-160">
                    <p className="text-white step-title">SUMMARY</p>
                </div>
                <div className="flex justify-center w-full space-x-4 ml-160">
                    <p className="text-white">TOTAL PRICE: {finalPrice}PLN</p>
                </div>
                <div className="flex justify-center w-full space-x-4 ml-160">
                    <p className="text-white">TOTAL PRODUCTS: {itemsCount}</p>
                </div>
                <div className="flex justify-center space-x-4 w-full gap-custom">
                    <div className="mt-10 text-white">
                        <Link to="/juices" className="bg-purple-950 rounded-3xl py-3 px-8 font-medium inline-block 
                    mr-4 hover:bg-transparent hover:border-purple-950 hover:text-white duration-300 hover:border border-2 border-white step-title">
                            KEEP SHOPPING
                        </Link>
                    </div>
                    <div className="mt-10 text-white">

                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="mb-4">
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                </div>
                <div className="mb-4">
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                </div>
                <div className="mb-4">
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                </div>
                <div className="mb-4">
                    <input type="text" name="paczkomatId" value={formData.paczkomatId} onChange={handleInputChange} placeholder="Paczkomat ID" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                </div>
                <div className="mb-4">
                    <input type="text" name="blikCode" value={formData.blikCode} onChange={handleInputChange} placeholder="BLIK Code" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                </div>
                <div className="mb-4">
                    <input type="password" name="blikPassword" value={formData.blikPassword} onChange={handleInputChange} placeholder="BLIK Password" className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-purple-950 rounded-3xl py-3 px-8 font-medium inline-block 
                    mr-4 hover:bg-transparent hover:border-purple-950 hover:text-white duration-300
                     hover:border border-2 border-white step-title">
                        ORDER
                    </button>
                </div>
            </form>
        </div>
    )
}
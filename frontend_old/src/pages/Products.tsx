import { useStoreContext } from "../utils/storeContext";
import { LoadingProductTile, ProductTile } from "../components/ProductTile";

export const Products = () => {
    const { products, isLoading } = useStoreContext()
    const loadingProducts = [1, 2, 3, 4, 5, 6]
    return (
        <div className="flex-grow flex flex-col items-center justify-center py-16">
            <h2 className="text-6xl font-bold text-white mb-12 step-title">ULTIMATE</h2>
            <div className="w-full max-w-screen-xl px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-4 rounded-lg bg-white bg-opacity-10">
                    {!isLoading ? (
                        products.map(prod => (
                            <div key={prod.id} className="border-4 border-white rounded-lg flex flex-col items-center justify-center shadow-lg p-6 min-w-[18rem]">
                                <ProductTile product={prod} />
                            </div>
                        ))
                    ) : (
                        loadingProducts.map(p => <div key={p} className="border-4 border-white rounded-lg flex flex-col items-center justify-center shadow-lg p-6 min-w-[18rem]">
                            <LoadingProductTile />
                        </div>)
                    )}
                </div>
            </div>
        </div>
    )
}
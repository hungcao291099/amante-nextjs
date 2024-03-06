import { ProductItem } from "@/types/api_res/ProductList/ProductList"
import { formatNumber } from "@/utils/function"
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { LiaCartPlusSolid } from "react-icons/lia";
import useCartModal from '@/hooks/useCartModal'

const ProductItemLoading: React.FC<{ list_mode: Boolean }> = ({ list_mode }) => {
    return (
        list_mode ?
            <div className="shadow rounded-md p-3 w-full" >
                <div className=" animate-pulse flex gap-3">
                    <div className=" rounded w-44 h-56 bg-gray-400"></div>
                    <div className=" flex flex-col justify-around">
                        <div className=" h-5 bg-gray-400 w-64 rounded-lg"></div>
                        <div className=" h-5 bg-gray-400 w-32 rounded-lg"></div>
                        <div className=" h-5 bg-gray-400 w-48 rounded-lg"></div>
                        <div className=" h-5 bg-gray-400 w-24 rounded-lg"></div>
                    </div>
                </div>
            </div>
            :
            <div className=" shadow rounded-md p-3">

                <div className=" animate-pulse flex flex-col gap-5">
                    <div className=" rounded bg-gray-400 w-48 h-64"></div>
                    <div className="h-2 bg-gray-400 rounded"></div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-gray-400 rounded col-span-2"></div>
                        <div className="h-2 bg-gray-400 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-gray-400 rounded"></div>
                </div>
            </div>

    )
}
export default ProductItemLoading
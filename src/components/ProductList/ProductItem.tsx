import { ProductItem } from "@/types/api_res/ProductList/ProductList"
import { formatNumber } from "@/utils/function"
import { FaStar } from "react-icons/fa";
const ProductItem: React.FC<{ item: ProductItem, list_mode: Boolean }> = ({ item, list_mode }) => {
    return (
        list_mode ?
            <div className="flex gap-4 my-5 h-48">
                {item.file_nm ? <img className=" rounded-md" src={`https://www.amante.co.kr/uploads/product/285/${item.file_nm}`} alt="" /> : <img src="/images/pro_in_img.jpg" alt="" loading="lazy" />}
                <div className=" flex flex-col gap-2 p-2">
                    <p className=" text-black font-bold">{item.product_nm}</p>
                    <p className=" text-gray-500 text-sm">{item.option_nm}</p>
                    <div className=" flex gap-2 items-center">
                        {item.sale_price !== item.supply_price ? (
                            <div className=" flex gap-2 text-lg font-bold items-center">
                                <p className=" text-gray-500 line-through text-base">{formatNumber(item.supply_price)}</p>
                                <p className="  text-teal-700">{`${Math.round((item.sale_price / item.supply_price) * 100)}%`}</p>
                            </div>
                        ) : null
                        }

                        <p className=" text-xl font-bold">{`${formatNumber(item.sale_price)}원`}</p>
                    </div>
                    <div className=" flex gap-2 items-center text-sm font-bold">
                        <FaStar size={20} color=" #0F766E" />
                        <p>{item.point}</p>
                    </div>
                    <div className=" flex gap-2 items-center text-sm">
                        <p>리뷰</p>
                        <p> {formatNumber(item.review_cnt)}</p>
                    </div>

                </div>
            </div>
            :
            <div className=" flex flex-col gap-2 p-2">
                {item.file_nm ? <img className=" rounded-md" src={`https://www.amante.co.kr/uploads/product/285/${item.file_nm}`} alt="" /> : <img src="/images/pro_in_img.jpg" alt="" loading="lazy" />}
                <p className=" text-black font-bold">{item.product_nm}</p>
                <p className=" text-gray-500 text-sm">{item.option_nm}</p>
                <div className=" flex gap-2 items-center">
                    {item.sale_price !== item.supply_price ? (
                        <div className=" flex gap-2 text-lg font-bold items-center">
                            <p className=" text-gray-500 line-through text-base">{formatNumber(item.supply_price)}</p>
                            <p className="  text-teal-700">{`${Math.round((item.sale_price / item.supply_price) * 100)}%`}</p>
                        </div>
                    ) : null
                    }

                    <p className=" text-xl font-bold">{`${formatNumber(item.sale_price)}원`}</p>
                </div>
                <div className=" flex gap-2 items-center text-sm font-bold">
                    <FaStar size={20} color=" #0F766E" />
                    <p>{item.point}</p>
                </div>
                <div className=" flex gap-2 items-center text-sm">
                    <p>리뷰</p>
                    <p> {formatNumber(item.review_cnt)}</p>
                </div>

            </div>
    )
}
export default ProductItem
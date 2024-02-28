import { ProductItem } from "@/types/api_res/ProductList/ProductList"
import { formatNumber } from "@/utils/function"

const ProductItem: React.FC<{ item: ProductItem }> = ({ item }) => {
    return (
        <div className=" flex flex-col gap-2 p-2">
            {item.file_nm ? <img className=" rounded-md" src={`https://www.amante.co.kr/uploads/product/285/${item.file_nm}`} alt="" /> : <img src="/images/pro_in_img.jpg" alt="" loading="lazy" />}
            <p className=" text-black font-bold">{item.product_nm}</p>
            <p className=" text-gray-500 text-sm">{item.option_nm}</p>
            <div className=" flex gap-2 items-center">
                {item.sale_price !== item.supply_price ? (
                    <div className=" flex gap-2 text-lg font-bold">
                        <p className=" text-gray-500 line-through">{formatNumber(item.supply_price)}</p>
                        <p className="  text-teal-700">{`${Math.round((item.sale_price / item.supply_price) * 100)}%`}</p>
                    </div>
                ) : null
                }

                <p className=" text-xl font-bold">{formatNumber(item.sale_price)}</p>
            </div>
            <p className=" text-sm">{item.point}</p>
            <p className=" text-sm">{`리뷰 ${formatNumber(item.review_cnt)}`}</p>
        </div>
    )
}
export default ProductItem
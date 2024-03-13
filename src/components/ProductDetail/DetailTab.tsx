import { useState } from "react"
import InfoTab from "./DetailTab/InfoTab"
import BuyingGuildTab from "./DetailTab/BuyingGuildTab"
import ReviewTab from "./DetailTab/ReviewTab"
import QnaTab from "./DetailTab/QnaTab"
import { PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo"
import { PRODUCT_DETAIL_API_RES } from "@/types/api_res/ProductDetail/ProductDetail"
import { formatNumber } from "@/utils/function"

const DetailTab: React.FC<{ ProductDetailRes: PRODUCT_DETAIL_API_RES }> = ({ ProductDetailRes }) => {
    const [DetailTab, setDetailTab] = useState(1)
    return (
        <div className=" flex flex-col">
            <div className=" w-full grid grid-cols-4 text-center bg-gray-100">
                <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 1 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(1)}>상품상세</div>
                <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 2 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(2)}>구매안내</div>
                <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 3 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(3)}>{`리뷰 ${formatNumber(ProductDetailRes?.data.review_cnt ? ProductDetailRes?.data.review_cnt : 0)}`}</div>
                <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 4 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(4)}>상품 문의</div>
            </div>
            <div className=" w-full min-h-[1000px]">
                {DetailTab === 1 && <InfoTab ProductDetailRes={ProductDetailRes} />}
                {DetailTab === 2 && <BuyingGuildTab ProductDetailRes={ProductDetailRes} />}
                {DetailTab === 3 && <ReviewTab ProductDetailRes={ProductDetailRes} />}
                {DetailTab === 4 && <QnaTab />}
            </div>
        </div>
    )
}
export default DetailTab
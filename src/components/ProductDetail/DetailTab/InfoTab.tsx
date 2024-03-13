import { useState } from "react"
import parse from 'html-react-parser';
import { PRODUCT_DETAIL_API_RES, UseReview } from "@/types/api_res/ProductDetail/ProductDetail";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";
const InfoTab: React.FC<{ ProductDetailRes: PRODUCT_DETAIL_API_RES }> = ({ ProductDetailRes }) => {
    const [DetailShow, setDetailShow] = useState(false)

    return (
        <div className={`${DetailShow ? " h-fit" : " h-[1000px] overflow-hidden"}  relative flex flex-col items-center`}>
            {parse(ProductDetailRes?.data.productDetail.content ? ProductDetailRes?.data.productDetail.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace('margin: 0 auto;', 'margin: 0;') : "")}
            <div className=" flex flex-col absolute bottom-0 w-full">
                {!DetailShow && <div className=" h-[1000px] bg-gradient-to-t from-white"></div>}
                <div className=" bg-white bottom-0 flex gap-3 justify-center items-center p-2 text-lg font-semibold border-[1px] border-gray-700 rounded hover:cursor-pointer"
                    onClick={() => DetailShow ? setDetailShow(false) : setDetailShow(true)}>
                    <p>상품 설명 더보기</p>
                    {DetailShow ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}
                </div>
            </div>
        </div>
    )
}
export default InfoTab
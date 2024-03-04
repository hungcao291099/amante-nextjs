'use client'
import useCartModal from "@/hooks/useCartModal";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { formatNumber } from "@/utils/function";
export default () => {
    const [qty, setqty] = useState(1)
    const cartModal = useCartModal()
    var item = cartModal.data
    var optionList = item?.option_nm.split("/")
    if (!cartModal.isOpen) {
        return null
    }

    return (
        <div className=" w-full h-full justify-center  items-center  flex  fixed  inset-0  z-50  outline-none  focus:outline-none bg-gray-900 bg-opacity-60 ">
            <div className=" w-1/4 h-fit bg-white rounded-md flex flex-col p-3 gap-5">
                <div className=" flex">
                    <h2 className=" w-full flex justify-center font-black text-xl">장바구니 담기</h2>
                    <IoMdClose size={25} onClick={() => cartModal.onClose()} className=" hover: cursor-pointer" />
                </div>
                <div className=" flex gap-2">
                    {item?.file_nm ? <img className=" rounded-md w-44" src={`https://www.amante.co.kr/uploads/product/285/${item?.file_nm}`} alt="" /> : <img src="/images/pro_in_img.jpg" alt="" loading="lazy" />}
                    <div className=" flex flex-col gap-1 justify-evenly  ">
                        <p className=" font-bold">{item?.product_nm}</p>
                        <div>
                            {optionList?.map(opt => (
                                <div className=" flex gap-3 text-gray-500">
                                    <p>{opt.split(":")[0]}</p>
                                    <p>{opt.split(":")[1]}</p>
                                </div>
                            ))}
                        </div>
                        <div className=" flex justify-between">
                            <div className=" flex items-center justify-between w-fit p-2 border-[1px] border-gray-400 rounded-md">
                                <AiOutlineMinus color={`${qty > 1 ? "#111" : "#999"}`} onClick={() => { setqty(x => x > 1 ? x - 1 : x) }} className={`${qty > 1 ? "hover:cursor-pointer" : ""}`} />
                                <p className=" px-5 select-none">{qty}</p>
                                <AiOutlinePlus color={`${qty < 10 ? "#111" : "#999"}`} onClick={() => { setqty(x => x < 10 ? x + 1 : x) }} className={`${qty < 10 ? "hover:cursor-pointer" : ""}`} />
                            </div>
                            <div className=" text-black font-black text-lg select-none">{`${formatNumber(item ? (item.sale_price * qty) : 0)}원`}</div>
                        </div>


                    </div>
                </div>
                <div className=" flex gap-3 justify-between item-center">
                    <div className=" w-full bg-gray-900 text-white flex justify-center items-center p-2 select-none hover:cursor-pointer rounded-md">구매하기</div>
                    <div className=" w-full bg-white text-gray-900 flex justify-center items-center p-2 select-none hover:cursor-pointer ">장바구니 추가</div>
                </div>
            </div>
        </div>
    )
}
import { Navi, PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";
import { FaStar, FaBell } from "react-icons/fa";
import { GoGift, GoHome } from "react-icons/go";
import { CiCircleInfo } from "react-icons/ci";
import { formatNumber } from "@/utils/function";
import { OptionBases, PRODUCT_DETAIL_API_RES, UseReview } from "@/types/api_res/ProductDetail/ProductDetail";
import { ChangeEvent, useEffect, useState } from "react";
import api from "@/utils/instants";
import { ProductOption } from "@/types/api_res/ProductDetail/ProductOption";
import useShowGiftInfo from "@/hooks/useGiftInfo";
const DetailGeneral: React.FC<{ ProductDetailRes: PRODUCT_DETAIL_API_RES }> = ({ ProductDetailRes }) => {

    const [OptIActive, setOptIActive] = useState(false)
    const [CurrentImage, setCurrentImage] = useState("")
    const [rating, setRating] = useState<number[]>([])
    const [optionMain, setoptionMain] = useState<OptionBases[]>([])
    const GiftInfo = useShowGiftInfo()
    useEffect(() => {
        setRating([])
        setCurrentImage(ProductDetailRes.data.file[0].file_nm)
        setoptionMain(ProductDetailRes.data.optionBases.filter(x => x.opt_gb != "I"))
        var point = Math.round(ProductDetailRes.data.point)
        for (let i = 0; i < point; i++) {
            setRating(x => [...x, 1])
        }
        if (point < 5) {
            for (let i = 0; i < 5 - point; i++) {
                setRating(x => [...x, 0])
            }

        }
    }, [])


    const getOptIndex = (select_opt_cd2: string, index: number) => {
        setOptIActive(false)
        select_opt_cd2 && index >= optionMain.length ? setOptIActive(true) : setOptIActive(false)

        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/product_option`,
                    method: "POST",
                    data: {
                        index,
                        product_cd: ProductDetailRes?.data.product_cd,
                        select_opt_cd2,
                        siblings_opt_cd1: "",
                        pre_opt_cd2: ""
                    }
                });
                var opt_res: ProductOption[] = data.data
                var opt_list = document.getElementById(`OPT_${opt_res[0].opt_gb}_${index + 1}`) as HTMLSelectElement
                for (var i = opt_list.options.length - 1; i > 0; i--) {
                    opt_list.remove(i);
                }
                opt_res.map(option => {
                    var newOption = document.createElement("option")
                    newOption.value = option.opt_cd2
                    newOption.text = option.opt_nm2
                    newOption.disabled = option.stock === 0
                    newOption.onclick
                    opt_list?.appendChild(newOption)
                })

            } catch (error) {
                console.log(error);
            }
        }
        select_opt_cd2 && fetchData();
    }


    const OptionISelect = (e: ChangeEvent, index: number) => {
        var OptionI = document.getElementById(`OPT_I_${index}`) as HTMLSelectElement
        if (!OptIActive) {
            alert("Select mandatory option first ~")
            OptionI.value = OptionI.options[0].value
        }

    }

    return (
        <div className=" flex justify-around">
            <div className=" w-[500px] flex flex-col gap-1">
                {CurrentImage != "" && <img className="rounded" src={`https://www.amante.co.kr/uploads/product/${CurrentImage}`} alt="" loading="lazy" />}
                <div className="w-full grid grid-cols-6 gap-1">
                    {ProductDetailRes.data.file.map(file =>
                        <div className=" relative w-fit h-fit" onMouseEnter={() => setCurrentImage(file.file_nm)}>
                            <img className=" " src={`https://www.amante.co.kr/uploads/product/${file.file_nm}`} alt="" />
                            <div className={`${file.file_nm !== CurrentImage && " backdrop-blur-sm bg-white/20 "} absolute top-0 left-0 z-10 w-full h-full duration-300`} ></div>
                        </div>
                    )}

                </div>
            </div>
            <div className=" w-[500px] flex flex-col gap-3">
                <div className=" flex gap-1">{ProductDetailRes.data.icon_.map(tag => <p className="px-1 border-[1px] border-[#c8877a] rounded text-sm">{tag}</p>)}</div>
                <div className=" text-xl font-semibold">{ProductDetailRes.data.product_nm}</div>
                <div className=" flex gap-2">
                    <div className="flex gap-1">{rating.map(star => star === 1 ? <FaStar color="#f06652" /> : <FaStar color="#727476" />)}</div>
                    {/* <div className="flex gap-1">{rating.map(star => star)}</div> */}
                    <div className=" text-sm text-[#f06652]">{`${formatNumber(ProductDetailRes.data.review_cnt)}개 리뷰`}</div>
                </div>
                {ProductDetailRes.data.fee_rate !== 0 &&
                    <div className=" flex gap-2">
                        <p className=" text-base text-[#f06652]" >{`${ProductDetailRes.data.fee_rate}%`}</p>
                        <p className=" text-gray-500 line-through">{formatNumber(ProductDetailRes.data.supply_price)}</p>
                    </div>
                }
                <p className=" font-bold text-2xl">{formatNumber(ProductDetailRes.data.sale_price)}<span className=" font-normal text-lg">원</span> </p>
                <div className=" flex gap-4">
                    <p className=" text-gray-400">적립금</p>
                    <p className=" text-black">1% 적립</p>
                </div>
                <div className=" flex gap-4">
                    <p className=" text-gray-400">배송비</p>
                    <p className=" text-black">3,500원 (70,000원 이상 구매시 무료배송)</p>
                </div>
                {optionMain.map((opt, index) => opt.opt_gb === "C" && (
                    <select onChange={(e) => getOptIndex(e.target.value, index + 1)} className=" p-1 border-[1px] border-gray-400 rounded-md" name="" id={`OPT_${opt.opt_gb}_${index + 1}`}>
                        <option value="">{opt.opt_nm1}</option>

                        {ProductDetailRes.data.OPTION_C.map(optC => optC.opt_cd1 === opt.opt_cd1 && (
                            <option value={`${optC.opt_cd2}`} >{`${optC.opt_nm2} ${optC.opt_price != 0 ? `(+${formatNumber(optC.opt_price)}원)` : ""}`}</option>
                        ))}
                    </select>
                ))}

                <div className=" flex justify-end gap-2 items-center">
                    <FaBell color="#F6BC25" />
                    <a className=" text-[#3AA1FF] text-sm" href="#">재입고 알리미 신청</a>
                </div>
                <p className={`${OptIActive ? " text-slate-600 font-semibold" : "text-gray-400"}`}>추가 구성</p>
                {ProductDetailRes.data.optionBases.map((opt, index) => opt.opt_gb === "I" && (
                    <select onChange={(e) => OptionISelect(e, index)} className=" p-1 border-[1px] border-gray-400 rounded-md" name="" id={`OPT_I_${index}`}>
                        <option value={`${opt.opt_cd1}`}>{opt.opt_nm1}</option>
                        {ProductDetailRes.data.OPTION_I.map(optI => optI.opt_cd1 === opt.opt_cd1 && (
                            <option value={`${optI.opt_cd2}`}>{`${optI.opt_nm2} ${optI.opt_price != 0 ? `(+${formatNumber(optI.opt_price)}원)` : ""}`}</option>
                        ))}
                    </select>
                ))}

                <div className=" grid grid-cols-4 h-14 text-white gap-2">
                    <p className=" col-span-2 text-center flex items-center justify-center bg-gray-900">구매하기</p>
                    <div className=" flex justify-center items-center gap-1 h-full bg-[#c8877a]">
                        <GoGift />
                        <p>선물하기</p>
                    </div>
                    <p className=" h-full border-[1px] border-gray-400 text-gray-700 flex items-center justify-center">장바구니 담기</p>
                </div>
                <div className=" flex gap-2 text-sm text-gray-400 justify-end items-center hover:cursor-pointer" onClick={() => GiftInfo.onOpen()}>
                    <CiCircleInfo size={20} />
                    <p>선물하기 안내</p>
                </div>
                <div className=" grid grid-cols-2 gap-2 text-lg font-semibold">
                    <div className=" flex gap-2 items-center justify-center p-3 bg-[#00DE5A]">
                        <img src="/logo/naver_pay_logo.png" alt="" />
                        <p>구매하기</p>
                    </div>
                    <div className=" flex gap-2 items-center justify-center p-3 bg-[#FEE102]">
                        <img src="/logo/kakao_pay_logo.png" alt="" />
                        <p>구매하기</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default DetailGeneral
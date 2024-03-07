'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { GoHome } from "react-icons/go";
import { IoMdArrowDropright } from "react-icons/io";
import { Detail, FindCategory } from "@/types/api_res/Category/FindCategory"
import Link from "next/link"
import api from "@/utils/instants";
import { Navi, PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";
import { PRODUCT_DETAIL_API_RES } from "@/types/api_res/ProductDetail/ProductDetail";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa";
import { formatNumber } from "@/utils/function";


export default () => {
    const searchParams = useSearchParams();
    let PRODUCT_CODE: string | null = null;
    let product_cd: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        PRODUCT_CODE = searchParams.get('PRODUCT_CODE');
        product_cd = searchParams.get('product_cd');
    }

    const [ProductCodeRes, setProductCodeRes] = useState<PRODUCT_CODE_API_GET>()
    const [ProductDetailRes, setProductDetailRes] = useState<PRODUCT_DETAIL_API_RES>()
    const [CurrentImage, setCurrentImage] = useState("")
    const [rating, setRating] = useState<number[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/product_list/find_category_product_code?PRODUCT_CODE=${PRODUCT_CODE}&PRODUCT_CD=${product_cd}`,
                    method: "GET",
                });
                setProductCodeRes(data.data);

            } catch (error) {
                console.log(error);
            }
            try {
                const data = await api({
                    url: `/shop/product/detail_new?product_cd=${product_cd}`,
                    method: "GET",
                });
                setProductDetailRes(data.data);
                setCurrentImage((data.data as PRODUCT_DETAIL_API_RES).data.file[0].file_nm)
                var datares: PRODUCT_DETAIL_API_RES = data.data
                var point = Math.round(datares.data.point)
                setRating([])
                for (let i = 0; i < point; i++) {
                    setRating(x => [...x, 1])
                }
                if (point < 5) {
                    for (let i = 0; i < 5 - point; i++) {
                        setRating(x => [...x, 0])
                    }

                }

                console.log(rating);
                console.log(data.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const showNaviCate = (cat_code: number) => {
        var navi_cate_li = document.getElementById(`cate_navi_li_${cat_code}`)
        var navi_cate = document.getElementById(`cate_navi_${cat_code}`)
        navi_cate_li?.addEventListener("mouseenter", () => {
            navi_cate?.classList.remove("hidden")
        })
        navi_cate_li?.addEventListener("mouseleave", () => {
            navi_cate?.classList.add("hidden")
        })
    }
    return (

        <div className=" w-[1200px] m-auto mt-[140px] rounded-md mb-3 p-3 h-fit bg-white flex flex-col gap-4">
            <div className=" flex item-center justify-between">
                <div className=" flex items-center gap-4">
                    <Link href={"/"}><GoHome size={20} /></Link>

                    <ul className=" text-sm flex gap-4">
                        {
                            ProductCodeRes?.success && ProductCodeRes.data.Navi.map(cate =>
                                <Link href={`/shop/product/product_list?CAT_CODE=${cate.CAT_CODE}`}>
                                    <li id={`cate_navi_li_${cate.CAT_CODE}`} className=" flex items-center gap-1 relative z-0" onMouseEnter={() => showNaviCate(cate.CAT_CODE)}>
                                        <IoMdArrowDropright />
                                        <p>{cate.CAT_NAME}</p>
                                        <div id={`cate_navi_${cate.CAT_CODE}`} className=" absolute top-0 left-0 hidden">
                                            <ul className="rounded-md border-gray-300 bg-white border-[1px] h-fit w-max">
                                                {(cate.detail as Detail[]).map(cate2 => (
                                                    <Link href={`/shop/product/product_list?CAT_CODE=${cate.CAT_CODE}`}>
                                                        <li className="p-2 text-gray-700 hover:text-rose-400 ">{cate2.CAT_NAME}</li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                </Link>

                            )
                        }
                    </ul>

                </div>
            </div>
            {ProductDetailRes?.success &&
                <div className=" flex justify-around">
                    <div className=" w-[500px] flex flex-col gap-1">
                        {CurrentImage != "" && <img className=" duration-300 rounded" src={`https://www.amante.co.kr/uploads/product/${CurrentImage}`} alt="" loading="lazy" />}
                        <div className="w-full grid grid-cols-6 gap-1">
                            {ProductDetailRes.data.file.map(file =>
                                <img className={`hover:border-[#c8877a] border-[2px] duration-300 ${file.file_nm === CurrentImage ? "border-[#c8877a]" : ""}`} src={`https://www.amante.co.kr/uploads/product/${file.file_nm}`} alt="" onMouseEnter={() => setCurrentImage(file.file_nm)} />
                            )}

                        </div>
                    </div>
                    <div className=" w-[500px] flex flex-col gap-2">
                        <div className=" flex gap-1">tag</div>
                        <div className=" text-lg font-semibold">{ProductDetailRes.data.product_nm}</div>
                        <div className=" flex gap-2">
                            <div className="flex gap-1">{rating.map(star => star === 1 ? <FaStar color="#f06652" /> : <FaStar color="#727476" />)}</div>
                            <div className=" text-sm text-[#f06652]">{`${formatNumber(ProductDetailRes.data.review_cnt)}개 리뷰`}</div>
                        </div>
                        <div className=" flex gap-2">
                            <p className=" text-base text-[#f06652]" >{`${ProductDetailRes.data.fee_rate}%`}</p>
                            <p className=" text-gray-500 line-through">{formatNumber(ProductDetailRes.data.supply_price)}</p>
                        </div>
                        <p className=" font-bold text-xl">{formatNumber(ProductDetailRes.data.sale_price)}<span className=" font-normal text-lg">원</span> </p>
                    </div>
                </div>}
        </div>
    )
}
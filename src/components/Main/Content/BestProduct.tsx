import { BestProductCate } from "@/types/api_res/Main/best_product_cate";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import api from "@/utils/instants";
import { ProductList } from "@/types/api_res/Main/product_list";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { checkDevice, formatNumber, getInnerText } from "@/utils/function";
import { NavigationOptions } from "swiper/types";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsChatSquareDotsFill } from "react-icons/bs";
export default () => {
    const naviPreRef = React.useRef(null)
    const naviNextRef = React.useRef(null)
    const [BestCateApi, setBestCaterApi] = useState<BestProductCate>()
    const [category_cd, setCategory_cd] = useState("")
    const [ProductListApi, setProductListApi] = useState<ProductList>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/category/best/list`,
                    method: "GET",
                });
                setBestCaterApi(data.data)
                var res: BestProductCate = data.data
                setCategory_cd(res.data[res.data.length - 1].category_cd)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/main/best/list?category1_cd=${category_cd}`,
                    method: "GET",
                });
                setProductListApi(data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [category_cd])

    if (BestCateApi?.success && ProductListApi?.success) {
        return (
            <div className=" rounded-lg bg-white p-2 flex flex-col gap-5 relative">
                <div className=" flex justify-between items-center">
                    <h2 className=" font-bold text-2xl">Most Loved <span className=" text-sm text-gray-400">가장 사랑 받은 상품</span></h2>
                    <div className=" flex gap-2 items-center">
                        <p>더보기</p>
                        <MdOutlineKeyboardArrowRight size={15} />
                    </div>
                </div>
                <div className=" flex gap-5 w-full hover:cursor-pointer overflow-x-auto no-scrollbar ">
                    {BestCateApi?.data && BestCateApi.data.slice().reverse().map(cate => (
                        <h2 className={`${cate.category_cd === category_cd ? "bg-gray-800 text-white" : "text-gray-600 bg-white"} border-[1px] border-gray-300 transition-all p-1 shrink-0`} onClick={() => setCategory_cd(cate.category_cd)}>{getInnerText(cate.category_nm)}</h2>
                    ))}
                </div>
                <div className=" w-full ">
                    <Swiper
                        className='rounded-lg bg-white'

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: naviPreRef.current,
                            nextEl: naviNextRef.current
                        }}
                        onBeforeInit={((swiper) => {
                            (swiper.params.navigation as NavigationOptions).prevEl = naviPreRef.current,
                                (swiper.params.navigation as NavigationOptions).nextEl = naviNextRef.current
                        })}
                        modules={[Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={checkDevice() === "mobile" ? 2 : 4}
                    >
                        {ProductListApi.data.map(product => (
                            <SwiperSlide className=" flex flex-col gap-2">
                                <img className=" rounded" src={`https://www.amante.co.kr/uploads/product/285/${product.product_main_img}`} alt="" />
                                <p className=" text-gray-800 font-semibold">{product.product_nm}</p>
                                {product.fee_rate != 0 ? (
                                    <p className=" line-through text-gray-400">{formatNumber(product.supply_price)}</p>
                                ) : null}

                                <div className=" flex gap-2 items-center justify-between">
                                    <p className="font-bold text-lg">{`${formatNumber(product.sale_price)}원`}</p>
                                    {product.fee_rate != 0 ? (
                                        <p className=" font-bold text-lg text-[#f06652]">{`${product.fee_rate}%`}</p>
                                    ) : null}
                                </div>
                                <div className=" flex gap-2 items-center">
                                    <BsChatSquareDotsFill size={15} />
                                    <p className=" text-sm text-gray-400">{formatNumber(product.review_cnt)}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {checkDevice() === "desktop" && <div ref={naviPreRef} className=" h-10 w-10 rounded-full absolute top-1/2 left-0 -translate-x-5 z-20 bg-white drop-shadow-lg flex justify-center items-center hover:cursor-pointer active:drop-shadow-sm"><MdOutlineKeyboardArrowLeft size={20} /></div>}
                {checkDevice() === "desktop" && <div ref={naviNextRef} className=" h-10 w-10 rounded-full absolute top-1/2 right-0 translate-x-5 z-20 bg-white drop-shadow-lg flex justify-center items-center hover:cursor-pointer active:drop-shadow-sm"><MdOutlineKeyboardArrowRight size={20} /></div>}
            </div>
        )
    }

}
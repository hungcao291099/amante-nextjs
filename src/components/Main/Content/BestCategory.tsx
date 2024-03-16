import { BestProductCate } from "@/types/api_res/Main/best_product_cate";
import { Data, ProductList } from "@/types/api_res/Main/product_list";
import api from "@/utils/instants";
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { NavigationOptions } from "swiper/types";
import { Autoplay, Navigation } from 'swiper/modules';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { checkDevice, formatNumber } from "@/utils/function";
import { BsChatSquareDotsFill } from "react-icons/bs";
import parse from "html-react-parser";
export default () => {
    const [BestCateApi, setBestCaterApi] = useState<BestProductCate>()
    const naviPreRef = React.useRef(null)
    const naviNextRef = React.useRef(null)
    const [ProductList, setProductList] = useState<Data[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/category/best/list`,
                    method: "GET",
                });
                setBestCaterApi(data.data)
                var res: BestProductCate = data.data
                res.data.map(cate => getProductFromCate(cate.category_cd))
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const getProductFromCate = (category_cd: string) => {

        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/main/best/list?category1_cd=${category_cd}`,
                    method: "GET",
                });
                var pl_res: ProductList = data.data
                pl_res.data.map(x => setProductList(y => [...y, x]))

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }
    const getInnerText = (string: string) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = string
        const textContent = tempElement.textContent || tempElement.innerText;
        return textContent
    }

    return (
        <div className=" flex flex-col gap-3 py-5">
            <h2 className=" text-2xl text-black font-bold">Best Category <span className=" text-gray-400 text-sm">카테고리별 추천 상품</span></h2>
            <div className=" relative">
                <Swiper

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
                    slidesPerView={checkDevice() === "desktop" ? 3 : 1}>
                    {BestCateApi?.data.map((cate, index) => (
                        <SwiperSlide>
                            <div className=" flex flex-col gap-3 p-2">
                                <div className=" relative">
                                    <img className=" rounded w-full" src="/image/cate_img.png" alt="" />
                                    <div className=" absolute bottom-0 left-0 m-3 flex flex-col gap-2">
                                        <h2 className=" text-white font-black text-xl">{getInnerText(cate.category_nm)}</h2>
                                        <h4 className=" text-white">{`카테고리${index}에 대한 설명`}</h4>
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-2">

                                    {ProductList.filter(x => x.category1_cd === cate.category_cd).map((product, index) => (
                                        index < 4 && <div className=" grid grid-cols-3 gap-3">
                                            <img className=" rounded w-full" src={`https://www.amante.co.kr/uploads/product/285/${product.product_main_img}`} alt="" />
                                            <div className=" col-span-2 flex flex-col gap-1">
                                                <p className=" font-semibold text-black">{product.product_nm}</p>
                                                <p className=" line-through text-gray-400">{formatNumber(product.supply_price)}</p>
                                                <div className=" flex gap-2 text-xl font-bold">
                                                    <p className="  text-black">{`${formatNumber(product.sale_price)}원 `}</p>
                                                    <p className=" text-[#f06652]">{`${product.fee_rate}%`}</p>
                                                </div>
                                                <div className=" flex gap-2 items-center">
                                                    <BsChatSquareDotsFill size={15} />
                                                    <p className=" text-sm text-gray-400">{formatNumber(product.review_cnt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SwiperSlide>

                    ))}
                </Swiper>
                {checkDevice() === "desktop" && <div ref={naviPreRef} className=" h-10 w-10 rounded-full absolute top-1/2 left-0 -translate-x-5 z-20 bg-white drop-shadow-lg flex justify-center items-center hover:cursor-pointer active:drop-shadow-sm"><MdOutlineKeyboardArrowLeft size={20} /></div>}
                {checkDevice() === "desktop" && <div ref={naviNextRef} className=" h-10 w-10 rounded-full absolute top-1/2 right-0 translate-x-5 z-20 bg-white drop-shadow-lg flex justify-center items-center hover:cursor-pointer active:drop-shadow-sm"><MdOutlineKeyboardArrowRight size={20} /></div>}
            </div>
        </div>
    )
}
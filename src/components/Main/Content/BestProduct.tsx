import { BestProductCate } from "@/types/api_res/best_product_cate";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import api from "@/utils/instants";
import { ProductList } from "@/types/api_res/product_list";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatNumber } from "@/utils/function";

export default () => {
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
                setCategory_cd(data.data?.data[data.data?.data.length].category_cd)
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
            <div className=" rounded-lg bg-white p-2 flex flex-col gap-5">
                <h2 className=" font-bold">Best Product</h2>
                <div className=" flex flex-row-reverse justify-end gap-5 w-full hover:cursor-pointer ">
                    {BestCateApi?.data.map(cate => (
                        <h2 className={`${cate.category_cd === category_cd ? "tab-selected" : ""}  text-gray-500 font-bold hover:text-[#0D685B] hover-underline-animation`} onClick={() => setCategory_cd(cate.category_cd)}>{parse(cate.category_nm.replaceAll("<br>", ""))}</h2>
                    ))}
                </div>
                <div className=" w-full ">
                    <Swiper
                        className='rounded-lg bg-white'
                        pagination={{
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={4}
                    >
                        {ProductListApi.data.map(product => (
                            <SwiperSlide className=" flex flex-col gap-2">
                                <img src={`https://www.amante.co.kr/uploads/product/285/${product.product_main_img}`} alt="" />
                                <p>{product.product_nm}</p>
                                <div className=" flex gap-2 items-center">
                                    {product.fee_rate != 0 ? (
                                        <p className=" font-bold text-lg text-[#0D685B]">{`${product.fee_rate}%`}</p>
                                    ) : null}
                                    <p className="font-bold text-lg">{`${formatNumber(product.sale_price)}원`}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        )
    }

}
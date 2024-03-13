import { MostLoveProduct } from '@/types/api_res/ProductDetail/MostLoveProduct';
import api from '@/utils/instants';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { formatNumber } from '@/utils/function';
import Link from "next/link";
import { LiaCartPlusSolid } from "react-icons/lia";
export default () => {
    const [MostLoveProduct, setMostLoveProduct] = useState<MostLoveProduct>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/most_hits`,
                    method: "GET",
                });
                setMostLoveProduct(data.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    return (
        MostLoveProduct &&
        <div className=' flex flex-col gap-5'>
            <div className=" flex gap-2 text-xl font-bold">Most Loved <span className=" text-lg font-semibold">다른 고객들이 많이 본 상품</span></div>
            <div className=" w-full">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    slidesPerView={5}
                    spaceBetween={20}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {MostLoveProduct.data.map(item =>
                        <SwiperSlide>
                            <div className=' flex flex-col gap-1'>
                                <div className=" relative">
                                    <a href={`/shop/product/product_detail?PRODUCT_CODE=${item.PRODUCT_CODE}&product_cd=${item.product_cd}`}>

                                        {item.file_nm ? <img className=" rounded-md" src={`https://www.amante.co.kr/uploads/product/285/${item.file_nm}`} alt="" /> : <img src="/images/pro_in_img.jpg" alt="" loading="lazy" />}
                                    </a>
                                    <div className="p-3 rounded-full bg-white absolute bottom-3 right-3 shadow-gray-300 shadow-md ">
                                        <LiaCartPlusSolid size={25} />
                                    </div>
                                </div>
                                <h2 className=' font-semibold text-gray-500'>{item.product_nm}</h2>
                                <p className=' font-bold text-lg'>{`${formatNumber(item.sale_price)}원`}</p>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    )
}
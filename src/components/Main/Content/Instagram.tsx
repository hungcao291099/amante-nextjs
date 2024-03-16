import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "@/utils/instants";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { insta_api } from '@/types/api_res/Main/ins_api';
export default () => {
    const [ImgBannerApi, setImageBannerApi] = useState<insta_api[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/main/insta_img/list`,
                    method: "GET",
                });
                setImageBannerApi(data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    if (ImgBannerApi?.length > 0) {
        return (
            <div className=" w-full h-fit p-2 flex flex-col gap-3 rounded-lg bg-white">
                <h2 className=' text-lg font-bold'>#아망떼 <span className=' text-lg font-bold text-gray-400'>#아망떼 펫</span> <span className=' text-sm'>인스타그램에서 더 핫한 아망떼 상품을 확인하세요</span></h2>
                <div>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={5}
                    >
                        {ImgBannerApi.map(banner => (
                            <SwiperSlide >
                                <img className=' relative' src={`${banner.media_url}`} alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        )
    }

}
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "@/utils/instants";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Banner2 } from '@/types/api_res/banner2';
import { HouseWarming } from '@/types/api_res/house_warming';
import { FaRegCommentDots } from "react-icons/fa";
export default () => {
    const [ImgBannerApi, setImageBannerApi] = useState<HouseWarming>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/board/housewarming/list?main_yn=Y`,
                    method: "GET",
                });
                setImageBannerApi(data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    if (ImgBannerApi?.success) {
        return (
            <div className=" w-full h-fit p-2 flex flex-col gap-3 rounded-lg bg-white">
                <h2 className=' text-lg font-bold'>아망떼 집들이<span className='text-sm mx-4 font-normal'>다양한 아망떼 소식&혜택 만나보기</span></h2>
                <div>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={4}
                    >
                        {ImgBannerApi.data.map(banner => (
                            <SwiperSlide className=' flex flex-col '>
                                <img src={`https://www.amante.co.kr/uploads/housewarming/${banner.file_nm1}`} alt="" />
                                <h3 className=' font-medium text-sm mt-3'>{banner.event_nm}</h3>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        )
    }

}
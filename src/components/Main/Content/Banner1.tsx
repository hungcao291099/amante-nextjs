import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "@/utils/instants";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Banner1 } from '@/types/api_res/banner1';
export default () => {
    const [ImgBannerApi, setImageBannerApi] = useState<Banner1>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/banner/mainTop`,
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
                    spaceBetween={50}
                    slidesPerView={1}
                >
                    {ImgBannerApi.data.map(banner => (
                        <SwiperSlide>
                            <img src={`https://www.amante.co.kr/uploads/banner/${banner.file_nm1}`} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        )
    }

}
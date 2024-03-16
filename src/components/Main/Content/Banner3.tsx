import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "@/utils/instants";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Banner2 } from '@/types/api_res/Main/banner2';
export default () => {
    const [ImgBannerApi, setImageBannerApi] = useState<Banner2>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/banner/mainMiddle`,
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
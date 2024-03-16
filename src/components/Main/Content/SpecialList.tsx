import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "@/utils/instants";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { SpecialList } from '@/types/api_res/Main/special_list';
export default () => {
    const [ImgBannerApi, setImageBannerApi] = useState<SpecialList>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/board/theme/list?main_yn=Y`,
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
                <h2 className=' text-lg font-bold'>오늘의 기획전</h2>
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
                        slidesPerView={4}
                    >
                        {ImgBannerApi.data.map(banner => (
                            <SwiperSlide >
                                <img className=' relative' src={`https://www.amante.co.kr/uploads/theme/${banner.file_nm2}`} alt="" />
                                <p className=' absolute text-white text-xl font-bold left-3 bottom-5 w-3/4'>{banner.theme_nm}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        )
    }

}
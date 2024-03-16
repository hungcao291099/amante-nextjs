import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from "@/utils/instants";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { MainKeyWord } from '@/types/api_res/Main/main_keyword';
export default () => {
    const [ImgBannerApi, setImageBannerApi] = useState<MainKeyWord>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/banner/mainPopularKeyword`,
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
                        navigation={true}
                        modules={[Pagination, Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={5}
                    >
                        {ImgBannerApi.data.map(banner => (
                            <SwiperSlide >
                                <img className=' relative' src={`https://www.amante.co.kr/uploads/banner/${banner.file_nm1}`} alt="" />
                                <p className=' absolute text-white font-bold top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full text-center'>{banner.banner_nm}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        )
    }

}
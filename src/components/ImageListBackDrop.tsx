'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import useImageListString from "@/hooks/useImageListString"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { IoMdClose } from "react-icons/io";
export default () => {
    const ImageListString = useImageListString()

    if (ImageListString.isShow == false) return null
    return (
        <div className="w-full h-full justify-center  items-center  flex  fixed  inset-0  z-20  outline-none focus:outline-none bg-gray-900 bg-opacity-60 ">
            <div className=" relative w-full h-full">
                <div className=" absolute w-3/4 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        autoHeight={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}

                    >
                        {ImageListString.data.map(image => (
                            <SwiperSlide >
                                <div className=" h-screen w-full flex items-center justify-center">
                                    <img className="w-fit" src={image} alt="" />

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <IoMdClose className=" absolute top-0 right-0 hover:cursor-pointer z-50" size={30} color="#fff" onClick={() => ImageListString.setShow(false)} />

            </div>

        </div>
    )
}
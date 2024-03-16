import { Category_ } from "@/types/api_res/Main/category1";
import api from "@/utils/instants";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { checkDevice, getInnerText } from "@/utils/function";
export default () => {
    const setting = {
        itemPerSlide: 10
    }
    const [categories, setCategory] = useState<Category_>()
    const [WidthContent, setWidthContent] = useState(0)
    const [TotalPage, setTotalPage] = useState(0)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [LeftVisible, setLeftVisible] = useState(true)
    const [RightVisible, setRightVisible] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/category/list`,
                    method: "GET",
                });
                setCategory(data.data)
                var res: Category_ = data.data
                setWidthContent((1200 / setting.itemPerSlide) * res.data.length)
                setTotalPage((Math.ceil((1200 / setting.itemPerSlide) * res.data.length) / 1200))
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        checkDevice() === "desktop" ?
            <div className="relative ">
                <div className=" w-[1200px] overflow-hidden ">
                    <div id="cate_slider" style={{ width: `${WidthContent}px` }} className="flex flex-nowrap">
                        {categories?.data.map(cate => (
                            <div style={{ width: `${Math.floor(1200 / setting.itemPerSlide)}px`, transform: `translateX(${CurrentPage < TotalPage ? (0 - (CurrentPage * 1200)) : (0 - (WidthContent - (TotalPage - 1) * 1200))}px)` }} className="flex flex-col items-center gap-2 ">
                                <img className=" w-16 aspect-square rounded-full bg-[#f5f5f5] hover:border-gray-600 border-2 hover:cursor-pointer" src={`https://amante.co.kr/uploads/category/${cate.file_nm1}`} alt="" />
                                <p className=" text-sm text-gray-700">{parse(cate.category_nm.replaceAll("<br>", ""))}</p>
                            </div>
                        ))}
                    </div>

                </div>

                <div className={`${CurrentPage <= 0 && " opacity-0"} z-10 w-10 h-10 absolute -translate-y-5 -translate-x-10 flex justify-center items-center rounded-full bg-white drop-shadow top-1/2 left-0 transition-opacity`} onClick={() => setCurrentPage(x => x - 1)}><MdOutlineKeyboardArrowLeft size={20} /></div>
                <div className={`${CurrentPage >= TotalPage - 1 && " opacity-0"} z-10 w-10 h-10 absolute -translate-y-5 translate-x-10 flex justify-center items-center rounded-full bg-white drop-shadow top-1/2 right-0 transition-opacity`} onClick={() => setCurrentPage(x => x + 1)}><MdOutlineKeyboardArrowRight size={20} /></div>
            </div>
            :
            <div className="w-full p-3 overflow-x-auto no-scrollbar">
                <div className=" flex gap-3 ">
                    {categories?.data.map(cate => (
                        <div className="flex flex-col items-center gap-5 shrink-0 w-16">
                            <img className=" w-10 h-10 aspect-square rounded-full bg-[#f5f5f5]" src={`https://amante.co.kr/uploads/category/${cate.file_nm1}`} alt="" />
                            <p className=" text-gray-800 text-center">{getInnerText(cate.category_nm)}</p>
                        </div>
                    ))}
                </div>
            </div>
    )
}
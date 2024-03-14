import { Category_ } from "@/types/api_res/category1";
import api from "@/utils/instants";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
export default () => {
    const [categories, setCategory] = useState<Category_>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/category/list`,
                    method: "GET",
                });
                setCategory(data.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className=" ">

            <div className="relative w-[1200px] overflow-hidden ">
                <div className=" flex gap-10 flex-nowrap w-[2400px]">
                    {categories?.data.map(cate => (
                        <div className=" flex flex-col items-center gap-2">
                            <img className=" w-16 aspect-square rounded-full bg-[#f5f5f5] hover:border-gray-600 border-2 hover:cursor-pointer" src={`https://amante.co.kr/uploads/category/${cate.file_nm1}`} alt="" />
                            <p className=" text-sm text-gray-700">{parse(cate.category_nm.replaceAll("<br>", ""))}</p>
                        </div>
                    ))}
                </div>
                <div className=" w-10 h-10 absolute translate-x-4 flex justify-center items-center rounded-full bg-white drop-shadow top-1/2 left-0"><MdOutlineKeyboardArrowLeft size={20} color="#333" /></div>
                <div className=" w-10 h-10 absolute translate-x-4 flex justify-center items-center rounded-full bg-white drop-shadow top-1/2 right-0"><MdOutlineKeyboardArrowRight size={20} color="#333" /></div>

            </div>
        </div>
    )
}
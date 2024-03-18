import { Category } from "@/types/api_res/Main/category"
import api from "@/utils/instants"
import { useEffect, useState } from "react"
import { MdClose, MdOutlineKeyboardArrowDown } from "react-icons/md"
import useShowCateSide from "@/hooks/useCateSide"
import Link from "next/link"
export default () => {
    const CateSide = useShowCateSide()
    const [categories, setCategory] = useState<Category>()
    const [Level1, setLevel1] = useState(0)
    const [Level2, setLevel2] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/category/newlist2`,
                    method: "GET",
                });
                setCategory(data.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [])
    return (
        <div className={`fixed top-0 left-0 w-full h-full z-20 bg-white p-3 flex flex-col gap-3 pb-24 ${!CateSide.isOpen && " -translate-x-full"} transition-all duration-300`}>
            <div className=" relative w-full flex justify-between items-center">
                <p className=" font-semibold text-black text-lg w-full text-center">카테고리</p>
                <MdClose size={30} color="#333" onClick={() => CateSide.onClose()} />
            </div>
            <ul className=" flex flex-col w-full overflow-y-auto no-scrollbar bg-white">
                {categories?.data.map(cate => (
                    <li className=" p-3   ">
                        <div className=" flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <Link href={`/shop/product/product_list?CAT_CODE=${cate.CAT_CODE}`} onClick={() => CateSide.onClose()}>
                                    <p className=" text text-gray-700">{cate.CAT_NAME}</p>
                                </Link>
                                {cate.cate_list_2.length > 0 && <MdOutlineKeyboardArrowDown size={20} color="#333" className={`${cate.CAT_CODE === Level1 ? "rotate-180" : "rotate-0"} transition-transform`} onClick={() => setLevel1(x => x === cate.CAT_CODE ? 0 : cate.CAT_CODE)} />}
                            </div>
                            <ul className={`flex flex-col animation-slide ${cate.CAT_CODE === Level1 ? "slide-down" : "slide-up"}  bg-white border-l border-l-gray-200`}>
                                {cate.cate_list_2.map(cate2 => (
                                    <li className=" p-3  ">
                                        <div className=" flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <Link href={`/shop/product/product_list?CAT_CODE=${cate2.CAT_CODE}`} onClick={() => CateSide.onClose()}>
                                                    <p className=" text text-gray-700">{cate2.CAT_NAME}</p>
                                                </Link>
                                                {cate2.cate_list_3.length > 0 && <MdOutlineKeyboardArrowDown size={20} color="#333" className={`${cate2.CAT_CODE === Level2 ? "rotate-180" : "rotate-0"} transition-transform`} onClick={() => setLevel2(x => x === cate2.CAT_CODE ? 0 : cate2.CAT_CODE)} />}
                                            </div>
                                            <ul className={`flex flex-col  animation-slide ${cate2.CAT_CODE === Level2 ? "slide-down" : "slide-up"}  bg-white border-l border-l-gray-200`}>
                                                {cate2.cate_list_3.map(cate3 => (
                                                    <li className=" p-3">
                                                        <Link href={`/shop/product/product_list?CAT_CODE=${cate3.CAT_CODE}`} onClick={() => CateSide.onClose()}>
                                                            <p className=" text text-gray-700">{cate3.CAT_NAME}</p>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}
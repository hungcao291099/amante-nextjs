"use client"
import Content from "@/components/ProductList/Content"
import Sidebar from "@/components/ProductList/SideBar"
import { Cate_list_2, Category } from "@/types/api_res/category"
import api from "@/utils/instants"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGrid, IoListOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoMdArrowDropright } from "react-icons/io";
import { Detail, FindCategory } from "@/types/api_res/Category/FindCategory"
import Link from "next/link"

export default () => {
    const [ListMode, setListMode] = useState(false)
    const [NaviCate, setNaviCate] = useState<FindCategory>()
    const searchParams = useSearchParams();
    let CAT_CODE: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        CAT_CODE = searchParams.get('CAT_CODE');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/product_list/find_category?CAT_CODE=${CAT_CODE}`,
                    method: "GET",
                });

                setNaviCate(data.data)
                window.localStorage.setItem("navi_cate", data.data)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [CAT_CODE]);
    const showNaviCate = (cat_code: number) => {
        var navi_cate_li = document.getElementById(`cate_navi_li_${cat_code}`)
        var navi_cate = document.getElementById(`cate_navi_${cat_code}`)
        navi_cate_li?.addEventListener("mouseenter", () => {
            navi_cate?.classList.remove("hidden")
        })
        navi_cate_li?.addEventListener("mouseleave", () => {
            navi_cate?.classList.add("hidden")
        })
    }
    return (
        <div className="w-[1200px] m-auto mt-[140px] h-fit bg-slate-50 flex flex-col">
            <div className=" bg-slate-50">
                <div className="  rounded-lg w-[1200px] bg-white h-fit p-3 flex justify-between">
                    <div className=" flex items-center gap-4">
                        <Link href={"/"}><GoHome size={20} /></Link>
                        <ul className=" text-sm flex gap-4">
                            {NaviCate?.success &&
                                NaviCate.data.map(cate =>
                                    <Link href={`/shop/product/product_list?CAT_CODE=${cate.CAT_CODE}`}>
                                        <li id={`cate_navi_li_${cate.CAT_CODE}`} className=" flex items-center gap-1 relative z-0" onMouseEnter={() => showNaviCate(cate.CAT_CODE)}>
                                            <IoMdArrowDropright />
                                            <p>{cate.CAT_NAME}</p>
                                            <div id={`cate_navi_${cate.CAT_CODE}`} className=" absolute top-0 left-0 hidden">
                                                <ul className="rounded-md border-gray-300 bg-white border-[1px] h-fit w-max">
                                                    {(cate.detail as Detail[]).map(cate2 => (
                                                        <Link href={`/shop/product/product_list?CAT_CODE=${cate.CAT_CODE}`}>
                                                            <li className="p-2 text-gray-700 hover:text-rose-400 ">{cate2.CAT_NAME}</li>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    </Link>

                                )
                            }
                        </ul>

                    </div>
                    <div className="flex gap-4">
                        <div className=" flex items-center gap-3">
                            <input className=" w-4 h-4" type="checkbox" name="" id="1" /><label htmlFor="1">모음전 보기</label>
                        </div>
                        <div className=" flex items-center gap-3">
                            <input className=" w-4 h-4" type="checkbox" name="" id="1" /><label htmlFor="1">특가 상품만</label>
                        </div>

                        <div className=" flex justify-center items-center p-1 gap-2 border-[1px] border-gray-500 rounded-md">
                            <p>별점</p>
                            <IoMdArrowDropdown />
                        </div>
                        <div className=" flex justify-center items-center p-1 gap-2 border-[1px] border-gray-500 rounded-md">
                            <p>베스트 셀러</p>
                            <IoMdArrowDropdown />
                        </div>
                        <div className=" flex justify-center items-center gap-1">
                            <IoGrid size={30} color={`${!ListMode ? "#0F766E" : ""}`} className={`${!ListMode ? "border-[#0F766E]" : "border-gray-500"} p-1 border-[1px] rounded-md hover:cursor-pointer`} onClick={() => setListMode(false)} />
                            <IoListOutline size={30} color={`${ListMode ? "#0F766E" : ""}`} className={`${ListMode ? "border-[#0F766E]" : "border-gray-500"} p-1 border-[1px] rounded-md hover:cursor-pointer`} onClick={() => setListMode(true)} />
                        </div>
                    </div>

                </div>
            </div>

            <div className=" flex justify-between mt-4">
                <Sidebar />
                <Content list_mode={ListMode} />
            </div>
        </div>
    )
}
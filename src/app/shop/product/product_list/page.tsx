"use client"
import Content from "@/components/ProductList/Content"
import Sidebar from "@/components/ProductList/SideBar"
import { Cate_list_2, Category } from "@/types/api_res/category"
import api from "@/utils/instants"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGrid, IoListOutline } from "react-icons/io5";

export default () => {
    const [ListMode, setListMode] = useState(false)

    return (
        <div className="w-[1200px] m-auto mt-[140px] h-fit bg-slate-50 flex flex-col">
            <div className="z-10 fixed py-2 bg-slate-50">
                <div className="  rounded-lg w-[1200px] bg-white h-fit p-3 flex justify-end gap-4">
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

            <div className=" flex justify-between mt-20">
                <Sidebar />
                <Content list_mode={ListMode} />
            </div>
        </div>
    )
}
"use client"
import Content from "@/components/Category/Content"
import SubCate from "@/components/Category/SubCate"
import { Cate_list_2, Category } from "@/types/api_res/category"
import api from "@/utils/instants"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default () => {


    return (
        <div className="w-[1400px] m-auto mt-16 h-fit bg-slate-50 flex justify-between ">
            <SubCate />
            <Content />
        </div>
    )
}
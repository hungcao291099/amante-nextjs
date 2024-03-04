'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { GoHome } from "react-icons/go";
import { IoMdArrowDropright } from "react-icons/io";
import { Detail, FindCategory } from "@/types/api_res/Category/FindCategory"
import Link from "next/link"
import api from "@/utils/instants";
import { Navi, PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";


export default () => {
    const searchParams = useSearchParams();
    let PRODUCT_CODE: string | null = null;
    let product_cd: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        PRODUCT_CODE = searchParams.get('PRODUCT_CODE');
        product_cd = searchParams.get('product_cd');
    }

    const [ProductCodeRes, setProductCodeRes] = useState<PRODUCT_CODE_API_GET>()
    const [NaviCate, setNaviCate] = useState<Navi>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/product_list/find_category_product_code?PRODUCT_CODE=${PRODUCT_CODE}`,
                    method: "GET",
                });
                setProductCodeRes(data.data);
                console.log(data.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


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

        <div className=" w-[1200px] m-auto mt-[140px] rounded-md mb-3 p-3 h-fit bg-white flex flex-col">
            <div className=" flex item-center justify-between">
                <div className=" flex items-center gap-4">
                    <Link href={"/"}><GoHome size={20} /></Link>

                    <ul className=" text-sm flex gap-4">
                        {
                            ProductCodeRes?.success && ProductCodeRes.data.Navi.map(cate =>
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
            </div>

        </div>
    )
}
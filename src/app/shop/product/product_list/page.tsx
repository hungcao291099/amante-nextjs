"use client"
import Content from "@/components/ProductList/Content"
import Sidebar from "@/components/ProductList/SideBar"
import { Cate_list_2, Category } from "@/types/api_res/Main/category"
import api from "@/utils/instants"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGrid, IoListOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoMdArrowDropright } from "react-icons/io";
import { Detail, FindCategory } from "@/types/api_res/Category/FindCategory"
import Link from "next/link"
import { FaStar } from "react-icons/fa";
import useProductProps from "@/hooks/useProductProps"
import { ProductCount } from "@/types/api_res/ProductList/ProductCount"
import { checkDevice, formatNumber } from "@/utils/function"
import Layout from "@/components/Layout"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { CiSearch, CiShoppingCart } from "react-icons/ci"

export default () => {
    const ProductProps = useProductProps()
    const [ListMode, setListMode] = useState(false)
    const [NaviCate, setNaviCate] = useState<FindCategory>()
    const [Sort, setSort] = useState(0)
    const sortString = ['베스트셀러', '추천순', '인기순', '높은 가격순', '낮은 가격순', '조회순', '최신순']
    const [ShowSort, setShowSort] = useState(false)
    const ratingStar = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
    ]
    const [ShowRating, setShowRating] = useState(false)
    const [ProductCountApiRes, setProductCountApiRes] = useState<ProductCount>()

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
    const getProductCount = (data: ProductCount) => {
        setProductCountApiRes(data)
        data.response && ProductProps.setPriceRangeInit(`${data.response[0].price_sale_min}|${data.response[0].price_sale_max}`)
    }
    return (
        <Layout noLayout={false} noFloat={false} noHeader={checkDevice() === "mobile"} noFooter={false}>
            {checkDevice() === "desktop" ?
                <div className="w-[1200px] m-auto mt-48 h-fit bg-slate-50 flex flex-col">
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
                                                                <Link href={`/shop/product/product_list?CAT_CODE=${cate2.CAT_CODE}`}>
                                                                    <li className="p-2 text-gray-700 hover:text-rose-400 ">{cate2.CAT_NAME}</li>
                                                                </Link>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </li>
                                            </Link>

                                        )
                                    }
                                    {ProductCountApiRes && <li className=" font-semibold">{`총 ${formatNumber(ProductCountApiRes?.response[0].CNT)}`}</li>}
                                </ul>

                            </div>
                            <div className="flex gap-4">
                                <div className=" flex items-center gap-3">
                                    <input className=" w-4 h-4 accent-teal-700" type="checkbox" name="" id="cb_view_collection" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { ProductProps.setViewCollection(e.target.checked) }} /><label htmlFor="cb_view_collection">모음전 보기</label>
                                </div>
                                <div className=" flex items-center gap-3">
                                    <input className=" w-4 h-4 accent-teal-700" type="checkbox" name="" id="cb_sale" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { ProductProps.setSale(e.target.checked) }} /><label htmlFor="cb_sale">특가 상품만</label>
                                </div>

                                <div className={`flex justify-center items-center p-1 gap-2 border-[1px] rounded-md relative ${ProductProps.point === 0 ? "border-gray-500" : "border-[#f06652]"}`} onClick={() => ShowRating ? setShowRating(false) : setShowRating(true)}>
                                    <p>별점</p>
                                    <IoMdArrowDropdown />
                                    {ShowRating &&
                                        <div className="z-10 absolute top-0 right-0">
                                            <ul className=" p-2 bg-white border-[1px] border-gray-500 rounded-md mt-10 drop-shadow-md shadow-md">
                                                {ratingStar.map((x, index) => (
                                                    <li className="flex gap-2 w-max hover:text-[#f06652] hover:cursor-pointer p-1" onClick={() => { ProductProps.setPoint(ratingStar.length - index) }}>
                                                        <div className=" flex gap-1">{x.map(y => y === 1 ? <FaStar color="#f06652" /> : <FaStar color="#727476" />)} </div>
                                                        <p>{`${ratingStar.length - index} 이상`}</p>
                                                    </li>
                                                ))}
                                                <li className=" mt-2 p-1 text-center border-gray-400 border-[1px] rounded-md hover:cursor-pointer" onClick={() => { ProductProps.setPoint(0) }}>초기화</li>
                                            </ul>
                                        </div>}
                                </div>
                                <div className={`flex justify-center items-center p-1 gap-2 border-[1px] rounded-md relative ${ProductProps.sort === 0 ? "border-gray-500" : "border-[#f06652]"}`} onClick={() => { ShowSort ? setShowSort(false) : setShowSort(true) }}>
                                    <p>{sortString[ProductProps.sort]}</p>
                                    <IoMdArrowDropdown />
                                    {ShowSort && <div className=" z-10 absolute top-0 left-0">
                                        <ul className=" p-2 bg-white border-[1px] border-gray-500 rounded-md mt-10 drop-shadow-md shadow-md">
                                            {sortString.map((sort, index) => (
                                                <li className={`${Sort === index && " font-black"} w-max hover:cursor-pointer`} onClick={() => {
                                                    setSort(index)
                                                    ProductProps.setSort(index)
                                                }}>{sort}</li>

                                            ))}

                                        </ul>
                                    </div>}
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
                        <Content list_mode={ListMode} onProductCountChange={getProductCount} />
                    </div>
                </div>
                :
                <div className=" w-full bg-white p-2">
                    <div className=" fixed z-10 w-full h-fit top-0 left-0 flex flex-col gap-3 p-2 bg-white">
                        <div className=" flex justify-between items-center">
                            <MdOutlineKeyboardArrowLeft size={30} />
                            <div className=" flex gap-1 items-center">
                                <h2 className=" text-lg font-bold text-black">{NaviCate?.data[NaviCate.data.length - 1].CAT_NAME}</h2>
                                <MdOutlineKeyboardArrowDown size={20} />
                            </div>
                            <div className=" flex gap-4 items-center">
                                <CiSearch size={30} />
                                <div className=" relative">
                                    <CiShoppingCart size={30} />
                                    <span className=" absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-[#c8877a] text-white text-sm">0</span>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full overflow-x-auto no-scrollbar">
                            <ul className=" inline-flex gap-3">
                                {NaviCate?.data.map((cate, index) => (
                                    index < NaviCate.data.length &&
                                    <li className=" flex gap-3 items-center">
                                        <p className=" py-1 px-2 border border-gray-400 rounded-sm">{cate.CAT_NAME}</p>
                                        {index < NaviCate.data.length - 1 && <MdOutlineKeyboardArrowRight size={20} color="#999" />}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className=" inline-flex gap-3 overflow-x-auto no-scrollbar">
                            {NaviCate?.data[NaviCate.data.length - 1].detail.map(cate => (
                                <div className=" px-2 py-1 border shrink-0">{cate.CAT_NAME}</div>
                            ))}
                        </div>
                    </div>
                    <div className=" mt-12 bg-white">
                        content
                    </div>
                </div>}
        </Layout>
    )
}
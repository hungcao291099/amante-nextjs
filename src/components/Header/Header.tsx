'use client'
import { Cate_list_2, Cate_list_3, Category } from "@/types/api_res/Main/category";
import api from "@/utils/instants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import TopBanner from "../Main/Content/TopBanner";
import { checkDevice } from "@/utils/function";
import { Swiper, SwiperSlide } from "swiper/react";
export default () => {
    const [categories, setCategory] = useState<Category>()
    const [categories2, setCategory2] = useState<Cate_list_2[]>([])
    const [categories3, setCategory3] = useState<Cate_list_3[]>([])
    const router = useRouter()
    var token = window.localStorage.getItem("token")
    const [verify, setverify] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            token ? setverify(true) : setverify(false)
        }
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
    }, []);


    // -----------------------------------
    var cate_btn = document.getElementById("header_cate")
    var cate_area = document.getElementById("header_cate_area")
    var cate_depth1 = document.getElementById("header_cate_depth_1")
    var cate_depth2 = document.getElementById("header_cate_depth_2")
    var cate_depth3 = document.getElementById("header_cate_depth_3")

    cate_btn?.addEventListener("mouseleave", () => {
        cate_area?.classList.replace("flex", "hidden")
        cate_depth1?.classList.add("hidden")
        cate_depth2?.classList.add("hidden")
        cate_depth3?.classList.add("hidden")
        setCategory2([])
        setCategory3([])
    })
    cate_btn?.addEventListener("mouseenter", () => {
        cate_area?.classList.replace("hidden", "flex")
        cate_depth1?.classList.remove("hidden")
    })
    cate_depth1?.addEventListener("mousemove", () => {
        categories2.length > 0 ? cate_depth2?.classList.remove("hidden") : cate_depth2?.classList.add("hidden")
        cate_depth3?.classList.add("hidden")
    })
    cate_depth2?.addEventListener("mousemove", () => {
        categories3.length > 0 ? cate_depth3?.classList.remove("hidden") : cate_depth3?.classList.add("hidden")
    })

    const handleLogout = () => {
        window.localStorage.removeItem("user_data")
        window.localStorage.removeItem("token")
        alert("로그아웃되었습니다.")
        setverify(false)
    }
    if (categories)
        return (
            <div className=" w-full fixed bg-white flex flex-col justify-center items-center z-10 top-0">
                <TopBanner />
                {checkDevice() === "desktop" ?
                    <div className="w-[1200px] rounded-md py-3 px-5 flex flex-col gap-3 justify-between">
                        <div className="flex w-full justify-between">
                            <div className=" flex gap-2 items-center">
                                <Link href={`/`}><img src="/logo/pc_logo.png" alt="amante-logo" /></Link>
                                <p className=" text-gray-400 text-sm">공간을 새롭게, 일상을 특별하게</p>
                            </div>
                            <div className=" inline-flex gap-3 w-fit h-auto items-center relative">
                                <div className="relative p-1" >
                                    <CiShoppingCart size={30} className="hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md flex items-center justify-center " />
                                    <div className=" absolute top-0 right-0 text-sm w-5 h-5 flex items-center justify-center rounded-full bg-[#c8877a] translate-x-1 -translate-y-1 text-white">0</div>

                                </div>
                                {verify ?
                                    <Link href={"/member/mypage"}><p className="hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md p-1">마이페이지</p></Link>
                                    :
                                    <Link href={"/login"}><p className="hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md p-1 ">로그인</p></Link>
                                }
                                {verify ?
                                    <p className="hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md p-1 " onClick={() => handleLogout()}>로그아웃</p>
                                    :
                                    <Link href={"/join"}><p className="hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md p-1 ">회원가입</p></Link>
                                }

                                <p className="hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md p-1">고객센터</p>
                                <p className=" absolute right-0 top-0 -translate-x-1/3 -translate-y-3/4 py-1 px-2 rounded-lg text-white rounded-bl-none bg-[#FF9382] text-[12px]">가입 시 125,000원</p>
                            </div>
                        </div>
                        <div className=" flex justify-between items-center">
                            <div className=" flex gap-10 items-center">
                                <div id="header_cate" className=" flex gap-2 items-center p-2 rounded-md hover:bg-[#ff93828f] hover:cursor-pointer relative">
                                    <img className=" w-6 h-6" src="/svg/category.svg" alt="" />
                                    <p>카테고리</p>
                                    <div id="header_cate_area" className=" absolute top-0 left-0 -translate-x-4 p-3 flex gap-1 ">
                                        <div id="header_cate_depth_1" className=" rounded-md border-gray-300 bg-white border-[1px] mt-10 w-48 hidden h-fit">
                                            <ul>
                                                {categories?.data.map(cate1 => (
                                                    <Link href={`/shop/product/product_list?CAT_CODE=${cate1.CAT_CODE}`}>
                                                        <li className={`p-2 text-gray-700 hover:text-rose-400 ${categories2[0]?.CAT_M_CODE === cate1.CAT_CODE ? "text-rose-400" : ""}`} onMouseEnter={() => { setCategory2(cate1.cate_list_2) }}  >
                                                            {cate1.CAT_NAME}
                                                        </li>
                                                    </Link>

                                                ))}
                                            </ul>
                                        </div>
                                        <div id="header_cate_depth_2" className=" rounded-md border-gray-300 bg-white border-[1px]  mt-10 w-48 hidden h-fit">
                                            <ul>
                                                {categories2.map(cate2 => (
                                                    <Link href={`/shop/product/product_list?CAT_CODE=${cate2.CAT_CODE}`}>
                                                        <li className={`p-2 text-gray-700 hover:text-rose-400 ${categories3[0]?.CAT_M_CODE === cate2.CAT_CODE ? "text-rose-400" : ""}`} onMouseEnter={() => setCategory3(cate2.cate_list_3)} >
                                                            {cate2.CAT_NAME}
                                                        </li>
                                                    </Link>

                                                ))}
                                            </ul>
                                        </div>
                                        <div id="header_cate_depth_3" className=" rounded-md border-gray-300 bg-white border-[1px] mt-10 w-48 hidden h-fit">
                                            <ul>
                                                {categories3.map(cate3 => (
                                                    <Link href={`/shop/product/product_list?CAT_CODE=${cate3.CAT_CODE}`}>
                                                        <li className=" p-2 text-gray-700 hover:text-rose-400  ">
                                                            {cate3.CAT_NAME}
                                                        </li>
                                                    </Link>

                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <ul className="flex gap-7 items-center font-bold text-gray-800">
                                    <Link className=" hover-underline-animation" href={`#`}><li>윈터스페셜</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>쇼핑홈</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>베스트</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>기획전</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>SALE</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>룸투어</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>MD’s Pick</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>아울렛</li></Link>
                                    <Link className=" hover-underline-animation" href={`#`}><li>타임세일</li></Link>
                                </ul>
                            </div>
                            <div className=" rounded-md bg-gray-100 text-gray-300 flex gap-2 p-2">
                                <input className=" text-sm text-gray-400 bg-gray-100 outline-none" type="text" name="" id="" placeholder="어떤 상품이 필요하세요?" />
                                <CiSearch size={20} color="#727476" />
                            </div>

                        </div>
                    </div>
                    :
                    // ------mobile
                    <div className=" flex gap-2 flex-col w-full p-3">
                        <div className=" flex gap-2">
                            <div className=" rounded-md bg-gray-100 text-gray-300 flex gap-2 p-2 w-full ">
                                <input className=" text-sm text-gray-400 bg-gray-100 outline-none w-full" type="text" name="" id="" placeholder="어떤 상품이 필요하세요?" />
                                <CiSearch size={20} color="#727476" />
                            </div>
                            <div className="relative p-1 shrink-0 " >
                                <CiShoppingCart size={30} className=" rounded-md flex items-center justify-center " />
                                <div className=" absolute top-0 right-0 text-sm w-5 h-5 flex items-center justify-center rounded-full bg-[#c8877a] translate-x-1 -translate-y-1 text-white">0</div>
                            </div>
                        </div>
                        <div className=" w-full overflow-x-auto flex gap-3 no-scrollbar">
                            <ul className="flex gap-5 items-center font-semibold text-gray-800 *:flex-shrink-0">
                                <Link className=" hover-underline-animation" href={`#`}><li>윈터스페셜</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>쇼핑홈</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>베스트</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>기획전</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>SALE</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>룸투어</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>MD’s Pick</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>아울렛</li></Link>
                                <Link className=" hover-underline-animation" href={`#`}><li>타임세일</li></Link>
                            </ul>
                        </div>
                    </div>
                }

            </div>

        )
}
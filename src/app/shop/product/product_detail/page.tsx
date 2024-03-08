'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { GoGift, GoHome } from "react-icons/go";
import { IoMdArrowDropright } from "react-icons/io";
import { Detail, FindCategory } from "@/types/api_res/Category/FindCategory"
import Link from "next/link"
import api from "@/utils/instants";
import { Navi, PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";
import { PRODUCT_DETAIL_API_RES, UseReview } from "@/types/api_res/ProductDetail/ProductDetail";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar, FaBell } from "react-icons/fa";
import { formatNumber } from "@/utils/function";
import { CiCircleInfo } from "react-icons/ci";
import { MdOutlineArrowDropDown, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import parse from 'html-react-parser';
import { ProductReview } from "@/types/api_res/ProductDetail/ProductReview";

export default () => {
    const searchParams = useSearchParams();
    let PRODUCT_CODE: string | null = null;
    let product_cd: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        PRODUCT_CODE = searchParams.get('PRODUCT_CODE');
        product_cd = searchParams.get('product_cd');
    }

    const [ProductCodeRes, setProductCodeRes] = useState<PRODUCT_CODE_API_GET>()
    const [ProductDetailRes, setProductDetailRes] = useState<PRODUCT_DETAIL_API_RES>()
    const [CurrentImage, setCurrentImage] = useState("")
    const [rating, setRating] = useState<number[]>([])
    const [DetailTab, setDetailTab] = useState(1)
    const [DetailShow, setDetailShow] = useState(false)
    const [ProductReview, setProductReview] = useState<ProductReview[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/product_list/find_category_product_code?PRODUCT_CODE=${PRODUCT_CODE}&PRODUCT_CD=${product_cd}`,
                    method: "GET",
                });
                setProductCodeRes(data.data);

            } catch (error) {
                console.log(error);
            }


            try {
                const data = await api({
                    url: `/shop/product/review/list?product_cd=${product_cd}`,
                    method: "GET",
                });
                setProductReview(data.data);

            } catch (error) {
                console.log(error);
            }


            try {
                const data = await api({
                    url: `/shop/product/detail_new?product_cd=${product_cd}`,
                    method: "GET",
                });
                setProductDetailRes(data.data);
                setCurrentImage((data.data as PRODUCT_DETAIL_API_RES).data.file[0].file_nm)
                var datares: PRODUCT_DETAIL_API_RES = data.data
                var point = Math.round(datares.data.point)
                setRating([])
                for (let i = 0; i < point; i++) {
                    setRating(x => [...x, 1])
                }
                if (point < 5) {
                    for (let i = 0; i < 5 - point; i++) {
                        setRating(x => [...x, 0])
                    }

                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/member/mypage/review/getComment?use_review_seq=`,
                    method: "GET",
                });
                setProductReview(data.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


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

        <div className=" w-[1200px] m-auto mt-[140px] rounded-md mb-3 p-3 h-fit bg-white flex flex-col gap-4">
            <div className=" flex item-center justify-between">
                <div className=" flex items-center gap-8">
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
            {ProductDetailRes?.success &&
                <div className=" flex justify-around">
                    <div className=" w-[500px] flex flex-col gap-1">
                        {CurrentImage != "" && <img className=" duration-300 rounded" src={`https://www.amante.co.kr/uploads/product/${CurrentImage}`} alt="" loading="lazy" />}
                        <div className="w-full grid grid-cols-6 gap-1">
                            {ProductDetailRes.data.file.map(file =>
                                <img className={`hover:border-[#c8877a] border-[2px] duration-300 ${file.file_nm === CurrentImage ? "border-[#c8877a]" : ""}`} src={`https://www.amante.co.kr/uploads/product/${file.file_nm}`} alt="" onMouseEnter={() => setCurrentImage(file.file_nm)} />
                            )}

                        </div>
                    </div>
                    <div className=" w-[500px] flex flex-col gap-3">
                        <div className=" flex gap-1">tag</div>
                        <div className=" text-xl font-semibold">{ProductDetailRes.data.product_nm}</div>
                        <div className=" flex gap-2">
                            <div className="flex gap-1">{rating.map(star => star === 1 ? <FaStar color="#f06652" /> : <FaStar color="#727476" />)}</div>
                            {/* <div className="flex gap-1">{rating.map(star => star)}</div> */}
                            <div className=" text-sm text-[#f06652]">{`${formatNumber(ProductDetailRes.data.review_cnt)}개 리뷰`}</div>
                        </div>
                        {ProductDetailRes.data.fee_rate !== 0 &&
                            <div className=" flex gap-2">
                                <p className=" text-base text-[#f06652]" >{`${ProductDetailRes.data.fee_rate}%`}</p>
                                <p className=" text-gray-500 line-through">{formatNumber(ProductDetailRes.data.supply_price)}</p>
                            </div>
                        }
                        <p className=" font-bold text-2xl">{formatNumber(ProductDetailRes.data.sale_price)}<span className=" font-normal text-lg">원</span> </p>
                        <div className=" flex gap-4">
                            <p className=" text-gray-400">적립금</p>
                            <p className=" text-black">1% 적립</p>
                        </div>
                        <div className=" flex gap-4">
                            <p className=" text-gray-400">배송비</p>
                            <p className=" text-black">3,500원 (70,000원 이상 구매시 무료배송)</p>
                        </div>
                        {ProductDetailRes.data.optionBases.map(opt => opt.opt_gb === "C" && (
                            <select className=" p-1 border-[1px] border-gray-400 rounded-md" name="" id="">
                                <option value={`${opt.opt_cd1}`}>{opt.opt_nm1}</option>
                                {ProductDetailRes.data.OPTION_C.map(optC => optC.opt_cd1 === opt.opt_cd1 && (
                                    <option value={`${optC.opt_cd2}`}>{`${optC.opt_nm2} ${optC.opt_price != 0 ? `(+${formatNumber(optC.opt_price)}원)` : ""}`}</option>
                                ))}
                            </select>
                        ))}
                        {ProductDetailRes.data.optionBases.map(opt => opt.opt_gb === "S" && (
                            <select className=" p-1 border-[1px] border-gray-400 rounded-md" name="" id="">
                                <option value={`${opt.opt_cd1}`}>{opt.opt_nm1}</option>
                                {ProductDetailRes.data.OPTION_S.map(optS => optS.opt_cd1 === opt.opt_cd1 && (
                                    <option value={`${optS.opt_cd2}`}>{`${optS.opt_nm2} ${optS.opt_price != 0 ? `(+${formatNumber(optS.opt_price)}원)` : ""}`}</option>
                                ))}
                            </select>
                        ))}

                        <div className=" flex justify-end gap-2 items-center">
                            <FaBell color="#F6BC25" />
                            <a className=" text-[#3AA1FF] text-sm" href="#">재입고 알리미 신청</a>
                        </div>
                        <p className=" text-gray-400">추가 구성</p>
                        {ProductDetailRes.data.optionBases.map(opt => opt.opt_gb === "I" && (
                            <select className=" p-1 border-[1px] border-gray-400 rounded-md" name="" id="">
                                <option value={`${opt.opt_cd1}`}>{opt.opt_nm1}</option>
                                {ProductDetailRes.data.OPTION_I.map(optI => optI.opt_cd1 === opt.opt_cd1 && (
                                    <option value={`${optI.opt_cd2}`}>{`${optI.opt_nm2} ${optI.opt_price != 0 ? `(+${formatNumber(optI.opt_price)}원)` : ""}`}</option>
                                ))}
                            </select>
                        ))}

                        <div className=" grid grid-cols-4 h-14 text-white gap-2">
                            <p className=" col-span-2 text-center flex items-center justify-center bg-gray-900">구매하기</p>
                            <div className=" flex justify-center items-center gap-1 h-full bg-[#c8877a]">
                                <GoGift />
                                <p>선물하기</p>
                            </div>
                            <p className=" h-full border-[1px] border-gray-400 text-gray-700 flex items-center justify-center">장바구니 담기</p>
                        </div>
                        <div className=" flex gap-2 text-sm text-gray-400 justify-end items-center">
                            <CiCircleInfo size={20} />
                            <p>선물하기 안내</p>
                        </div>
                        <div className=" grid grid-cols-2 gap-2 text-lg font-semibold">
                            <div className=" flex gap-2 items-center justify-center p-3 bg-[#00DE5A]">
                                <img src="/logo/naver_pay_logo.png" alt="" />
                                <p>구매하기</p>
                            </div>
                            <div className=" flex gap-2 items-center justify-center p-3 bg-[#FEE102]">
                                <img src="/logo/kakao_pay_logo.png" alt="" />
                                <p>구매하기</p>
                            </div>
                        </div>
                    </div>
                </div>}
            <div className=" flex gap-2 text-xl font-bold">Most Loved <span className=" text-lg font-semibold">다른 고객들이 많이 본 상품</span></div>
            <div className=" w-full">
                <Swiper>
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            </div>
            <div className=" flex flex-col">
                <div className=" w-full grid grid-cols-4 text-center bg-gray-100">
                    <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 1 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(1)}>상품상세</div>
                    <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 2 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(2)}>구매안내</div>
                    <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 3 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(3)}>{`리뷰 ${formatNumber(ProductDetailRes?.data.review_cnt ? ProductDetailRes?.data.review_cnt : 0)}`}</div>
                    <div className={`hover:bg-white p-2 hover:cursor-pointer border-[2px] ${DetailTab === 4 ? " border-transparent border-b-black bg-white" : " border-transparent"}`} onClick={() => setDetailTab(4)}>상품 문의</div>
                </div>
                <div className=" w-full min-h-[1000px]">
                    {/* ------------------DETAIL TAB -------------- */}
                    {DetailTab === 1 &&
                        <div className={`${DetailShow ? " h-fit" : " h-[1000px] overflow-hidden"}  relative flex flex-col items-center`}>
                            {parse(ProductDetailRes?.data.productDetail.content ? ProductDetailRes?.data.productDetail.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : "")}
                            <div className=" flex flex-col absolute bottom-0 w-full">
                                <div className=" h-[1000px] bg-gradient-to-t from-white"></div>
                                <div className=" bg-white bottom-0 flex gap-3 justify-center items-center p-2 text-lg font-semibold border-[1px] border-gray-700 rounded hover:cursor-pointer"
                                    onClick={() => DetailShow ? setDetailShow(false) : setDetailShow(true)}>
                                    <p>상품 설명 더보기</p>
                                    {DetailShow ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}
                                </div>
                            </div>
                        </div>
                    }
                    {/* ------------------BUYING GUIDE TAB -------------- */}
                    {DetailTab === 2 &&
                        <div className=" h-fit flex flex-col items-center  ">
                            {parse(ProductDetailRes?.data.productCon.content2 ? ProductDetailRes.data.productCon.content2 : "")}
                        </div>
                    }
                    {/* ------------------REVIEW TAB -------------- */}
                    {DetailTab === 3 &&
                        <div className=" py-5 flex flex-col gap-5">
                            <p className=" text-xl font-semibold">리뷰 <span className=" text-[#f06652]">{formatNumber(ProductDetailRes?.data.review_cnt ? ProductDetailRes?.data.review_cnt : 0)}</span></p>
                            <div className=" grid grid-cols-6 gap-2 p-2">
                                {getReviewImageList(ProductDetailRes?.data.useReview).map((image, index) => (
                                    index < 6 &&
                                    <div className=" w-full rounded-md relative aspect-square">
                                        <img className="rounded-md w-full h-full" src={image} alt="" />
                                        {index === 5 && ProductDetailRes?.data.useReview.length &&
                                            <div className=" w-full h-full absolute rounded-md backdrop-brightness-50 top-0 left-0 flex justify-center items-center text-white text-2xl font-semibold">{`+${getReviewImageList(ProductDetailRes?.data.useReview).length - 6}`}</div>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className=" flex flex-col gap-10">
                                {ProductReview.map(rv => (
                                    <div className=" flex flex-col gap-2">
                                        <div className=" flex gap-3 items-center">
                                            <div className=" flex gap-1">
                                                {getReviewRating(rv.point).map(rating => rating === 1 ? <FaStar color="#f06652" /> : <FaStar color="#727476" />)}
                                            </div>
                                            <div className=" text-gray-400 text-sm">{rv.user_id.slice(0, 3) + '***'}</div>
                                            <div className=" text-gray-400 text-sm">{rv.reg_date.split(" ")[0]}</div>
                                        </div>
                                        <h3 className=" font-bold text-lg">{rv.title}</h3>
                                        <p className=" text-sm text-gray-600">{rv.content}</p>
                                        <div className=" flex items-center gap-2 text-[#c8877a]">
                                            <p>접기</p>
                                            <MdOutlineKeyboardArrowUp color="#c8877a" size={15} />
                                        </div>
                                        <div className=" flex gap-3 items-center">
                                            <p className={`text-sm p-1 border-[1px] ${rv.like_yn !== 0 ? "text-[#f06652] border-[#f06652]" : "border-gray-400 text-gray-400"}`}>추천해요</p>
                                            <p className="text-sm text-gray-400 p-1 font-semibold">{`댓글(${rv.like_cnt})`}</p>
                                        </div>
                                        <div className=" flex flex-col gap-2">
                                            <div className=" w-full rounded-md bg-gray-100 text-gray-600 flex flex-col gap-1 p-2">
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    {/* ------------------QNA TAB -------------- */}
                    {DetailTab === 4 &&
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
}
const getReviewImageList = (useReview: UseReview[] | undefined | null) => {
    var imageList: string[] = []
    useReview && useReview.map(review => {
        if (review.file_nm1) imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm1}`)
        if (review.file_nm2) imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm2}`)
        if (review.file_nm3) imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm3}`)
        if (review.file_nm4) imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm4}`)
        if (review.file_nm5) imageList.push(`https://www.amante.co.kr/uploads/review/${review.file_nm5}`)

        if (review.photo_review_url) imageList.push(`${review.photo_review_url}`)
        if (review.photo_review_url2) imageList.push(`${review.photo_review_url2}`)
        if (review.photo_review_url3) imageList.push(`${review.photo_review_url3}`)
        if (review.photo_review_url4) imageList.push(`${review.photo_review_url4}`)
        if (review.photo_review_url5) imageList.push(`${review.photo_review_url5}`)
        if (review.photo_review_url6) imageList.push(`${review.photo_review_url5}`)
    })

    return imageList
}
const getReviewRating = (point: number) => {
    var reviewRating: number[] = []
    for (let i = 0; i < point; i++) {
        reviewRating.push(1)
    }
    if (point < 5) {
        for (let i = 0; i < 5 - point; i++) {
            reviewRating.push(0)
        }
    }
    return reviewRating
}
import { PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo"
import { PRODUCT_DETAIL_API_RES } from "@/types/api_res/ProductDetail/ProductDetail"
import { ProductReview } from "@/types/api_res/ProductDetail/ProductReview"
import { formatNumber } from "@/utils/function"
import { useEffect, useState } from "react"
import useImageList from "@/hooks/useImageListString"
import { FaStar, FaBell } from "react-icons/fa";
import { MdOutlineArrowDropDown, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowUp } from "react-icons/md";
import api from "@/utils/instants"
import { useSearchParams } from "next/navigation"
import { ReviewAllImage } from "@/types/api_res/ProductDetail/ReviewAllImage"
const ReviewTab: React.FC<{ ProductDetailRes: PRODUCT_DETAIL_API_RES }> = ({ ProductDetailRes }) => {

    const [AllReviewImage, setAllReviewImage] = useState<string[]>([])
    const [ProductReview, setProductReview] = useState<ProductReview[]>([])
    const ImageListString = useImageList()
    const [CurrentReviewPage, setCurrentReviewPage] = useState(1)
    const [NavReviewPage, setNavReviewPage] = useState(1)
    const [PageList, setPageList] = useState<number[]>([])
    const searchParams = useSearchParams();
    let PRODUCT_CODE: string | null = null;
    let product_cd: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        PRODUCT_CODE = searchParams.get('PRODUCT_CODE');
        product_cd = searchParams.get('product_cd');
    }
    useEffect(() => {
        setPageList([])
        for (let i = 1; i <= Math.ceil(ProductDetailRes.data.review_cnt / 5); i++) {
            setPageList(x => [...x, i])

        }
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/review_image?product_cd=${product_cd}`,
                    method: "GET",
                });
                var all_img_res: ReviewAllImage = data.data
                setAllReviewImage([])
                all_img_res.data.image_list1.map(x => setAllReviewImage(y => [...y, `https://www.amante.co.kr/uploads/review/${x}`]))
                all_img_res.data.image_list2.map(x => setAllReviewImage(y => [...y, x]))

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/review/list_new?product_cd=${product_cd}&page=${CurrentReviewPage}`,
                    method: "GET",
                });
                setProductReview(data.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [CurrentReviewPage])
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
    const getReviewDetailImageList = (useReview: ProductReview) => {
        var imageList: string[] = []
        if (useReview.file_nm1) imageList.push(`https://www.amante.co.kr/uploads/review/${useReview.file_nm1}`)
        if (useReview.file_nm2) imageList.push(`https://www.amante.co.kr/uploads/review/${useReview.file_nm2}`)
        if (useReview.file_nm3) imageList.push(`https://www.amante.co.kr/uploads/review/${useReview.file_nm3}`)
        if (useReview.file_nm4) imageList.push(`https://www.amante.co.kr/uploads/review/${useReview.file_nm4}`)
        if (useReview.file_nm5) imageList.push(`https://www.amante.co.kr/uploads/review/${useReview.file_nm5}`)

        if (useReview.photo_review_url) imageList.push(`${useReview.photo_review_url}`)
        if (useReview.photo_review_url2) imageList.push(`${useReview.photo_review_url2}`)
        if (useReview.photo_review_url3) imageList.push(`${useReview.photo_review_url3}`)
        if (useReview.photo_review_url4) imageList.push(`${useReview.photo_review_url4}`)
        if (useReview.photo_review_url5) imageList.push(`${useReview.photo_review_url5}`)
        if (useReview.photo_review_url6) imageList.push(`${useReview.photo_review_url5}`)
        return imageList
    }

    const showComment = (rv_seq: number) => {
        var comment = document.getElementById(`rv_${rv_seq}`)
        comment?.classList.contains('hidden') ? comment?.classList.remove('hidden') : comment?.classList.add('hidden')
    }
    return (
        <div className=" py-5 flex flex-col gap-5">
            <p className=" text-xl font-semibold">리뷰 <span className=" text-[#f06652]">{formatNumber(ProductDetailRes?.data.review_cnt ? ProductDetailRes?.data.review_cnt : 0)}</span></p>
            <div className=" grid grid-cols-6 gap-2 p-2">
                {AllReviewImage.map((image, index) => (
                    index < 6 &&
                    <div className=" w-full rounded-md relative aspect-square" onClick={() => ImageListString.onAddData(AllReviewImage)}>
                        <img className="rounded-md w-full h-full select-none" src={image} alt="" />
                        {index === 5 && AllReviewImage.length > 0 &&
                            <div className=" w-full h-full absolute rounded-md backdrop-brightness-50 top-0 left-0 flex justify-center items-center text-white text-2xl font-semibold">{`+${AllReviewImage.length - 6}`}</div>
                        }
                    </div>
                ))}
            </div>
            <div className=" flex flex-col gap-10">
                {ProductReview.map(rv => (
                    <div className=" flex flex-col gap-1">
                        <div className=" flex justify-between items-center w-full gap-5">
                            <div className=" flex flex-col justify-between gap-2 ">
                                <div className=" flex gap-3 items-center w-fit">
                                    <div className=" flex gap-1">
                                        {getReviewRating(rv.point).map(rating => rating === 1 ? <FaStar color="#f06652" /> : <FaStar color="#727476" />)}
                                    </div>
                                    <div className=" text-gray-400 text-sm">{rv.user_id.slice(0, 3) + '***'}</div>
                                    <div className=" text-gray-400 text-sm">{rv.reg_date.split(" ")[0]}</div>
                                </div>
                                <h3 className=" font-bold text-lg">{rv.title}</h3>
                                <p className=" text-sm text-gray-600 w-fit">{rv.content}</p>
                            </div>
                            <div className=" relative w-24 flex-shrink-0" onClick={() => ImageListString.onAddData(getReviewDetailImageList(rv))}>
                                <img className=" rounded aspect-square" src={getReviewDetailImageList(rv)[0]} alt="" />
                                {getReviewDetailImageList(rv).length > 1 && <div className=" w-full h-full absolute rounded-md backdrop-brightness-50 top-0 left-0 flex justify-center items-center text-white text-2xl font-semibold">{`+${getReviewDetailImageList(rv).length - 1}`}</div>}
                            </div>
                        </div>
                        <div className=" flex items-center gap-2 text-[#c8877a] p-2 hover:bg-gray-100 hover:cursor-pointer rounded-sm w-fit " onClick={() => showComment(rv.use_review_seq)}>
                            <p>접기</p>
                            <MdOutlineKeyboardArrowUp color="#c8877a" size={15} />
                        </div>
                        <div className=" flex gap-3 items-center">
                            <p className={`text-sm p-1 border-[1px] ${rv.like_yn !== 0 ? "text-[#f06652] border-[#f06652]" : "border-gray-400 text-gray-400"}`}>추천해요</p>
                            <p className="text-sm text-gray-400 p-1 font-semibold">{`댓글(${rv.comment_cnt})`}</p>
                        </div>
                        <div className=" flex flex-col gap-2 hidden" id={`rv_${rv.use_review_seq}`}>
                            <div className=" flex flex-col gap-2 p-2">
                                {rv.comment.map(cmt => (
                                    <div className=" w-full rounded-md bg-gray-100 text-gray-600 flex flex-col gap-2 p-2">
                                        <p className=" text-sm">{cmt.comment}</p>
                                        <p className=" text-gray-400">{`${cmt.user_id} • ${cmt.reg_date.split(" ")[0]}`}</p>
                                    </div>
                                ))}
                            </div>
                            <div className=" flex gap-2 w-full">
                                <input className="p-1 text-sm border-[1px] rounded-sm border-gray-400 flex-grow" type="text" name="" id="" />
                                <p className=" bg-slate-800 py-2 px-4 text-white">등록</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" flex justify-center items-center gap-5 text-lg">
                <MdOutlineKeyboardArrowLeft className=" hover:cursor-pointer" color={NavReviewPage > 1 ? "#111" : "#999"} size={25} onClick={() => NavReviewPage > 1 && setNavReviewPage(x => x - 1)} />
                <div className=" flex gap-5 text-gray-400">
                    {NavReviewPage > 1 && <p className="hover:text-[#c8877a] hover:cursor-pointer" onClick={() => {
                        setCurrentReviewPage(1)
                        setNavReviewPage(1)
                    }}>1</p>}
                    {NavReviewPage > 1 && <p>. . . </p>}
                    {PageList.map(page => page <= 5 * NavReviewPage && page > 5 * NavReviewPage - 5 &&
                        <p className={`${CurrentReviewPage === page && "text-gray-900 font-bold"} hover:text-[#c8877a] hover:cursor-pointer`}
                            onClick={() => setCurrentReviewPage(page)}>{page}</p>
                    )}
                    {NavReviewPage <= Math.floor(PageList[PageList.length - 1] / 5) && <p>. . .</p>}
                    {NavReviewPage <= Math.floor(PageList[PageList.length - 1] / 5) && <p className="hover:text-[#c8877a] hover:cursor-pointer" onClick={() => {
                        setCurrentReviewPage(PageList[PageList.length - 1])
                        setNavReviewPage(Math.ceil(PageList[PageList.length - 1] / 5))
                    }}>{PageList[PageList.length - 1]} </p>}
                </div>

                <MdOutlineKeyboardArrowRight className=" hover:cursor-pointer" color={NavReviewPage <= Math.floor(PageList[PageList.length - 1] / 5) ? "#111" : "#999"} size={25} onClick={() => NavReviewPage <= Math.floor(PageList[PageList.length - 1] / 5) && setNavReviewPage(x => x + 1)} />
            </div>
        </div>
    )
}
export default ReviewTab
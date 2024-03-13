import { PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";
import { PRODUCT_DETAIL_API_RES } from "@/types/api_res/ProductDetail/ProductDetail";
import { ProductQna } from "@/types/api_res/ProductDetail/ProductQna";
import api from "@/utils/instants";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowUp } from "react-icons/md";
const QnaTab = () => {
    const [ProductQna, setProductQna] = useState<ProductQna>()
    const [QnaPageList, setQnaPageList] = useState<number[]>([])
    const [CurrentQnaPage, setCurrentQnaPage] = useState(1)
    const [NavQnaPage, setNavQnaPage] = useState(1)
    const searchParams = useSearchParams();
    let PRODUCT_CODE: string | null = null;
    let product_cd: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        PRODUCT_CODE = searchParams.get('PRODUCT_CODE');
        product_cd = searchParams.get('product_cd');
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/qna/list_new?product_cd=${product_cd}&page=${CurrentQnaPage}`,
                    method: "GET",
                });
                setProductQna(data.data)
                var qna_data: ProductQna = data.data
                setQnaPageList([])
                for (let i = 1; i <= qna_data.total_page; i++) {
                    setQnaPageList(x => [...x, i])
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [CurrentQnaPage])
    return (ProductQna?.data && ProductQna?.data.length > 0 &&
        <div className=" flex flex-col gap-5 p-5">
            <h1 className=" font-bold text-black text-lg">문의 <span className=" text-[#f06652]">{ProductQna.total_count}</span></h1>
            <div className=" flex flex-col gap-5">
                {ProductQna.data.map(quest => (
                    <div className=" flex justify-between items-center p-2">
                        <div className=" flex flex-col gap-2">
                            <h3 className=" text-sm text-gray-400">{`${quest.writer_id} • ${quest.reg_date.split(" ")[0]}`}</h3>
                            <p className=" text-gray-600">{quest.title}</p>
                        </div>
                        <h2 className={`${quest.reply_date !== "" ? "text-[#f06652]" : "text-gray-400"} p-2 rounded-sm hover:bg-gray-100 hover:cursor-pointer flex-shrink-0`}>{quest.reply_date !== "" ? "답변 완료" : "답변 대기"}</h2>
                    </div>
                ))}
            </div>
            <div className=" flex gap-5 justify-center items-center">
                <MdOutlineKeyboardArrowLeft className=" hover:cursor-pointer" color={NavQnaPage > 1 ? "#111" : "#999"} size={25} onClick={() => NavQnaPage > 1 && setNavQnaPage(x => x - 1)} />
                <div className=" flex gap-5">
                    {QnaPageList.map(page => page <= 5 * NavQnaPage && page > 5 * NavQnaPage - 5 &&
                        <p className={`${CurrentQnaPage === page && "text-gray-900 font-bold"} hover:text-[#c8877a] hover:cursor-pointer`}
                            onClick={() => setCurrentQnaPage(page)}>{page}</p>)}
                    {NavQnaPage <= ProductQna.total_page && ProductQna.total_page > 5 && <p>. . .</p>}
                    {NavQnaPage <= ProductQna.total_page && ProductQna.total_page > 5 && <p className="hover:text-[#c8877a] hover:cursor-pointer" onClick={() => {
                        setCurrentQnaPage(ProductQna.total_page)
                        setNavQnaPage(ProductQna.total_page)
                    }}>{ProductQna.total_page} </p>}
                </div>
                <MdOutlineKeyboardArrowRight className=" hover:cursor-pointer" color={NavQnaPage <= ProductQna.total_page && ProductQna.total_page > 5 ? "#111" : "#999"} size={25} onClick={() => NavQnaPage <= ProductQna.total_page && ProductQna.total_page > 5 && setNavQnaPage(x => x + 1)} />
            </div>
        </div>
    )
}
export default QnaTab
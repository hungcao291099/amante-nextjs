'use client'
import { MdCheckBox, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import api from "@/utils/instants";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MouseEvent } from 'react';
import { Cate_list_2, Cate_list_3, Category, Data } from "@/types/api_res/category";
import { DETAILED, Response, TotalProp } from "@/types/api_res/Category/TotalProps";
import { BiCheckbox } from "react-icons/bi";
import { useRouter } from "next/navigation";
export default () => {

    const [TotalProps, setTotalProps] = useState<TotalProp>()
    const searchParams = useSearchParams();
    let CAT_CODE: string | null = null;

    if (searchParams !== null && searchParams !== undefined) {
        CAT_CODE = searchParams.get('CAT_CODE');
    }
    const { push } = useRouter()
    const [CategoryList, setCategoryList] = useState<(Data[])>([])
    const [CategoryList2, setCategoryList2] = useState<(Cate_list_2[])>([])
    const [CategoryLis3t, setCategoryList3] = useState<(Cate_list_3)>()
    useEffect(() => {
        const fetchData = async () => {
            setCategoryList([])
            setCategoryList2([])
            try {

                const data = await api({
                    url: `/shop/product/category/newlist2`,
                    method: "GET",
                });
                var res: Category = data.data

                var check1 = res.data.filter(cate1 => cate1.CAT_CODE.toString() === CAT_CODE)
                if (check1.length !== 0) {
                    setCategoryList(check1)
                }
                else {
                    var check2 = res.data.map(cate1 => cate1.cate_list_2.filter(cate2 => cate2.CAT_CODE.toString() === CAT_CODE))
                    if (check2.length !== 0) {
                        setCategoryList2(check2[0])
                    } else {
                        var check3 = res.data.map(cate1 => cate1.cate_list_2.map(cate2 => cate2.cate_list_3.map(cate3 => cate3.CAT_CODE.toString() === CAT_CODE)))
                        if (!check3)
                            push("/")
                    }
                }

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [CAT_CODE])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/app/product/hCode/dCode2?CAT_CODE=${CAT_CODE}`,
                    method: "GET",
                });

                setTotalProps(data.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [CAT_CODE])



    return (
        <div className=" w-[220px] pb-20 flex flex-col gap-3">
            {(CategoryList || CategoryList2 || CategoryLis3t) && TotalProps?.status && TotalProps.response.map(prop => (
                prop.DETAILED.length > 0 ? (
                    <div className="rounded-md bg-white p-2">
                        <p className=" font-bold my-2 px-5">{prop.H_NAME}</p>
                        {prop.H_CODE === "55_51" ? (
                            <div className=" grid grid-cols-2 gap-4 ml-3">
                                {(prop.DETAILED as DETAILED[]).map(detail => (

                                    <div className="flex gap-2">
                                        <input className=" accent-teal-700 w-4 h-4" type="checkbox" name="" id={`D_${detail.D_CODE}`} />
                                        <img className=" rounded-full border-[1px] border-black w-5 h-5" src={`https://www.amante.co.kr/uploads/product/color/color_${detail.D_CODE}.png`} alt="" />
                                        <label className=" text-sm hover:cursor-pointer " htmlFor={`D_${detail.D_CODE}`}>{detail.D_NAME}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className=" flex flex-col gap-4 ml-3">
                                {(prop.DETAILED as DETAILED[]).map(detail => (
                                    <div className="flex gap-2">
                                        <input className=" accent-teal-700 w-4 h-4" type="checkbox" name="" id={`D_${detail.D_CODE}`} />
                                        <label className=" text-sm hover:cursor-pointer" htmlFor={`D_${detail.D_CODE}`}>{detail.D_NAME}</label>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ) : null

            ))}

        </div>
    )

}

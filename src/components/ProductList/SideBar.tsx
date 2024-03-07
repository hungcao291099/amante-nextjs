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
import useProductFilter from "@/hooks/useProductFilter";
import useProductProps from "@/hooks/useProductProps";
import { RangeSlider } from "next-range-slider";
import 'next-range-slider/dist/main.css';
import { formatNumber } from "@/utils/function";
export default () => {
    const ProductFilter = useProductFilter()
    const ProductProp = useProductProps()
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
    const [PriceLow, setPriceLow] = useState(0)
    const [PriceHigh, setPriceHigh] = useState(Number(ProductProp.price_range_init.split("|")[1]))
    const [PercentR, setPercentR] = useState(0)
    const [PercentL, setPercentL] = useState(0)
    useEffect(() => {
        if (ProductProp.price_range_init != "0|1000") {
            setPriceLow(Number(ProductProp.price_range_init.split("|")[0]))
            setPriceHigh(Number(ProductProp.price_range_init.split("|")[1]))
        }
    }, [ProductProp.price_range_init])
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
            {ProductFilter.filters.length > 0 &&
                <div className="rounded-md bg-white p-2 flex justify-center items-center border-[1px] border-gray-400 hover:cursor-pointer du" onClick={() => {
                    ProductFilter.removeAll()
                    ProductProp.removeAll()
                }}>
                    <p>초기화</p>
                </div>
            }
            {(CategoryList || CategoryList2 || CategoryLis3t) && TotalProps?.status && TotalProps.response.map(prop => (
                prop.DETAILED.length > 0 ? (
                    <div className="rounded-md bg-white p-2">
                        <p className=" font-bold my-2 px-5">{prop.H_NAME}</p>
                        {prop.H_CODE === "55_51" ? (
                            <div className=" grid grid-cols-2 gap-4 ml-3">
                                {(prop.DETAILED as DETAILED[]).map(detail => (

                                    <div className="flex gap-2">
                                        <input className=" accent-teal-700 w-4 h-4" type="checkbox" name="" id={`D_${detail.D_CODE}`}
                                            checked={ProductFilter.filters.some(x => x.option_id === detail.D_CODE)}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                e.target.checked ? ProductFilter.setFilter(detail.D_CODE, detail.D_NAME) : ProductFilter.removeFilter(detail.D_CODE, detail.D_NAME)
                                            }} />
                                        <img className=" rounded-full border-[1px] border-black w-5 h-5" src={`https://www.amante.co.kr/uploads/product/color/color_${detail.D_CODE}.png`} alt="" />
                                        <label className=" text-sm hover:cursor-pointer " htmlFor={`D_${detail.D_CODE}`}>{detail.D_NAME}</label>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className=" flex flex-col gap-4 ml-3">
                                {(prop.DETAILED as DETAILED[]).map(detail => (
                                    <div className="flex gap-2">
                                        <input className=" accent-teal-700 w-4 h-4" type="checkbox" name="" id={`D_${detail.D_CODE}`}
                                            checked={ProductFilter.filters.some(x => x.option_id === detail.D_CODE)}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                e.target.checked ? ProductFilter.setFilter(detail.D_CODE, detail.D_NAME) : ProductFilter.removeFilter(detail.D_CODE, detail.D_NAME)
                                            }} />
                                        <label className=" text-sm hover:cursor-pointer" htmlFor={`D_${detail.D_CODE}`}>{detail.D_NAME}</label>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ) : null
            ))}{ProductProp.price_range_init != "" &&
                <div className="rounded-md bg-white p-2">
                    <p className=" font-bold my-2 px-5">금액</p>
                    {/* <RangeSlider min={0} max={Number(ProductProp.price_range_init.split("|")[1])} step={1000}

                        options={{
                            leftInputProps: {
                                value: PriceLow,
                                onChange: (e) => setPriceLow(Math.min(Number(e.target.value), PriceHigh - 1)),
                                onMouseUp: () => ProductProp.setPriceRange(`${PriceLow}|${PriceHigh}`)
                            },
                            rightInputProps: {
                                value: PriceHigh,
                                onChange: (e) => setPriceHigh(Math.max(Number(e.target.value), PriceLow + 1)),
                                onMouseUp: () => ProductProp.setPriceRange(`${PriceLow}|${PriceHigh}`)
                            },
                            thumb: {
                                background: "#fff",
                                focusBackground: "#f1f1f1",
                                width: "16px",
                                height: "16px",
                                border: "1px solid #6b7280"
                            },
                            track: {
                                background: "#d1d5db",
                                height: "4px"
                            },
                            range: {
                                background: "#c8877a"
                            }
                        }} /> */}
                    <div className="range-slider px-5">
                        <span style={{ left: `${PercentL}%`, right: `${PercentR}%` }} className="h-full absolute bg-[#c8877a]"></span>
                        <input type="range" min={0} max={Number(ProductProp.price_range_init.split("|")[1])} step={1000} value={PriceLow} id=""
                            onChange={(e) => {
                                setPriceLow(Math.min(Number(e.target.value), PriceHigh - 1))
                                setPercentL(Math.round((PriceLow / Number(ProductProp.price_range_init.split("|")[1])) * 100))
                            }}
                            onMouseUp={() => ProductProp.setPriceRange(`${PriceLow}|${PriceHigh}`)} />
                        <input type="range" min={0} max={Number(ProductProp.price_range_init.split("|")[1])} step={1000} value={PriceHigh} id=""
                            onChange={(e) => {
                                setPriceHigh(Math.max(Number(e.target.value), PriceLow + 1))
                                setPercentR(Math.round(100 - (PriceHigh / Number(ProductProp.price_range_init.split("|")[1])) * 100))
                            }}
                            onMouseUp={() => ProductProp.setPriceRange(`${PriceLow}|${PriceHigh}`)} />
                    </div>
                    <div className=" flex justify-between">
                        <input type="text" name="" id="" value={formatNumber(PriceLow)} className=" outline-none border-[1px] border-gray-500 rounded-md w-16 text-center p-1" />
                        <input type="text" name="" id="" value={formatNumber(PriceHigh)} className=" outline-none border-[1px] border-gray-500 rounded-md w-16 text-center p-1" />
                    </div>

                </div>
            }


        </div>
    )

}

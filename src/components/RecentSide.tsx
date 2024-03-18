'use client'

import { CartList } from "@/types/api_res/Cart/CartList";
import api from "@/utils/instants";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"
import useShowRecentSide from "@/hooks/useRecentSide";
import { checkDevice, formatNumber } from "@/utils/function";
import { RecentListGet } from "@/types/api_res/RecentList/RecentListGet";
import { SessionRes } from "@/types/api_res/Login/SessionId";
export default () => {
    var token = window.localStorage.getItem("token")
    var sessionId = window.localStorage.getItem("sessionId")
    const [RecentListAPI, setRecentListAPI] = useState<RecentListGet>()
    const [isLoading, setisLoading] = useState(true)
    const RecentSide = useShowRecentSide()
    useEffect(() => {

        const fetchData = async () => {
            setisLoading(true)
            LoadData();
            try {
                const data = await api({
                    url: '/shop/get/session_id',
                    method: 'GET',
                });
                var session: SessionRes = data.data
                window.localStorage.setItem("sessionId", session.sessionId)

            } catch (error) {
                console.log(error);
            }
            setisLoading(false)
        };
        token && fetchData();
    }, []);

    const LoadData = () => {
        const fetchData = async () => {
            var selectAll = document.getElementById("cart_checkall") as HTMLInputElement
            selectAll && (selectAll.checked = false)
            var all_checkbox = document.querySelectorAll<HTMLInputElement>('input[name="recent-item"]')
            all_checkbox.forEach((checkbox) => {
                checkbox.checked = false
            })
            try {
                const data = await api({
                    url: '/shop/mypage/account/product_today_lists',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRecentListAPI(data.data)
                var res: RecentListGet = data.data
                res.data.map(product => RecentSide.addProduct_cd(product.product_cd))

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    const SelectAllItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        var all_checkbox = document.querySelectorAll<HTMLInputElement>('input[name="recent-item"]')

        all_checkbox.forEach((checkbox) => {
            checkbox.checked = e.target.checked
        })
    }
    const deleteSelected = () => {
        var item_id: string[] = []
        var all_checkbox = document.querySelectorAll<HTMLInputElement>('input[name="recent-item"]')
        all_checkbox.forEach((checkbox) => {
            checkbox.checked && item_id.push(checkbox.id)
        })
        const fetchData = async () => {
            try {
                await api({
                    url: '/shop/mypage/account/disable_my_today',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { item_id: item_id, sessionId: sessionId }
                });
                LoadData()
            } catch (error) {
                console.log(error);
            }
        }
        (token || sessionId) && item_id.length > 0 && fetchData();
    }
    const restoreRecentList = () => {
        const fetchData = async () => {
            try {
                await api({
                    url: '/shop/mypage/account/restore_my_today',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                LoadData()
            } catch (error) {
                console.log(error);
            }
        }
        token && fetchData();
    }



    return (

        <div className={`fixed w-full h-full z-20 top-0 left-0 transition-all duration-300 mb-24 ${RecentSide.isOpen ? " visible" : "invisible"}`}>
            <div className=" absolute top-0 left-0 w-full h-full bg-gray-800/30 " onClick={() => RecentSide.onClose()}></div>
            <div className={`absolute top-0 right-0 h-screen ${checkDevice() === "mobile" ? "w-full" : "w-[400px]"} z-20 flex flex-col gap-5 p-3 bg-white transition-transform duration-300 ${!RecentSide.isOpen && (checkDevice() === "mobile" ? "translate-x-full" : "translate-x-[400px]")}`} id="recent-sidebar">
                <div className="flex flex-col gap-4">
                    <div className=" relative flex justify-center items-center">
                        <h2 className=" font-bold text-lg">최근 본 상품</h2>
                        <MdClose size={30} color="#333" className=" absolute top-0 right-0 hover:cursor-pointer" onClick={() => RecentSide.onClose()} />
                    </div>
                    <div className=" flex justify-between items-center">
                        <div className=" flex gap-2 items-center">
                            <input className=" w-4 h-4" type="checkbox" name="" id="cart_checkall" onChange={(e) => SelectAllItem(e)} />
                            <label className=" text-gray-500" htmlFor="cart_checkall">전체선택</label>
                        </div>
                        <div className=" text-gray-800 flex gap-3">
                            <h3 className=" hover:cursor-pointer hover:text-[#c8877a]" onClick={() => deleteSelected()}>삭제</h3>
                            <h3 className=" hover:cursor-pointer hover:text-[#c8877a]" onClick={() => restoreRecentList()}>취소</h3>
                        </div>
                    </div>
                </div>

                <div className="h-full" id="cart_list">
                    {!token ?
                        <div className=" h-full w-full flex justify-center items-center">
                            <p>Please login to continue ~</p>
                        </div>
                        : isLoading ?
                            <div className=" h-full w-full flex justify-center items-center">
                                <div className=" animate-spin loader"></div>
                            </div>
                            :
                            RecentListAPI?.success &&
                            <div className="w-full overflow-y-scroll flex flex-col gap-5 no-scrollbar h-screen pb-32">
                                {RecentListAPI.data.map(product =>
                                    <div className=" flex items-start gap-3 text-sm transition-all duration-300">
                                        <input className=" w-4 h-4 shrink-0" type="checkbox" name="recent-item" id={product.product_cd} />
                                        <div className=" flex gap-2">
                                            <div className=" w-24 shrink-0 ">
                                                <img className=" w-full " src={`https://www.amante.co.kr/uploads/product/${product.product_main_img}`} alt="" />
                                            </div>
                                            <div className=" flex flex-col">
                                                <h2 className=" text-black font-semibold">{product.product_nm}</h2>
                                                <h3 className=" font-bold text-black ">{`${formatNumber(product.sale_price)}원`}</h3>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                    }

                </div>
            </div>
        </div>
    )
}
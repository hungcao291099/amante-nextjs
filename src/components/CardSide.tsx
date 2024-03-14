'use client'

import { CartList } from "@/types/api_res/Cart/CartList";
import api from "@/utils/instants";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"
import useShowCartSide from "@/hooks/useCardSide";
import { formatNumber } from "@/utils/function";
export default () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [CartListAPI, setCartListAPI] = useState<CartList>()
    const [isLoading, setisLoading] = useState(true)
    const CartSide = useShowCartSide()
    useEffect(() => {

        const fetchData = async () => {
            setisLoading(true)
            try {
                const data = await api({
                    url: '/cart/lists',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartListAPI(data.data)
                var res: CartList = data.data
                CartSide.setCount(res.data.total_count)
            } catch (error) {
                console.log(error);
            }
            setisLoading(false)
        };
        token && fetchData();
    }, []);


    return (
        CartSide.isOpen &&
        <div className=" fixed w-full h-full z-50 top-0 left-0 ">
            <div className=" absolute top-0 left-0 w-full h-full bg-gray-800/30" onClick={() => CartSide.onClose()}></div>
            <div className=" absolute top-0 right-0 h-screen w-[400px] z-20 flex flex-col gap-5 p-3 bg-white">
                <div className="flex flex-col gap-4">
                    <div className=" relative flex justify-center items-center">
                        <h2 className=" font-bold text-lg">최근 본 상품</h2>
                        <MdClose size={30} color="#333" className=" absolute top-0 right-0" onClick={() => CartSide.onClose()} />
                    </div>
                    <div className=" flex justify-between">
                        <div>
                            <input className=" w-5" type="checkbox" name="" id="cart_checkall" />
                            <label className=" text-gray-500" htmlFor="cart_checkall">전체선택</label>
                        </div>
                        <div className=" text-gray-800 flex gap-3">
                            <h3>삭제</h3>
                            <h3>취소</h3>
                        </div>
                    </div>
                </div>

                <div className="h-full" id="cart_list">
                    {isLoading &&
                        <div className=" h-full w-full flex justify-center items-center">
                            <div className=" animate-spin loader"></div>
                        </div>
                    }
                    {CartListAPI?.success &&
                        <div className="w-full overflow-y-scroll flex flex-col gap-5 no-scrollbar h-screen pb-32">
                            {CartListAPI.data.cart.map(cart =>
                                <div className=" flex items-start gap-3 text-sm">
                                    <input className=" w-5 shrink-0" type="checkbox" name="" id={cart.cart_seq} />
                                    <div className=" flex gap-2">
                                        <div className=" w-24 shrink-0 ">
                                            <img className=" w-full " src={`https://www.amante.co.kr/uploads/product/${cart.product_main_img}`} alt="" />
                                        </div>
                                        <div className=" flex flex-col">
                                            <h2 className=" text-black font-semibold">{cart.product_nm}</h2>
                                            {cart.c_options && cart.c_options.map(opt => (
                                                <div className=" flex gap-2">
                                                    {opt.opt_nm.split("@").map(opt_nm => (
                                                        <p className=" text-sm text-gray-500">{opt_nm}</p>
                                                    ))}
                                                </div>
                                            ))}
                                            {cart.c_options && cart.s_options.map(opt => (
                                                <div className=" flex gap-2">
                                                    {opt.opt_nm.split("@").map(opt_nm => (
                                                        <p className=" text-sm text-gray-500">{opt_nm}</p>
                                                    ))}
                                                </div>
                                            ))}
                                            {cart.c_options && cart.i_options.map(opt => (
                                                <div className=" flex gap-2">
                                                    {opt.opt_nm.split("@").map(opt_nm => (
                                                        <p className=" text-sm text-gray-500">{opt_nm}</p>
                                                    ))}
                                                </div>
                                            ))}
                                            <h3 className=" font-bold text-black ">{`${formatNumber(cart.total_price)}원`}</h3>
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
'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import api from "@/utils/instants";
import { PRODUCT_CODE_API_GET } from "@/types/api_res/ProductDetail/ProductCodeInfo";
import { PRODUCT_DETAIL_API_RES } from "@/types/api_res/ProductDetail/ProductDetail";
import Loading from "@/components/ProductDetail/Loading";
import BreadCrumbs from "@/components/ProductDetail/BreadCrumbs";
import DetailGeneral from "@/components/ProductDetail/DetailGeneral";
import DetailTab from "@/components/ProductDetail/DetailTab";
import MostLoved from "@/components/ProductDetail/MostLoved";
import Layout from "@/components/Layout";
import useShowRecentSide from "@/hooks/useRecentSide";
export default () => {
    var token = window.localStorage.getItem("token")
    var session_id = window.localStorage.getItem("session_id")
    const searchParams = useSearchParams();
    let PRODUCT_CODE: string | null = null;
    let product_cd: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        PRODUCT_CODE = searchParams.get('PRODUCT_CODE');
        product_cd = searchParams.get('product_cd');
    }
    const [isLoading, setisLoading] = useState(false)
    const [ProductCodeRes, setProductCodeRes] = useState<PRODUCT_CODE_API_GET>()
    const [ProductDetailRes, setProductDetailRes] = useState<PRODUCT_DETAIL_API_RES>()
    const RecentSide = useShowRecentSide()
    useEffect(() => {
        const fetchData = async () => {
            setisLoading(true)
            RecentSide.addProduct_cd(`${product_cd}`)
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
                    url: `/shop/product/detail_new?product_cd=${product_cd}`,
                    method: "GET",
                });
                setProductDetailRes(data.data)
            } catch (error) {
                console.log(error);
            }

            console.log(product_cd, RecentSide.product_cd, token, product_cd && token && !RecentSide.product_cd.includes(product_cd));
            if (product_cd && token && !RecentSide.product_cd.includes(product_cd)) {

                try {
                    const data = await api({
                        url: `/shop/mypage/account/insert_today_view`,
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: {
                            sessionID: session_id || 1,
                            product_cd: product_cd
                        }
                    });

                } catch (error) {
                    console.log(error);
                }
            }



            setisLoading(false)

        };
        fetchData();
    }, []);


    if (isLoading)
        return (<Loading />)
    else
        return (

            <Layout noLayout={false}>
                <div className=" w-[1200px] m-auto mt-44 rounded-md mb-3 p-3 h-fit bg-white ">
                    {ProductDetailRes?.success ?
                        <div className="flex flex-col gap-4">
                            {ProductCodeRes?.success && <BreadCrumbs ProductCodeRes={ProductCodeRes}></BreadCrumbs>}
                            <DetailGeneral ProductDetailRes={ProductDetailRes} />
                            <MostLoved />
                            <DetailTab ProductDetailRes={ProductDetailRes} />
                        </div>
                        :
                        <div className=" w-full flex justify-center"><img src="/image/404.png" alt="" /></div>
                    }
                </div>
            </Layout>
        )
}


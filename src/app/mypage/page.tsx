'use client'
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation"
import useSetCurrentNavBar from "@/hooks/useNavBar";
import { useEffect } from "react";
export default () => {
    const router = useRouter()
    const NavBar = useSetCurrentNavBar()
    useEffect(() => {
        NavBar.setCurrent(4)
        // if (typeof window !== 'undefined') {
        var token = window.localStorage.getItem("token");
        !token && router.push("/login");
        // }


        // var token = window.localStorage.getItem("token");
        // if (!token) {
        //     router.push("/login")
        // }
    }, [])

    return (
        <Layout noLayout={false} noHeader={true} noFloat={true} noFooter={true}>
            <div className="text-2xl text-center">My Page</div>
        </Layout>
    )
}
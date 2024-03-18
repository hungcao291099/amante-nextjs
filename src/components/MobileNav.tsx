import { useEffect, useState } from "react"
import { CiHeart } from "react-icons/ci"
import { FaRegUser } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { IoCameraOutline } from "react-icons/io5"
import { MdHome } from "react-icons/md"
import useShowCateSide from "@/hooks/useCateSide"
import { checkDevice } from "@/utils/function"
import { useRouter } from "next/navigation"
import useSetCurrentNavBar from "@/hooks/useNavBar"
export default () => {
    const CateSide = useShowCateSide()
    const NavBar = useSetCurrentNavBar()
    const router = useRouter()
    const handleMenu = (index: number) => {
        CateSide.isOpen && CateSide.onClose()
        switch (index) {
            case 0:
                CateSide.onOpen();
                NavBar.setCurrent(0)
                break;
            case 1:
                NavBar.setCurrent(1)
                break;
            case 2:
                NavBar.setCurrent(2)
                router.push("/")
                break;
            case 3:
                NavBar.setCurrent(3)
                break;
            case 4:
                NavBar.setCurrent(4)
                router.push("/mypage")
                break;

            default: NavBar.setCurrent(2)
                break;
        }
    }


    return (
        checkDevice() === "mobile" &&
        <div className=" z-30 fixed bottom-0 h-24 *:w-24 left-0 rounded-t-md w-full grid grid-cols-5 place-items-center gap-2 *:text-gray-800 bg-white ">
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(0)}>
                <HiMenu className=" z-10" color={`${NavBar.current === 0 ? "#fff" : "#333"}`} size={20} />
                {NavBar.current !== 0 && <p className="text-sm">카테고리</p>}
                <div className={`absolute ${NavBar.current === 0 ? "w-3/4 h-3/4 " : "w-0 h-0 "} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(1)}>
                <IoCameraOutline className=" z-10" color={`${NavBar.current === 1 ? "#fff" : "#333"}`} size={20} />
                {NavBar.current !== 1 && <p className="text-sm">룸투어</p>}
                <div className={`absolute ${NavBar.current === 1 ? "w-3/4 h-3/4 " : "w-0 h-0 "} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(2)}>
                <MdHome className=" z-10" color={`${NavBar.current === 2 ? "#fff" : "#333"}`} size={20} />
                {NavBar.current !== 2 && <p className="text-sm">Home</p>}
                <div className={`absolute ${NavBar.current === 2 ? "w-3/4 h-3/4 " : "w-0 h-0 "} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(3)}>
                <CiHeart className=" z-10" color={`${NavBar.current === 3 ? "#fff" : "#333"}`} size={23} />
                {NavBar.current !== 3 && <p className="text-sm">좋아요</p>}
                <div className={`absolute ${NavBar.current === 3 ? "w-3/4 h-3/4 " : "w-0 h-0 "} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(4)}>
                <FaRegUser className=" z-10" color={`${NavBar.current === 4 ? "#fff" : "#333"}`} size={20} />
                {NavBar.current !== 4 && <p className="text-sm">마이페이지</p>}
                <div className={`absolute ${NavBar.current === 4 ? "w-3/4 h-3/4 " : "w-0 h-0 "} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>

        </div>
    )
}
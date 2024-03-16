import { useEffect, useState } from "react"
import { CiHeart } from "react-icons/ci"
import { FaRegUser } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"
import { IoCameraOutline } from "react-icons/io5"
import { MdHome } from "react-icons/md"
import useShowCateSide from "@/hooks/useCateSide"
export default () => {
    const CateSide = useShowCateSide()
    const [currentMenu, setcurrentMenu] = useState(2)
    const handleMenu = (index: number) => {
        switch (index) {
            case 0:
                CateSide.onOpen();
                setcurrentMenu(0)
                break;
            case 1:
                setcurrentMenu(1)
                break;
            case 2:
                setcurrentMenu(2)
                break;
            case 3:
                setcurrentMenu(3)
                break;
            case 4:
                setcurrentMenu(4)
                break;

            default: setcurrentMenu(2)
                break;
        }
    }
    return (
        <div className=" z-20 fixed bottom-0 h-24 left-0 rounded-t-md w-full p-2 grid grid-cols-5 gap-2 marker:*:text-gray-800 bg-white border-t-2 border-gray-100">
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(0)}>
                <HiMenu className=" z-10" color={`${currentMenu === 0 ? "#fff" : "#333"}`} size={20} />
                {currentMenu !== 0 && <p className="text-sm">카테고리</p>}
                <div className={`absolute ${currentMenu === 0 ? "w-3/4 h-3/4" : "w-0 h-0"} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(1)}>
                <IoCameraOutline className=" z-10" color={`${currentMenu === 1 ? "#fff" : "#333"}`} size={20} />
                {currentMenu !== 1 && <p className="text-sm">룸투어</p>}
                <div className={`absolute ${currentMenu === 1 ? "w-3/4 h-3/4" : "w-0 h-0"} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(2)}>
                <MdHome className=" z-10" color={`${currentMenu === 2 ? "#fff" : "#333"}`} size={20} />
                {currentMenu !== 2 && <p className="text-sm">Home</p>}
                <div className={`absolute ${currentMenu === 2 ? "w-3/4 h-3/4" : "w-0 h-0"} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(3)}>
                <CiHeart className=" z-10" color={`${currentMenu === 3 ? "#fff" : "#333"}`} size={23} />
                {currentMenu !== 3 && <p className="text-sm">좋아요</p>}
                <div className={`absolute ${currentMenu === 3 ? "w-3/4 h-3/4" : "w-0 h-0"} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>
            <div className=" relative flex flex-col gap-1 items-center justify-center aspect-square " onClick={() => handleMenu(4)}>
                <FaRegUser className=" z-10" color={`${currentMenu === 4 ? "#fff" : "#333"}`} size={20} />
                {currentMenu !== 4 && <p className="text-sm">마이페이지</p>}
                <div className={`absolute ${currentMenu === 4 ? "w-3/4 h-3/4" : "w-0 h-0"} transition-all duration-300 rounded-full bg-[#c8877a]`}></div>
            </div>

        </div>
    )
}
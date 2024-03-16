'use client'
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md"
import { TbClockSearch } from "react-icons/tb";
import useShowCartSide from "@/hooks/useRecentSide";
import { checkDevice } from "@/utils/function";

export default () => {
    const CartSide = useShowCartSide()
    const ScrolltoTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(ScrolltoTop);
            window.scrollTo(0, c - c / 8);
        }

    }
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed bottom-0 right-0 z-20 p-3 m-3 flex flex-col gap-5 ${checkDevice() === "mobile" && "mb-24"}`}>
            <div className=" w-10 h-10 rounded-full drop-shadow-md bg-white flex justify-center items-center" onClick={() => CartSide.onOpen()}><TbClockSearch size={20} color="#333" /></div>
            {isVisible &&
                <div className=" w-10 h-10 rounded-full animate-bounce drop-shadow-md bg-white flex justify-center items-center" onClick={() => ScrolltoTop()}><MdOutlineKeyboardArrowUp size={20} color="#333" /></div>
            }
        </div>
    )
}
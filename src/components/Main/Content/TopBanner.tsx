import { checkDevice } from "@/utils/function"
export default () => {
    return (
        checkDevice() === "desktop" ?
            <div className=" flex justify-between items-center w-3/4 bg-slate-950">
                <img src="/image/Topbanner.png" alt="" />
                <h2 className=" font-bold text-lg text-white">회원 첫구매 최대 15% & 재구매 20% 쿠폰!</h2>
                <img className=" scale-x-[-1]" src="/image/Topbanner.png" alt="" />
            </div>
            : <h2 className=" font-bold text-lg text-white bg-slate-950 w-full p-2 text-center ">회원 첫구매 최대 15% & 재구매 20% 쿠폰!</h2>
    )
}
import { checkDevice } from "@/utils/function"
import Banner1 from "./Content/Banner1"
import Banner2 from "./Content/Banner2"
import Banner3 from "./Content/Banner3"
import BestCategory from "./Content/BestCategory"
import BestProduct from "./Content/BestProduct"
import CateSlide from "./Content/CateSlide"
import HouseWarming from "./Content/HouseWarming"
import Instagram from "./Content/Instagram"
import NewProduct from "./Content/NewProduct"
import SpecialList from "./Content/SpecialList"
import MainKeyword from "./Content/mainKeyword"

export default () => {
    return (
        checkDevice() === "desktop" ?
            <div className="w-[1200px] m-auto h-fit bg-white flex flex-col gap-5 justify-between z-0">
                {/* <Banner1 />
            <Banner2 /> */}
                <CateSlide />
                <NewProduct />
                <BestProduct />
                <Banner3 />
                <BestCategory />
                {/* <HouseWarming />
            <MainKeyword />
            <SpecialList />
            <Instagram /> */}
            </div>
            :
            <div className=" w-full ">
                <CateSlide />
                <NewProduct />
                <BestProduct />
                <Banner3 />
                <BestCategory />
            </div>
    )
}
import Banner1 from "./Content/Banner1"
import Banner2 from "./Content/Banner2"
import Banner3 from "./Content/Banner3"
import BestProduct from "./Content/BestProduct"
import HouseWarming from "./Content/HouseWarming"
import Instagram from "./Content/Instagram"
import NewProduct from "./Content/NewProduct"
import SpecialList from "./Content/SpecialList"
import MainKeyword from "./Content/mainKeyword"

export default () => {
    return (
        <div className="w-full flex flex-col gap-5 top-0 translate-y-36 rounded-md z-0">
            <Banner1 />
            <Banner2 />
            <NewProduct />
            <BestProduct />
            <Banner3 />
            <HouseWarming />
            <MainKeyword />
            <SpecialList />
            <Instagram />
        </div>
    )
}
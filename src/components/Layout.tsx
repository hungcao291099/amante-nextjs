import React from "react"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import CartModal from "./CartModal";
import ImageListBackDrop from "./ImageListBackDrop";
import GiftInfo from "./ProductDetail/DetailTab/GiftInfo";
import FloatGroupBtn from "./FloatGroupBtn";
import TopBanner from "./Main/Content/TopBanner";
import RecentSide from "./RecentSide";
import MobileNav from "./MobileNav";
import CateSide from "./CateSide";
interface IProps {
    children: Readonly<React.ReactNode>;
    noLayout: boolean;
}


export default (props: IProps) => {
    return (
        <>
            {!props.noLayout ?
                <>

                    <Header />
                    {props.children}
                    <RecentSide />
                    <CateSide />
                    <CartModal />
                    <ImageListBackDrop />
                    <GiftInfo />
                    <FloatGroupBtn />
                    <Footer />
                    <MobileNav />
                </>
                :
                <>{props.children}</>
            }
        </>
    )
}
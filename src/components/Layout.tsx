import React from "react"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import CartModal from "./CartModal";
import ImageListBackDrop from "./ImageListBackDrop";
import GiftInfo from "./ProductDetail/DetailTab/GiftInfo";
import CartSide from "@/components/CardSide"
import FloatGroupBtn from "./FloatGroupBtn";
import TopBanner from "./Main/Content/TopBanner";
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
                    <CartSide />
                    <CartModal />
                    <ImageListBackDrop />
                    <GiftInfo />
                    <FloatGroupBtn />
                    <Footer />
                </>
                :
                <>{props.children}</>
            }
        </>
    )
}
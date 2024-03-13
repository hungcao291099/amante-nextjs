import React from "react"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import CartModal from "./CartModal";
import ImageListBackDrop from "./ImageListBackDrop";
import GiftInfo from "./ProductDetail/DetailTab/GiftInfo";

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
                    <CartModal />
                    <ImageListBackDrop />
                    <GiftInfo />
                    <Footer />
                </>
                :
                <>{props.children}</>
            }
        </>
    )
}
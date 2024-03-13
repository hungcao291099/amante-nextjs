import { PRODUCT_CODE_API_GET } from '@/types/api_res/ProductDetail/ProductCodeInfo';
import { PRODUCT_DETAIL_API_RES } from '@/types/api_res/ProductDetail/ProductDetail';
import parse from 'html-react-parser';
const BuyingGuildTab: React.FC<{ ProductDetailRes: PRODUCT_DETAIL_API_RES }> = ({ ProductDetailRes }) => {
    return (
        <div className=" h-fit flex flex-col items-center  ">
            {parse(ProductDetailRes?.data.productCon.content2 ? ProductDetailRes.data.productCon.content2 : "")}
        </div>
    )
}
export default BuyingGuildTab
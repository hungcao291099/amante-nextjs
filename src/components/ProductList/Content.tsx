import { ProductList } from "@/types/api_res/ProductList/ProductList";
import api from "@/utils/instants";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGrid, IoListOutline } from "react-icons/io5";
import ProductItem from "./ProductItem";
import { useSearchParams } from "next/navigation";
const ProductListContent: React.FC<{ list_mode: Boolean }> = ({ list_mode }) => {
    const [ProductList, setProductList] = useState<ProductList>()
    const searchParams = useSearchParams();
    let CAT_CODE: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        CAT_CODE = searchParams.get('CAT_CODE');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/app/filter/product_lists?CAT_CODE=55`,
                    method: "GET",
                });

                setProductList(data.data)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="w-[950px] flex flex-col gap-5 pb-3 rounded-md z-0">
            <div className={`rounded-lg bg-white h-fit grid ${list_mode ? "grid-cols-1" : " grid-cols-4"}`}>
                {ProductList?.response.map(product => (
                    <ProductItem item={product} list_mode={list_mode} />
                ))}
            </div>
        </div>
    )
}
export default ProductListContent

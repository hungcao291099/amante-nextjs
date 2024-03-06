import { ProductList } from "@/types/api_res/ProductList/ProductList";
import api from "@/utils/instants";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGrid, IoListOutline } from "react-icons/io5";
import ProductItem from "./ProductItem";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MdCancel } from "react-icons/md";
import useProductFilter from "@/hooks/useProductFilter";
import useProductProps from "@/hooks/useProductProps";
import { ProductCount } from "@/types/api_res/ProductList/ProductCount";
import ProductItemLoading from "./ProductItemLoading";
const ProductListContent: React.FC<{ list_mode: Boolean, onProductCountChange: (data: ProductCount) => void }> = ({ list_mode, onProductCountChange }) => {
    const ProductFilter = useProductFilter()
    const ProductProp = useProductProps()
    const [ProductList, setProductList] = useState<ProductList>()
    const searchParams = useSearchParams();
    const [ProductLoading, setProductLoading] = useState(false)
    let CAT_CODE: string | null = null;
    if (searchParams !== null && searchParams !== undefined) {
        CAT_CODE = searchParams.get('CAT_CODE');
    }
    const [page, setPage] = useState(1)
    const [reachedEnd, setReachedEnd] = useState(false);
    useEffect(() => {
        if (ProductLoading || reachedEnd) return;
        const fetchData = async () => {
            setProductLoading(true)
            try {
                const data = await api({
                    url: `/shop/app/filter/product_lists?CAT_CODE=${CAT_CODE}&${ProductFilter.filter_string}${ProductProp.prop_string}&page=${page}`,
                    method: "GET",
                });
                console.log(`/shop/app/filter/product_lists?CAT_CODE=${CAT_CODE}&${ProductFilter.filter_string}${ProductProp.prop_string}&page=${page}`);
                setProductList(data.data)
            } catch (error) {
                console.log(error);
            }

            try {
                const data = await api({
                    url: `/shop/app/count/filter/product_lists?CAT_CODE=${CAT_CODE}&${ProductFilter.filter_string}${ProductProp.prop_string}`,
                    method: "GET",
                });
                onProductCountChange(data.data)
            } catch (error) {
                console.log(error);
            }
            setProductLoading(false)
        };
        fetchData();
    }, [CAT_CODE, ProductFilter.filter_string, ProductProp.prop_string, page]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (scrollPercentage >= 80 && !ProductLoading) {
            setPage(x => x + 1) // Fetch more data
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ProductLoading]);
    return (
        <div className="w-[950px] flex flex-col gap-3 pb-3 rounded-md -z-1">
            {ProductFilter.filters.length > 0 &&

                <div className="flex gap-3 flex-wrap p-1">
                    {ProductFilter.filters.map(opt => (
                        <div className=" flex gap-2 items-center p-2 bg-[#333] rounded-md text-white hover:cursor-pointer transition-opacity duration-500 opacity-100" onClick={() => ProductFilter.removeFilter(opt.option_id, opt.option_name)}>

                            <p className=" text-sm">{opt.option_name}</p>
                            <MdCancel size={20} color="#555" />
                        </div>
                    ))}
                </div>
            }
            <div className={`rounded-lg bg-white h-fit grid gap-2 ${list_mode ? "grid-cols-1" : " grid-cols-4"}`}>
                {ProductList?.response.map(product => (
                    !ProductLoading ? <ProductItem item={product} list_mode={list_mode} /> : <ProductItemLoading list_mode={list_mode} />

                ))}
            </div>
        </div>
    )
}
export default ProductListContent

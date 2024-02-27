import { Category, Data } from "@/types/api_res/category"
import parse from "html-react-parser";
import { HiOutlineHome } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { FiBox } from "react-icons/fi";
import { LuBadgePercent } from "react-icons/lu";
import { BiSolidDog } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/utils/instants";

export default () => {
    const [categories, setCategory] = useState<Category>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await api({
                    url: `/shop/product/category/newlist2`,
                    method: "GET",
                });

                setCategory(data.data);
                console.log(data.data.data);

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    if (categories?.success)
        return (
            <div className=" relative ">
                <div className=" w-[250px] fixed top-[84px] max-h-screen overflow-y-scroll no-scrollbar scroll-smooth pb-20">
                    <div className="rounded-md bg-white p-2 mb-3">
                        <p className=" font-bold my-2 px-5">Menu</p>
                        <ul className=" flex flex-col">
                            <li className=" flex gap-2 items-center p-2 my-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md">
                                <HiOutlineHome size={20} />
                                <p>쇼핑홈</p>
                            </li>
                            <li className=" flex gap-2 items-center p-2 my-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md">
                                <CiStar size={23} />
                                <p>기획전</p>
                            </li>
                            <li className=" flex gap-2 items-center p-2 my-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md">
                                <FiBox size={20} />
                                <p>컨셉룸</p>
                            </li>
                            <li className=" flex gap-2 items-center p-2 my-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md">
                                <LuBadgePercent size={20} />
                                <p>SALE</p>
                            </li>
                            <li className=" flex gap-2 items-center p-2 my-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md">
                                <BiSolidDog size={20} />
                                <p>PET</p>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-md bg-white p-2">
                        <p className=" font-bold my-2 px-5">Category</p>
                        <ul>
                            {categories?.data.map(cate => (
                                <Link href={`/shop/product/product_list?CAT_CODE=${cate.CAT_CODE}`}>
                                    <li key={cate.CAT_CODE}>
                                        <div className=" flex gap-2 items-center p-2 my-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md">
                                            <p className=" w-full">{cate.CAT_NAME}</p>
                                        </div>
                                    </li>
                                </Link>

                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
}

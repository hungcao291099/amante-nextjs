import { Category } from "@/types/api_res"
import parse from "html-react-parser";
import { HiOutlineHome } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { FiBox } from "react-icons/fi";
import { LuBadgePercent } from "react-icons/lu";
import { BiSolidDog } from "react-icons/bi";

const CategorySideBar: React.FC<{ categories: Category[] }> = ({ categories }) => {
    return (
        <div className="w-[250px] ">
            <div className="rounded-md bg-white p-2 mb-3">
            <p className=" font-bold my-2 px-5">Menu</p>
                <ul className=" flex flex-col">
                    <li className=" flex gap-2 items-center p-2 my-1 hover:bg-slate-100 hover:cursor-pointer hover:rounded-md hover:text-[#3b857a] hover:font-bold">
                        <HiOutlineHome size={20}/>
                        <p>쇼핑홈</p>
                    </li>
                    <li className=" flex gap-2 items-center p-2 my-1 hover:bg-slate-100 hover:cursor-pointer hover:rounded-md hover:text-[#3b857a] hover:font-bold">
                        <CiStar size={23}/>
                        <p>기획전</p>
                    </li>
                    <li className=" flex gap-2 items-center p-2 my-1 hover:bg-slate-100 hover:cursor-pointer hover:rounded-md hover:text-[#3b857a] hover:font-bold">
                        <FiBox size={20}/>
                        <p>컨셉룸</p>
                    </li>
                    <li className=" flex gap-2 items-center p-2 my-1 hover:bg-slate-100 hover:cursor-pointer hover:rounded-md hover:text-[#3b857a] hover:font-bold">
                        <LuBadgePercent size={20}/>
                        <p>SALE</p>
                    </li>
                    <li className=" flex gap-2 items-center p-2 my-1 hover:bg-slate-100 hover:cursor-pointer hover:rounded-md hover:text-[#3b857a] hover:font-bold">
                        <BiSolidDog size={20}/>
                        <p>PET</p>
                    </li>
                </ul>
            </div>
            <div className="rounded-md bg-white p-2">
            <p className=" font-bold my-2 px-5">Category</p>
            <ul>
                {categories?.map(cate => (
                    <li key={cate.category_cd}>
                        <div className=" flex gap-2 items-center p-2 my-1 hover:bg-slate-100 hover:cursor-pointer hover:rounded-md hover:text-[#3b857a] hover:font-bold">
                            <img src={`https://www.amante.co.kr/uploads/category/${cate.file_nm1}`} alt="" className=" w-10 h-10 rounded-full" />
                            <p className=" w-full">{parse(cate.category_nm)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
            
        </div>
    )
}
export default CategorySideBar
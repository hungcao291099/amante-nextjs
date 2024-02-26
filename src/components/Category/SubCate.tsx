import { HiOutlineHome } from "react-icons/hi";
import { CiStar } from "react-icons/ci";
import { FiBox } from "react-icons/fi";
import { LuBadgePercent } from "react-icons/lu";
import { BiSolidDog } from "react-icons/bi";
export default () => {
    return (
        <div className=" relative ">
            <div className=" w-[250px] fixed top-[84px] max-h-screen overflow-y-scroll no-scrollbar scroll-smooth pb-20">
                <div className="rounded-md bg-white p-2 mb-3">
                    <p className=" font-bold my-2 px-5">Sub Category</p>
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
            </div>
        </div>
    )
}
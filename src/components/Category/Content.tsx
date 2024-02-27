import parse from "html-react-parser";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoGrid, IoListOutline } from "react-icons/io5";
export default () => {
    return (
        <div className="w-[1130px] flex flex-col gap-5 mt-5 pb-3 rounded-md z-0">
            <div className=" rounded-lg bg-white p-3 h-fit ">
                <h1 className=" font-bold  ml-5 text-2xl">CAT_NAME</h1>
            </div>
            <div className=" rounded-lg bg-white p-3 h-fit flex justify-end gap-4">
                <div className=" flex items-center gap-3">
                    <input className=" w-4 h-4" type="checkbox" name="" id="1" /><label htmlFor="1">모음전 보기</label>
                </div>
                <div className=" flex items-center gap-3">
                    <input className=" w-4 h-4" type="checkbox" name="" id="1" /><label htmlFor="1">특가 상품만</label>
                </div>

                <div className=" flex justify-center items-center p-1 gap-2 border-[1px] border-gray-500 rounded-md">
                    <p>별점</p>
                    <IoMdArrowDropdown />
                </div>
                <div className=" flex justify-center items-center p-1 gap-2 border-[1px] border-gray-500 rounded-md">
                    <p>베스트 셀러</p>
                    <IoMdArrowDropdown />
                </div>
                <div className=" flex justify-center items-center gap-1">
                    <IoGrid size={30} className=" p-1 border-[1px] border-gray-500 rounded-md" />
                    <IoListOutline size={30} className=" p-1 border-[1px] border-gray-500 rounded-md" />
                </div>
            </div>
            <div className=" rounded-lg bg-white p-3 h-fit flex gap-3">
                <h1>Product List</h1>
            </div>
        </div>
    )
}

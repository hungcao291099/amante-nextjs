import Link from "next/link";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { RiCustomerService2Fill } from "react-icons/ri";
export default () => {
    return (
        <div className=" w-full fixed bg-slate-50 flex justify-center items-center pb-2 z-10 top-0">
            <div className="w-[1400px] rounded-md bg-white py-3 px-5 flex justify-between">
                <Link href={`/`}><img src="/logo/pc_logo.png" alt="amante-logo" /></Link>
                <div className=" inline-flex items-center gap-2 border-gray-500 border-[1px] rounded-lg w-2/5 px-2">
                    <img src="/icon/search-icon.png" alt="" className=" w-fit h-fit my-auto mx-2" />
                    <input type="text" placeholder="검색어를 입력해주세요" className=" border-none w-full outline-none" />
                    <div className=" w-[1px] h-1/2 bg-gray-400" />
                    <p className=" text-[#0D685B] hover:cursor-pointer">Search</p>
                </div>
                <div className=" inline-flex gap-3 w-fit h-auto items-center">
                    <div className=" inline-flex gap-1 p-1 items-center hover:bg-[#d7e4e2] rounded-md hover:cursor-pointer">
                        <CiUser size={20} />
                        <p>Account</p>
                    </div>
                    <div className="inline-flex gap-1 p-1 items-center hover:bg-[#d7e4e2] rounded-md hover:cursor-pointer">
                        <RiCustomerService2Fill size={18} />
                        <p>CustomerService</p>
                    </div>
                    <div className=" w-[1px] h-1/2 bg-gray-400" />
                    <CiShoppingCart size={30} className=" hover:cursor-pointer hover:bg-[#d7e4e2] rounded-md p-1" />
                </div>
            </div>
        </div>

    )
}
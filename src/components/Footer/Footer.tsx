import { checkDevice } from "@/utils/function"
import { FaInstagram } from "react-icons/fa"

export default () => {
    return (
        checkDevice() === "desktop" ?
            <div className="w-full mx-auto bg-white flex justify-center">
                <div className="w-[1200px] rounded-md  py-3 px-5">
                    <ul className=" inline-flex gap-10 text-xs font-bold">
                        <li><a href="">회사소개</a></li>
                        <li><a href="">이용안내</a></li>
                        <li><a href="">이용약관</a></li>
                        <li><a href="">개인정보처리방침</a></li>
                        <li><a href="">고객센터</a></li>
                        <li><a href="">대량구매/제휴/입점문의</a></li>
                    </ul>
                    <div className=" flex gap-10 mt-10">
                        <div className=" text-sm">
                            <p>(주)평안    대표: 오희택</p>
                            <p>본사: 대구광역시 달서구 성서로71 /서울사업소: 서울시 강서구 마곡동로31</p>
                            <p>사업자등록번호: 514-81-16510 /통신판매업신고번호: 대구시42호</p>
                            <p>개인정보보호책임자: 정주환(webmaster@ono.co.kr)</p>
                            <p className=" mt-3">Copyright © 아망떼 All Rights Reserved.</p>
                        </div>
                        <div className=" text-sm">
                            <p className=" font-bold">CUSTOMER CENTER</p>
                            <p className=" my-3 font-bold text-lg">1588-2933</p>
                            <p>평일 10시~17시</p>
                            <p>점심시간 12시~13시</p>
                            <p>주말 및 공휴일은 휴무입니다.</p>
                        </div>
                        <div className="text-sm">
                            <p className=" font-bold">BANK INFO</p>
                            <p className=" mt-3">농협 245-01-001182</p>
                            <p>예금주 (주)평안</p>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className=" flex flex-col gap-2 text-gray-400 p-2 pb-24 bg-gray-50">
                <p className=" text-sm">고객센터</p>
                <p className=" text-lg font-bold text-black">1588-2933</p>
                <p className="">평일 10:00 - 17:00 (점심시간 12:00-13:00 제외)</p>
                <p>주말 및 공휴일 휴무</p>
                <div className=" grid grid-cols-2 grid-rows-2 w-3/4 gap-2 *:p-1 *:text-center">
                    <p className=" text-gray-600 bg-[#fae100]">카카오톡 문의</p>
                    <p className=" text-gray-600 bg-[#03cf5d]">네이버 톡톡 문의</p>
                    <p className=" border-[1px] border-gray-300">1:1 문의하기</p>
                    <p className=" border-[1px] border-gray-300">자주 묻는 질문</p>
                </div>
                <p>BANK INFO</p>
                <p className=" text-gray-700 font-semibold">농협 245-01-001182 / 예금주 (주)평안</p>
                <div className=" flex gap-5 p-3">
                    <div className=" flex gap-1 items-center">
                        <FaInstagram size={25} color="#fff" className=" p-1 bg-gray-700 rounded-full" />
                        <p className=" text-gray-700">amante_home</p>
                    </div>
                    <div className=" flex gap-1 items-center">
                        <FaInstagram size={25} color="#fff" className=" p-1 bg-gray-700 rounded-full" />
                        <p className=" text-gray-700">amante_pet</p>
                    </div>
                </div>
                <div className=" w-full overflow-x-auto no-scrollbar flex gap-3 *:shrink-0 *:font-semibold">
                    <a href="#"><div>회사소개</div></a>
                    <a href="#"><div>이용안내</div></a>
                    <a href="#"><div>이용약관</div></a>
                    <a href="#"><div>개인정보 처리방침</div></a>
                    <a href="#"><div>대량구매/제휴/입점 문의</div></a>
                </div>
                <p className=" text-lg font-bold my-2">(주)평안</p>
                <p>대표 <span className=" text-gray-600">오희택</span> 본사 <span className=" text-gray-600">대구광역시 달서구 성서로71</span></p>
                <p>서울사업소 <span className=" text-gray-600">서울시 강서구 마곡동로 31</span></p>
                <p className=" mt-2">사업자등록번호 <span className=" text-gray-600">514-81-16510</span>  통신판매업소신고번호 <span className=" text-gray-600">대구시 42호</span></p>
                <p>개인정보보호책임자 <span className=" text-gray-600">정주환(webmaster@ono.co.kr)</span> </p>
                <p className=" text-gray-600">Copyright © 아망떼 All Rights Reserved.</p>
            </div>
    )

}
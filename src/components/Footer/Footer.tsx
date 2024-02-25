export default () => {
    return (
        <div className="w-[1400px] m-auto bg-white py-3 px-5">
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
    )

}
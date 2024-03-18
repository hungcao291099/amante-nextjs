'use client'
import Layout from "@/components/Layout"
import { Login } from "@/types/api_res/Login/Login";
import { checkDevice } from "@/utils/function";
import api from "@/utils/instants";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";


export default () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const handleLogin = (username: string, password: string) => {
        const fetchData = async () => {
            setisLoading(true)
            try {
                const data = await api({
                    url: `/member/login`,
                    method: "POST",
                    data: {
                        user_id: username,
                        passwd: password
                    }
                });
                var res: Login = data.data
                if (res.success) {
                    window.localStorage.setItem("login_data", JSON.stringify(res.data))
                    window.localStorage.setItem("token", res.data.refresh_token)
                    router.push('/')
                }
                else {
                    alert(`${res.message}`)
                }

            } catch (error) {
                console.log(error);
            }
            setisLoading(false)

        };
        !username || !password ? alert("Your field is blank") : fetchData();
    }
    return (
        <Layout noLayout={true} noFloat={true} noHeader={true} noFooter={true}>
            {checkDevice() === "desktop" ?
                <div className=" w-screen h-screen flex flex-col gap-10 justify-center items-center">
                    <img className="" src="/logo/pc_amante_logo.png" alt="" />
                    <div className=" w-[1000px] flex justify-between items-center">
                        <div className=" w-[400px] flex flex-col gap-3">
                            <input className="p-2 rounded border-[1px] outline-none border-gray-400" type="text" name="" id="username" placeholder="아이디" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                            <input className="p-2 rounded border-[1px] outline-none border-gray-400" type="password" name="" id="password" placeholder="비밀번호" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onKeyDown={(e) => { e.key === "Enter" && handleLogin(username, password) }} />
                            <div className=" flex gap-3 p-2">
                                <input className=" accent-[#c8877a] w-5" type="checkbox" name="" id="save" />
                                <label htmlFor="save">아이디저장</label>
                                <input className=" accent-[#c8877a] w-5" type="checkbox" name="" id="auto_login" />
                                <label htmlFor="auto_login">자동로그인</label>
                            </div>
                            <div className={`${isLoading ? "bg-[#c8877a]/80" : "bg-[#c8877a]"} p-3 text-white text-lg font-black text-center rounded hover:cursor-pointer my-3`} onClick={() => handleLogin(username, password)}>{isLoading ? "로그인 . . ." : "로그인"}</div>
                            <div className=" grid grid-cols-2 gap-3 my-3">
                                <div className=" p-2 text-lg text-center rounded bg-gray-200">ID/PW 찾기</div>
                                <div className=" p-2 text-lg text-center rounded bg-[#c8877a]/50">일반회원가입</div>
                            </div>
                            <div className=" p-2 flex justify-around items-center bg-[#22c75a] my-3">
                                <img className=" w-5" src="/logo/ico_naver_02.png" alt="" />
                                <p className=" text-white text-lg font-bold">네이버 로그인</p>
                            </div>
                        </div>
                        <div className=" w-[2px] h-3/4 bg-gray-400 rounded"></div>
                        <div className=" w-[500px]  bg-gray-100 rounded p-3 ">
                            <div className=" flex flex-col gap-2">
                                <h2 className=" font-bold text-xl text-black">회원가입</h2>
                                <h3 className=" text-gray-600">아이디, 비밀번호, 이름, 휴대번호 입력하기 귀찮으시죠? 카카오로 1초 만에 회원가입 하세요.</h3>
                                <div className=" p-2 flex justify-evenly items-center bg-[#fee502] my-3 w-[300px] mx-auto">
                                    <img className=" w-5" src="/logo/ico_kakao.png" alt="" />
                                    <p className=" text-gray-800 font-semibold">카카오로 1초 로그인/회원가입</p>
                                </div>
                                <ul className=" grid grid-cols-3 gap-2 *:flex *:flex-col *:gap-1 *:items-center *:justify-center">
                                    <li>
                                        <img className=" w-10" src="/image/kakao_01.png" alt="" />
                                        <p className=" text-sm text-gray-700">신규 회원 가입</p>
                                        <b className=" font-semibold text-[#c8877a]">10%, 15% 쿠폰</b>
                                    </li>
                                    <li>
                                        <img className=" w-10" src="/image/kakao_02.png" alt="" />
                                        <p className=" text-sm text-gray-700">리뷰 작성 500원</p>
                                        <b className=" font-semibold text-[#c8877a]">30,000원 적립금</b>
                                    </li>
                                    <li>
                                        <img className=" w-10" src="/image/kakao_03.png" alt="" />
                                        <p className=" text-sm text-gray-700">신규회원</p>
                                        <b className=" font-semibold text-[#c8877a]">무료배송 쿠폰</b>
                                    </li>
                                    <li>
                                        <img className=" w-10" src="/image/kakao_04.png" alt="" />
                                        <p className=" text-sm text-gray-700">웨딩 & 이사 등록</p>
                                        <b className=" font-semibold text-[#c8877a]">쿠폰 15%</b>
                                    </li>
                                    <li>
                                        <img className=" w-10" src="/image/kakao_05.png" alt="" />
                                        <p className=" text-sm text-gray-700">구매 적립금</p>
                                        <b className=" font-semibold text-[#c8877a]">1%</b>
                                    </li>
                                    <li>
                                        <img className=" w-10" src="/image/kakao_06.png" alt="" />
                                        <p className=" text-sm text-gray-700">카카오 플친 추가</p>
                                        <b className=" font-semibold text-[#c8877a]">2,000원 쿠폰</b>
                                    </li>
                                </ul>
                                <div className=" p-2 flex flex-col gap-1 rounded-md bg-[#fee502] items-center justify-center hover:cursor-pointer">
                                    <p className="">카카오 1초 회원가입하면</p>
                                    <p className=" font-semibold text-lg">추가 할인 쿠폰까지 카톡으로 드려요!</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                :
                <div className=" flex flex-col gap-5 w-full p-3 items-center">
                    <img className=" w-fit" src="/logo/pc_amante_logo.png" alt="" />
                    <div className=" flex flex-col gap-2">
                        <h2 className=" font-bold text-xl text-black">회원가입</h2>
                        <h3 className=" text-gray-600">아이디, 비밀번호, 이름, 휴대번호 입력하기 귀찮으시죠? 카카오로 1초 만에 회원가입 하세요.</h3>
                        <div className=" p-2 flex justify-evenly items-center bg-[#fee502] my-3 w-[300px] mx-auto">
                            <img className=" w-5" src="/logo/ico_kakao.png" alt="" />
                            <p className=" text-gray-800 font-semibold">카카오로 1초 로그인/회원가입</p>
                        </div>
                        <ul className=" grid grid-cols-3 gap-2 *:flex *:flex-col *:gap-1 *:items-center *:justify-center">
                            <li>
                                <img className=" w-10" src="/image/kakao_01.png" alt="" />
                                <p className=" text-sm text-gray-700">신규 회원 가입</p>
                                <b className=" font-semibold text-[#c8877a]">10%, 15% 쿠폰</b>
                            </li>
                            <li>
                                <img className=" w-10" src="/image/kakao_02.png" alt="" />
                                <p className=" text-sm text-gray-700">리뷰 작성 500원</p>
                                <b className=" font-semibold text-[#c8877a]">30,000원 적립금</b>
                            </li>
                            <li>
                                <img className=" w-10" src="/image/kakao_03.png" alt="" />
                                <p className=" text-sm text-gray-700">신규회원</p>
                                <b className=" font-semibold text-[#c8877a]">무료배송 쿠폰</b>
                            </li>
                            <li>
                                <img className=" w-10" src="/image/kakao_04.png" alt="" />
                                <p className=" text-sm text-gray-700">웨딩 & 이사 등록</p>
                                <b className=" font-semibold text-[#c8877a]">쿠폰 15%</b>
                            </li>
                            <li>
                                <img className=" w-10" src="/image/kakao_05.png" alt="" />
                                <p className=" text-sm text-gray-700">구매 적립금</p>
                                <b className=" font-semibold text-[#c8877a]">1%</b>
                            </li>
                            <li>
                                <img className=" w-10" src="/image/kakao_06.png" alt="" />
                                <p className=" text-sm text-gray-700">카카오 플친 추가</p>
                                <b className=" font-semibold text-[#c8877a]">2,000원 쿠폰</b>
                            </li>
                        </ul>
                        <div className=" p-2 flex flex-col gap-1 rounded-md bg-[#fee502] items-center justify-center hover:cursor-pointer">
                            <p className="">카카오 1초 회원가입하면</p>
                            <p className=" font-semibold text-lg">추가 할인 쿠폰까지 카톡으로 드려요!</p>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-3">
                        <input className="p-2 rounded border-[1px] outline-none border-gray-400" type="text" name="" id="username" placeholder="아이디" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                        <input className="p-2 rounded border-[1px] outline-none border-gray-400" type="password" name="" id="password" placeholder="비밀번호" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} onKeyDown={(e) => { e.key === "Enter" && handleLogin(username, password) }} />
                        <div className=" flex gap-3 p-2">
                            <input className=" accent-[#c8877a] w-5" type="checkbox" name="" id="save" />
                            <label htmlFor="save">아이디저장</label>
                            <input className=" accent-[#c8877a] w-5" type="checkbox" name="" id="auto_login" />
                            <label htmlFor="auto_login">자동로그인</label>
                        </div>
                        <div className={`${isLoading ? "bg-[#c8877a]/80" : "bg-[#c8877a]"} p-3 text-white text-lg font-black text-center rounded hover:cursor-pointer my-3`} onClick={() => handleLogin(username, password)}>{isLoading ? "로그인 . . ." : "로그인"}</div>
                        <div className=" grid grid-cols-2 gap-3">
                            <div className=" p-2 text-lg text-center rounded bg-gray-200">ID/PW 찾기</div>
                            <div className=" p-2 text-lg text-center rounded bg-[#c8877a]/50">일반회원가입</div>
                        </div>
                        <div className=" p-2 flex justify-around items-center bg-[#22c75a]">
                            <img className=" w-5" src="/logo/ico_naver_02.png" alt="" />
                            <p className=" text-white text-lg font-bold">네이버 로그인</p>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}
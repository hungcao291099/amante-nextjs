'use client'
import useShowGiftInfo from "@/hooks/useGiftInfo"
export default () => {
    const GiftInfo = useShowGiftInfo()
    return (
        GiftInfo.isOpen &&
        <div className="fixed bg-gray-800/60 w-full h-screen flex justify-center items-center top-0 left-0 z-10 py-8" onClick={() => GiftInfo.onClose()}>
            <div className="w-[600px] h-full overflow-y-scroll no-scrollbar">
                <div>
                    <img className="w-full rounded" src="/image/pc_gift_img.png" alt="" />
                </div>
            </div>
        </div>

    )
}
import { checkDevice } from "@/utils/function"

export default () => {
    return (
        checkDevice() === "desktop" ?
            <img className="w-full" src="/image/chrismast_banner.png" alt="" />
            :
            <img className="w-full" src="/image/chrismast_mb.png" alt="" />

    )
}
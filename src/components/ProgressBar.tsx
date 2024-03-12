'use client'
import useProgressBar from "@/hooks/useProgressBar"
import { useEffect, useState } from "react"

export default () => {
    const Progress = useProgressBar()
    if (Progress.loaded != 0 && Progress.max != 0 && Progress.loaded == Progress.max) {
        Progress.hide()
        Progress.reset()
    }
    return (
        Progress.isShow ?
            <div className=" fixed z-50 top-0 left-0 h-2 w-full bg-slate-100">
                <div style={{ width: `${(Progress.loaded / (Progress.max - 1)) * 100}%` }} className=" top-0 left-0 h-full bg-[#f06652] transition-width duration-300"></div>

            </div>
            : null
    )

}
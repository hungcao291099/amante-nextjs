"use client"
import { Category } from "@/types/api_res/category";
import api from "@/utils/instants";
import { useEffect, useState } from "react";
import Content from "@/components/Main/Content";
import CategorySideBar from "@/components/Main/Category";

export default function Main() {


  return (
    <div className="w-[1200px] m-auto h-fit bg-slate-50 flex justify-between py-5">
      <Content />
    </div>
  )

}

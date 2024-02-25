"use client"
import { Category } from "@/types/api_res";
import api from "@/utils/instants";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Content from "@/components/Main/Content";
import CategorySideBar from "@/components/Main/Category";

export default function Main() {
  const [categories, setCategory] = useState<Category[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api({
          url: `/shop/category/new/list`,
          method: "GET",
        });

        setCategory(data.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (categories.length > 0) {

    return (
      <div className="w-[1400px] m-auto h-fit bg-slate-50 flex justify-between py-5">
        <CategorySideBar categories={categories} />
        <Content />
      </div>
    )
  }
}

"use client"
import Content from "@/components/Main/Content";
import RootLayout from "./layout";
import Layout from "@/components/Layout";

export default function Main() {
  return (
    <Layout noLayout={false}>
      <div className="w-[1200px] m-auto h-fit bg-slate-50 flex justify-between mt-32">
        <Content />
      </div>
    </Layout>
  )

}

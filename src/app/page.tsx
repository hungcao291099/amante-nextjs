"use client"
import Content from "@/components/Main/Content";
import RootLayout from "./layout";
import Layout from "@/components/Layout";
import MainBannner from "@/components/Main/Content/MainBannner";

export default function Main() {
  return (
    <Layout noLayout={false}>
      <div className=" mt-32 flex flex-col gap-5">
        <MainBannner />
        <Content />
      </div>
    </Layout>
  )

}

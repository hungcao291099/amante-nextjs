import Content from "@/components/Category/Content"
import SubCate from "@/components/Category/SubCate"

export default () => {
    return (
        <div className="w-[1400px] m-auto mt-16 h-fit bg-slate-50 flex justify-between ">
            <SubCate />
            <Content />
        </div>
    )
}
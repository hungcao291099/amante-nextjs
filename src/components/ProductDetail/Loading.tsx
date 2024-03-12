export default () => {
    return (
        <div className=" w-[1200px] m-auto mt-[140px] rounded-md mb-3 p-3 h-fit bg-white flex flex-col gap-4 animate-pulse">
            <div className=" flex item-center justify-between">
                <div className=" w-[500px] flex flex-col gap-1">
                    <div className=" w-full h-[600px] rounded bg-gray-500"></div>
                    <div className=" w-full h-10 rounded bg-gray-500"></div>
                </div>
                <div className=" w-[500px] flex flex-col gap-10">
                    <div className=" h-3 w-full bg-gray-500 rounded"></div>
                    <div className=" h-3 w-1/2 bg-gray-500 rounded"></div>
                    <div className=" h-3 w-1/6 bg-gray-500 rounded"></div>
                    <div className=" h-3 w-3/5 bg-gray-500 rounded"></div>
                    <div className=" h-3 w-3/5 bg-gray-500 rounded"></div>
                    <div className=" h-4 w-full bg-gray-500 rounded"></div>
                    <div className=" h-4 w-full bg-gray-500 rounded"></div>
                </div>
            </div>
        </div>
    )
}
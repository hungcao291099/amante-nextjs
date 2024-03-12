import { create } from 'zustand';

interface ImageListString {
    data: string[];
    isShow: boolean;
    setShow: (show: boolean) => void
    onAddData: (dataString: string[]) => void;
}

const ImageListString = create<ImageListString>((set) => ({
    data: [],
    isShow: false,
    onAddData: (image_list) => set({
        data: image_list,
        isShow: true
    }),
    setShow: (show: boolean) => set({ isShow: show })
}));

export default ImageListString
import { create } from 'zustand';

interface CateList {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useShowCateSide = create<CateList>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useShowCateSide
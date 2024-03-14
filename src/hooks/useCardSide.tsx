import { ProductItem } from '@/types/api_res/ProductList/ProductList';
import { create } from 'zustand';

interface Cart {
    isOpen: boolean;
    count: number
    onOpen: () => void;
    onClose: () => void;
    setCount: (cnt: number) => void
}

const useShowCartSide = create<Cart>((set) => ({
    isOpen: false,
    count: 0,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setCount: (cnt) => set({ count: cnt })
}));

export default useShowCartSide
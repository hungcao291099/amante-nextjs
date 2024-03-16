import { ProductItem } from '@/types/api_res/ProductList/ProductList';
import { create } from 'zustand';

interface RecentList {
    isOpen: boolean;
    product_cd: string[]
    onOpen: () => void;
    onClose: () => void;
    addProduct_cd: (product_cd: string) => void
    reset: () => void
}

const useShowRecentSide = create<RecentList>((set) => ({
    isOpen: false,
    product_cd: [],
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    addProduct_cd: (product_cd) => set(state => ({ product_cd: [...state.product_cd, product_cd] })),
    reset: () => set({ product_cd: [] })
}));

export default useShowRecentSide
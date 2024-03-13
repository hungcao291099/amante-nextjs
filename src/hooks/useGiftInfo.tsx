import { ProductItem } from '@/types/api_res/ProductList/ProductList';
import { create } from 'zustand';

interface Gift {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useShowGiftInfo = create<Gift>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useShowGiftInfo
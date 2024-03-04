import { ProductItem } from '@/types/api_res/ProductList/ProductList';
import { create } from 'zustand';

interface CartModalStore {
  isOpen: boolean;
  data: ProductItem | undefined;
  onOpen: () => void;
  onClose: () => void;
  onGetData: (dataString: ProductItem) => void;
}

const useCartModal = create<CartModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onGetData: (item) => set({ data: item })
}));

export default useCartModal
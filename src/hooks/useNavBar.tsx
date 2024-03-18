import { create } from 'zustand';

interface Navbar {
    current: number;
    setCurrent: (num: number) => void;

}

const useSetCurrentNavBar = create<Navbar>((set) => ({
    current: 2,
    setCurrent: (num) => set({ current: num })

}));

export default useSetCurrentNavBar
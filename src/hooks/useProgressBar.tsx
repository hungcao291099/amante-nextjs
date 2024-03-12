import { create } from 'zustand';

interface ProgressTop {
    loaded: number;
    max: number
    isShow: boolean;
    show: () => void
    hide: () => void
    setMax: (num: number) => void
    setLoaded: () => void
    reset: () => void
}

const ProgressTop = create<ProgressTop>((set) => ({
    loaded: 0,
    max: 0,
    percent: 0,
    isShow: true,
    show: () => set({ isShow: true }),
    hide: () => set({ isShow: true }),
    setMax: (num: number) => set({ max: num }),
    setLoaded: () => set((state) => ({
        loaded: state.loaded + 1
    })),
    reset: () => set({
        loaded: 0,
        max: 0,
        isShow: false
    })
}));

export default ProgressTop
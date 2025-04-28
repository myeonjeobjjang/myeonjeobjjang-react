import {create} from "zustand/react";

type BearState = {
    bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: (newBears: number) => void;
};

const useBears = create<BearState>((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set(() => ({ bears: 0 })),
    updateBears: (newBears: number) => set(() => ({ bears: newBears })),
}))

export default useBears;
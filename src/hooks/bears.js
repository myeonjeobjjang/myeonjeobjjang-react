import {create} from "zustand/react";

const actions = (set) => ({
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
});

const useBears = create((set) => ({
    bears: 0,
    ...actions(set),
}))

export default useBears;
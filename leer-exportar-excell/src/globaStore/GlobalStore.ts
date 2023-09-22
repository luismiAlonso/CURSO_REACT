import { create } from 'zustand';

interface GlobalStore {
  dataGlobalStore: string[];
  setCurrentDataStore: (newData: string[]) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  dataGlobalStore: [],
  setCurrentDataStore: (newData: string[]) => set({ dataGlobalStore: newData }),
}));

export default useGlobalStore;

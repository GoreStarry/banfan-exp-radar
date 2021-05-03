import { devtools } from "zustand/middleware";
import create from "zustand";

const useStore = create(
  devtools((set, get) => ({
    setState: (state) => {
      set(state);
    },
    isOnEditLabel: false,
    isClickOutLabel: false,
    isResetCamera: false,
    focusPointIndex: false, //string
  }))
);

export default useStore;

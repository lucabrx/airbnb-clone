import { create } from "zustand";

interface RegisterModalStore{
    isOpen: boolean;
    open: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
 }));

 export default useRegisterModal;
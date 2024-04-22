import { ReactNode, createContext } from 'react';
import useModal from '@/hooks/useModal';


export enum ModalType {
  "Template&Custom",
  "byeModal",
}

export interface modalStore {
  id: number;
  type: ModalType | null;
  data?: unknown;
}

interface contextModalInterface{
  modalList: modalStore[],
  openModal: (type: modalStore) => void
  closeModal: (id: number) => void
}

export const ModalContext = createContext<contextModalInterface>({
    modalList: [],
    openModal: () => {},
    closeModal: () => {},
});

export const ModalProvider = ({children}: {children: ReactNode})=> {
  const {modalList, openModal, closeModal} = useModal()
  return (
    <ModalContext.Provider value={{modalList, openModal, closeModal}}>
      
      {children}
    </ModalContext.Provider>
  )
}
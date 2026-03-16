import { createContext, useContext } from 'react';

export const FormModalContext = createContext({ openModal: () => {}, closeModal: () => {} });
export const useFormModal = () => useContext(FormModalContext);

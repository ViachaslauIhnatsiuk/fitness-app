import { useState } from 'react';

const useCardModal = () => {
  const [modalState, setModalState] = useState<boolean>(false);

  const openModal = () => {};

  const closeModal = () => {};

  return {
    modalState,
    setModalState,
    openModal,
    closeModal
  };
};

export { useCardModal };

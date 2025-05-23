import { useState, useCallback } from 'react';

interface UseToggleReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

const useToggle = (initialState: boolean = false): UseToggleReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    onOpen,
    onClose,
    toggle,
  };
};

export default useToggle;
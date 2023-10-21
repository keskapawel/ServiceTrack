import { useCallback, useState } from 'react';

type ConfirmationModalProps = { count: number };
export const useConfirmationModal = ({ count }: ConfirmationModalProps) => {
  const [modalState, setModalState] = useState<boolean[]>(Array(count).fill(false));

  const set = useCallback(
    (index: number, value: boolean) => {
      setModalState(
        modalState.map((modal, i) => {
          if (i === index) return value;

          return modal;
        }),
      );
    },
    [modalState],
  );

  const open = useCallback(
    (index: number) => () => {
      set(index, true);
    },
    [set],
  );

  const close = useCallback(
    (index: number) => () => {
      set(index, false);
    },
    [set],
  );

  const onConfirm = useCallback(
    <T>(index: number, callback: (event: T) => void) =>
      (event: T) => {
        close(index)();
        callback(event);
      },
    [close],
  );

  return { open, close, onConfirm, state: modalState };
};

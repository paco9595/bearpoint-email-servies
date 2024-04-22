import { useContext } from "react";

import { ModalContext, ModalType, modalStore } from "./modalProvider";

export default function ModalController() {
  const { modalList } = useContext(ModalContext);
  return (
    <>
      {modalList.map(({ type, data, id }: modalStore) =>
        type === ModalType["Template&Custom"] ? (
          <div key={id}>test</div>
        ): null
      )}
    </>
  );
}
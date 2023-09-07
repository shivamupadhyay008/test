import { Dialog } from "@headlessui/react";

export default function Modal({ isOpen, children }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      className="relative z-50"
      borderRadius={8}
    >
      <div className="fixed inset-0 flex items-center justify-center bg-[#00000063]  p-4">
        <Dialog.Panel
          className={"bg-white w-[577px] p-8 rounded-lg shadow-lg z-10"}
        >
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

import { ReactNode } from "react";
import Card from "./Card";
import { RxCross2 } from "react-icons/rx";

interface ModalProps {
  header: String;
  children: ReactNode;
  onClose?: () => void;
}
const Modal = (props: ModalProps) => {
  const { children, header, onClose } = props;

  return (
    <div className='fixed inset-0 w-full h-screen bg-black/10 backdrop-blur-md'>
      <div className='flex w-full h-full items-center justify-center'>
        <Card className='lg:basis-1/2 w-full m-8 lg:m-auto bg-blue-100'>
          <div className='flex items-center justify-between'>
            <h1 className='font-bold text-xl tracking-tight'>{header}</h1>
            <RxCross2
              onClick={onClose}
              className='text-2xl cursor-pointer hover:scale-110 transition-all'
            />
          </div>

          {children}
        </Card>
      </div>
    </div>
  );
};

export default Modal;

"use client"
import { ReactElement, type FC, useState, useEffect, useCallback, forwardRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../Button';
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  disabled?: boolean;
  actionLabel: string;
  disableAction?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;

}
const Modal  = forwardRef<HTMLDivElement, ModalProps>(({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    disableAction,
    secondaryAction,
    secondaryActionLabel,
}, ref) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    },[disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction();
    }, [disabled, secondaryAction]);

    if(!isOpen) return null;

  return (
<> 
<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
<div ref={ref} className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full lg:h-auto md:h-auto mx-auto'>
    {/* content */}
    <div className={`translate duration-300 h-full 
    ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <div className='translate h-full lg:h-auto md:h-auto border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/* header */}
            <div className='flex items-center p-6 rounded-t justify-center relative border-b'>
                <button
                className='p-1 border-0 hover:opacity-70 transition absolute left-9'
                onClick={handleClose}
                >
                    <IoMdClose />
                </button>
                <div className='text-lg font-semibold'>
                    {title}
                </div>
            </div>
            {/* body */}
            <div className='relative flex-auto p-6'>
                {body}
            </div>
            <div className='flex flex-col gap-2 p-6'>
                <div className='flex flex-row items-center gap-4 w-full'>
                    {secondaryAction && secondaryActionLabel && (
                        <Button 
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    />
                    )}
                    <Button 
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                    />
                </div>
                {footer}
            </div>
        </div>
    </div>
</div>
</div>
</>
)
})
Modal.displayName = "Modal"
export default Modal
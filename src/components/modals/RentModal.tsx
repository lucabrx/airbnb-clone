"use client"
import { useState, type FC, useMemo } from 'react';
import Modal from './Modal';
import useRentModal from '@/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { useForm } from 'react-hook-form';
import { RentalSchema, RentalType } from '@/schema/rental';
import { zodResolver } from '@hookform/resolvers/zod';
import CountrySelect from '../inputs/CountrySelect';

interface RentModalProps {
  
}

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
  }

const RentModal: FC<RentModalProps> = ({}) => {
    const [step, setStep] = useState(STEPS.CATEGORY)
    const rentModal = useRentModal()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<RentalType>({
        resolver: zodResolver(RentalSchema)
    })

    const category = watch("category");

    const setCustomValue = (id: "category" , value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) {
            return 'Create'
        }

        return "Next"
    }, [step])

    const secondActionLabel = useMemo(() => {
        if( step === STEPS.CATEGORY) {
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
            title= "Which of thse best describes your place?"
            subtitle='Pick a category'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
        {categories.map((item) => (
            <div key={item.label} className='col-span-1'>
                <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                label={item.label}
                icon={item.icon}
                selected={category === item.label}
                />
            </div>
        ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                title="Where is your place located?"
                subtitle=" Help guests find u!"
                />
                <CountrySelect />
            </div>
        )
    }

    
  return (
<Modal 
title="Airbnb your home"
isOpen={rentModal.isOpen}
onClose={rentModal.onClose}
onSubmit={onNext}
actionLabel={actionLabel}
body={bodyContent}
secondaryActionLabel={secondActionLabel}
secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
/> 

)
}

export default RentModal
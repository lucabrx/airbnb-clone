"use client"
import { type FC } from 'react';
import axios from "axios";
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle } from "react-icons/fc";
import { useCallback,useState } from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { UserRegisterSchema, type UserRegisterType } from '@/schema/user';
import RegisterInput from '../inputs/RegisterInput';





const RegisterModal: FC = ({}) => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit,formState:{errors}, reset} = useForm<UserRegisterType>({
        resolver: zodResolver(UserRegisterSchema)

    })
    
    const onSubmit: SubmitHandler<UserRegisterType> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
        .then(() => {
            toast.success("Account created")
            reset()
            registerModal.onClose();
        })
        .catch(() => {
            toast.error("Something went wrong")
        }
        )
        .finally(() => setIsLoading(false))
    }

    const bodyContent = (
        <div className="flex flex-col space-y-4">
        <Heading
        title="Welcome to Airbnb"
        subtitle='Create an account!'
        />
        <RegisterInput 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
          <RegisterInput 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
          <RegisterInput 
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => {}}
            />
            <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => {}}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                <p>Already have an account?</p>
                <p 
                onClick={registerModal.onClose}
                className='text-neutral-800 cursor-pointer hover:underline'>Login</p>
                </div>
            </div>
        </div>

        
    )
  return (
<Modal
disabled={isLoading}
isOpen={registerModal.isOpen}
onClose={registerModal.onClose}
onSubmit={handleSubmit(onSubmit)}
title="Register"
actionLabel="Continue"
body={bodyContent}
footer={footerContent}
/> 

)
}

export default RegisterModal
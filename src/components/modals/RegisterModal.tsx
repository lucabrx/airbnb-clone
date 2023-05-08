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
import { signIn } from 'next-auth/react';
import useLoginModal from '@/hooks/useLoginModal';





const RegisterModal: FC = ({}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
            loginModal.onOpen();

        })
        .catch(() => {
            toast.error("Something went wrong")
        }
        )
        .finally(() => setIsLoading(false))
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
        }, [loginModal, loginModal])

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
        type="password"
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
            onClick={() => signIn("google")}
            />
            <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn("github")}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                <p>Already have an account?</p>
                <button
                onClick={toggle}
                className='text-neutral-800 cursor-pointer hover:underline'>Login</button>
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
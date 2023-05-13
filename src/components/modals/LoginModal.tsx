"use client"
import { useCallback, type FC } from 'react';
import axios from "axios";
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import {useForm, SubmitHandler, type FieldValues, set} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from './Modal';
import Heading from '../Heading';
import {signIn} from "next-auth/react"
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { UserLoginSchema, type UserLoginType } from '@/schema/user';
import useLoginModal from '@/hooks/useLoginModal';
import LoginInput from '../inputs/LoginInput';
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/hooks/useRegisterModal';




const LoginModal: FC = ({}) => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit,formState:{errors},reset} = useForm<UserLoginType>({
        resolver: zodResolver(UserLoginSchema)
    })
    
    const onSubmit: SubmitHandler<UserLoginType> = (data) => {
        setIsLoading(true)
       signIn('credentials', {
              email: data.email,
              password: data.password,
              redirect: false
       })
       .then((res) => {
        setIsLoading(false)

        if(res?.ok) {
            toast.success('Logged in');
            reset()
            router.refresh();
            loginModal.onClose(); 
        }
        if (res?.error) {
            toast.error(res.error)
        }
       })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col space-y-4">
        <Heading
        title="Welcome back"
        subtitle='Login to your account'
        />
        <LoginInput 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
          <LoginInput 
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        type="password"
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
                <p>Firist time using Airbnb?</p>
                <button 
                onClick={toggle}
                className='text-neutral-800 cursor-pointer hover:underline'>Create an account</button>
                </div>
            </div>
        </div>

        
    )
  return (
<Modal
disabled={isLoading}
isOpen={loginModal.isOpen}
onClose={loginModal.onClose}
onSubmit={handleSubmit(onSubmit)}
title="Login"
actionLabel="Continue"
body={bodyContent}
footer={footerContent}
/> 

)
}

export default LoginModal
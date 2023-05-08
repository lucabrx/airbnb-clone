"use client"
import { type FC } from 'react';
import axios from "axios";
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import {useForm, SubmitHandler, type FieldValues} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/RegisterInput';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { UserLoginSchema, type UserLoginType } from '@/schema/user';
import useLoginModal from '@/hooks/useLoginModal';
import LoginInput from '../inputs/LoginInput';




const LoginModal: FC = ({}) => {
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit,formState:{errors}} = useForm<UserLoginType>({
        resolver: zodResolver(UserLoginSchema)
    })
    
    const onSubmit: SubmitHandler<UserLoginType> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
        .then(() => {
            loginModal.onClose();
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
                onClick={loginModal.onClose}
                className='text-neutral-800 cursor-pointer hover:underline'>Login</p>
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
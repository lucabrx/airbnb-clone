"use client"
import { type FC } from 'react';
import axios from "axios";
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle } from "react-icons/fc";
import { useCallback,useState } from 'react';
import {useForm, SubmitHandler, type FieldValues} from "react-hook-form";

import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';

interface RegisterModalProps {
  
}


const RegisterModal: FC<RegisterModalProps> = ({}) => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit,formState:{errors}} = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data)
        .then((res) => {
            registerModal.onClose();
        })
        .catch(console.error)
        .finally(() => setIsLoading(false))
    }

    const bodyContent = (
        <div className="flex flex-col space-y-4">
        <Heading
        title="Welcome to Airbnb"
        subtitle='Create an account!'
        />
        <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
          <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
          <Input 
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
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
/> 

)
}

export default RegisterModal
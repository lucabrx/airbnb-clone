"use client"
import { type FC } from 'react';
import axios from "axios";
import { AiFillGithub } from 'react-icons/ai';
import {FcGoogle } from "react-icons/fc";
import { useCallback,useState } from 'react';
import {useForm, SubmitHandler, type FieldValues} from "react-hook-form";

import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';

interface RegisterModalProps {
  
}


const RegisterModal: FC<RegisterModalProps> = ({}) => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register,handleSubmit,formState:{errors}} = useForm({
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
  return (
<Modal
disabled={isLoading}
isOpen={registerModal.isOpen}
onClose={registerModal.onClose}
onSubmit={handleSubmit(onSubmit)}
title="Register"
actionLabel="Continue"
/> 

)
}

export default RegisterModal
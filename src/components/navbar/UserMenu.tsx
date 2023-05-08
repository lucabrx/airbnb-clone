"use client"
import { useState, type FC, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';
import useRentModal from '@/hooks/useRentModal';
interface UserMenuProps {
    currentUser?: SafeUser | null;

}

const UserMenu: FC<UserMenuProps> = ({currentUser}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = useCallback(() => {
        setShowMenu((value) => !value)
    }, [])

    const onRent = useCallback(() => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser,loginModal])

  return (
<div className='relative'> 
<div className='flex flex-row items-center gap-3'>
    <button onClick={onRent}
    className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
    >
        Airbnb your home
    </button>

    <div onClick={toggleMenu}
    className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
    >
        <AiOutlineMenu />
        <div className='hidden md:block'>
        <Avatar src={currentUser?.image}/>
        </div>
    </div>

</div>
{
    showMenu && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
            <div className='flex flex-col cursor-pointer '>
                { currentUser ?
                (
                    <>
                    <MenuItem
                    label="My trips"
                    onClick={() =>{}}
                    />
                    <MenuItem
                    label="My favorites"
                    onClick={() =>{}}
                    />
                    <MenuItem
                    label="My properties"
                    onClick={() =>{}}
                    />
                    <MenuItem
                    label="Airbnb my home"
                    onClick={rentModal.onOpen}
                    />
                    <hr />
                    <MenuItem
                    label="Logout"
                    onClick={() => signOut()}
                    />
                    </>
                )
                :(
                <>
                <MenuItem
                label="Login"
                onClick={loginModal.onOpen}
                />
                <MenuItem
                label="Sign up"
                onClick={registerModal.onOpen}
                />
                </>)}
            </div>
        </div>
    )
}
</div>
)
}

export default UserMenu
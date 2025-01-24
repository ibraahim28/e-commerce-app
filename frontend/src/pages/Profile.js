import React, { useEffect, useState } from 'react'
import { getUserData } from '../utils/auth/auth';

const Profile = () => {
    const [user, setUser] = useState();

    useEffect(()=>{
        setUser(getUserData());
    }, [])
    console.log(user)
    return (
    <div className='max-w-screen max-h-screen h-screen bg-soft-beige flex justify-center items-center '>
      <div className='bg-light-coral flex w-[70%]  justify-between px-12 rounded-2xl items-center mx-auto p-10'>
        <div>
            <img className='w-24 h-24 border border-white rounded-full' src='' alt='' />
        </div>
        <div className=''>
        <div>
            <h1 className='text-2xl text-dark-charcoal font-bold'>{user?.username}</h1>
        </div>
        <div>{user?.email}</div>
        </div>
      </div>
    </div>
  )
}

export default Profile

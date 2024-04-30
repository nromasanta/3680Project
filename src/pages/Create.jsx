import React from 'react'
import { useAuth } from '../auth/authProvider'

const Create = () => {
  const { token, userId } = useAuth(); 
  console.log("Token -> ", token);
  console.log("UserId ->", userId);
  return (
    <div className='temp-page container'>
      Create
    </div>
  )
}

export default Create
import LoginSignUpLayout from '@/components/layouts/LoginSignUpLayout'
import LoginPage from '@/components/login_signup/LoginPage'
import React from 'react'

export default function page() {
  return (
    <LoginSignUpLayout>
        <LoginPage/>
    </LoginSignUpLayout>
  )
}

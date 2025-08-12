import LoginSignUpLayout from '@/components/layouts/LoginSignUpLayout'
import SignUpPage from '@/components/login_signup/SignUpPage'
import React from 'react'

export default function page() {
  return (
    <LoginSignUpLayout>
        <div>
          <SignUpPage/>
        </div>
    </LoginSignUpLayout>
  )
}
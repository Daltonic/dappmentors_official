'use client'


const LoginSignUpLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-fit text-black dark:text-white transition-all duration-300">
      {children}
    </div>
  )
}

export default LoginSignUpLayout;

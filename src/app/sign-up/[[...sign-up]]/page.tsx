import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center'>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-lg',
          },
        }}
      />
    </div>
  )
}

export default SignUpPage

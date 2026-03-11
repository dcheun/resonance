import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className='bg-background flex min-h-screen items-center justify-center'>
      <SignIn
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

export default SignInPage

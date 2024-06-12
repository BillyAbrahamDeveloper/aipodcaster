import { SignUp } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className=' flex-center glassmorphism-auth h-screen w-full '>
      <SignUp />
    </div>
  );
};

export default SignInPage;

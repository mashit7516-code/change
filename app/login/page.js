"use client"
import React from 'react'
import { useState  , useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Loader from '@/components/Loader'
function login() {
  const [verification, setverification] = useState(false)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [visibilityword, setvisibilityword] = useState("visibility_off")
  const [error, seterror] = useState("")
  const router = useRouter();
  
const {data : session , status} = useSession()

useEffect(() => {
  if (status !== "loading" && session) router.push("/");
}, [session, status, router]);
if (status === "loading") return <Loader />;
  const changevisibility = () => {
    setvisibilityword(prev =>
      prev === "visibility" ? "visibility_off" : "visibility"
    )
  };
   const emailchecker = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

  const handlelogin = async (e) => {
  e.preventDefault();
  
  if(!email || !password){
    seterror("Please Fill Both Fields")
    return;
  }

  if(!emailchecker()){
    seterror("Please Enter Valid Email")
    return;
  }
  
  setverification(true)
  
  try {
    // Use NextAuth credentials sign in directly
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // Don't auto-redirect
    });

    if (result?.error) {
      // Sign in failed
      toast.error(result.error)
      seterror(result.error)
    } else {
      // Sign in successful
      seterror("")
      toast.success("Logged in successfully!")
      router.push("/") // Redirect to homepage
    }
  } catch (error) {
    toast.error("An error occurred")
    console.error(error)
  } finally {
    setverification(false)
  }
}
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='mt-30 flex justify-center items-center flex-col'>
<div className='text-4xl text-center font-bold my-4'>Login to continue</div>
        <div className='flex w-full justify-center items-center'>

          <button onClick={()=>signIn("google",{callback : "/"})} className="flex items-center bg-[rgba(255,255,255,0.5)] w-[40%] justify-center text-black border border-gray-300 rounded-lg shadow-md  px-6 py-2 text-xl font-medium hover:bg-white active:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="-0.5 0 48 48" version="1.1">

              <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      id="Fill-1" fill="#FBBC05"> </path>
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      id="Fill-2" fill="#EB4335"> </path>
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      id="Fill-3" fill="#34A853"> </path>
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      id="Fill-4" fill="#4285F4"> </path>
                  </g>
                </g>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className='mt-10 w-full flex flex-col justify-center items-center gap-4'>
          <span className='text-lg font-semibold'>Contine With Email</span>
          <form onSubmit={handlelogin} className='w-full flex gap-6 justify-center items-center flex-col'>
            <input type="text" onChange={(e) => setemail(e.target.value)} className='outline-2 text-gray-900  outline-gray-700 focus:outline-black rounded-lg  w-[40%]' placeholder='Enter your Email' />
            <div className='flex gap-2 justify-center w-full items-center'>
              <input onChange={(e) => setpassword(e.target.value)} className='outline-2 text-gray-900 bg-white  outline-gray-700 focus:outline-black rounded-lg  w-[40%]' placeholder='Enter Password' type={visibilityword === "visibility" ? "text" : "password"} /><span onClick={changevisibility} className="material-symbols-outlined relative text-black bg-white active:scale-95 rounded-full p-1 h-fit w-fit cursor-pointer">
                {visibilityword}

              </span>
            </div>
            <button
              disabled={verification}
              type="submit"
              className={`bg-black px-2 py-1 rounded-full ${verification ? "opacity-60 cursor-not-allowed" : ""}`}
            >Submit</button>
          </form>
        </div>
<div>
  {
    error ? <div className='text-red-600 font-semibold'>
      {error}
    </div>: <div></div>
  }
</div>
      </div>
      <ToastContainer 
      position = "bottom-right"/>
    </div>
  )
}

export default login

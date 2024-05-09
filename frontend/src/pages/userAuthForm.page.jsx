import { useRef, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'

import InputBox from "../components/input.component"
import googleIcon from '../imgs/google.png'
import AnimationWrapper from '../common/page-animation'
import { storeInSession } from '../common/session'
import { UserContext } from '../App'
import { authWithGoogle } from '../common/firebase'

const UserAuthForm = ({ type }) => {

    const authForm = useRef()

    let { userAuth: { access_token }, setUserAuth } = useContext(UserContext)

    const userAuthThroughServer = (serverRouth, formData) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRouth, formData)
        .then(({ data }) => {
            storeInSession('user', JSON.stringify(data))
            setUserAuth(data)
        })
        .catch(({ response }) => {
            toast.error(response.data.error)
        })

    }

    const handleSubmit = (e) => {

        e.preventDefault()

        let serverRouth = type === 'sign-in' ? '/signin' : '/signup'

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        //let form = new FormData(authForm.current)
        let form = new FormData(formID)//Use directly ID of the form to access it
        let formData = {}

        for(let [key, value] of form.entries()) {
            formData[key] = value
        }

        let { fullname, email, password } = formData 

        if(fullname) {
            if(fullname.length < 3) {
                return toast.error('Fill your name' )
            }

        }
        if(!email.length) {
            return toast.error('Enter Email' )
        }
        if(!emailRegex.test(email)) {
            return toast.error('Email is invalid' )
        }
        if(!passwordRegex.test(password)) {
            return toast.error('Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters.' )
        }
        
        userAuthThroughServer(serverRouth, formData)
    }

    const handleGoogleAuth = (e) => {
        
        e.preventDefault()

        authWithGoogle().then(user => {
            
            let serverRouth = '/google-auth'

            let formData = {
                access_token: user.accessToken
            }

            userAuthThroughServer(serverRouth, formData)
        })
        .catch(err => {
            toast.error('Trouble login through google')
            return console.log(err)
        })
    }
 
    return(
        access_token ?
        < Navigate to='/' />
        :
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
                < Toaster />
                <form id='formID' ref={authForm} className="w-[80%] max-w-[400px]">
                    <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                        {type === 'sign-in' ? "Welcome back" : 'Join us today'}
                    </h1>

                    {
                        type !== 'sign-in' ? 
                        < InputBox 
                            name='fullname'
                            type='text'
                            placeholder='Full Name'
                            icon='fi-rr-user'
                        />
                        : ""
                    }

                    < InputBox
                        name='email'
                        type='email'
                        placeholder='Email'
                        icon='fi-rr-envelope'
                    />
                    < InputBox
                        name='password'
                        type='password'
                        placeholder='Password'
                        icon='fi-rr-key'
                    />

                    <button className="btn-dark center mt-14" type='submit' onClick={handleSubmit}>
                        { type.replace('-', ' ') }
                    </button>

                    <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                        <hr className="w-1/2 border-black" />
                        <p>or</p>
                        <hr className="w-1/2 border-black" />
                    </div>

                    <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" onClick={handleGoogleAuth}>
                        <img src={googleIcon} className="w-5" />
                        continue with google
                    </button>

                    {
                        type === 'sign-in' ? 
                        <p className="mt-6 text-dark-gray text-xl text-center">
                            Don't have an account?
                            <Link to='/signup' className='underline text-black text-xl ml-1'>
                                Join us today
                            </Link>
                        </p>
                        :
                        <p className="mt-6 text-dark-gray text-xl text-center">
                            Already a memeber?
                            <Link to='/signin' className='underline text-black text-xl ml-1'>
                                Sign in here
                            </Link>
                        </p>
                    }
                </form>
            </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm
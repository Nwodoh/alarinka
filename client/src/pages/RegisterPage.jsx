import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function registerUser(ev) {
        ev.preventDefault()
        try {
            await axios.post('/register', {
                name,
                email,
                password
                })
                alert('Registration successful. Now you can log in');
        } catch (e) {
            alert('Registration failed. Please try again later');
        }
        
    }
    return (
        <>
        <div className="grow flex flex-col items-center justify-around">
            <form className="mx-auto max-w-md -mt-8" onSubmit={registerUser}>
                <h1 className="text-center text-4xl ">Register</h1>
                <input 
                type="text" 
                placeholder="Ajala Doe"
                value={name}
                onChange={e => setName(e.target.value) }
                />
                <input 
                type="email" 
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button className="primary">Register</button>
                <div className="text-center p-2">
                    Have an account? <Link className="text-secondary" to={'/login'}>Log In here</Link>
                </div>
            </form>
        </div>
        </>
    )
}
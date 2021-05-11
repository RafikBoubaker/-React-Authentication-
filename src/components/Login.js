import React, { useRef, useState,  } from "react"
import { Form, Button, Card,Alert } from "react-bootstrap"
import { Link ,useHistory } from "react-router-dom"
import {useAuth} from '../context/AuthContext'



export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const {login} =useAuth()
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const history = useHistory()

 async function hundleSubmit(e){
e.preventDefault()
       
        try{
            setError('') // set is to empty in order to use it again
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push("/") //take us to dashboard page after successeful login
          }catch{
            setError('Failed to sign in to account')
          }
            setLoading(false) 
 }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          
            {error && <Alert variant ="danger">{error}</Alert>}
          <Form  onSubmit={hundleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to ="/forgot-password">Forgot PAssword ?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to='/signup'> Sign Up</Link>
      </div>
    </>
  )
}

import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {MajorContainer ,ContainerLeft, ContainerRight, H1ContainerLeft, TextContainerLeft,H1ContainerRight, ButtonContainerRight,FormContainerRight} from './style'
import {Input, Form } from 'semantic-ui-react'
function Login() {
  const [valueEmail, setValueEmail] = useState("")
  const [valuePassword, setValuePassword] = useState("")
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassWord, setErrorPassWord] = useState(false)
  function SignIn(){
    const NUMBER_MAX = 4
    if(valuePassword.length < NUMBER_MAX){
      setErrorPassWord(true)
    }if(valueEmail.length < NUMBER_MAX)
    {
      setErrorEmail(true)
    }
   
    console.log(valueEmail)
    console.log(valuePassword)
  }
  return (
    <MajorContainer>
      <ContainerLeft>
        <H1ContainerLeft>Welcome Back!</H1ContainerLeft>
        <TextContainerLeft>To keep connected with us <br/> please login with your personal info</TextContainerLeft>
      </ContainerLeft>
      <ContainerRight>
        <H1ContainerRight>Login in your account</H1ContainerRight>
        <FormContainerRight>
        <Form.Field
      error={errorEmail}
      id='form-input-control-error-email'
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      width= "sixteen"
      value={valueEmail}
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setValueEmail(e.target.value)}
    />
    <Form.Field  error={errorPassWord}>
      <label>Password</label>
      <input placeholder='Password' value={valuePassword} type="password" onChange={(e)=>setValuePassword(e.target.value)}/>
    </Form.Field>
  </FormContainerRight>
  <Link to="/list">
  <ButtonContainerRight onClick={()=> SignIn()}>Sign in</ButtonContainerRight>
  </Link>
      </ContainerRight>
    </MajorContainer>
  );
}

export default Login;

import React, {useState} from 'react'
import {MajorContainer, ContainerForm} from './style'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import InputMask from 'react-input-mask';


function List(){
  const [valueCep, setValueCep] = useState("")
  return(
    <MajorContainer>
      <ContainerForm >
      <Form>
    <Form.Group widths='equal'>
      <Form.Field type="tel" disableUnderline   required control={Input} label='Name' placeholder='Name' />
    <InputMask mask="999.999.999-99">
        {() =>  <Form.Field required control={Input} label='CPF' placeholder='CPF'  />}
    </InputMask>
     
    </Form.Group>
    <Form.Field
      required
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      type="email"
    />
     <Form.Group widths='equal'>
     <InputMask mask="99.999-999" value={valueCep} onChange={(e)=>setValueCep(e.target.value)}>
        {() => <Form.Field required control={Input} label='CEP' placeholder='CEP' width="7" />}
    </InputMask>
     
      <Form.Field
        required
        control={Input}
        label='District'
        placeholder='District'
      />
      <Form.Field
        required
        control={Input}
        label='Number'
        placeholder='Number'
      />
    </Form.Group>
     <Form.Group widths='equal'>
      <Form.Field
        required
        control={Input}
        label='Street'
        placeholder='Street'
      />
      <Form.Field
        required
        control={Input}
        label='City'
        placeholder='City'
      />
    </Form.Group>
    <Form.Field
      required
      id='form-button-control-public'
      control={Button}
      content='Confirm'
      onClick={()=> console.log(valueCep)}
    />
    
  </Form>
      </ContainerForm>
    </MajorContainer>
  )
}

export default List
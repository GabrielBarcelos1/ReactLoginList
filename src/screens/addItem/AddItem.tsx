import React, {useState} from 'react'
import {MajorContainer, ContainerForm, H1Form, ContainerLeft, MinorContainerLeft,
   H1ContainerRight, ContainerRight,TextContainerRight, ButtonContainerRight, ButtonContainerLeft} from './style'
import { Form, Input} from 'semantic-ui-react'
import InputMask from 'react-input-mask';
import {viacep, fakeapi} from '../../services/api'
import {Link} from 'react-router-dom'


 function AddItem (){
  const [valueName, setValueName] = useState("")
  const [valueCep, setValueCep] = useState("")
  const [valueCPF, setValueCPF] = useState("")
  const [valueEmail, setValueEmail] = useState("")
  const [valueStreet, setValueStreet] = useState("")
  const [valueCity, setValueCity] = useState("")
  const [valueDistrict, setValueDistrict] = useState("")
  const [valueNum, setValueNum] = useState("")
 async function validateCep (value: string){
    setValueCep(value)
    if(value.endsWith("_")){
      console.log("não acabou")
   
  }else{
    let cepParsed = parseValue(value)
    const {data} = await viacep.get(`/${cepParsed}/json/`)
    console.log(data)
    setValueStreet(data.logradouro)
    setValueCity(data.localidade)
    setValueDistrict(data.bairro)
}
  }
  function addInfosToDb(){
  if(valueCep.endsWith("_") || valueCPF.endsWith("_") ){
      console.log("deu erro")
  }else{
    let cepParsed = parseValue(valueCep)
    let cpfParsed = parseValue(valueCPF)
    let teste =   {
      nome: valueName,
      cpf: cpfParsed ,
      email: valueEmail,
      endereco: {
          cep: cepParsed,
          rua:valueStreet ,
          numero: valueNum,
          bairro: valueDistrict,
          cidade: valueCity,
      }
  }
    fakeapi.post("/clientes", teste)
  }
  }
  function parseValue(cep: string){
    let NumberParsed = cep.split('.').join("");
    return NumberParsed = NumberParsed.replace('-', '');
  }


  return(
    <MajorContainer>
      <ContainerLeft>
        <MinorContainerLeft>
      <ContainerForm >
        <H1Form>Form</H1Form>
      <Form  onSubmit={addInfosToDb}>
    <Form.Group widths='equal'>
      <Form.Field type="tel" disableUnderline   required control={Input} label='Name' placeholder='Name' value={valueName} onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setValueName(e.target.value)}/>
    <InputMask mask="999.999.999-99" value={valueCPF} onChange={e => setValueCPF(e.target.value)}>
        {() =>  <Form.Field required control={Input} label='CPF' placeholder='CPF'  />}
    </InputMask>
     
    </Form.Group>
    <Form.Field
      required
      control={Input}
      label='Email'
      placeholder='joe@schmoe.com'
      type="email"
      value={valueEmail}
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setValueEmail(e.target.value)}
    />
     <Form.Group widths='equal'>
     <InputMask mask="99.999-999" value={valueCep} onChange={(e)=>validateCep(e.target.value)}>
        {() => <Form.Field required control={Input} label='CEP' placeholder='CEP' width="7" />}
    </InputMask>
     
      <Form.Field
        required
        control={Input}
        label='District'
        placeholder='District'
        value={valueDistrict}
      />
        <Form.Field
        required
        control={Input}
        label='City'
        placeholder='City'
        value={valueCity}
        onChange={(e :React.ChangeEvent<HTMLInputElement>)=> setValueCity(e.target.value)}
      />
    
    </Form.Group>
     <Form.Group widths='equal'>
      <Form.Field
        required
        control={Input}
        label='Street'
        placeholder='Street'
        value={valueStreet}
        onChange={(e :React.ChangeEvent<HTMLInputElement>)=>setValueStreet(e.target.value)}
      />
        <Form.Field
        required
        control={Input}
        label='Number'
        placeholder='Number'
        maxLength={8}
        value={valueNum}
        onChange={(e :React.ChangeEvent<HTMLInputElement>)=> setValueNum(e.target.value)}
      />
    
    </Form.Group>
    <Form.Field
      control={ButtonContainerLeft}
    >Save in Data Base</Form.Field>
    
  </Form>
      </ContainerForm>
      </MinorContainerLeft>
      </ContainerLeft>
      <ContainerRight>
        <H1ContainerRight>Fill the Form</H1ContainerRight>
        <TextContainerRight>fill in the form fields to put your data in our database, or click below to see the list of data so far</TextContainerRight>
        <Link to="/list">
          <ButtonContainerRight>See List</ButtonContainerRight>
        </Link>
      </ContainerRight>
    </MajorContainer>
  )
}

export default AddItem
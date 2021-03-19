import React, {useEffect,useState} from 'react'
import {MajorContainer, ContainerLeft, ContainerRight, H1ContainerLeft, 
  TextContainerLeft, ButtonContainerLeft, MinorContainerRight,H1List,imgLoading} from './style'
import{fakeapi} from '../../services/api'
import {Link} from 'react-router-dom'
import { Icon, Menu, Table } from 'semantic-ui-react'

function List(){
  const [arrayItens, SetarrayItens] = useState(false)
  const [startUrl, setStartUrl] = useState(0)
  const [endtUrl, setEndUrl] = useState(5)
  useEffect(()=>{
    async function pickClients(){
       const {data} =  await fakeapi.get(`/clientes?_start=${startUrl}&_end=${endtUrl}`)
       SetarrayItens(data)
       console.log("aaaaaaaaa")
    }
    pickClients()

  },[ startUrl])

 function PaginationNext(){
   console.log(startUrl)
   console.log(endtUrl)
   if(arrayItens.length>=5){
    setStartUrl(prevState => prevState+5)
    setEndUrl(prevState => prevState+5)
   }
    
  }
 function PaginationBack(){
  console.log(startUrl)
  if(startUrl>0){
    setStartUrl(prevState => prevState-5)
    setEndUrl(prevState => prevState-5)
  }

}
  
  return(
    <MajorContainer>
      <ContainerLeft>
        <H1ContainerLeft>Help us with your data</H1ContainerLeft>
        <TextContainerLeft>help us put more information in our database to make it available to other people, put your data now</TextContainerLeft>
        <Link to="/add">
        <ButtonContainerLeft>Help us</ButtonContainerLeft>
        </Link>
      </ContainerLeft>
      <ContainerRight>
        <MinorContainerRight>
          <H1List>Users Registered</H1List>
         <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Nome</Table.HeaderCell>
        <Table.HeaderCell>Cpf</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Cidade</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {arrayItens && arrayItens.map((item)=>{
        return(
          <Table.Row key={item.id}>
          <Table.Cell>{item.nome}</Table.Cell>
          <Table.Cell>{item.cpf}</Table.Cell>
          <Table.Cell>{item.email}</Table.Cell>
          <Table.Cell>{item.endereco.cidade}</Table.Cell>
        </Table.Row>
        )
      })}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='4'>
          <Menu floated='right' pagination >
            <Menu.Item as='a' icon onClick={()=>PaginationBack()}>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a' icon onClick={()=>PaginationNext()}>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
        
  </MinorContainerRight>
      </ContainerRight>

    </MajorContainer>
  )
}

export default List
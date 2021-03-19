import React, {useEffect,useState} from 'react'
import {MajorContainer, ContainerLeft, ContainerRight, H1ContainerLeft, 
  TextContainerLeft, ButtonContainerLeft, MinorContainerRight,H1List,} from './style'
import { AiOutlineEdit,AiOutlineDelete ,AiOutlineSearch} from "react-icons/ai";
import{fakeapi} from '../../services/api'
import {Link} from 'react-router-dom'
import { Icon, Menu, Table,Input } from 'semantic-ui-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function List(){
  const notify = () => toast.error('item deleted successfully!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    });
  const [arrayItens, SetarrayItens] = useState([])
  const [startUrl, setStartUrl] = useState(0)
  const [endtUrl, setEndUrl] = useState(5)
  const [valueSearch, setValueSearch] = useState("")
  const [refreshSearch, setRefreshSearch] = useState(false)
  useEffect(()=>{
    async function pickClients(){
      setRefreshSearch(false)
       const {data} =  await fakeapi.get(`/clientes?${valueSearch !== "" ? 'q=' + valueSearch + '&_' : '_'}start=${startUrl}&_end=${endtUrl}`)
       SetarrayItens(data)
       console.log("aaaaaaaaa")
    }
    pickClients()

  },[ startUrl ,endtUrl, refreshSearch])

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
function searchItens(){
  setStartUrl(0)
  setEndUrl(5)
  setRefreshSearch(true)
}
function deleteItem(id){
  setRefreshSearch(true)
  notify()
  // fakeapi.delete(`/clientes/${id}`)

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
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Cpf</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>City</Table.HeaderCell>
        <Table.HeaderCell colSpan='2'></Table.HeaderCell>
        
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
          <Table.Cell><AiOutlineEdit size={22} color="#58AF9C"/></Table.Cell>
          <Table.Cell><AiOutlineDelete size={22} color="red" onClick={()=> deleteItem(item.id)}/></Table.Cell>
        </Table.Row>
        )
      })}
    </Table.Body>

    <Table.Footer>
      
      <Table.Row>
   
        <Table.HeaderCell colSpan='6'>
          <Menu floated='left' pagination >
       
            <Menu.Item>
            <Input value={valueSearch} placeholder="Search Itens" onChange={(e)=>{
              setValueSearch(e.target.value) 
              
              }}/>
            </Menu.Item>
            <Menu.Item as='a' icon onClick={()=> searchItens()}>
             <AiOutlineSearch size={22} color="#58AF9C" />
           </Menu.Item>
          </Menu>
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
      <ToastContainer  position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover={false}/>
    </MajorContainer>
  )
}

export default List
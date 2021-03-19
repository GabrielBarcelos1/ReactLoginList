import styled from 'styled-components';


export const MajorContainer = styled.div`
  width: 100vw;
  height:100vh;
  display:flex;
  flex-direction:row;
`;
export const ContainerLeft = styled.div`
  width: 40%;
  height:100%;
  background-color: #58AF9C;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  @media(max-width: 600px) {
    display:none
  }
`;
export const ContainerRight = styled.div`
  width: 60%;
  height:100%;
  background-color: white;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  @media(max-width: 600px) {
    width: 100%;
  }
`
export const H1ContainerLeft = styled.h1`
color: white;
font-weight:700;

`;
export const TextContainerLeft = styled.p`
color: #95D1C7;
line-height:30px;
max-width: 40%;

`
export const ButtonContainerLeft = styled.div`
margin-top: 10px;
color: white;
font-weight: 600;
border: 1px solid white;
width: 250px;
height :40px;
border-radius: 70px;
display: flex;
justify-content: center;
align-items:center;
&:hover {
 border: 1px solid #58AF9C;
 color: #58AF9C;
 background-color: white;
 transition: 0.15s;
}
`
export const MinorContainerRight = styled.div`
display: flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:70%;
`
export const H1List = styled.h1`
color: #58AF9C;
font-weight:700;
margin-bottom:20px;

`
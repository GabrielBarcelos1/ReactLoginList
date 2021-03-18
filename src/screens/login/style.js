import styled from 'styled-components';
import {Form } from 'semantic-ui-react'


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
export const H1ContainerLeft = styled.h1`
color: white;
font-weight:700;

`;
export const TextContainerLeft = styled.p`
color: #95D1C7;
line-height:30px;

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

`;
export const H1ContainerRight = styled.h1`
color: #58AF9C;
font-weight:700;

`;
export const ButtonContainerRight = styled.div`
margin-top: 30px;
color: white;
font-weight: 600;
background-color: #58AF9C;
width: 250px;
height :40px;
border-radius: 70px;
display: flex;
justify-content: center;
align-items:center;

`;
export const FormContainerRight = styled(Form)`
  width: 60%;
  @media(max-width: 600px) {
    width: 80%;
  }
  

`;




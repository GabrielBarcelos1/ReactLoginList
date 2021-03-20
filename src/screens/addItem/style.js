import { Container } from "semantic-ui-react";
import styled from "styled-components";

export const MajorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #58af9c;
`;

export const ContainerLeft = styled.div`
  width: 60%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 780px) {
    width: 100%;
  }
`;
export const ContainerRight = styled.div`
  width: 40%;
  height: 100%;
  background: #58af9c;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 780px) {
    display: none;
  }
`;
export const MinorContainerLeft = styled.div`
  width: 80%;
  height: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1170px) {
    width: 90%;
  }
  @media (max-width: 780px) {
    width: 100%;
  }
`;
export const ContainerForm = styled(Container)`
  background-color: white;
  border-radius: 10px;
  max-width: 10px !important;
`;
export const H1Form = styled.h1`
  color: #58af9c;
  font-weight: 700;
  margin-bottom: 40px;
`;
export const H1ContainerRight = styled.h1`
  color: white;
  font-weight: 700;
  text-align: center;
`;
export const TextContainerRight = styled.p`
  color: #95d1c7;
  line-height: 30px;
  max-width: 40%;
  text-align: center;
`;
export const ButtonContainerRight = styled.div`
  margin-top: 10px;
  color: white;
  font-weight: 600;
  border: 1px solid white;
  width: 250px;
  height: 40px;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border: 1px solid #58af9c;
    color: #58af9c;
    background-color: white;
    transition: 0.15s;
  }
`;
export const ButtonContainerLeft = styled.button`
  margin-top: 30px;
  color: white;
  font-weight: 600;
  background-color: #58af9c;
  width: 250px;
  height: 40px;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  border: 0;
  &:hover {
    border: 1px solid #58af9c;
    color: #58af9c;
    background-color: white;
    transition: 0.15s;
  }
`;
export const ContainerIconLogout = styled.div`
  width: 80%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  color: #58af9c;
  font-weight: 700;
`;
export const MinorContainerIconLogout = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #58af9c;
  font-weight: 700;
  padding: 3px 5px;
  border-radius: 4px;
  border: 1px solid white;
  &:hover {
    border: 1px solid #58af9c;
    transition: 0.15s;
    cursor: pointer;
  }
  @media (max-width: 780px) {
    margin-bottom: 30px;
  }
`;

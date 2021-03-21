import React, { useState, useEffect } from "react";
import {
  MajorContainer,
  ContainerForm,
  H1Form,
  ContainerLeft,
  MinorContainerLeft,
  H1ContainerRight,
  ContainerRight,
  TextContainerRight,
  ButtonContainerRight,
  ButtonContainerLeft,
  ContainerIconLogout,
  MinorContainerIconLogout,
} from "./style";
import { Form, Input } from "semantic-ui-react";
import InputMask from "react-input-mask";
import { viacep, fakeapi } from "../../services/api";
import { Link, RouteComponentProps } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TParams = { id: string };
function AddItem({ match }: RouteComponentProps<TParams>) {
  const [valueName, setValueName] = useState("");
  const [valueCep, setValueCep] = useState("");
  const [valueCPF, setValueCPF] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valueStreet, setValueStreet] = useState("");
  const [valueCity, setValueCity] = useState("");
  const [valueDistrict, setValueDistrict] = useState("");
  const [valueNum, setValueNum] = useState("");
  const [ErrorCep, setErroCep] = useState(false);
  const [ErrorCPF, setErrorCPF] = useState(false);
  const notify = () =>
    toast.success("item add with success!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  const notifyEdit = () =>
    toast.success("item edited with success!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await fakeapi.get(`/clientes/${match.params.id}`);
        console.log(data);
        setValueName(data.nome);
        setValueCep(data.endereco.cep);
        setValueCPF(data.cpf);
        setValueEmail(data.email);
        setValueStreet(data.endereco.rua);
        setValueCity(data.endereco.cidade);
        setValueDistrict(data.endereco.bairro);
        setValueNum(data.endereco.numero);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);
  async function validateCep(value: string) {
    setValueCep(value);
    if (value.endsWith("_")) {
      console.log("não acabou");
    } else {
      let cepParsed = parseValue(value);
      const { data } = await viacep.get(`/${cepParsed}/json/`);
      console.log(data);
      setValueStreet(data.logradouro);
      setValueCity(data.localidade);
      setValueDistrict(data.bairro);
    }
  }
  function addInfosToDb() {
    if (!valueCep.endsWith("_") && !valueCPF.endsWith("_") && verifyCepAndCpf()) {
      let cepParsed = parseValue(valueCep);
      let teste = {
        nome: valueName,
        cpf: valueCPF,
        email: valueEmail,
        endereco: {
          cep: cepParsed,
          rua: valueStreet,
          numero: valueNum,
          bairro: valueDistrict,
          cidade: valueCity,
        },
      };
      fakeapi.post("/clientes", teste);
      notify();
    }
  }
  function editInfosDb() {
    if (!valueCep.endsWith("_") && !valueCPF.endsWith("_") && verifyCepAndCpf()){
      let cepParsed = parseValue(valueCep);
      let teste = {
        nome: valueName,
        cpf: valueCPF,
        email: valueEmail,
        endereco: {
          cep: cepParsed,
          rua: valueStreet,
          numero: valueNum,
          bairro: valueDistrict,
          cidade: valueCity,
        },
      };
      fakeapi.put(`/clientes/${match.params.id}`, teste);
      notifyEdit();
    }
  }
  function parseValue(cep: string) {
    let NumberParsed = cep.split(".").join("");
    return (NumberParsed = NumberParsed.replace("-", ""));
  }
  function verifyCepAndCpf() {
    console.log(valueCPF)
    if (valueCep.endsWith("_") ) {
      setErroCep(true);
      return false
    }
    if (valueCPF.endsWith("_")) {
      setErrorCPF(true)
      return false

    }

    return true
  }



  return (
    <MajorContainer>
      <ContainerLeft>
        <ContainerIconLogout>
          <Link to="/" onClick={() => localStorage.clear()}>
            <MinorContainerIconLogout>
              <RiLogoutBoxLine size={25} color="#58AF9C" /> Logout
            </MinorContainerIconLogout>
          </Link>
        </ContainerIconLogout>

        <MinorContainerLeft>
          <ContainerForm>
            <H1Form>Form</H1Form>
            <Form
              onSubmit={() =>
                !match.params?.id ? addInfosToDb() : editInfosDb()
              }
            >
              <Form.Group widths="equal">
                <Form.Field
                  type="tel"
                  disableUnderline
                  required
                  control={Input}
                  label="Name"
                  placeholder="Name"
                  value={valueName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValueName(e.target.value)
                  }
                />
                <InputMask
                  mask="999.999.999-99"
                  value={valueCPF}
                  onChange={(e) => setValueCPF(e.target.value)}
                >
                  {() => (
                    <Form.Field
                      required
                      control={Input}
                      label="CPF"
                      placeholder="CPF"
                      error={ErrorCPF}
                    />
                  )}
                </InputMask>
              </Form.Group>
              <Form.Field
                required
                control={Input}
                label="Email"
                placeholder="joe@schmoe.com"
                type="email"
                value={valueEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValueEmail(e.target.value)
                }
              />
              <Form.Group widths="equal">
                <InputMask
                  mask="99.999-999"
                  value={valueCep}
                  onChange={(e) => validateCep(e.target.value)}
                >
                  {() => (
                    <Form.Field
                      required
                      control={Input}
                      label="CEP"
                      placeholder="CEP"
                      width="7"
                      error={ErrorCep}
                    />
                  )}
                </InputMask>

                <Form.Field
                  required
                  control={Input}
                  label="District"
                  placeholder="District"
                  value={valueDistrict}
                />
                <Form.Field
                  required
                  control={Input}
                  label="City"
                  placeholder="City"
                  value={valueCity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValueCity(e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  control={Input}
                  label="Street"
                  placeholder="Street"
                  value={valueStreet}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValueStreet(e.target.value)
                  }
                />
                <Form.Field
                  required
                  control={Input}
                  label="Number"
                  placeholder="Number"
                  maxLength={8}
                  value={valueNum}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValueNum(e.target.value)
                  }
                />
              </Form.Group>
              <Form.Field control={ButtonContainerLeft} onClick={()=>verifyCepAndCpf()}>
                {!match.params?.id ? "Save in Data Base" : "Update in DataBase"}
              </Form.Field>
            </Form>
          </ContainerForm>
        </MinorContainerLeft>
      </ContainerLeft>
      <ContainerRight>
        <H1ContainerRight>Fill the Form</H1ContainerRight>
        <TextContainerRight>
          fill in the form fields to put your data in our database, or click
          below to see the list of data so far
        </TextContainerRight>
        <Link to="/list">
          <ButtonContainerRight>See List</ButtonContainerRight>
        </Link>
      </ContainerRight>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MajorContainer>
  );
}

export default AddItem;

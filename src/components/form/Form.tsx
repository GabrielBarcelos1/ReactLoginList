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
  ButtonContainerMobile,
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
        const { data } = await fakeapi.get(`/clientes/${match?.params?.id}`);

        setValueName(data.nome);
        setValueCep(data.endereco.cep);
        setValueCPF(data.cpf);
        setValueEmail(data.email);
        setValueStreet(data.endereco.rua);
        setValueCity(data.endereco.cidade);
        setValueDistrict(data.endereco.bairro);
        setValueNum(data.endereco.numero);
      } catch (err) {}
    }
    getData();
  }, []);
  async function validateCep(value: string) {
    setValueCep(value);
    if (value.endsWith("_")) {
    } else {
      let cepParsed = parseValue(value);
      const { data } = await viacep.get(`/${cepParsed}/json/`);

      setValueStreet(data.logradouro);
      setValueCity(data.localidade);
      setValueDistrict(data.bairro);
    }
  }
  function addInfosToDb() {
    if (
      !valueCep.endsWith("_") &&
      !valueCPF.endsWith("_") &&
      verifyCepAndCpf()
    ) {
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
      setValueName("");
      setValueCep("");
      setValueCPF("");
      setValueEmail("");
      setValueStreet("");
      setValueCity("");
      setValueDistrict("");
      setValueNum("");
    }
  }
  function editInfosDb() {
    if (
      !valueCep.endsWith("_") &&
      !valueCPF.endsWith("_") &&
      verifyCepAndCpf()
    ) {
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
      fakeapi.put(`/clientes/${match?.params?.id}`, teste);
      notifyEdit();
    }
  }
  function parseValue(cep: string) {
    let NumberParsed = cep.split(".").join("");
    return (NumberParsed = NumberParsed.replace("-", ""));
  }
  function verifyCepAndCpf() {
    if (valueCep.endsWith("_")) {
      setErroCep(true);
      return false;
    }
    if (valueCPF.endsWith("_")) {
      setErrorCPF(true);
      return false;
    }

    return true;
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
          <Link to="/list">
            <ButtonContainerMobile>See List</ButtonContainerMobile>
          </Link>
        </ContainerIconLogout>

        <MinorContainerLeft>
          <ContainerForm>
            <H1Form>Form</H1Form>
            <Form
              onSubmit={() =>
                !match?.params?.id ? addInfosToDb() : editInfosDb()
              }
            >
              <Form.Group widths="equal">
                <Form.Field required>
                  <label> Name</label>
                  <input
                    data-testid="inputName"
                    placeholder="Name"
                    value={valueName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValueName(e.target.value)
                    }
                  ></input>
                </Form.Field>
                <InputMask
                  mask="999.999.999-99"
                  value={valueCPF}
                  onChange={(e) => setValueCPF(e.target.value)}
                  data-testid="inputCPF"
                >
                  {() => (
                    <Form.Field error={ErrorCPF} required>
                      <label> CPF</label>
                      <input
                        data-testid="inputCPF"
                        placeholder="CPF"
                        required
                      ></input>
                    </Form.Field>
                  )}
                </InputMask>
              </Form.Group>
              <Form.Field required>
                <label> Email</label>
                <input
                  type="email"
                  data-testid="inputEmail"
                  placeholder="Email"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValueEmail(e.target.value)
                  }
                  value={valueEmail}
                ></input>
              </Form.Field>
              <Form.Group widths="equal">
                <InputMask
                  mask="99.999-999"
                  value={valueCep}
                  onChange={(e) => validateCep(e.target.value)}
                >
                  {() => (
                    <Form.Field required error={ErrorCep}>
                      <label>CEP</label>
                      <input
                        data-testid="inputCEP"
                        placeholder="CEP"
                        required
                      ></input>
                    </Form.Field>
                  )}
                </InputMask>

                <Form.Field required>
                  <label>District</label>
                  <input
                    data-testid="inputDisctrict"
                    placeholder="District"
                    required
                    value={valueDistrict}
                    onChange={(e) => setValueDistrict(e.target.value)}
                  ></input>
                </Form.Field>
                <Form.Field required>
                  <label>City</label>
                  <input
                    data-testid="inputCity"
                    placeholder="City"
                    required
                    value={valueCity}
                    onChange={(e) => setValueCity(e.target.value)}
                  ></input>
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field required>
                  <label>Street</label>
                  <input
                    data-testid="inputStreet"
                    placeholder="Street"
                    required
                    value={valueStreet}
                    onChange={(e) => setValueStreet(e.target.value)}
                  ></input>
                </Form.Field>
                <Form.Field required>
                  <label>Number</label>
                  <input
                    type="text"
                    maxLength={8}
                    data-testid="inputNumber"
                    placeholder="Number"
                    required
                    value={valueNum}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValueNum(e.target.value)
                    }
                  ></input>
                </Form.Field>
              </Form.Group>
              <Form.Field
                control={ButtonContainerLeft}
                onClick={() => verifyCepAndCpf()}
              >
                {!match?.params?.id
                  ? "Save in Data Base"
                  : "Update in DataBase"}
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

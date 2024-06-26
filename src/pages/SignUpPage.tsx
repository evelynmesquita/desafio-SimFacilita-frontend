import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { API } from "../routes/routes";
import { ChangeEvent, FormEvent, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import dayjs from "dayjs";
import logo from "../images/logo.png";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface FormStates {
  name: string;
  lastName: string;
  birthday: string;
  phone: string;
  email: string;
  password: string;
  profileUrl: string;
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formStates, setFormStates] = useState<FormStates>({
    name: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    password: "",
    profileUrl: "",
  });

  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  function RegisterError(error: any) {
    return (
      <p>
        Não foi possível fazer o cadastro pelo erro: {error.data.response.data}
      </p>
    );
  }

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = { ...formStates };
    newUser.birthday = dayjs(newUser.birthday).endOf("day").toISOString();
    setDisable(true);

    axios
      .post(API.postSignUp, newUser)
      .then(() => {
        navigate("/");
        setDisable(false);
      })
      .catch((error) => {
        setDisable(false);
        MySwal.fire({
          title: "Oops... 😓",
          html: <RegisterError data={error} />,
          timer: 5000,
          confirmButtonText: "OK",
        });
      });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormStates = { ...formStates };
    newFormStates[e.target.id as keyof FormStates] = e.target.value;
    setFormStates(newFormStates);
  }

  return (
    <LoginPage>
      <Logo>
        <img src={logo} />
      </Logo>
      <RightContainer>
        <form onSubmit={(e) => submitForm(e)}>
          <RightBox>
            <h1>Cadastro</h1>
            <input
              id="name"
              placeholder="Nome"
              type="text"
              value={formStates.name}
              onChange={(e) => handleChange(e)}
              autoComplete="name"
              required
              disabled={disable}
            />

            <input
              id="lastName"
              placeholder="Sobrenome"
              type="text"
              value={formStates.lastName}
              onChange={(e) => handleChange(e)}
              autoComplete="lastName"
              required
              disabled={disable}
            />

            <input
              id="birthday"
              placeholder="Data de aniversário"
              type="date"
              value={formStates.birthday}
              onChange={(e) => handleChange(e)}
              autoComplete="birthday"
              required
              disabled={disable}
            />

            <input
              id="phone"
              placeholder="Telefone Celular"
              type="text"
              value={formStates.phone}
              onChange={(e) => handleChange(e)}
              autoComplete="phone"
              required
              disabled={disable}
            />

            <input
              id="email"
              placeholder="E-mail"
              type="email"
              autoComplete="email"
              value={formStates.email}
              onChange={(e) => handleChange(e)}
              required
              disabled={disable}
            />

            <DivPassword>
              <input
                id="password"
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
                value={formStates.password}
                onChange={(e) => handleChange(e)}
                required
                disabled={disable}
              />
              {showPassword ? (
                <AiOutlineEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="type-eye"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                  className="type-eye"
                />
              )}
            </DivPassword>
            <input
              id="profileUrl"
              placeholder="Foto URL"
              type="text"
              value={formStates.profileUrl}
              onChange={(e) => handleChange(e)}
              autoComplete="profileUrl"
              required
              disabled={disable}
            />

            <button type="submit" disabled={disable}>
              <LoadingButtonContent>
                {disable ? (
                  <ThreeDots color="#ffffff" height={20} width={50} />
                ) : (
                  "Cadastrar"
                )}
              </LoadingButtonContent>
            </button>
            <LinkToSignIn to="/">Já tem uma conta? Entre agora!</LinkToSignIn>
          </RightBox>
        </form>
      </RightContainer>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  display: flex;
`;

const Logo = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;

  img {
    align-self: center;
    width: 100%;
    max-width: 30vw;

    @media (max-width: 1024px) {
      max-width: 15vw;
    }
  }
`;

const RightContainer = styled.div`
  width: 60%;
  height: 100vh;
  background-color: #7f3e98;
  padding: 5px 20px 5px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;

  img {
    align-self: center;
    width: 100%;
    max-width: 30vw;

    @media (min-width: 1024px) {
      max-width: 15vw;
    }
  }

  h1 {
    align-self: center;
    font-size: 5vw;
    color: #ffffff;
    margin: 20px 0px 20px 0px;

    @media (min-width: 1024px) {
      font-size: 2.5vw;
    }
  }

  input {
    margin-bottom: 20px;
    height: 100%;
    min-height: 42px;
    width: 100%;
    min-width: 90%;
    font-size: 3vw;
    border: 1px solid #ffffff;
    border-radius: 15px;
    padding-left: 6px;
    color: rgb(118, 118, 118);
    outline: 0;

    @media (min-width: 1024px) {
      min-width: 100%;
      font-size: 1.2vw;
    }
  }

  button {
    align-self: center;
    width: 100%;
    min-width: 40px;
    max-width: 45vw;
    min-height: 40px;
    font-size: 3vw;
    border: none;
    background-color: #ffffff;
    color: #7f3e98;
    border-radius: 15px;

    &:hover {
      background-color: #9acb4b;
      color: #ffffff;
    }

    @media (min-width: 1024px) {
      width: 100%;
      min-width: 20px;
      max-width: 25vw;
      height: 100%;
      min-height: 40px;
      max-height: 55vw;
      font-size: 1.2vw;
    }
  }
`;

const LinkToSignIn = styled(Link)`
  font-size: 18px;
  color: #ffffff;
  text-decoration: underline;
  align-self: center;
  margin: 20px 0px;

  &:hover {
    color: #9acb4b;
  }
`;

const DivPassword = styled.div`
  position: relative;

  .type-eye {
    position: absolute;
    top: 37%;
    right: 10px;
    transform: translateY(-50%);
    color: rgb(118, 118, 118);
    font-size: 25px;
    cursor: pointer;
  }
`;

const LoadingButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

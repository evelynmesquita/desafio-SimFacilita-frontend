import logo from "../images/logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { LoginContext } from "../context/Context";
import Swal from "sweetalert2";

export default function Header() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    return null;
  }

  const navigate = useNavigate();

  function logout() {
    Swal.fire({
      title: `<span style="font-family: 'Poppins', sans-serif; font-size: 16px; color:black">Deseja sair?</span>`,
      showCancelButton: true,
      confirmButtonColor: "#7f3e98",
      cancelButtonColor: "#7f3e98",
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      width: 300,
      heightAuto: false,
      imageWidth: 200,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userId");
        localStorage.removeItem("token")
        navigate("/");
      }
    });
  }

  return (
    <HeaderContainer>
      <HeaderMargin>
        <HeaderTitle to="/dashboard/timeline">
          <img src={logo} />
          <FooterContainer>
            <Links to="timeline">
              <>
                <FaHomeIcon />
                <p>Timeline</p>
              </>
            </Links>
            <Links to="timeline">
              <>
                <FaSearch />
                <p>Pesquisar</p>
              </>
            </Links>
            <Links to={`myprofile`}>
              <>
                <FaUserIcon />
                <p>Meu Perfil</p>
              </>
            </Links>
            <Logout onClick={logout}>
              <IoLogOutIcon onClick={logout} />
              <p>Sair</p>
            </Logout>
          </FooterContainer>
        </HeaderTitle>
      </HeaderMargin>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: left;
  height: 100%;
  background-color: #e5e5e5;
  position: fixed;
  width: 18%;
  top: 0;
  left: 0;
  cursor: pointer;
  box-shadow: rgba(138, 136, 136, 0.16) 0px 3px 6px,
    rgba(71, 70, 70, 0.23) 0px 3px 6px;
`;

const HeaderMargin = styled.div`
  margin: 10px 20px;
`;

const HeaderTitle = styled(Link)`
  img {
    height: 60px;
  }
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background-color: #e5e5e5;
  height: 30%;
  width: 100%;
  font-size: 10px;
  margin-top: 15px;
`;

const Links = styled(Link)`
  font-size: 15px;
  color: #7f3e98;
  display: flex;
  align-items: center;

  &:hover {
    color: #a85dc5;
  }

  p {
    margin-left: 5px;
  }
`;

const Logout = styled.div`
  font-size: 15px;
  color: #7f3e98;
  display: flex;
  align-items: center;

  &:hover {
    color: #a85dc5;
  }

  p {
    margin-left: 5px;
  }
`;

const FaHomeIcon = styled(FaHome)`
  width: 30px;
  height: 30px;
`;

const FaUserIcon = styled(FaUser)`
  width: 28px;
  height: 28px;
`;

const IoLogOutIcon = styled(IoLogOut)`
  font-size: 18px;
  color: #7f3e98;
  width: 30px;
  height: 30px;
  &:hover {
    color: #a85dc5;
  }
`;
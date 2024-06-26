import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  background-color: #ffffff;

  margin-top: 70px;
  margin-bottom: 70px;
`;

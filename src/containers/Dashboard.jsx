import React, { useState } from "react";
import Header from "../components/Header";
import Profile from "./Profile";
import Calculator from "./Calculator";
import { Nav } from "react-bootstrap";

const Dashboard = (props) => {
  const [selected, setSelected] = useState("profile");

  return (
    <>
      <Header>
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => setSelected(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="profile">Perfil</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="calculator">Calculadora</Nav.Link>
          </Nav.Item>
        </Nav>
      </Header>
      {selected === "profile" && <Profile {...props} />}
      {selected === "calculator" && <Calculator {...props} />}
    </>
  );
};

export default Dashboard;

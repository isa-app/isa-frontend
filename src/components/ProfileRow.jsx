import React from "react";
import { Row, Col } from "react-bootstrap";
import "../assets/styles/components/ProfileRow.scss";
import "../assets/fonts/profile/flaticon.css";

const idTransform = {
  13: "Cédula de Ciudadanía",
  22: "Cédula de extranjería",
  41: "Pasaporte",
};

function ProfileRow({ title, value, borderBottom, icon }) {
  let borderClass = "";

  if (borderBottom) borderClass += "border-bottom";

  if (title === "Tipo de Id") value = idTransform[value];

  return (
    <Row className={borderClass}>
      <Col xs={12} sm={6} className="d-flex align-items-center">
        <i className={`${icon} mr-2 pt-1`}></i>
        <h6 className="my-3 ml-1">{title}</h6>
      </Col>
      <Col xs={12} sm={6} className="d-flex align-items-center pr-4">
        <span className="my-3 ml-1 text-secondary">{value}</span>
      </Col>
    </Row>
  );
}

ProfileRow.defaultProps = {
  borderBottom: true,
};

export default ProfileRow;

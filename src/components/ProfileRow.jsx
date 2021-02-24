import React from "react";
import { Row, Col } from "react-bootstrap";
import "../assets/styles/components/ProfileRow.scss";
import "../assets/fonts/profile/flaticon.css";

function ProfileRow({ title, value, borderBottom, icon }) {
  let borderClass = "";

  if (borderBottom) borderClass += "border-bottom";

  return (
    <Row className={borderClass}>
      <Col className="d-flex align-items-center">
        <i className={`${icon} mr-2 pt-1`}></i>
        <h6 className="my-3 ml-1">{title}</h6>
      </Col>
      <Col className="d-flex align-items-center pr-4">
        <span className="my-3 ml-1 text-secondary">{value}</span>
      </Col>
    </Row>
  );
}

ProfileRow.defaultProps = {
  borderBottom: true,
};

export default ProfileRow;

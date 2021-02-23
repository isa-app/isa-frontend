import React from "react";
import { Row, Col } from "react-bootstrap";
import "../assets/styles/components/ProfileRow.scss";

function ProfileRow({ title, value, borderBottom }) {
  let borderClass = "";

  if (borderBottom) borderClass += "border-bottom";

  return (
    <Row className={borderClass}>
      <Col className="d-flex align-items-center">
        <h6 className="my-3 ml-1">{title}</h6>
      </Col>
      <Col className="d-flex align-items-center">
        <span className="my-3 ml-1 text-secondary">{value}</span>
      </Col>
    </Row>
  );
}

ProfileRow.defaultProps = {
  borderBottom: true,
};

export default ProfileRow;

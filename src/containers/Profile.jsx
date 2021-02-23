import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ProfileRow from "../components/ProfileRow";
import { PROFILE_URL } from "../utils/constants";
import axios from "axios";
import Loader from "../components/Loader";
import "../assets/styles/components/Profile.scss";

// const SLOW_REQUEST =
//   "http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk";

const personalData = {
  name: "Nombre",
  lastName: "Apellido",
  email: "Email",
  identification: "Identificación",
  idType: "Tipo de Id",
  phone: "Teléfono",
};

function Profile(props) {
  const { userId } = props.match.params;

  const [user, setUser] = useState({
    name: "Larry",
    lastName: "Hudson",
    idType: 13,
    identification: "123456789",
    email: "larry@gmail.com",
    phone: "57493184",
  });

  // const [user, setUser] = useState({});

  useEffect(() => {
    const cancelProfile = axios.CancelToken.source();
    const options = {
      cancelToken: cancelProfile.token,
      withCredentials: true,
    };
    let response;

    (async () => {
      try {
        response = await axios.get(`${PROFILE_URL}/${userId}`, options);
        console.log(response.data);
        // if (response.status === 201) props.registerRequest(data);
        // props.history.push("/");
        //
      } catch (err) {
        console.log(err.message);
      }
    })();

    console.log("useEffect");
    return () => {
      cancelProfile.cancel("Profile Request Canceled");
      console.log("Unmount");
    };
  }, []);

  if (Object.keys(user).length === 0) {
    return (
      <div className="loader container d-flex justify-content-center align-items-center">
        <Loader type="ThreeDots" />
      </div>
    );
  }

  return (
    <div className="profile_section d-flex justify-content-center align-items-center">
      <Card className="card">
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Datos Personales</Card.Title>
          {Object.keys(personalData).map((item, index) => {
            let bB = true;
            if (index + 1 === Object.keys(personalData).length) bB = false;

            return (
              <ProfileRow
                title={personalData[item]}
                value={user[item]}
                borderBottom={bB}
                key={personalData[item]}
              />
            );
          })}

          <Button variant="primary mt-4">Editar Datos</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ProfileRow from "../components/ProfileRow";
import { PROFILE_URL } from "../utils/constants";
import axios from "axios";
import "../assets/styles/components/Profile.scss";

// import Loader from "../components/Loader";

// const SLOW_REQUEST =
//   "http://slowwly.robertomurray.co.uk/delay/3000/url/http://www.google.co.uk";

const personalData = {
  name: "Nombre",
  lastName: "Apellido",
  email: "Email",
  idType: "Tipo de Id",
  identification: "Identificación",
  phone: "Teléfono",
};

const profileIcon = {
  name: "flaticon-avatar",
  lastName: "flaticon-avatar",
  email: "flaticon-envelope",
  idType: "flaticon-tag",
  identification: "flaticon-tag",
  phone: "flaticon-phone-call",
};

function Profile(props) {
  const { userId } = props.match.params;

  // const [user, setUser] = useState({
  //   name: "Larry",
  //   lastName: "Hudson",
  //   idType: 13,
  //   identification: "123456789",
  //   email: "larry@gmail.com",
  //   phone: "57493184",
  // });

  const [user, setUser] = useState({});

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
        setUser(response.data.user);

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

  // if (Object.keys(user).length === 0) {
  //   return (
  //     <div className="loader container d-flex justify-content-center align-items-center">
  //       {/* <Loader type="ThreeDots" /> */}
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div className="profile_section d-flex justify-content-center align-items-center">
      <Card className="card">
        <Card.Body className="p-5">
          <h4 className="mb-4">Datos Personales</h4>
          {Object.keys(personalData).map((item, index) => {
            let bB = true;
            if (index + 1 === Object.keys(personalData).length) bB = false;

            return (
              <ProfileRow
                title={personalData[item]}
                value={user[item]}
                borderBottom={bB}
                icon={profileIcon[item]}
                key={personalData[item]}
              />
            );
          })}

          <Button variant="primary mt-4">Editar Datos</Button>
        </Card.Body>
      </Card>
      <div className="attribution">
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/gregor-cresnar"
          title="Gregor Cresnar"
        >
          Gregor Cresnar
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}

export default Profile;

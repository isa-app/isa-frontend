import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ProfileRow from "../components/ProfileRow";
import { PROFILE_URL } from "../utils/constants";
import { displayAlert } from "../utils/errors";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../utils/constants";
import Loader from "../components/Loader";
import "../assets/styles/components/Profile.scss";

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

  const [user, setUser] = useState({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const { register, handleSubmit } = useForm({});

  const cancelEdit = useRef(null);

  const onSubmit = async (data) => {
    data = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v.trim() !== "")
    );

    if (Object.keys(data).length) {
      // Do Request
      cancelEdit.current = axios.CancelToken.source();

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        cancelToken: cancelEdit.current.token,
        withCredentials: true,
      };

      const postObject = data;

      let response;
      try {
        response = await axios.put(
          `${UPDATE_PROFILE_URL}/${user._id}`,
          postObject,
          options
        );
        if (response.status === 200) {
          // props.registerRequest(data);
          setUser({ ...user, ...data });
          setIsEditable(false);
        }
        //
      } catch (err) {
        if (!isUnmounted) {
          setIsButtonEnabled(true);
          if (err.response && err.response.status === 404)
            displayAlert("USER_NOT_FOUND");
          else if (err.response && err.response.status === 500)
            displayAlert("SERVER_ERROR");
        }

        //
      }
    } else {
      setIsEditable(false);
    }
  };

  useEffect(() => {
    const cancelProfile = axios.CancelToken.source();
    const options = {
      cancelToken: cancelProfile.token,
      withCredentials: true,
    };
    let response;

    if (!Object.keys(user).length) {
      (async () => {
        try {
          response = await axios.get(`${PROFILE_URL}/${userId}`, options);
          if (response.status === 200) {
            setUser(response.data.user);
            setIsButtonEnabled(true);
          }
        } catch (err) {
          if (!isUnmounted) {
            if (err.response && err.response.status === 401)
              displayAlert("UNAUTHORIZED");
            else if (err.response && err.response.status === 403)
              displayAlert("FORBIDDEN");
            else if (err.response && err.response.status === 500)
              displayAlert("SERVER_ERROR");
          }
        }
      })();
    }

    return () => {
      setIsUnmounted(true);
      cancelProfile.cancel("Profile Request Canceled");
      if (cancelEdit.current)
        cancelEdit.current.cancel("Profile Update Canceled");
    };
  }, [userId, isUnmounted, user]);

  if (Object.keys(user).length === 0) {
    return (
      <div className="loader container d-flex justify-content-center align-items-center">
        {/* <Loader type="ThreeDots" /> */}
        <Loader />
      </div>
    );
  }

  return (
    <div className="content-center my-3 profile_section d-flex justify-content-center align-items-center">
      <Card className="card">
        <Card.Body className="p-5">
          <h4 className="mb-4">Datos Personales</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(personalData).map((item, index) => {
              let bB = true;
              if (index + 1 === Object.keys(personalData).length) bB = false;
              let key = personalData[item];
              if (isEditable) key += "_Editable";

              return (
                <ProfileRow
                  title={personalData[item]}
                  value={user[item]}
                  borderBottom={bB}
                  icon={profileIcon[item]}
                  fieldType={item}
                  isEditable={isEditable}
                  key={key}
                  register={register}
                />
              );
            })}

            {isEditable && (
              <Button variant="primary mt-4" type="submit">
                Guardar
              </Button>
            )}
          </form>
          {!isEditable && (
            <Button
              type="button"
              variant="btn btn-outline-primary mt-4"
              disabled={!isButtonEnabled}
              onClick={() => {
                setIsEditable(true);
              }}
            >
              Editar Datos
            </Button>
          )}
        </Card.Body>
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
      </Card>
    </div>
  );
}

export default Profile;

import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import "../../styles/add-contact.css";

export const AddContact = () => {
  //pasar propiedades a traves de un link
  /*  const location = useLocation();
  const data = location.state?.data; */

  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const param =
    Object.keys(useParams()).length !== 0 ? useParams().theid : false;

    console.log(useParams());

  useEffect(() => {
    if (Object.keys(store.contactList).length === 0) {
      actions.fetchMethods("get");
      const timeOut = setTimeout(() => {
        setnameValue(store.contactList[param].full_name);
        setemailValue(store.contactList[param].email);
        setphoneValue(store.contactList[param].phone);
        setaddressValue(store.contactList[param].address);

        clearTimeout(timeOut);
      }, 1000);
    }
  }, []);

  /* ALERT */
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState("An error has occurred.");

  /* INPUT CHECKS */
  const [CheckFullName, setCheckFullName] = useState(param ? true : false);
  const [CheckEmail, setCheckEmail] = useState(param ? true : false);
  const [CheckPhone, setCheckPhone] = useState(param ? true : false);
  const [CheckAddress, setCheckAddress] = useState(param ? true : false);

  /* CONTROL INPUT */

  const [nameValue, setnameValue] = useState(
    param && Object.keys(store.contactList).length !== 0
      ? store.contactList[param].full_name
      : ""
  );
  const [emailValue, setemailValue] = useState(
    param && Object.keys(store.contactList).length !== 0
      ? store.contactList[param].email
      : ""
  );
  const [phoneValue, setphoneValue] = useState(
    param && Object.keys(store.contactList).length !== 0
      ? store.contactList[param].phone
      : ""
  );
  const [addressValue, setaddressValue] = useState(
    param && Object.keys(store.contactList).length !== 0
      ? store.contactList[param].address
      : ""
  );

  /* FORMULARY */
  const formulary = (e) => {
    e.preventDefault();

    const contactData = {
      full_name: nameValue,
      email: emailValue,
      phone: phoneValue,
      address: addressValue,
      agenda_slug: "robmab",
    };

    setnameValue("");
    setemailValue("");
    setphoneValue("");
    setaddressValue("");

    if (param) actions.modifyData(contactData, param);
    else actions.addData(contactData);

    navigate("/"); //redirect onSubmit
  };

  return (
    <div className="wrapper-formulary">
      <h1>
        {param ? "Modify" : "Add a new"} {"contact"}
      </h1>
      <div className="form">
        {/* ALERT */}
        {alert ? (
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              style={{ color: "#fa0000" }}
            />
            <div>{alertText}</div>
          </div>
        ) : null}

        {/* ALERT END*/}
        <form onSubmit={formulary}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Full Name</label>
            <input
              onChange={(e) => {
                const upperCase = e.target.value
                  .split(" ")
                  .map((x) => {
                    return x.charAt(0).toUpperCase() + x.slice(1);
                  })
                  .join(" ");
                setnameValue(upperCase);

                if (e.target.value != "") setCheckFullName(true);
                else setCheckFullName(false);
              }} //control input
              value={nameValue}
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="emailHelp"
              placeholder={
                param && Object.keys(store.contactList).length !== 0
                  ? store.contactList[param].full_name
                  : param && Object.keys(store.contactList).length === 0
                  ? ""
                  : "Full Name"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              onChange={(e) => {
                setemailValue(e.target.value);

                /* when modify data, only check email when email value change */
                if (param) {
                  if (store.contactList[param].email === e.target.value)
                    setAlert(false);
                  else
                    actions.checkEmail(e.target.value, setAlert, setAlertText);
                } else {
                  actions.checkEmail(e.target.value, setAlert, setAlertText);
                }

                if (e.target.value != "") setCheckEmail(true);
                else setCheckEmail(false);
              }}
              value={emailValue}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder={
                param && Object.keys(store.contactList).length !== 0
                  ? store.contactList[param].email
                  : param && Object.keys(store.contactList).length === 0
                  ? ""
                  : "Enter email"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Phone</label>
            <input
              onChange={(e) => {
                setphoneValue(e.target.value);
                if (e.target.value != "") setCheckPhone(true);
                else setCheckPhone(false);
              }}
              value={phoneValue}
              type="tel"
              className="form-control"
              id="phone"
              aria-describedby="emailHelp"
              placeholder={
                param && Object.keys(store.contactList).length !== 0
                  ? store.contactList[param].phone
                  : param && Object.keys(store.contactList).length === 0
                  ? ""
                  : "Enter phone"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Address</label>
            <input
              onChange={(e) => {
                setaddressValue(e.target.value);
                if (e.target.value != "") setCheckAddress(true);
                else setCheckAddress(false);
              }}
              value={addressValue}
              type="text"
              className="form-control"
              id="address"
              aria-describedby="emailHelp"
              placeholder={
                param && Object.keys(store.contactList).length !== 0
                  ? store.contactList[param].address
                  : param && Object.keys(store.contactList).length === 0
                  ? ""
                  : "Enter address"
              }
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary ${
              !alert &&
              CheckFullName &&
              CheckEmail &&
              CheckPhone &&
              CheckAddress
                ? ""
                : "noclick"
            }`}
          >
            save
          </button>
        </form>
      </div>
      <Link to="/">or get back to contacts</Link>
    </div>
  );
};

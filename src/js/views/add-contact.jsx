import React, { useState, useContext } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/add-contact.css";

export const AddContact = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const param =
    Object.keys(useParams()).length !== 0 ? useParams().theid : false;

  //pasar propiedades a traves de un link
  /*  const location = useLocation();
  const data = location.state?.data; */

  const [nameValue, setnameValue] = useState(
    param ? store.contactList[param].full_name : ""
  );
  const [emailValue, setemailValue] = useState(
    param ? store.contactList[param].email : ""
  );
  const [phoneValue, setphoneValue] = useState(
    param ? store.contactList[param].phone : ""
  );
  const [addressValue, setaddressValue] = useState(
    param ? store.contactList[param].address : ""
  );

  const formulary = (e) => {
    e.preventDefault();

    if (nameValue === "") {
      alert("Add full name please.");
      return;
    }

    if (emailValue === "") {
      alert("Add email please.");
      return;
    }

    /* when modify data, only check email when email value change */
    if (param && store.contactList[param].email === emailValue);
    else actions.checkEmail(emailValue);

    if (phoneValue === "") {
      alert("Add phone please.");
      return;
    }

    if (addressValue === "") {
      alert("Add address please.");
      return;
    }

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
              }} //control input
              value={nameValue}
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="emailHelp"
              placeholder={param ? store.contactList[param].name : "Full Name"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              onChange={(e) => setemailValue(e.target.value)}
              value={emailValue}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder={
                param ? store.contactList[param].email : "Enter email"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Phone</label>
            <input
              onChange={(e) => setphoneValue(e.target.value)}
              value={phoneValue}
              type="tel"
              className="form-control"
              id="phone"
              aria-describedby="emailHelp"
              placeholder={
                param ? store.contactList[param].phone : "Enter phone"
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Address</label>
            <input
              onChange={(e) => setaddressValue(e.target.value)}
              value={addressValue}
              type="text"
              className="form-control"
              id="address"
              aria-describedby="emailHelp"
              placeholder={
                param ? store.contactList[param].address : "Enter address"
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            save
          </button>
        </form>
      </div>
      <Link to="/">or get back to contacts</Link>
    </div>
  );
};

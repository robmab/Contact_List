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

  const [nameValue, setnameValue] = useState(param ? store[param].name : "");
  const [emailValue, setemailValue] = useState(param ? store[param].email : "");
  const [phoneValue, setphoneValue] = useState(param ? store[param].phone : "");
  const [addressValue, setaddressValue] = useState(
    param ? store[param].address : ""
  );

  const formulary = (e) => {
    e.preventDefault();

    if (e.target[0].value === "") {
      alert("Add full name please.");
      return;
    }

    if (e.target[1].value === "") {
      alert("Add email please.");
      return;
    }

    if (e.target[2].value === "") {
      alert("Add phone please.");
      return;
    }

    if (e.target[3].value === "") {
      alert("Add address please.");
      return;
    }

    const contactData = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      address: e.target[3].value,
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
              onChange={(e) => setnameValue(e.target.value)} //control input
              value={nameValue}
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="emailHelp"
              placeholder={param ? store[param].name : "Full Name"}
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
              placeholder={param ? store[param].email : "Enter email"}
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
              placeholder={param ? store[param].phone : "Enter phone"}
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
              placeholder={param ? store[param].address : "Enter address"}
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

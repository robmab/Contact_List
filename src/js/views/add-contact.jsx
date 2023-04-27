import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/add-contact.css";

//include images into your bundle

//create your first component
export const AddContact = () => {
  const { store, actions } = useContext(Context);

  //pasar propiedades a traves de un link
  const location = useLocation();
  const data = location.state?.data;

  const formulary = (e) => {
    e.preventDefault();

    const contactData = {
      name: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value,
      address: e.target[3].value,
    };
    
    actions.addData(contactData);
    console.log(store);
  };

  return (
    <div className="wrapper-formulary">
      <h1>
        {data ? "Modify" : "Add a new"} {"contact"}
      </h1>
      <div className="form">
        <form onSubmit={formulary}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              aria-describedby="emailHelp"
              placeholder={data ? data.name : "Full Name"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder={data ? data.email : "Enter email"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              aria-describedby="emailHelp"
              placeholder={data ? data.phone : "Enter phone"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              aria-describedby="emailHelp"
              placeholder={data ? data.address : "Enter address"}
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

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";
//include images into your bundle
import { Contact } from "../component/contact.jsx";

//create your first component
export const Home = () => {
  const { store } = useContext(Context);

  const [contacts, setContacts] = useState(store);
  return (
    <div className="wrapper-home">
      <button type="button" className="btn btn-success">
        <Link to="add-contact">Add new contact</Link>
      </button>

      {contacts.map((x, y) => (
        <Contact
          key={y}
          name={x.name}
          email={x.email}
          phone={x.phone}
          address={x.address}
          gender={x.gender}
          img={x.img}
        />
      ))}
    </div>
  );
};

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";
//include images into your bundle
import { Contact } from "../component/contact.jsx";

//create your first component
export const Home = () => {
  const { store } = useContext(Context);

  const [contacts, setContacts] = useState(store.contactList);
  return (
    <div className="wrapper-home">
      <Link className="btn btn-success" to="add-contact">
        Add new contact
      </Link>

      {contacts.map((x, y) => (
        <Contact
          setContacts={setContacts}
          key={y}
          id={y}
          full_name={x.full_name}
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

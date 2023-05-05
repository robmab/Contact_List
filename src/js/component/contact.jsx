import React from "react";
import { Link } from "react-router-dom";

import "../../styles/contact.css";
import { Modal } from "./modal.jsx";

/* npm install --save @fortawesome/react-fontawesome */
/* npm install --save @fortawesome/free-solid-svg-icons */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneFlip,
  faEnvelope,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

//create your first component
export const Contact = (props) => {
  return (
    <li className="container-flex">
      <div id={props.idAPI} className="contact row">
        {/* CONTACT */}
        <div className="contact-left col-12 col-md-2">
          <img
            src={`https://randomuser.me/api/portraits/${
              props.gender != undefined ? props.gender : "men"
            }/${props.img != undefined ? props.img : "9"}.jpg`}
            alt=""
          />
        </div>
        <div className="contact-center col-12 col-md-8">
          <h1>{props.full_name}</h1>
          <div className="contact-content">
            <p>
              <FontAwesomeIcon icon={faLocationDot} />

              {props.address}
            </p>
            <p>
              <FontAwesomeIcon icon={faPhoneFlip} />
              {props.phone}
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              {props.email}
            </p>
          </div>
        </div>
        <div className="contact-rigth col-12 col-md-2">
          <div className="contact-actions">
            <Link to={`/add-contact/${props.id}`} /* state={{ data: props }} */>
              <FontAwesomeIcon icon={faPencil} />
            </Link>
            <a
              id={props.id}
              href=""
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + props.id}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </a>
          </div>
        </div>
        {/* CONTACT END*/}
        {/* MODAL */}
        <Modal id={props.id} setContacts={props.setContacts} />
      </div>
    </li>
  );
};

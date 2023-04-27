import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/contact.css";

import { Context } from "../store/appContext";

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
  const { state } = useContext(Context);
  

  return (
    <div id={props.id} className="contact">
      {/* CONTACT */}
      <div className="contact-left">
        <img
          src={`https://randomuser.me/api/portraits/${props.gender}/${props.img}.jpg`}
          alt=""
        />
      </div>
      <div className="contact-center">
        <h1>{props.name}</h1>
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
      <div className="contact-rigth">
        <Link to="/add-contact" state={{ data: props }}>
          <FontAwesomeIcon icon={faPencil} />
        </Link>
        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <FontAwesomeIcon icon={faTrashCan} />
        </a>
      </div>
      {/* CONTACT END*/}
      {/* MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              If you delete this thing the entire universe will go down!
            </div>
            <div className="modal-footer">
              <button
                type="button "
                className="btn btn-primary "
                data-bs-dismiss="modal"
              >
                Oh no!
              </button>
              <button type="button" className="btn btn-secondary ">
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL END*/}
    </div>
  );
};

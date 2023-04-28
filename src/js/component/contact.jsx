import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/contact.css";

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
  const { store, actions } = useContext(Context);

  const deleteContact = (e) => {
    actions.deleteData(Number(e.target.id));

    props.setContacts(store.contactList);
  };

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
      {/* CONTACT END*/}
      {/* MODAL */}
      <div
        className="modal fade"
        id={"exampleModal" + props.id}
        tabIndex="-1"
        aria-labelledby={"exampleModalLabel" + props.id}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={"exampleModalLabel" + props.id}
              >
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
              <button
                id={props.id}
                onClick={deleteContact}
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
              >
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

/* Para que el modal detecte el id del contacto al darle a borrar,
 es necesario que el identificador del propio modal sea único, 
 por lo que aprovechamos el id de props para asociarlo tanto a 
 aria-labelledby como al id del modal y asi que el modal sea único. */

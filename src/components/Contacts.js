import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import firebase from "../firebase";

const Contacts = (params) => {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  useEffect(() => {
    //'on' is for subscribing, to whenever ther is a change on value in contacts , we call callback function
    // so for every insert, delete, update
    firebase.child("contacts").on("value", (snapshot) => {
      //to get the values from contacts in DB we use .val
      if (snapshot.val() != null) {
        setContactObjects({
          ...snapshot.val(),
        });
      } else {
        setContactObjects({});
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      // 'contacts' just the name in database
      firebase.child("contacts").push(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    } else {
      // set overrites on this location
      firebase.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this idea")) {
      firebase.child(`contacts/${key}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setCurrentId("");
        }
      });
    }
  };

  const serialNumber = (id) => {
    let number = Object.keys(contactObjects).indexOf(id) + 1;
    return number;
  };

  return (
    <React.Fragment>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">NEW IDEAS</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <ContactForm {...{ addOrEdit, currentId, contactObjects }} />
        </div>
        <div className="col-md-9">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th>Nr.</th>
                <th>Date & time</th>
                <th>Idea name</th>
                <th>expectations</th>
                <th>Description</th>
                <th>Category</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{serialNumber(id)}</td>
                    <td>{contactObjects[id].dateAndTime}</td>
                    <td>{contactObjects[id].ideaName}</td>
                    <td>{contactObjects[id].expectations}</td>
                    <td>{contactObjects[id].description}</td>
                    <td>{contactObjects[id].category}</td>
                    <td>{contactObjects[id].rate}</td>

                    <td>
                      <a
                        className="btn text-primary"
                        onClick={() => {
                          setCurrentId(id);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </a>
                      <a
                        className="btn text-danger"
                        onClick={() => onDelete(id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contacts;

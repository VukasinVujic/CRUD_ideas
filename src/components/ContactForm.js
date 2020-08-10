import React, { useState, useEffect } from "react";
import moment from "moment";

const ContactForm = (props) => {
  const initialFieldValues = {
    dateAndTime: "",
    serialNumber: 0,
    ideaName: "",
    mobile: "",
    email: "",
    address: "",
  };
  var [values, setValues] = useState(initialFieldValues);

  var [number, setNumber] = useState(1);

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialFieldValues });
    } else {
      setValues({ ...props.contactObjects[props.currentId] });
    }
  }, [props.currentId, props.contactObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const currentDate = () => {
    let dateTime = moment().format("DD MMMM YYYY, h:mm:ss a");

    setValues({
      ...values,
      dateAndTime: dateTime,
    });
  };
  const serialNumber = () => {
    setValues({
      ...values,
      serialNumber: number,
    });
    setNumber(aaa(number));
  };
  const aaa = (number) => {
    return (number = number + 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      {/* just for the icon  */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-lightbulb"></i>
          </div>
        </div>
        <input
          required
          className="form-control"
          placeholder="Idea name"
          name="ideaName"
          value={values.ideaName}
          onChange={handleInputChange}
        />
      </div>
      {/* form-row just for another row */}
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-envelope "></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Address"
          name="address"
          value={values.address}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={props.currentId === "" ? "Save" : "Update"}
          onClick={(currentDate, serialNumber)}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;

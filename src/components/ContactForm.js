import React, { useState, useEffect } from "react";
import moment from "moment";

const ContactForm = (props) => {
  const initialFieldValues = {
    dateAndTime: "",
    serialNumber: 0,
    ideaName: "",
    description: "",
    expectations: "",
    category: "",
    rate: "",
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

  const currentDateAndSerialNumber = () => {
    let dateTime = moment().format("DD MMMM YYYY, h:mm:ss a");
    console.log(dateTime);

    setValues({
      ...values,
      dateAndTime: dateTime,
      serialNumber: number,
    });
    setNumber(getNumber(number));
  };
  const getNumber = (number) => {
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
        <textarea
          className="form-control"
          placeholder="expectations of idea"
          name="expectations"
          value={values.expectations}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-row" style={{ marginBottom: 5, marginTop: 5 }}>
        <textarea
          className="form-control"
          placeholder="Description of idea"
          name="description"
          value={values.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div className="form-row">
        <label>
          Chose the category:
          <select
            className="btn btn-primary dropdown-toggle"
            value={values.category}
            onChange={handleInputChange}
            name="category"
          >
            <option value="personalLife">Personal Life</option>
            <option value="job">Job</option>
            <option value="education">Education</option>
            <option value="travel">travel</option>
            <option value="other">other</option>
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          Rate the idea:
          <select
            className="btn btn-primary dropdown-toggle"
            value={values.rate}
            onChange={handleInputChange}
            name="rate"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
      </div>

      <div className="form-group">
        <input
          type="submit"
          value={props.currentId === "" ? "Save" : "Update"}
          onClick={currentDateAndSerialNumber}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;

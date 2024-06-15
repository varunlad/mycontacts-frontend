import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import "./createContact.scss";
import { myApis } from "../../Utilities/Apis";
import contactContex from "../../contex/ContactContes";

function CreateContacts(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const myContexContact = useContext(contactContex);

  // Regex patterns for validation
  const regexPatterns = {
    name: /^[a-zA-Z\s]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneNumber: /^\d{10}$/,
    companyName: /^[a-zA-Z\s]{3,30}$/,
  };

  const validate = (name, value) => {
    if (!regexPatterns[name].test(value)) {
      return `Invalid ${name}`;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  useEffect(() => {
    const formIsValid =
      Object.values(errors).every((error) => error === "") &&
      Object.values(formValues).every((value) => value !== "");
    setIsFormValid(formIsValid);
  }, [errors, formValues]);

  const handleCreateContact = () => {
    let req = {
      name: formValues.name,
      email: formValues.email,
      phone: formValues.phoneNumber,
      companyName: formValues.companyName,
    };
    let response = myApis.CreateContact(req);
    response.then((res) => {
      if (res.status.code === 200 || res.status.code === 201) {
        console.log("res.status.message", res.status.message);
        props.onHide(); // Hide the modal first
        setTimeout(() => {
          setToastMessage(res.status.message);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            setFormValues({
              name: "",
              email: "",
              phoneNumber: "",
              companyName: "",
            });
            myContexContact.updateNewContact(true);
          }, 3000);
        }, 500); // Display toast after 500ms
      } else {
        setToastMessage(res.status.message);
        setShowToast(true);
        setFormValues({
          name: "",
          email: "",
          phoneNumber: "",
          companyName: "",
        });
        console.log("res.status.message", res.status.message);
      }
    });
  };

  return (
    <>
      <Modal className="my_modal" {...props} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Contact
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <div className="my_container">
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  required
                />
                <label className="label">Name</label>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>
            <div className="col-md-8">
              <div className="my_container">
                <input
                  type="text"
                  className="input"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
                <label className="label">Email</label>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="my_container">
                <input
                  type="text"
                  className="input"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleChange}
                  required
                />
                <label className="label">Phone Number</label>
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="my_container">
                <input
                  type="text"
                  className="input"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleChange}
                  required
                />
                <label className="label">Company Name</label>
                {errors.companyName && (
                  <span className="error">{errors.companyName}</span>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleCreateContact}
            className={!isFormValid ? "my_button disable_me" : "my_button"}
            disabled={!isFormValid}
          >
            <p>Create</p>
          </button>
        </Modal.Footer>
      </Modal>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#28a745",
          color: "#fff",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
}

export default CreateContacts;

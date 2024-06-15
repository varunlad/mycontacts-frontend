import React, { useContext, useEffect, useState } from "react";
import { myApis } from "../Utilities/Apis";
import Toast from "react-bootstrap/Toast";
import contactContex from "../contex/ContactContes";

function ContactCard(props) {
  const [myCardData, setCardData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [phoneEdit, setPhoneEdit] = useState("");
  const [companyEdit, setCompanyEdit] = useState("");
  const [editErrors, setEditErrors] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const myContexContact = useContext(contactContex);

  const editRegexPatterns = {
    name: /^[a-zA-Z\s]{3,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{10}$/,
    company: /^[a-zA-Z\s]{3,30}$/,
  };

  const validateEdit = (name, value) => {
    if (!editRegexPatterns[name].test(value)) {
      return true;
    }
    return false;
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "nameEdit":
        setNameEdit(value);
        break;
      case "emailEdit":
        setEmailEdit(value);
        break;
      case "phoneEdit":
        setPhoneEdit(value);
        break;
      case "companyEdit":
        setCompanyEdit(value);
        break;
      default:
        break;
    }
    const error = validateEdit(name.replace("Edit", ""), value);
    setEditErrors((prevErrors) => ({
      ...prevErrors,
      [name.replace("Edit", "")]: error,
    }));
  };

  useEffect(() => {
    setCardData(props?.data);
  }, [props.data]);

  const handelUpdateData = async (updatedEmail) => {
    let req = {
      name: nameEdit,
      phone: phoneEdit,
      companyName: companyEdit,
    };
    try {
      let response = await myApis.UpdateContact(req, updatedEmail);
      if (response.status.code === 200 || response.status.code === 201) {
        setToastMessage(response.status.message);
        setShowToast(true);
        setShowToast(false);
        setNameEdit("");
        setCompanyEdit("");
        setPhoneEdit("");
        setIsEdit(false);
        myContexContact.updateNewContact(true);
      } else {
        setNameEdit("");
        setCompanyEdit("");
        setPhoneEdit("");
        setIsEdit(false);
        setToastMessage("Error while updating the contact");
        console.log("res.status.message", response.status.message);
      }
    } catch (error) {
      setToastMessage("An unexpected error occurred");
      console.log("Error:", error);
    }
    setShowToast(true);
  };

  const handleEdit = (data) => {
    setIsEdit(true);
    setEmailEdit(data.email);
    setNameEdit(data.name);
    setPhoneEdit(data.phone);
    setCompanyEdit(data.companyName);
  };

  const handelDeleteContact = async (email) =>{
   
    try {
      let response = await myApis.DeleteContact (email);
      if (response?.status?.code === 200) {
        setToastMessage(response.status.message);
        setShowToast(true);
        setShowToast(false);
        setNameEdit("");
        setCompanyEdit("");
        setPhoneEdit("");
        setIsEdit(false);
        myContexContact.updateNewContact(true);
      } else {
        setNameEdit("");
        setCompanyEdit("");
        setPhoneEdit("");
        setIsEdit(false);
        setToastMessage("Error while updating the contact");
        console.log("res.status.message", response.status.message);
      }
    } catch (error) {
      setToastMessage("An unexpected error occurred");
      console.log("Error:", error);
    }
    setShowToast(true);
  }

  return (
    <>
      <div className="card">
        <div className="top-section">
          <div className="border"></div>
          <div className="icons">
            <div className="logo">{myCardData?.name}</div>
            {!isEdit ? (
              <div className="social-media">
                <i
                  onClick={() => {
                    handelDeleteContact(myCardData?.email);
                  }}
                  className="bi bi-trash"
                  style={{ fontSize: 20, marginRight: 5, cursor: "pointer" }}
                ></i>
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    handleEdit(myCardData);
                  }}
                  style={{ fontSize: 20, cursor: "pointer" }}
                ></i>
              </div>
            ) : (
              <div className="social-media">
                <button
                  onClick={() => {
                    handelUpdateData(myCardData?.email);
                  }}
                  className={
                    editErrors.company ||
                    editErrors.email ||
                    editErrors.name ||
                    editErrors.phone
                      ? "opacity_false update_me"
                      : "update_me"
                  }
                >
                  update
                </button>
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  className="bi bi-x-lg"
                ></i>
              </div>
            )}
          </div>
          {emailEdit === myCardData?.email && isEdit && (
            <div className="edit_me">
              <div className="form__group field">
                <input
                  type="input"
                  className={
                    editErrors.name
                      ? "invalid_input form__field"
                      : "form__field"
                  }
                  placeholder="Name"
                  required=""
                  name="nameEdit"
                  value={nameEdit}
                  onChange={handleEditChange}
                />
                <label
                  className={
                    editErrors.name
                      ? "form__label invalid_input_lable "
                      : "form__label"
                  }
                >
                  Name
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className={
                    editErrors.phone
                      ? "invalid_input form__field"
                      : "form__field"
                  }
                  placeholder="Phone Number"
                  required=""
                  name="phoneEdit"
                  value={phoneEdit}
                  onChange={handleEditChange}
                />
                <label
                  className={
                    editErrors.phone
                      ? "form__label invalid_input_lable "
                      : "form__label"
                  }
                >
                  Phone Number
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className={
                    editErrors.company
                      ? "invalid_input form__field"
                      : "form__field"
                  }
                  placeholder="Company Name"
                  required=""
                  name="companyEdit"
                  value={companyEdit}
                  onChange={handleEditChange}
                />
                <label
                  className={
                    editErrors.company
                      ? "form__label invalid_input_lable "
                      : "form__label"
                  }
                >
                  Company Name
                </label>
              </div>
              {/* <div className="form__group field">
              <input
                type="input"
                className={
                  editErrors.email ? "invalid_input form__field" : "form__field"
                }
                placeholder="Email"
                required=""
                name="emailEdit"
                value={emailEdit}
                onChange={handleEditChange}
              />
              <label
                className={
                  editErrors.email
                    ? "form__label invalid_input_lable "
                    : "form__label"
                }
              >
                Email
              </label>
            </div> */}
            </div>
          )}
        </div>
        <div className="bottom-section">
          <span className="title">{myCardData?.companyName}</span>
          <div className="row row1">
            <div className="item">
              <span className="big-text">{myCardData?.phone}</span>
              <span className="regular-text">Phone number</span>
            </div>
            <div className="item">
              <span className="big-text">{myCardData?.email}</span>
              <span className="regular-text">Email </span>
            </div>
          </div>
        </div>
      </div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "absolute",
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

export default ContactCard;

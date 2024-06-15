import React, { useContext } from "react";
import ContactCard from "./ContactCard";
import "./contacts.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { myApis } from "../Utilities/Apis";
import MyLoader from "../shared/loader/MyLoader";
import contactContex from "../contex/ContactContes";

function Contacts() {
  const [cardData, setCardData] = useState([]);
  const [cardLoader, setCardLoader] = useState(true);
  const myContexContact = useContext(contactContex);

  useEffect(() => {
    GetMyCardData();
  }, [myContexContact.newContact === true]);
  useEffect(() => {
    GetMyCardData();
  }, []);
  const GetMyCardData = () => {
    const response = myApis.GetAllContacts();
    response.then((res) => {
      if (res.data.length > 0) {
        setCardData(res.data);
        setCardLoader(false);
        myContexContact.updateNewContact(false);
      } else {
        setCardData([]);
        setCardLoader(false);
      }
    });
  };
  return (
    <div className="container" style={{minHeight:"100vh"}}>
      <div className="row pb-3" style={{minHeight:"100vh"}}>
        {cardLoader ? (
          <MyLoader/>
        ) : cardData?.length > 0 ? (
          cardData?.map((ele, ind) => {
            return (
              <div key={ind} className="col-md-3 mt-5">
                <ContactCard data={ele} />
              </div>
            );
          })
        ) : (
          <div className="nodata">
            <MyLoader/>
            <p>No Contacts to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contacts;

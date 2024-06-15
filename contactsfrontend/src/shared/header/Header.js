import React from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import CreateContacts from "../createContacts.js/CreateContacts";

function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Navbar className="px-3 mb-3 mt-2" expand="lg">
        <Navbar.Brand style={{ color: "#ffffff" }}>Contact Book</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Form inline className="my-2 my-lg-0 mx-3">
            <FormControl
              type="search"
              placeholder="Search contacts"
              className="mr-sm-2"
              aria-label="Search"
            />
          </Form>
          <Button onClick={() => setModalShow(true)} className="mx-3">Create</Button>
        </Navbar.Collapse>
      </Navbar>
      <CreateContacts
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Header;

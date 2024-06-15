export const myApis = {
  GetAllContacts,
  CreateContact,
  UpdateContact,
  DeleteContact
};

function GetAllContacts() {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache", // 'Authorization': "Bearer " + token,
    }, //credentials: 'include', // body: JSON.stringify(req),
  };
  return fetch("http://localhost:5000/api/contacts/allContact", requestOptions)
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
function CreateContact(req) {
  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache", // 'Authorization': "Bearer " + token,
    }, //credentials: 'include',
    body: JSON.stringify(req),
  };
  return fetch(
    "http://localhost:5000/api/contacts/createContact", requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
function UpdateContact(req, updatedEmail) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache", // 'Authorization': "Bearer " + token,
    }, //credentials: 'include',
    body: JSON.stringify(req),
  };
  return fetch(
    "http://localhost:5000/api/contacts/updateContact/:id="+updatedEmail, requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
function DeleteContact(Email) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache", // 'Authorization': "Bearer " + token,
    }, //credentials: 'include',
    // body: JSON.stringify(req),
  };
  return fetch(
    "http://localhost:5000/api/contacts/deleteContact/:id="+Email, requestOptions
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}



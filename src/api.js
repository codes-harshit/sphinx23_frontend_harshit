import { Widgets } from "@mui/icons-material";
import { json } from "react-router-dom";
import { useSelector } from "react-redux";
import Session from "./Session";
import {
  events,
  passes,
  upcoming,
  completed,
  updates,
  loginReg,
  newEvent,
  newPass,
  adminEvents,
  loading,
} from "./store/modules/auth/auth.action";
import { queries } from "@testing-library/react";
const url = "http://localhost:8000";

export const fetchEvents = async (dispatch) => {
  console.log("Events Fetched");
  await fetch(`${url}/events`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(events(data.events));
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchAdminEvents = async (token, dispatch) => {
  console.log("AdminEvents Fetched");
  return fetch(`${url}/events/eventadmin`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      dispatch(adminEvents(data.events));
      return data.events;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchUpcoming = async (dispatch) => {
  console.log("upcoming Fetched");
  await fetch(`${url}/events/upcoming`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(upcoming(data.events));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchCompleted = async (dispatch) => {
  console.log("Completed Fetched");
  await fetch(`${url}/events/completed`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(completed(data.events));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchUpdates = async (dispatch) => {
  console.log("Updates Fetched");
  await fetch(`${url}/events/updates`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(updates(data.updates));
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchPasses = async (dispatch) => {
  console.log("Passes Fetched");
  await fetch(`${url}/passes`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(passes(data.pass));
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchOneEvent = async (setEvent, eventId) => {
  console.log("Event Fetched");
  await fetch(`${url}/events/${eventId}`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setEvent(data.event);
    })
    .catch((err) => {
      throw err;
    });
};
export const fetchOnePass = async (setPass, passId) => {
  console.log("Pass Fetched", passId);
  await fetch(`${url}/passes/${passId}`, {
    headers: {
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.pass);
      setPass(data.pass);
    })
    .catch((err) => {
      throw err;
    });
};
export const verifyMailOTP = async (body) => {
  console.log(Session.getObject("profile").token);
  console.log(body);
  await fetch(`${url}/verification/verifyEmailOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log(data);
        let profile = Session.getObject("profile");
        profile.profile = data.profile;
        console.log(profile);
        Session.setObject("profile", profile);
        Session.remove("time");
        return data.success;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
    });
};

export const verifyMobileOTP = async (body) => {
  console.log(Session.getObject("profile").token);
  console.log(body);
  await fetch(`${url}/verification/verifyMobileOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        console.log(data);
        let profile = Session.getObject("profile");
        profile.profile = data.profile;
        console.log(profile);
        Session.setObject("profile", profile);
        Session.remove("time");
        return data.success;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      console.log("ERROR");
      throw error;
      // window.location.href = "/";
      // console.log(error);
    });
};
export const sendMobileOTP = async (data) => {
  console.log(Session.getObject("profile").token);

  await fetch(`${url}/verification/sendMobileOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        Session.set("time", data.time);
        return data.time;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
    });
};
export const sendVerificationMail = async () => {
  console.log(Session.getObject("profile").token);

  await fetch(`${url}/verification/sendEmailOTP`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + Session.getObject("profile").token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        Session.set("time", data.time);
        return data.time;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
    });
};

export const loginRegister = async (dispatch, creds) => {
  console.log("Login Called");
  console.log(creds);
  await fetch(`${url}/users`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(creds),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        const profile = { token: data.token, profile: data.profile };
        console.log(data.success);
        dispatch(loginReg(profile));
        return data.success;
      }
      throw data;
    })
    .catch((error) => {
      throw error;
      // window.location.href = "/";
      // console.log(error);
    });
};

export const createEvent = async (dispatch, eventData, token) => {
  console.log("Create Event Called", token);
  await fetch(`${url}/events/create`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: eventData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.event);
        dispatch(newEvent(data.event));
        return data;
      } else {
        throw data;
        // return false;
      }
    })
    .catch((error) => {
      throw error;

      // return false;
    });
};

export const addTeamsToRound = async (token, body) => {
  console.log("Create PASS Called");
  // console.log(data.event);
  await fetch(`${url}/events/edit_result`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        // alert(data.success);
        window.location.href = "/eventDetails/event/" + body.event + "/2";
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const addResults = async (token, body) => {
  console.log("Add Results Called");
  await fetch(`${url}/events/add_result`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        // alert(data.success);
        window.location.href = "/eventDetails/event/" + body.event + "/2";
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const createPass = async (
  dispatch,
  passData,
  token,
  setCreateStatus
) => {
  console.log("Create PASS Called");
  await fetch(`${url}/passes`, {
    headers: {
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: passData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        // alert(data.success);
        return data.success;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      console.log("PAss", error);
      throw error;
    });
};
export const submitQueryResponse = async (token, body) => {
  console.log("getUsersByPass");
  await fetch(`${url}/queries/update`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // alert(data.message);
        return data;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getUsersByPass = async (
  passID,
  token,
  currentPage,
  setCurrentRecords,
  setNpage
) => {
  console.log("getUsersByPass");
  await fetch(`${url}/passes/users/${passID}/${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.users);
        setCurrentRecords(data.users);
        setNpage(data.totalPages);
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getResults = ({
  token,
  eventId,
  round,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  console.log("getUsersbyPage");
  fetch(`${url}/participant/results/${eventId}/${round}/${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        if (data.team) {
          setCurrentRecords(data.team);
          console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        }
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getQueriesByEvent = ({
  token,
  dispatch,
  tabActive,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  let status;
  if (tabActive == "Pending Complaints") {
    status = 0;
  } else if (tabActive == "Approved Complaints") {
    status = 1;
  } else {
    status = 2;
  }
  console.log("getUsersbyPage", token);
  fetch(`${url}/queries/eid/${currentPage}/${status}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.queries) {
        dispatch(loading(true));
        setCurrentRecords(data.queries);
        console.log(status, currentPage, data.queries);
        setNpage(data.totalPages);
        dispatch(loading(false));
        return data.totalPages;
      }
    })
    .catch((error) => {
      throw error;
    });
};
export const getUsers = ({
  token,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  console.log("getUsersbyPage");
  fetch(`${url}/users/${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        if (data.users) {
          setCurrentRecords(data.users);
          console.log(data.totalPages);
          setNpage(data.totalPages);
          return data.totalPages;
        }
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getAmbassadors = ({
  token,
  setCurrentRecords,
  currentPage,
  setNpage,
}) => {
  console.log("get ambassadors");
  fetch(`${url}/ambassadors/${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.success);
        console.log(data);

        setCurrentRecords(data.ambassador);
        setNpage(data.totalPages);
        return data.success;
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getPayments = (token, setPayments) => {
  console.log("getUsers");
  fetch(`${url}/payment/userby`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.message);
        setPayments(data.payments);
      }
    })
    .catch((error) => {
      setPayments([]);
      throw error;
    });
};

export const getUsersId = async (token, email, setIds) => {
  let userData = [];
  fetch(`${url}/users/validatemail/${email}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.id);
        // console.log(setIds);
        // console.log(setIds);
        setIds((prevState) => [...prevState, data.id]);
      }
    })
    .catch((error) => {
      throw error;
      // console.log(error);
    });
  // return userData;
};

export const updateEvent = async (
  eventId,
  eventData,
  token,
  setCreateStatus
) => {
  console.log("Update Event Called");
  console.log(eventData);
  await fetch(`${url}/events/update/${eventId}`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "PUT",
    body: JSON.stringify(eventData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data.success;
        // alert(data.success);
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
      // return false;
    });
};

export const updatePass = async (passId, passData, token) => {
  console.log("Update PASS Called");
  await fetch(`${url}/passes/${passId}`, {
    headers: {
      mode: "cors",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
    method: "PUT",
    body: JSON.stringify(passData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        return data.pass;
      } else {
        throw data;
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const getTeamsByEvent = async (
  eventId,
  token,
  currentPage,
  setCurrentRecords,
  setNpage
) => {
  let profile = Session.getObject("profile");
  console.log(eventId, profile.profile.token);
  await fetch(`${url}/participant/teams/${eventId}/${currentPage}`, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        setCurrentRecords(data.team);
        setNpage(data.totalPages);
      }
    })
    .catch((error) => {
      throw error;
    });
};

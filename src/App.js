import "./App.css";
import Navbar from "./screens/components/Navbar";
import { useEffect, useState } from "react";
import DashboardSuperAdmin from "./screens/containers/Dashboard/SuperAdmin/DashboardSuperAdmin";
import "./styles/footer.css";
import "./styles/desktop27.css";
import "./styles/deskr.css";
import "./styles/createEvent.css";
import {
  fetchEvents,
  fetchPasses,
  fetchUpcoming,
  fetchCompleted,
  fetchUpdates,
  loginRegister,
  createEvent,
  createPass,
  getUsersByPass,
  getUsers,
} from "./api";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./screens/components/Footer";
import PassDetail from "./screens/containers/Dashboard/SuperAdmin/Pass/PassDetail";
import CreatePass from "./screens/containers/Dashboard/SuperAdmin/Pass/createPass";
import EventDetails from "./screens/components/EventDetails/EventDetails";
import { Dashboard } from "@mui/icons-material";
import DashboardEventAdmin from "./screens/containers/Dashboard/EventAdmin/DashboardEventAdmin";

function App() {
  // const token1 =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjYzYjMwM2EyZGJhMGJlNWZlMDE1YTVmOSIsImlhdCI6MTY3MjY3NzI3Nn0.B6QG9trZX_tXQ_Bx3-hBMVn96Xz2I4vqzeeVSOT_VRc";
  const creds = {
    email: "2021uec1533@mnit.ac.in",
    password: "123456",
    confirmPassword: "123456",
  };
  const dispatch = useDispatch();
  // fetchEvents(dispatch);
  // loginRegister(dispatch, creds);

  useEffect(() => {
    // chandra();
    loginRegister(dispatch, creds);
    fetchEvents(dispatch);
    fetchPasses(dispatch);
    fetchUpcoming(dispatch);
    fetchCompleted(dispatch);
    // fetchUpdates(dispatch);
  }, []);

  const curruser = useSelector((state) => state.auth.curruser);
  // createEvent(dispatch, {}, {});
  // createPass(dispatch, {}, {});
  // console.log(getUsersByPass({}, {}));
  // console.log(getUsers("", token1));

  return (
    // <div className="App">
    //   <Navbar />
    //   {curruser != null ? <DashboardSuperAdmin /> : <></>}

    //   {/* <Footer /> */}

    // </div>
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {curruser != null ? (
          <Routes>
            <Route exact path="/" element={<DashboardEventAdmin />} />
            <Route path="/superAdmin/pass/:id" element={<PassDetail />}></Route>
            <Route
              path="/eventDetails/event/:id"
              element={<EventDetails />}
            ></Route>
            <Route
              path="/superAdmin/createPass"
              element={<CreatePass />}
            ></Route>
          </Routes>
        ) : (
          <></>
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

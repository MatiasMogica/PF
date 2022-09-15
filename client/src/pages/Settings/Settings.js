import NavBar from "../../components/NavBar";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import "./Settings.css";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

function Settings() {
  const [open, setOpen] = useState({ profile: false });

  return (
    <div>
      <NavBar></NavBar>

      <h1 id="settings_title">All Settings</h1>
      <div className="settings_general_container">
        <div className="h-divider">
          <div className="shadow"></div>
          <div className="text">
            <i
              className="i_settings_general"
              onClick={() => setOpen({ ...open, profile: !open.profile })}
              aria-controls="profile_settings_general_container_container"
              aria-expanded={open.profile}
            >
              Profile
            </i>
          </div>
        </div>
        <Collapse in={open.profile}>
          <div id="profile_settings_general_container_container">
            <ProfileSettings />
          </div>
        </Collapse>
        <div className="h-divider">
          <div className="shadow"></div>
          <div className="text">
            <i>Reviews</i>
          </div>
        </div>
        <br />
        Aca irian las opciones para poner reviews a los juegos??
        <div className="h-divider">
          <div className="shadow"></div>
          <div className="text">
            <i>Games</i>
          </div>
        </div>
        <br />
        Aca irian las opciones para poder revisar tus juegos???
        <div className="h-divider">
          <div className="shadow"></div>
          <div className="text">
            <i>ETC</i>
          </div>
        </div>
        <br />
        Aca irian las opciones para ETC???
      </div>
    </div>
  );
}

export default Settings;

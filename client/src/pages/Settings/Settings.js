import NavBar from "../../components/NavBar";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import "./Settings.css";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";
import FriendsSettings from "../../components/FriendsSettings/FriendsSettings";

function Settings() {
  const [open, setOpen] = useState({ profile: false, friends: false });

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
            <i
              className="i_settings_general"
              onClick={() => setOpen({ ...open, friends: !open.friends })}
              aria-controls="profile_settings_general_container_container"
              aria-expanded={open.profile}
            >
              Friends
            </i>
          </div>
        </div>
        <Collapse in={open.friends}>
          <div id="profile_settings_general_container_container">
            <FriendsSettings />
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default Settings;

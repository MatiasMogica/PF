import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendsImageAndID,
  cleanUpActionFriendSlice,
} from "../../redux/actions/friendActions";
import "./FriendsSettings.css";
import friendicon from "../../icons/friends.svg";
import addfriendicon from "../../icons/addfriends.svg";
//import blockedfriend from "../../icons/blockedfriend.svg";
import pendingFriendIcon from "../../icons/pendingFriendIcon.svg";
import Collapse from "react-bootstrap/Collapse";
import FriendsSettingsDiv from "../../components/Friends/Friends";
import BlockedFriendSettings from "../../components/BlockedFriendSettings/BlockedFriendSettings";
import SearchAndAddFriend from "../../components/SearchAndAddFriend/SearchAndAddFriend";
import PendingFriendRequests from "../PendingFriendRequests/PendingFriendRequests";
import { cleanUpActionProfileSlice } from "../../redux/actions/ProfileActions";

function FriendsSettings() {
  const dispatch = useDispatch();
  const yourUser = useSelector((state) => state.logIn.logIn);
  const [open, setOpen] = useState({
    friends: true,
    pendingFriends: false,
    blocked: false,
    addFriends: false,
  });
  useEffect(() => {
    dispatch(getFriendsImageAndID({ id: yourUser.id }));
  });

  useEffect(() => {
    return () => {
      dispatch(cleanUpActionFriendSlice());
      dispatch(cleanUpActionProfileSlice());
    };
  }, [dispatch]);

  return (
    <div id="friends_settings_container">
      <div id="friends_settings_sidebar">
        <h2>Friends</h2>
        <div className="friends_sidebar_settings_buttons_container">
          <div
            className="friends_sidebar_settings_buttons"
            onClick={() =>
              setOpen({
                friends: true,
                pendingFriends: false,
                blocked: false,
                addFriends: false,
              })
            }
          >
            <img
              src={friendicon}
              alt="friends"
              className="icon_friends_settings"
            ></img>
            <button className="side_bar_button_after_icon">Your Friends</button>
          </div>
          <div
            className="friends_sidebar_settings_buttons"
            onClick={() =>
              setOpen({
                friends: false,
                pendingFriends: false,
                blocked: false,
                addFriends: true,
              })
            }
          >
            <img
              src={addfriendicon}
              alt="add friends"
              className="icon_friends_settings"
            ></img>
            <button className="side_bar_button_after_icon">Add Friends</button>
          </div>
          <div
            className="friends_sidebar_settings_buttons"
            onClick={() =>
              setOpen({
                friends: false,
                pendingFriends: true,
                blocked: false,
                addFriends: false,
              })
            }
          >
            <img
              src={pendingFriendIcon}
              alt="pending friends"
              className="icon_friends_settings"
            ></img>
            <button className="side_bar_button_after_icon">
              Incoming Friend Requests
            </button>
          </div>
        </div>
      </div>
      <div id="jkhn42kj4">
        <Collapse in={open.friends} dimension="width">
          <div className="asd4sa4d4asd">
            <FriendsSettingsDiv />
          </div>
        </Collapse>
        <Collapse in={open.blocked} dimension="width">
          <div className="asd4sa4d4asd">
            <BlockedFriendSettings />
          </div>
        </Collapse>
        <Collapse in={open.addFriends} dimension="width">
          <div className="asd4sa4d4asd">
            <SearchAndAddFriend />
          </div>
        </Collapse>
        <Collapse in={open.pendingFriends} dimension="width">
          <div className="asd4sa4d4asd">
            <PendingFriendRequests />
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default FriendsSettings;

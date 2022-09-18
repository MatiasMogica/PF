import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IncomingRequestsGetData } from "../../redux/actions/friendActions";

function PendingFriendRequests() {
  const history = useHistory();
  const dispatch = useDispatch();
  const friendRequests = useSelector((state) => state.friend.incomingRequests);
  const [filterFriends, setFilterFriends] = useState(friendRequests);
  const yourUser = useSelector((state) => state.logIn.logIn);

  useEffect(() => {
    dispatch(IncomingRequestsGetData({ id: yourUser.id }));
  }, [dispatch, yourUser.id]);

  useEffect(() => {
    setFilterFriends(friendRequests);
  }, [friendRequests]);

  function handleChange(e) {
    if (e.target.value.length > 0) {
      setFilterFriends(
        filterFriends.filter((x) =>
          x[2].toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setFilterFriends(friendRequests);
    }
  }

  return (
    <div className="settings_your_friends_container">
      <div id="input_settings_your_friends_container">
        <input
          type="text"
          className="settings_profile_data_input"
          placeholder="Search Friend"
          onChange={(e) => handleChange(e)}
        ></input>
      </div>
      <div id="friends_list_settings">
        {friendRequests.length > 0
          ? filterFriends.length > 0
            ? filterFriends.map((x) => (
                <div key={x[0]} className="friend_individual_item">
                  <img
                    src={
                      x[1] ||
                      "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/"
                    }
                    alt="friend avatar"
                    className="friend_individual_avatar"
                  ></img>
                  <h3
                    onClick={() => history.push(`/profile/${x[0]}`)}
                    className="friend_name_and_redirect"
                  >
                    {x[2]}
                  </h3>
                </div>
              ))
            : "No friends whit that username found"
          : "No Pending Requests Found"}
      </div>
    </div>
  );
}

export default PendingFriendRequests;

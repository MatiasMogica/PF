import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchAndAddFriend.css";
import { searchUserInDatabase } from "../../redux/actions/friendActions";
import { useHistory } from "react-router-dom";

function SearchAndAddFriend() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const matches = useSelector((state) => state.friend.usersMatches);
  function handleChange(e) {
    setUsername(e.target.value);
  }
  return (
    <div className="settings_your_friends_container">
      <div className="kqwhne21">
        <input
          type="text"
          className="settings_profile_data_input"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        ></input>
        <button
          className="button-42"
          onClick={() =>
            dispatch(searchUserInDatabase({ usernameInput: username }))
          }
        >
          Search in database for user
        </button>
      </div>
      <div className="asd541asd">
        {matches.length > 0 ? (
          <div className="kasjdkalsjd">
            {matches.map((x) => (
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
            ))}
          </div>
        ) : (
          <div className="kasjdkalsjd"> "No user Found"</div>
        )}
      </div>
    </div>
  );
}

export default SearchAndAddFriend;
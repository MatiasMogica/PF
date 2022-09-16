import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleImage,
  changeImage,
  changeImageBackground,
  saveProfileConfig,
} from "../../redux/actions/NotReduxActions";
import { getProfileDetails } from "../../redux/actions/ProfileActions";
import ConfigOptionName from "./ConfigOptionName";
import ConfigOptionAge from "./ConfigOptionAge";
import ConfigOptionNationality from "./ConfigOptionNationality";
import ConfigOptionEmail from "./ConfigOptionEmail";
import "./ProfileSettings.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.logIn.logIn);
  const profile = useSelector((state) => state.profile.profileData);
  const [image, setImage] = useState(profile.image);
  const [imageBackground, setImageBackground] = useState(
    profile.backgroundImage
  );
  const [profileData, setProfileData] = useState({
    username: "Public",
    email: { value: "", edit: false, newEmail: "" },
    name: { value: "", visibility: "Public", edit: false },
    age: { value: "", visibility: "Public", edit: false },
    nationality: {
      value: {
        text: "Unknown",
        value: "??",
        image:
          "https://steamuserimages-a.akamaihd.net/ugc/875249057839988996/1D2881C5C9B3AD28A1D8852903A8F9E1FF45C2C8/",
      },
      visibility: "Public",
      edit: false,
    },
    friends: "Public",
    reviews: "Public",
    joined: "Public",
    games: "Public",
    posts: "Public",
    image: "Public",
    backgroundImage: "Public",
  });

  useEffect(() => {
    dispatch(getProfileDetails(user.id));
  }, [user.id, dispatch]);

  useEffect(() => {
    setProfileData({
      username: profile.profileVisibility[0],
      email: { value: profile.email, edit: false, newEmail: profile.email },
      name: {
        value: profile.name,
        visibility: profile.profileVisibility[1],
        edit: false,
      },
      age: {
        value: profile.age,
        visibility: profile.profileVisibility[2],
        edit: false,
      },
      nationality: {
        value: {
          text: profile.nationality[0],
          value: "??",
          image: profile.nationality[1],
        },
        visibility: profile.profileVisibility[3],
        edit: false,
      },
      friends: profile.profileVisibility[4],
      reviews: profile.profileVisibility[5],
      joined: profile.profileVisibility[6],
      games: profile.profileVisibility[7],
      posts: profile.profileVisibility[8],
      image: profile.profileVisibility[9],
      backgroundImage: profile.profileVisibility[10],
    });
  }, [profile]);

  useEffect(() => {
    if (image !== profile.image) {
      async function t() {
        await changeImage(image, user.id);
        dispatch(getProfileDetails(user.id));
      }
      t();
      NotificationManager.success("Profile Pic Modificated Correctly", "Saved");
    }

    if (imageBackground !== profile.backgroundImage) {
      async function t() {
        await changeImageBackground(imageBackground, user.id);
        dispatch(getProfileDetails(user.id));
      }
      t();
      NotificationManager.success("Background Modificated Correctly", "Saved");
    }
    //eslint-disable-next-line
  }, [image, imageBackground, dispatch]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: profileData.name.value,
      email: profileData.email.value,
      age: parseInt(profileData.age.value),
      nationality: [
        profileData.nationality.value.text,
        profileData.nationality.value.image,
      ],
      profileVisibility: [
        profileData.username,
        profileData.name.visibility,
        profileData.age.visibility,
        profileData.nationality.visibility,
        profileData.friends,
        profileData.reviews,
        profileData.joined,
        profileData.games,
        profileData.posts,
        profileData.image,
        profileData.backgroundImage,
      ],
    };

    const response = await saveProfileConfig(data, user.id);
    response === "Edited Correctly"
      ? NotificationManager.success("Profile Modificated Correctly", "Saved")
      : NotificationManager.error(
          "Error updating Profile, try againg",
          "Error"
        );
  }

  return (
    <div id="profile_settings_general_container">
      <form className="profile_settings_form" onSubmit={(e) => handleSubmit(e)}>
        <div className="configoption_edit">
          <p>Username: {profile.username}</p>
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                username:
                  profileData.username === "Public"
                    ? "Private"
                    : profileData.username === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.username}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>

        <ConfigOptionName
          key="name"
          setProfileData={setProfileData}
          profileData={profileData}
        />

        <ConfigOptionEmail
          key="email"
          setProfileData={setProfileData}
          profileData={profileData}
        />

        <ConfigOptionAge
          key="age"
          setProfileData={setProfileData}
          profileData={profileData}
        />

        <ConfigOptionNationality
          key="Nationality"
          setProfileData={setProfileData}
          profileData={profileData}
        />

        <div className="configoption_edit">
          <p>Friends</p>{" "}
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                friends:
                  profileData.friends === "Public"
                    ? "Private"
                    : profileData.friends === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.friends}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
        <div className="configoption_edit">
          <p>Reviews</p>{" "}
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                reviews:
                  profileData.reviews === "Public"
                    ? "Private"
                    : profileData.reviews === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.reviews}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
        <div className="configoption_edit">
          <p>You joined: {profile.createdAt}</p>
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                joined:
                  profileData.joined === "Public"
                    ? "Private"
                    : profileData.joined === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.joined}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
        <div className="configoption_edit">
          <p>Games</p>
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                games:
                  profileData.games === "Public"
                    ? "Private"
                    : profileData.games === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.games}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
        <div className="configoption_edit">
          <p>Posts</p>
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                posts:
                  profileData.posts === "Public"
                    ? "Private"
                    : profileData.posts === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.posts}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
        <div className="configoption_edit">
          <p>Image</p>
          <img
            src={profile.image}
            className="image_settings"
            alt="profile"
          ></img>
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                image:
                  profileData.image === "Public"
                    ? "Private"
                    : profileData.image === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.image}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
          <button className="icon-btn add-btn" type="button">
            <div className="add-icon"></div>
            <input
              className="deleteme_settings_photo"
              type="file"
              onChange={(e) => handleImage(e, setImage, image)}
            ></input>
            <div className="btn-txt">Add Photo</div>
          </button>
        </div>
        <div className="configoption_edit">
          <p>Profile Background Image</p>
          <img
            className="image_settings"
            src={
              profile.backgroundImage ||
              "https://i.ibb.co/470T9nR/backgroundimage.png"
            }
            alt="profile"
          ></img>
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                backgroundImage:
                  profileData.backgroundImage === "Public"
                    ? "Private"
                    : profileData.backgroundImage === "Private"
                    ? "Friends"
                    : "Public",
              })
            }
          >
            {profileData.backgroundImage}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
          <button className="icon-btn add-btn" type="button">
            <div className="add-icon"></div>
            <input
              className="deleteme_settings_photo"
              type="file"
              onChange={(e) =>
                handleImage(e, setImageBackground, imageBackground)
              }
            ></input>
            <div className="btn-txt">Add Photo</div>
          </button>
        </div>
        <div></div>
        <button className="btn_profile_setting_save">
          <span>Save changes</span>
          <i></i>
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
}

export default Settings;

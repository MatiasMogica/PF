function ConfigOptionAge(props) {
    const { setProfileData, profileData } = props;
  
    function handleChange(e) {
      if (e.target.value > 0 && e.target.value.length < 99)
        setProfileData({
          ...profileData,
          age: { ...profileData.age, value: e.target.value },
        });
    }
  
    return (
      <div className="configoption_edit">
        <p>
          Age:{" "}
          {profileData.age.edit ? (
            <input
              type="text"
              className="settings_profile_data_input"
              onChange={(e) => handleChange(e)}
              value={profileData.age.value}
            ></input>
          ) : profileData.age.value ? (
            profileData.age.value
          ) : (
            "Age not provided yet"
          )}
        </p>
        <div className="settings_two_btns_container">
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                age: {
                  ...profileData.age,
                  edit: profileData.age.edit ? false : true,
                },
              })
            }
          >
            {profileData.age.edit ? "Save" : "Edit"}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
          <button
            type="button"
            className="btn_profile_setting_visibility"
            onClick={() =>
              setProfileData({
                ...profileData,
                age: {
                  ...profileData.age,
                  visibility:
                    profileData.age.visibility === "Public"
                      ? "Private"
                      : profileData.age.visibility === "Private"
                      ? "Friends"
                      : "Public",
                },
              })
            }
          >
            {profileData.age.visibility}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
      </div>
    );
  }
  
  export default ConfigOptionAge;
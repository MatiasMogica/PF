function ConfigOptionName(props) {
    const { setProfileData, profileData } = props;
  
    function handleChange(e) {
      if (e.target.value.length >= 1 && e.target.value.length < 30)
        setProfileData({
          ...profileData,
          name: { ...profileData.name, value: e.target.value },
        });
    }
  
    return (
      <div className="configoption_edit">
        <p>
          Name:
          {profileData.name.edit ? (
            <input
              type="text"
              className="settings_profile_data_input"
              onChange={(e) => handleChange(e)}
              value={profileData.name.value}
            ></input>
          ) : (
            " " + profileData.name.value
          )}
        </p>
        <div className="settings_two_btns_container">
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                name: {
                  ...profileData.name,
                  edit: profileData.name.edit ? false : true,
                },
              })
            }
          >
            {profileData.name.edit ? "Save" : "Edit"}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
          <button
            type="button"
            className="btn_profile_setting_visibility"
            onClick={() =>
              setProfileData({
                ...profileData,
                name: {
                  ...profileData.name,
                  visibility:
                    profileData.name.visibility === "Public"
                      ? "Private"
                      : profileData.name.visibility === "Private"
                      ? "Friends"
                      : "Public",
                },
              })
            }
          >
            {profileData.name.visibility}
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        </div>
      </div>
    );
  }
  
  export default ConfigOptionName;
function ConfigOptionEmail(props) {
  const { setProfileData, profileData } = props;

  function handleChange(e) {
    setProfileData({
      ...profileData,
      email: {
        ...profileData.email,
        newEmail: e.target.value,
      },
    });
  }

  function handleTryChangeEmail(e) {
    if (
      //eslint-disable-next-line
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        profileData.email.newEmail
      )
    )
      setProfileData({
        ...profileData,
        email: {
          ...profileData.email,
          value: profileData.email.newEmail,
          edit: false,
        },
      });
  }

  return (
    <div className="configoption_edit">
      <p>
        Email:{" "}
        {profileData.email.edit ? (
          <input
            className="settings_profile_data_input"
            type="email"
            onChange={(e) => handleChange(e)}
            value={profileData.email.newEmail}
          ></input>
        ) : (
          profileData.email.value
        )}
      </p>
      <div className="settings_two_btns_container">
        {!profileData.email.edit ? (
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                email: {
                  ...profileData.email,
                  edit: profileData.email.edit ? false : true,
                },
              })
            }
          >
            Edit
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        ) : (
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() => handleTryChangeEmail()}
          >
            Save
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ConfigOptionEmail;

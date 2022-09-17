import { countries } from "./countryes";
import jSuites from "jsuites/dist/jsuites";
import { useEffect } from "react";
import "../../../node_modules/jsuites/dist/jsuites.css";

function ConfigOptionNationality(props) {
  const { setProfileData, profileData } = props;

  for (var i = 1; i < countries.length; i++) {
    countries[i].image =
      "https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/" +
      countries[i].value.toLowerCase() +
      ".svg";
  }

  useEffect(() => {
    function handleNationality(e) {
      const index =
        document.getElementsByClassName("jdropdown-selected")[0].indexValue;
      setProfileData({
        ...profileData,
        nationality: {
          ...profileData.nationality,
          edit: false,
          value: {
            text: countries[index].text,
            value: countries[index].value,
            image: countries[index].image,
          },
        },
      });
    }
    if (profileData.nationality.edit)
      jSuites.dropdown(document.getElementById("dropdown"), {
        data: countries,
        autocomplete: true,
        multiple: false,
        width: "280px",
        onchange: (e) => handleNationality(e),
      });
  }, [profileData, setProfileData]);

  return (
    <div className="configoption_edit">
      <p>
        Nationality:{" "}
        {profileData.nationality.edit ? (
          <div id="dropdown"></div>
        ) : (
          profileData.nationality.value.text
        )}
      </p>
      <div className="settings_two_btns_container">
        {!profileData.nationality.edit ? (
          <button
            className="btn_profile_setting_visibility"
            type="button"
            onClick={() =>
              setProfileData({
                ...profileData,
                nationality: {
                  ...profileData.nationality,
                  edit: profileData.nationality.edit ? false : true,
                },
              })
            }
          >
            Edit
            <span className="btnspan_profile_setting_visibility"></span>
          </button>
        ) : null}
        <button
          className="btn_profile_setting_visibility"
          type="button"
          onClick={() =>
            setProfileData({
              ...profileData,
              nationality: {
                ...profileData.nationality,
                visibility:
                  profileData.nationality.visibility === "Public"
                    ? "Private"
                    : profileData.nationality.visibility === "Private"
                    ? "Friends"
                    : "Public",
              },
            })
          }
        >
          {profileData.nationality.visibility}
          <span className="btnspan_profile_setting_visibility"></span>
        </button>
      </div>
    </div>
  );
}

export default ConfigOptionNationality;
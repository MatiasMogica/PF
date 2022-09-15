import { useState } from "react";
import NavBar from "../../components/NavBar/index";
import "./Contact.css";
import { sendContactEmail } from "../../redux/actions/NotReduxActions";

///Pueden usar el contact.response para los pop up o modelos o como se llamen

function Contact() {
  const [contact, setContact] = useState({
    name: { value: "", error: "Provide a name" },
    email: { value: "" },
    phone: { value: "" },
    message: { value: "", error: "At Least 15 characters in the message" },
    contactError: "Provide a phone or a email to contact you",
    response: "",
  });

  function handleMessage(e) {
    if (e.target.value.length > 15) {
      setContact({ ...contact, message: { value: e.target.value, error: "" } });
    } else {
      setContact({
        ...contact,
        message: { value: "", error: "At Least 15 characters in the message" },
      });
    }
  }

  function handleName(e) {
    if (e.target.value.length > 0) {
      setContact({ ...contact, name: { value: e.target.value, error: "" } });
    } else {
      setContact({
        ...contact,
        name: { value: "", error: "Provide a name" },
      });
    }
  }

  function handleContact(e) {
    if (e.target.id === "email") {
      if (
        //eslint-disable-next-line
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)
      ) {
        setContact({
          ...contact,
          contactError: "",
          email: { value: e.target.value },
        });
      } else if (contact.phone.value === "") {
        setContact({
          ...contact,
          contactError: "Provide a phone or a email to contact you",
          email: {
            value: "",
          },
        });
      } else {
        setContact({
          ...contact,
          email: {
            value: "",
          },
          contactError: "",
        });
      }
    }

    if (e.target.id === "phone") {
      if (e.target.value.length > 5) {
        setContact({
          ...contact,
          contactError: "",
          phone: { value: e.target.value },
        });
      } else if (contact.email.value === "") {
        setContact({
          ...contact,
          contactError: "Provide a phone or a email to contact you",
          phone: {
            value: "",
          },
        });
      } else {
        setContact({
          ...contact,
          contactError: "",
          phone: {
            value: "",
          },
        });
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      message: contact.message.value,
      senderName: contact.name.value,
      contactData: { phone: contact.phone.value, email: contact.email.value },
    };

    const response = await sendContactEmail(data);
    if (response.requestId) {
      setContact({
        name: { value: "", error: "Provide a name" },
        email: { value: "" },
        phone: { value: "" },
        message: { value: "", error: "At Least 15 characters in the message" },
        contactError: "Provide a phone or a email to contact you",
        response: "We will be contacting you shortly",
      });
      document.getElementById("input_1_contact").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("input_4_contact").value = "";
    } else {
      setContact({
        name: { value: "", error: "Provide a name" },
        email: { value: "" },
        phone: { value: "" },
        message: { value: "", error: "At Least 15 characters in the message" },
        contactError: "Provide a phone or a email to contact you",
        response:
          "There was an error, maybe try to contact us on our Social webs?",
      });
      document.getElementById("input_1_contact").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("input_4_contact").value = "";
    }
  }

  function submitButton(contact) {
    if (
      !contact.contactError &&
      !contact.name.error &&
      !contact.message.error
    ) {
      return <button className="btn-lrg submit-btn">Send Message</button>;
    } else {
      return (
        <div className="btn-lrg submit-btn">
          {!contact.contactError
            ? !contact.name.error
              ? contact.message.error
              : contact.name.error
            : contact.contactError}
        </div>
      );
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <h1 className="contact_h1">Contact Us</h1>
        </div>
        <div className="row">
          <h4 className="contact_h4">We'd love to hear from you!</h4>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row input-container">
            <div className="col-xs-12">
              <div className="styled-input wide">
                <input
                  type="text"
                  id="input_1_contact"
                  required
                  className="input_contact"
                  onChange={(e) => handleName(e)}
                />
                <label className="label_contact">Name</label>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="text"
                  className="input_contact"
                  onChange={(e) => handleContact(e)}
                  id="email"
                />
                <label>Email</label>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="styled-input">
                <input
                  type="text"
                  className="input_contact"
                  onChange={(e) => handleContact(e)}
                  id="phone"
                />
                <label>Phone Number</label>
              </div>
            </div>
            <div className="col-xs-12">
              <div className="styled-input wide">
                <textarea
                  id="input_4_contact"
                  required
                  className="textarea_contact"
                  onChange={(e) => handleMessage(e)}
                ></textarea>
                <label>Message</label>
              </div>
            </div>
            <div className="col-xs-12">{submitButton(contact)}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

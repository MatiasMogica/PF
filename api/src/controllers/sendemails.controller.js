// get from the Courier UI
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});

const sendContact = async (req, res) => {
  const { message, contactData, senderName } = req.body;
  try {
    const { requestId } = await courier.send({
      message: {
        to: {
          data: {
            name: "Contact-Form",
          },

          email: "videogames.zteam@gmail.com",
        },
        content: {
          title: `${senderName} wants to contact you`,
          body: `Message from ${senderName} send by the contact page of ZTeam
        -
        ${message}
        -
        The contact Information provided was:
        ${contactData.phone ? contactData.phone : "Phone not provided"}
        ${contactData.email ? contactData.email : "Email not provided"}
        `,
        },
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
    });
    res.status(200).json({ requestId });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  sendContact,
};

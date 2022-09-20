const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      require: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    purchasedGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    image: {
      type: String,
    },
    localStorageToken: {
      type: String,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
        wish_list: [
    {
              type: Schema.Types.ObjectId,
              ref: "Game",
            },
          ],
    friends: {
      type: Array,
    },
    age: {
      type: Number,
    },
    nationality: {
      type: Array,
    },
    posts: {
      type: Array,
    },
    //Basicamente esta variable determina si queres o no hacer datos publicos, cada item del array representa una key de User.
    // Public es publico Private es privado y Friends es solo amigos
    //[username, name, age ,nationality, friends, reviews, time of service, games, posts, image, backgroundImage] cada lugar corresponde a esa key
    profileVisibility: {
      type: Array,
      default: [
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
        "Public",
      ],
    },
    reviews: {
      type: Array,
    },
    backgroundImage: {
      type: String,
    },
    friendRequests: {
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.hashPassword;
  },
});

module.exports = model("User", userSchema);

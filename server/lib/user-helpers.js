"use strict";

const Chance = require("chance");
const chance = new Chance();

const md5 = require('md5');

const bcrypt = require("bcrypt");

module.exports = function makeUserHelpers(db) {
  return {
    createNewUser: (newUser, callback) => {
      const userName = newUser.firstName + " " + newUser.lastName;
      const userHandle = "@" + newUser.handle.split(" ").join("");
      const password = bcrypt.hashSync(newUser.pw, 10);

      const avatarUrlPrefix = `https://vanillicon.com/${md5(userHandle)}`;
      const avatars = {
        small:   `${avatarUrlPrefix}_50.png`,
        regular: `${avatarUrlPrefix}.png`,
        large:   `${avatarUrlPrefix}_200.png`
      };

      db.collection("users").insertOne({
        user: userName,
        handle: userHandle,
        avatars: avatars,
        password: password
      });
      callback(null, true);
    },

    getUser: (userName) => {
      return db.collection("users").findOne(userName);
    },

    generateRandomUser: () => {
      const gender    = chance.gender();
      const firstName = chance.first({gender: gender});
      const lastName  = chance.last();
      const userName  = firstName + " " + lastName;
  
      let userHandle = "@";
      if (Math.random() > 0.5) {
        let prefix    = chance.prefix({gender: gender});
        prefix = prefix.replace(".", "");
        userHandle += prefix
      }
  
      userHandle += lastName;
  
      if (Math.random() > 0.5) {
        const suffix = Math.round(Math.random() * 100);
        userHandle += suffix;
      }
  
      const avatarUrlPrefix = `https://vanillicon.com/${md5(userHandle)}`;
      const avatars = {
        small:   `${avatarUrlPrefix}_50.png`,
        regular: `${avatarUrlPrefix}.png`,
        large:   `${avatarUrlPrefix}_200.png`
      }
  
      return {
        name: userName,
        handle: userHandle,
        avatars: avatars
      };
    }
  };
}

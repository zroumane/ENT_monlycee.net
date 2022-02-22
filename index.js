import ENT from "./ent.js";
import "dotenv/config";

const client = new ENT();
await client.auth({
  id: process.env.ID,
  password: process.env.PASSWORD,
});

let users = await client.searchUsers("andrea");
users.forEach(async (user) => {
  let related = await client.getUser(user.id, true);
  console.log(user.profile, user.displayName, "Related :", related.join(", "));
});

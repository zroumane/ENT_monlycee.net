import ENT from "./ent.js";
import "dotenv/config";

const client = new ENT();
await client.auth({
  id: process.env.ID,
  password: process.env.PASSWORD,
});

let users = await client.searchUsers("zephyr");
console.log(users);
let user = await client.getUser("69ab57d1-eea9-42c1-8ccc-016095a54366");
console.log(user);

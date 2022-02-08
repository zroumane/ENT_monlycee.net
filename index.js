import ENT from "./ent.js";
import "dotenv/config";

const client = new ENT();
await client.auth({
  id: process.env.ID,
  password: process.env.PASSWORD,
});

let data = await client.searchUser("zephyr");
console.log(data);

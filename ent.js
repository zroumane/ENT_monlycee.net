import fetch from "node-fetch";

export default class ENT {
  constructor() {
    this.cookie = "";
  }

  async auth(credentials) {
    let response = await fetch("https://ent.iledefrance.fr/auth/login", {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: `email=${credentials.id}&password=${credentials.password}`,
      method: "POST",
      mode: "cors",
      redirect: "manual",
    });
    let text = await response.text();
    let cookie = response.headers
      .get("set-cookie")
      .replaceAll("Path=/", "")
      .replaceAll("Secure", "")
      .replaceAll("HTTPOnly", "")
      .replaceAll("SameSite=None", "")
      .replaceAll(";", "")
      .replaceAll(" ", "")
      .split(",");
    if (text.includes("Authentification") || cookie == null) {
      throw new Error("The authentification has failed.");
    } else this.cookie = cookie;
  }

  async parseResult(r) {
    const text = await r.text();
    try {
      const json = JSON.parse(text);
      if (json.error) throw new Error("Error in response : " + json.error);
      return json;
    } catch (err) {
      throw new Error("Did not receive JSON.");
    }
  }

  async get(url) {
    let r = await fetch("https://ent.iledefrance.fr/" + url, {
      headers: {
        cookie: this.cookie.join(";"),
      },
    });
    return await this.parseResult(r);
  }

  async post(url, body) {
    let r = await fetch("https://ent.iledefrance.fr/" + url, {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": this.cookie.find((c) => c.includes("XSRF-TOKEN")).split("=")[1],
        cookie: this.cookie.join(";"),
      },
      body: JSON.stringify(body),
    });
    return await this.parseResult(r);
  }

  async searchUser(query) {
    let data = await this.post("communication/visible", {
      search: query,
    });
    return data.users;
  }

  async getUser(id) {
    return;
  }
}

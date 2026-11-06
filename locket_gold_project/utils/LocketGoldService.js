class LocketGoldCTVService {
  constructor() {
    this.apiKey = "kg_sec_43d1718eadeb6a45";
    this.baseUrl = "https://locket.jayteam.click";
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`
    };
  }

  async lookupUser(username) {
    const response = await fetch(`${this.baseUrl}/api/v1/dns/lookup?username=${username}&api_key=${this.apiKey}`, {
      method: "GET"
    });
    return await response.json();
  }

  async activateGold(username) {
    const response = await fetch(`${this.baseUrl}/api/v1/ctv/activate`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ username: username, package_id: "lifetime" })
    });
    return await response.json();
  }
}

export default LocketGoldCTVService;

import http from "k6/http";
import { check } from "k6";
import { randomString } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export default function () {
  const baseUrl = "http://localhost:8000";
  const credentials = {
    username: `user-${randomString(10)}`,
    password: `pass-${randomString(10)}`
  };

  const body = JSON.stringify({
    ...credentials
  });

  const params = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  http.post(`${baseUrl}/user/register/`, body, params);
  let res = http.post(`${baseUrl}/auth/token/login/`, body, params);

  const accessToken = res.json().access;
  const authHeader = {
    Authorization: `Bearer ${accessToken}`
  };

  //! AUTH

  // POST
  const crocBody = {
    name: randomString(10),
    sex: "M",
    date_of_birth: "2000-01-01"
  };

  const myCroc = http.post(`${baseUrl}/my/crocodiles/`, crocBody, { headers: { ...authHeader } });
  const myCrocId = myCroc.json().id;

  // GET
  const getMyCroc = http.get(`${baseUrl}/my/crocodiles/${myCrocId}`, { headers: { ...authHeader } });
  check(getMyCroc, {
    "status is 200": (r) => r.status === 200,
    "croc id": (r) => r.json().id === myCrocId
  });
}

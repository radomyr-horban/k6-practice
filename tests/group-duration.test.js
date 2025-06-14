// k6 run tests/groups.test.js --summary-mode=full

import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    // http_req_duration: ["p(95)<200"],
    "group_duration{group:::Main page}": ["p(95)<5000"],
    "group_duration{group:::News page}": ["p(95)<3000"],
    "group_duration{group:::Main page::Assets}": ["p(95)<3000"]
  }
};

export default function () {
  group("Main page", () => {
    let res = http.get("https://run.mocky.io/v3/916a5065-b3bc-4710-9487-f66737305637?mocky-delay=2000ms");

    check(res, {
      "status is 200": (r) => r.status === 200
    });

    group("Assets", () => {
      http.get("https://run.mocky.io/v3/916a5065-b3bc-4710-9487-f66737305637?mocky-delay=1000ms");
      http.get("https://run.mocky.io/v3/916a5065-b3bc-4710-9487-f66737305637?mocky-delay=1000ms");
    });
  });

  group("News page", () => {
    http.get("https://run.mocky.io/v3/916a5065-b3bc-4710-9487-f66737305637?mocky-delay=2000ms");
  });

  sleep(1);
}

import http from "k6/http";
import { check, sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  stages: [
    // ramp-up (go up from 1 to 3 users in 10sec)
    {
      duration: "10s",
      target: 3
    },
    // main duration (stay with 3 users for 1 min)
    {
      duration: "40s",
      target: 3
    },
    // ramp-down (go down from 3 to 0 users in 10sec)
    {
      duration: "10s",
      target: 0
    }
  ]
};

export default function () {
  const getHomePage = http.get("https://quickpizza.grafana.com");
  check(getHomePage, {
    "status is 200": (r) => r.status === 200
  });
  sleep(randomIntBetween(1, 5));

  http.get("https://quickpizza.grafana.com/contacts.php");
  check(getHomePage, {
    "status is 200": (r) => r.status === 200
  });
  sleep(randomIntBetween(1, 5));

  http.get("https://quickpizza.grafana.com/news.php");
  check(getHomePage, {
    "status is 200": (r) => r.status === 200
  });
  sleep(randomIntBetween(1, 5));
}

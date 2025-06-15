import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

// Stress test should be run only after Load test (to check app performance uder heavier-than-ususal loads)
export const options = {
  stages: [
    // ramp-up (go up from 1 to 10 users in 10sec)
    {
      duration: "10s",
      target: 10
    },
    // main duration (add 10-20% above typical number of users)
    {
      duration: "30s",
      target: 10
    },
    // ramp-down (go down from 10 to 1 user in 10sec)
    {
      duration: "10s",
      target: 0
    }
  ]
};

export default function () {
  http.get("https://quickpizza.grafana.com");
  sleep(randomIntBetween(1, 5));

  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(randomIntBetween(1, 5));

  http.get("https://quickpizza.grafana.com/news.php");
  sleep(randomIntBetween(1, 5));
}

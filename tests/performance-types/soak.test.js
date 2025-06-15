import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  // basically, it's the same as load test, we just extend the duration period
  stages: [
    // ramp-up
    {
      duration: "30s",
      target: 100
    },
    // main duration
    {
      duration: "5min", // e.g., 8h
      target: 100
    },
    // ramp-down
    {
      duration: "30s",
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

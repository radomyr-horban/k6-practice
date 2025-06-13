import http from "k6/http";
import { sleep } from "k6";

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
  sleep(1);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    // ramp-up (go up from 1 to 10 users in 10sec)
    {
      duration: "10s",
      target: 10
    },
    // main duration (stay with 10 users for 1 min)
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
  sleep(1);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}

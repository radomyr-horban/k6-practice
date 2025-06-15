import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  vus: 1,
  duration: "10s"
};

export default function () {
  http.get("https://quickpizza.grafana.com");
  sleep(randomIntBetween(1, 5));

  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(randomIntBetween(1, 5));

  http.get("https://quickpizza.grafana.com/news.php");
  sleep(randomIntBetween(1, 5));
}

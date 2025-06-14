import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 1,
  duration: "10s"
};

export default function () {
  http.get("https://quickpizza.grafana.com");
  sleep(1);
  http.get("https://quickpizza.grafana.com/contacts.php");
  sleep(2);
  http.get("https://quickpizza.grafana.com/news.php");
  sleep(2);
}

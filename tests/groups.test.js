// k6 run tests/groups.test.js --summary-mode=full

import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<200"],
    "group_duration{group:::Main page}": ["p(95)<1000"],
    "group_duration{group:::Main page::Assets}": ["p(95)<1000"]
  }
};

export default function () {
  group("Main page", () => {
    let res = http.get("https://quickpizza.grafana.com/test.k6.io/");

    check(res, {
      "status is 200": (r) => r.status === 200
    });

    group("Assets", () => {
      http.get("https://quickpizza.grafana.com/test.k6.io/static/css/site.css");
      http.get("https://quickpizza.grafana.com/test.k6.io/static/favicon.ico");
    });
  });

  group("News page", () => {
    http.get("https://quickpizza.grafana.com/test.k6.io/news.php");
  });

  sleep(1);
}

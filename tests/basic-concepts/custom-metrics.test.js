import http from "k6/http";
import { sleep } from "k6";
import { Counter, Trend } from "k6/metrics";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<200"],
    my_counter: ["count>10 "],
    response_time_news_page: ["p(95)<150", "p(99)<200"] // p(99)<200 threshold is not displayed in the report, but we can still see if it pasees
  }
};

let myCounter = new Counter("my_counter");
let newsPageResponseTrend = new Trend("response_time_news_page");

export default function () {
  let res = http.get("https://quickpizza.grafana.com/test.k6.io/");
  myCounter.add(1);
  sleep(randomIntBetween(1, 5));

  res = http.get("https://quickpizza.grafana.com/news.php");
  newsPageResponseTrend.add(res.timings.duration);
  sleep(randomIntBetween(1, 5));
}

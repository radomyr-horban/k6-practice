import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_reqs: ["count>10"], // http requests number should be greater than 10
    checks: ["rate>=0.90"] // checks success rate should be greater than or equal 90%
  }
};

export default function () {
  const res = http.get("https://quickpizza.grafana.com/test.k6.io/" + (exec.scenario.iterationInTest === 1 ? "foo" : ""));

  check(res, {
    "status is 200": (r) => r.status === 200,
    "page is home page": (r) => r.body.includes("QuickPizza Legacy")
  });
  sleep(2);
}

import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_duration: ["p(95)<200"],

    http_errors: ["count==0"],
    "http_errors{ page: order }": ["count==0"],

    "http_req_duration{ status: 200 }": ["p(95)<200"],
    "http_req_duration{ page: order }": ["p(95)<500"], // custom tag

    checks: ["rate>=0.99"],
    "checks{ page: order }": ["rate>=0.99"]
  }
};

let httpErrors = new Counter("http_errors");

export default function () {
  let res = http.get("https://run.mocky.io/v3/820a7cad-df21-4bed-acc4-691c903fc3b7");

  if (res.err) {
    httpErrors.add(1);
  }

  check(res, {
    "status is 200": (r) => r.status === 200
  });

  // Submit order
  res = http.get("https://run.mocky.io/v3/916a5065-b3bc-4710-9487-f66737305637?mocky-delay=400ms", {
    tags: { page: "order" } // custom tag
  });

  if (res.err) {
    httpErrors.add(1, { page: "order" });
  }

  check(
    res,
    {
      "status is 201": (r) => r.status === 201
    },
    { page: "order" }
  );

  sleep(1);
}

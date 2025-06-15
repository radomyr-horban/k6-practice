import http from "k6/http";
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export const options = {
  stages: [
    // sudden spike
    {
      duration: "10s",
      target: 100
    },
    // scale back
    {
      duration: "10s",
      target: 0
    }
  ]
};

export default function () {
  http.get("https://quickpizza.grafana.com");
  sleep(randomIntBetween(1, 5));
}

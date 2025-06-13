import http from "k6/http";
import { sleep } from "k6";

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
  sleep(1);
}

import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    // some conditions that the app will not be able to handle and will crash under them
    {
      duration: "1h",
      target: 1000
    }
  ]
};

export default function () {
  http.get("https://quickpizza.grafana.com");
  sleep(1);
}

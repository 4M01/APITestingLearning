import { test, expect } from "@playwright/test";

test("GET booking summary", async ({ request }) => {
  const URL = process.env.URL + "booking/summary?roomid=1";
  console.log("URL => " + URL);
  const response = await request.get(URL
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(JSON.stringify(body));
});

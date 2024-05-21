import { test, expect } from "@playwright/test";

test("GET booking summary", async ({ request }) => {
  const response = await request.get("booking/summary?roomid=1"
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.bookings.length).toBeGreaterThanOrEqual(1);
  expect(isValidDate(body.bookings[0].bookingDates.checkin)).toBe(true);
  expect(isValidDate(body.bookings[0].bookingDates.checkout)).toBe(true);

});
function isValidDate(date: string): any {
  if (Date.parse(date)) {
    return true;
  } else {
    return false;
  }
}


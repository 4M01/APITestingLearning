import { test, expect } from "@playwright/test";


test.describe("booking/ GET requests", async () => {
  const savedToken = "aNhjQgGCITFfkYg9";


  test("GET booking summary", async ({ request }) => {
    const response = await request.get("booking/summary?roomid=1"
    );

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(isValidDate(body.bookings[0].bookingDates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingDates.checkout)).toBe(true);

  });


  test("GET all bookings with details", async ({ request }) => {
    const response = await request.get("booking/", {
      headers: { cookie: `token=${savedToken}` },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookings.length).toBeGreaterThanOrEqual(1);
    expect(body.bookings[0].bookingid).toBe(1);
    expect(body.bookings[0].roomid).toBe(1);
    expect(body.bookings[0].firstname).toBe("James");
    expect(body.bookings[0].lastname).toBe("Dean");
    expect(body.bookings[0].depositpaid).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookings[0].bookingdates.checkout)).toBe(true);
  });

  test("GET booking by id with details", async ({ request }) => {
    const response = await request.get("booking/1", {
      headers: { cookie: `token=${savedToken}` },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookingid).toBe(1);
    expect(body.roomid).toBe(1);
    expect(body.firstname).toBe("James");
    expect(body.lastname).toBe("Dean");
    expect(body.depositpaid).toBe(true);
    expect(isValidDate(body.bookingdates.checkin)).toBe(true);
    expect(isValidDate(body.bookingdates.checkout)).toBe(true);
  });

});


export function isValidDate(date: string): any {
  if (Date.parse(date)) {
    return true;
  } else {
    return false;
  }
}


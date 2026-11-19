import { test, expect } from "@playwright/test";
import { DatesFormatter } from "../utils/dateFormatter";

test("diff date format", async ({ page }) => {
  const dateformat  = new DatesFormatter()
  console.log(dateformat.getDate("dd-MMM-yyyy", -20))
});

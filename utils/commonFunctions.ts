import { Page, Locator } from "@playwright/test";

export class commonFunctions {
  // function check if both array is same return true else false
  static compareTwoArry(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const isEqual = arr1.every((value, index) => value === arr2[index]);
    return isEqual;
  }

  // funcytion any option from dropdown dropdown based on locators and visible text as arguments
  static async SelectAnyDropdownOptionBasedOnLabel(
    locator: Locator,
    option: string,
  ) {
    await locator.selectOption({ label: option });
  }
}

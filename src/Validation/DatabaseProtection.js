import { authentication } from "../Firebase";
import { COOLDOWN, COOLDOWN_MARGIN } from "Constants/Constants";

// return error reason, else false
export const validateDocument = (document) => {
  if (authentication.currentUser.uid == null) {
    console.log("you are not logged in");
    return "You are not logged in";
  }
  if (document != null) {
    // always want to print when not reach cooldown
    // ok to print when not reached cooldown yet
    const remainingTime = document.latestWrite.seconds + COOLDOWN - Date.now() / 1000;
    if (remainingTime > 0 - COOLDOWN_MARGIN) {
      console.log("You are editing your portfolio too often, wait " + Math.ceil(remainingTime + 1) + " seconds");
      return "You are editing your portfolio too often, wait " + Math.ceil(remainingTime + 1) + " seconds";
    }
  }
  return false;
};

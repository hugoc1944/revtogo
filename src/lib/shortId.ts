import crypto from "crypto";

/**
 * Generates a short, human-friendly, URL-safe ID
 * Example: RTG-A9F3KQ
 */
export function generatePlateShortId() {
  const random = crypto
    .randomBytes(4)
    .toString("base64")      // valid encoding
    .replace(/[^A-Z0-9]/gi, "") // remove non-alphanumerics
    .toUpperCase()
    .slice(0, 6);

  return `RTG-${random}`;
}

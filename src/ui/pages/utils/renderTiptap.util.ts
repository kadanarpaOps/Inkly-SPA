import { generateHTML, generateText, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [ StarterKit ];

/**
 * Method 1: Converts Tiptap JSON into raw string content
 * @param {Object} jsonDoc - The Tiptap JSON object
 * @returns {string} Raw String
 */
export const renderWithoutFormat = (jsonDoc: JSONContent) => {
  if (!jsonDoc) return "";
  try {
    return generateText(jsonDoc, extensions);
  } catch (error) {
    console.error("Error rendering TipTap Text: ", error);
    return '';
  }
}

/**
 * Method 2: Converts Tiptap JSON into HTML Formatted content
 * @param {Object} jsonDoc - The Tiptap JSON object
 * @returns {string} Raw String
 */
export const renderWithFormat = (jsonDoc: JSONContent) => {
  if (!jsonDoc) return "";
  try {
    return generateHTML(jsonDoc, extensions);
  } catch (error) {
    console.error("Error rendering TipTap Html: ", error);
    return '';
  }
}

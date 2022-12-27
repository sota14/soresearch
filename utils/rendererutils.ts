import { createContext } from "react";
import { AnnotationType, RichTextType } from "../types/types";
import {tomorrowNightBright} from "react-syntax-highlighter/dist/cjs/styles/hljs"

export function annotationToClassName(
  annotations: AnnotationType,
  prefix?: string
) {
  const classNames = [];
  if (annotations.bold) classNames.push(`${prefix}-bold`);
  if (annotations.code) classNames.push(`${prefix}-inline-code`);
  if (annotations.italic) classNames.push(`${prefix}-italic`);
  if (annotations.strikethrough) classNames.push(`${prefix}-trikethrough`);
  if (annotations.underline) classNames.push(`${prefix}-underline`);
  if (annotations.color !== "default")
    classNames.push(`${prefix}-color-${annotations.color}`);
  return classNames.join(" ");
}

export const Context = createContext({
  prefix: "nbr",
  blockPrefix: "block",
  blocksPrefix: "blocks",
  isCodeHighlighter: false,
  syntaxHighlighterCSS: tomorrowNightBright,
});

/**
 *
 * @param richTextArr - array of rich_text objects
 * @returns joined text
 */
export const getJoinedRichText = (richTextArr: RichTextType[]): string => {
  const textArr = richTextArr.map((richText: any) => richText.plain_text);
  return textArr.join("");
};

/** config ------------------------------------------------------- */
/**
 * code block styles of react-syntax-highlighter
 */
//  import {
//     tomorrowNightBright,
//     monokaiSublime,
//     irBlack,
//     monokai,
//   } from "react-syntax-highlighter/dist/cjs/styles/hljs";
  

export const PREFIX = "nbr";
export const BLOCK_PREFIX = "block";
export const BLOCKS_PREFIX = "blocks";
export const IS_NEXTJS = false;
export const IS_CODE_HIGHLIGHTER = false;
export const SYNTAX_HIGHLIGHTER_CSS = tomorrowNightBright;
  
import { PageType, RichTextType } from "../types/types";
import Image from "next/image";

export const getText = (richTextArr: RichTextType[]) => {
  try {
    const textArr = richTextArr.map((richText) => richText.plain_text);
    return textArr.join("");
  } catch (err) {
    // console.error(err)
  }
  return "";
};

export const getCover = (cover: PageType["cover"]) => {
  if (cover && cover.file) return cover.file.url;
  if (cover && cover.external) return cover.external.url;
  return "/noimage.png";
};

export const getLocalImage = (slug: RichTextType[]) => {
  const txt = getText(slug);
  return `/works/${txt}.jpg`;
};

export const getDate = (date: { start: string }) => {
  try {
    const d = new Date(date.start);
    const formatted = `
${d.getFullYear()}.
${d.getMonth() + 1}.
${d.getDate()}
`.replace(/\n|\r/g, "");
    return formatted;
  } catch (err) {
    // console.error(err)
  }
  return "-";
};

export const getYearMonth = (date: { start: string }) => {
  try {
    const d = new Date(date.start);
    const formatted = `
${d.getFullYear()}.
${d.getMonth() + 1}
`.replace(/\n|\r/g, "");
    return formatted;
  } catch (err) {
    // console.error(err)
  }
  return "-";
};

export const getYear = (date: { start: string }) => {
  try {
    return new Date(date.start).getFullYear().toString();
  } catch (err) {
    // console.error(err)
  }
  return "-";
};

export const getMultiSelect = (multiSelect: [{ name: string }]) => {
  try {
    return multiSelect.map((tag) => tag.name);
  } catch (err) {
    // console.error(err)
  }
  return [];
};

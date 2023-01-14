import { ParsedUrlQuery } from "querystring";
import { ReactNode, Dispatch, SetStateAction } from "react";
// import { BlockType } from "notion-block-renderer";

export type LayoutProps = {
  children: ReactNode;
};

// export type WorkDetailProps = {
//   slug: string;
//   name: string;
//   author: string;
//   cover: string;
//   published: string;
//   tags: string[];
//   content: string;
// };

export type CardProps = { page: PageType };
export type WorkDetailProps = {
  page: PageType;
  blocks: BlockType[];
  pageId: string;
  recommends: PageType[];
};
export type ArticleProps = {
  page: PageType;
  blocks: BlockType[];
  pageId: string;
  recommends: PageType[];
};
export type ArticleMetaProps = CardProps;
export type ChildBlocksProps = { blockId: string };

export type IndexProps = {
  pages: PageType[];
  nextCur: string;
  recommends: PageType[];
};

export type BlockProps = { block: BlockType };

export type TocProps = {
  blocks: BlockType[];
  showToc: boolean;
  setShowToc: Dispatch<SetStateAction<boolean>>;
};

export type Params = ParsedUrlQuery & {
  slug?: string;
  tags?: string;
  nextCur?: string;
  // pageId: string;
};

export type FileType = {
  file?: { url: string };
  external?: { url: string };
};

export type AnnotationType = {
  bold: boolean;
  code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
};

export type RichTextType = {
  plain_text: string;
  href: string | null;
  annotations: AnnotationType;
};

export type PropertyType = {
  name: { title: RichTextType[] };
  author: { rich_text: RichTextType[] };
  slug: { rich_text: RichTextType[] };
  published: { date: { start: string } };
  workDate: { date: { start: string } };
  isPublic: { checkbox: boolean };
  tags: { multi_select: [{ name: string }] };
};

export type PageType = {
  id: string;
  cover: FileType | null;
  // properties: Record<string, any>;
  properties: PropertyType;
};

//renderer----------------------------------------------
// import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints.d";

export enum AnnotationEnum {
  bold = "bold",
  code = "code",
  italic = "italic",
  underline = "underline",
  color = "color",
}

// https://developers.notion.com/reference/block
export enum BlockEnum {
  paragraph = "paragraph",
  heading_1 = "heading_1",
  heading_2 = "heading_2",
  heading_3 = "heading_3",
  callout = "callout",
  quote = "quote",
  bulleted_list_item = "bulleted_list_item",
  numbered_list_item = "numbered_list_item",
  code = "code",
  image = "image",
  video = "video",

  //   to_do = "to_do",
  toggle = "toggle",
  //   child_page = "child_page",
  //   child_database = "child_database",
  embed = "embed",
  //   file = "file",
  //   pdf = "pdf",
  //   bookmark = "bookmark",
  //   equation = "equation",
  divider = "divider",
  //   table_of_contents = "table_of_contents",
  //   link_to_page = "link_to_page",
  //   table = "table",
}
export enum BlockListEnum {
  bulleted_list_item = BlockEnum.bulleted_list_item,
  numbered_list_item = BlockEnum.numbered_list_item,
}

type TextBlockType = {
  color: string;
  rich_text: RichTextType[];
  is_toggleable: boolean;
};

type CodeBlockType = {
  rich_text: RichTextType[];
  caption: RichTextType[];
  language: string;
};

export type FileBlockType = {
  caption: RichTextType[];
  external: {
    url: string;
  };
  file: {
    expiry_time?: string;
    url: string;
  };
  type: string;
};

type CalloutBlockType = {
  color: string;
  icon: {
    emoji: string;
  };
  rich_text: RichTextType[];
  children: BlockType[];
};

type DividerBlockType = {};

type ToggleBlockType = {
  rich_text: RichTextType[];
  color: string;
  children: BlockType[];
};

type EmbedBlockType = {
  caption: string[];
  url: string;
};

// type ImageBlockType = {
//   caption: RichTextType[];
//   file: {
//     expiry_time?: string;
//     url: string;
//   };
//   type: string;
// };

export type BlockTypeName =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "code"
  | "image"
  | "video"
  | "callout"
  | "quote"
  | "divider"
  | "toggle"
  | "embed"
  | "bulleted_list_item"
  | "numbered_list_item";

type BaseBlock = {
  id: string;
  object: string;
  parent: any;
  created_time: any;
  last_edited_time: any;
  created_by: any;
  last_edited_by: any;
  has_children: boolean;
  archived: boolean;
  childBlock: BlockType[];
};

type Paragraph = BaseBlock & { type: "paragraph"; paragraph: TextBlockType };
export type Heading1 = BaseBlock & {
  type: "heading_1";
  heading_1: TextBlockType;
};
export type Heading2 = BaseBlock & {
  type: "heading_2";
  heading_2: TextBlockType;
};
export type Heading3 = BaseBlock & {
  type: "heading_3";
  heading_3: TextBlockType;
};
type TableOfContents = BaseBlock & {
  type: "table_of_contents";
  table_of_contents: { color: string };
};
type Code = BaseBlock & { type: "code"; code: CodeBlockType };
type Image = BaseBlock & { type: "image"; image: FileBlockType };
type Video = BaseBlock & { type: "video"; video: FileBlockType };
type Callout = BaseBlock & { type: "callout"; callout: CalloutBlockType };
type Quote = BaseBlock & { type: "quote"; quote: TextBlockType };
type BulletedListItem = BaseBlock & {
  type: "bulleted_list_item";
  bulleted_list_item: TextBlockType;
};
type NumberedListItem = BaseBlock & {
  type: "numbered_list_item";
  numbered_list_item: TextBlockType;
};
type Divider = BaseBlock & { type: "divider"; divider: DividerBlockType };
type Toggle = BaseBlock & { type: "toggle"; toggle: ToggleBlockType };
type Embed = BaseBlock & { type: "embed"; embed: EmbedBlockType };

export type BlockType =
  | Paragraph
  | Heading1
  | Heading2
  | Heading3
  | TableOfContents
  | Code
  | Image
  | Video
  | Callout
  | Toggle
  | Embed
  | Quote
  | BulletedListItem
  | NumberedListItem
  | Divider;

//------------------------------------------------------
// import type { GetPageResponse } from "@notionhq/client/build/src/api-endpoints.d";

export type RenderBlockProps = {
  block: BlockType;
  prefix?: string;
  blockPrefix?: string;
  blocksPrefix?: string;
  isCodeHighlighter?: boolean;
  syntaxHighlighterCSS?: {
    [key: string]: React.CSSProperties;
  };
};

export type RenderBlocksProps = Omit<RenderBlockProps, "block"> & {
  blocks: BlockType[];
};

export type TextProps = {
  richTextArr: any;
  isCaption?: boolean;
};

// export type FileProps = {
//   url: string;
// };
// export type ImageProps = {
//   url: string;
// };

export type CodeProps = {
  lang: string;
  richTextArr: RichTextType[];
};

export type BlockListProps = {
  blockType: string;
  children: JSX.Element[];
};

export type FileBlockProps = {
  block: FileBlockType;
};

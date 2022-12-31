import { Client } from "@notionhq/client";
import { BlockType } from "../types/types";
import { useRouter } from "next/router";

const notion = new Client({ auth: process.env.NOTION_KEY as string });
const DATABASE_WORKS_ID = process.env.NOTION_DATABASE_WORKS_ID as string;
const DATABASE_BLOG_ID = process.env.NOTION_DATABASE_BLOG_ID as string;

export const fetchPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug,
      },
    });
  }

  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_WORKS_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  });
};

export const searchPages = async ({
  keyword,
}: {
  keyword?: string | string[];
}) => {
  console.log("executeSearchPages");
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (keyword) {
    and.push({
      or: [
        {
          property: "name",
          title: {
            contains: keyword,
          },
        },
        {
          property: "tags",
          multi_select: {
            contains: keyword,
          },
        },
        {
          property: "slug",
          rich_text: {
            contains: keyword,
          },
        },
      ],
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_WORKS_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  });
};

export const fetchAllBlocksByPageId: (pageId: string) => Promise<{
  results: BlockType[];
}> = async (pageId: string) => {
  const data = [];
  let cursor = undefined;
  try {
    while (true) {
      const { results, next_cursor }: any = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
      });

      for (const block of results) {
        if ("type" in block) {
          if (block.has_children) {
            const childBlock: BlockType[] = (
              await fetchAllBlocksByPageId(block.id).then()
            ).results;
            console.log("childBlock");
            console.log(childBlock);
            data.push({ ...block, childBlock });
          } else {
            data.push(block);
          }
        } else {
          data.push(block);
        }
      }
      if (!next_cursor) break;
      cursor = next_cursor;
    }
  } catch (e) {}
  return { results: data };
};

export const fetchPageByPageId = async (pageId: string) => {
  console.log("fetchPageByPageId");
  console.log(pageId);
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
  return response;
};

export const fetchBlogPages = async ({
  slug,
  tag,
}: {
  slug?: string;
  tag?: string;
}) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (slug) {
    and.push({
      property: "slug",
      rich_text: {
        equals: slug,
      },
    });
  }

  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }

  return await notion.databases.query({
    database_id: DATABASE_BLOG_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
  });
};

export const fetchBlogReccomends = async ({
  tag,
  tags,
}: {
  tag?: string;
  tags?: string[];
}) => {
  const and: any = [
    {
      property: "isPublic",
      checkbox: {
        equals: true,
      },
    },
    {
      property: "slug",
      rich_text: {
        is_not_empty: true,
      },
    },
    {
      property: "reccomend",
      checkbox: {
        equals: true,
      },
    },
  ];

  if (tag) {
    and.push({
      property: "tags",
      multi_select: {
        contains: tag,
      },
    });
  }

  if (tags) {
    const or: any = [{}];
    tags.forEach((tag) => {
      or.push({
        property: "tags",
        multi_select: {
          contains: tag,
        },
      });
    });
    and.push({ or: or });
  }

  return await notion.databases.query({
    database_id: DATABASE_BLOG_ID,
    filter: {
      and: and,
    },
    sorts: [
      {
        property: "published",
        direction: "descending",
      },
    ],
    page_size: 12,
  });
};

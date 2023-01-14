import { FC } from "react";
import CodeRenderer from "./CodeRenderer";
import ImageRenderer from "./ImageRenderer";
import TextRenderer from "./TextRenderer";
import { useContext } from "react";
import { Context } from "../../utils/rendererutils";
import VideoRenderer from "./VideoRenderer";
import { BlockProps, BlockType } from "../../types/types";
import TableOfContentsRenderer from "./TableOfContentsRenderer";
import NotionBlock from "./NotionBlock";
import NotionBlocks from "./NotionBlocks";
const NotionBlockCore: FC<
  BlockProps & {
    blocks?: BlockProps["block"][];
  }
> = ({ block, blocks }) => {
  const { prefix, blockPrefix } = useContext(Context);
  switch (block.type) {
    case "paragraph":
      if (block[block.type].rich_text.length > 0) {
        return (
          <div className={`${prefix}-${blockPrefix}-p`}>
            <p>
              <TextRenderer richTextArr={block[block.type].rich_text} />
            </p>
          </div>
        );
      }
      return (
        <div className={`${prefix}-${blockPrefix}-p`}>
          <p>
            <br />
          </p>
        </div>
      );
    case "heading_1":
      return (
        <div id={`${block.id}`} className={`${prefix}-${blockPrefix}-h1`}>
          {block[block.type].is_toggleable ? (
            <details>
              <summary className="toggle">
                <TextRenderer richTextArr={block[block.type].rich_text} />
              </summary>
              {block.childBlock ? (
                <NotionBlocks
                  blocks={block.childBlock}
                  isCodeHighlighter={true}
                />
              ) : (
                ""
              )}
            </details>
          ) : (
            <h1>
              <TextRenderer richTextArr={block[block.type].rich_text} />
            </h1>
          )}
        </div>
      );
    case "heading_2":
      return (
        <div id={`${block.id}`} className={`${prefix}-${blockPrefix}-h2`}>
          {block[block.type].is_toggleable ? (
            <details>
              <summary className="toggle">
                <TextRenderer richTextArr={block[block.type].rich_text} />
              </summary>
              {block.childBlock ? (
                <NotionBlocks
                  blocks={block.childBlock}
                  isCodeHighlighter={true}
                />
              ) : (
                ""
              )}
            </details>
          ) : (
            <h2>
              <TextRenderer richTextArr={block[block.type].rich_text} />
            </h2>
          )}
        </div>
      );
    case "heading_3":
      return (
        <div id={`${block.id}`} className={`${prefix}-${blockPrefix}-h3`}>
          {block[block.type].is_toggleable ? (
            <details>
              <summary className="toggle">
                <TextRenderer richTextArr={block[block.type].rich_text} />
              </summary>
              {block.childBlock ? (
                <NotionBlocks
                  blocks={block.childBlock}
                  isCodeHighlighter={true}
                />
              ) : (
                ""
              )}
            </details>
          ) : (
            <h3>
              <TextRenderer richTextArr={block[block.type].rich_text} />
            </h3>
          )}
        </div>
      );
    case "table_of_contents":
      return (
        <div
          id={`${block.id}`}
          className={`${prefix}-${blockPrefix}-table_of_contents`}
        >
          {blocks && <TableOfContentsRenderer blocks={blocks} />}
        </div>
      );
    case "bulleted_list_item":
      return (
        <li className={`${prefix}-${blockPrefix}-bulleted_list_item`}>
          <TextRenderer richTextArr={block[block.type].rich_text} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li className={`${prefix}-${blockPrefix}-numbered_list_item`}>
          <TextRenderer richTextArr={block[block.type].rich_text} />
        </li>
      );
    case "quote":
      return (
        <div className={`quote`}>
          <div>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </div>
        </div>
      );
    case "callout":
      return (
        <div className={`callout`}>
          <div className={`${prefix}-icon`}>{block[block.type].icon.emoji}</div>
          <div className={`${prefix}-callout`}>
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </div>
        </div>
      );
    case "code":
      return (
        <div className={`code`}>
          <CodeRenderer
            lang={block[block.type].language}
            richTextArr={block[block.type].rich_text}
          />
          <div className={`caption`}>
            <TextRenderer richTextArr={block[block.type].caption} />
          </div>
        </div>
      );
    case "image":
      return (
        <div className={`${prefix}-${blockPrefix}-image`}>
          <div className={`${prefix}-image`}>
            <ImageRenderer block={block[block.type]} />
          </div>
          <div className={`caption`}>
            <TextRenderer richTextArr={block[block.type].caption} />
          </div>
        </div>
      );
    case "video":
      return (
        <div className={`${prefix}-${blockPrefix}-video`}>
          <div className={`${prefix}-video`}>
            <VideoRenderer block={block[block.type]} />
          </div>
          <div className={`caption`}>
            <TextRenderer richTextArr={block[block.type].caption} />
          </div>
        </div>
      );
    case "divider":
      return (
        <div className="divider">
          <hr key={block.id} />
        </div>
      );
    case "toggle":
      console.log("toggle");
      console.log(block);
      return (
        <details>
          <summary className="toggle">
            <TextRenderer richTextArr={block[block.type].rich_text} />
          </summary>
          {block.childBlock ? (
            <NotionBlocks blocks={block.childBlock} isCodeHighlighter={true} />
          ) : (
            ""
          )}
        </details>
      );
    case "embed":
      return (
        <div className="embed relative before:pt-[56.25%] w-full h-98 mb-6">
          <embed
            src={block[block.type].url}
            width="100%"
            className="h-[30rem]"
          />
        </div>
      );
    default:
      console.log(`This block type not yet configured`);
      console.log(block);
  }
  return <></>;
};
export default NotionBlockCore;

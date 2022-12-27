import { FC } from "react";
import { RenderBlockProps } from "../../types/types";
import {
  BLOCKS_PREFIX,
  BLOCK_PREFIX,
  IS_CODE_HIGHLIGHTER,
  // IS_NEXTJS,
  PREFIX,
  SYNTAX_HIGHLIGHTER_CSS,
} from "../../utils/rendererutils";
import { Context } from "../../utils/rendererutils";
import NotionBlockCore from "./NotionBlockCore";

export const NotionBlock: FC<RenderBlockProps> = ({
  block,
  prefix,
  blockPrefix,
  blocksPrefix,
  // isNextJS,
  isCodeHighlighter,
  syntaxHighlighterCSS,
}) => {
  return (
    <Context.Provider
      key={block.id}
      value={{
        prefix: prefix !== undefined ? prefix : PREFIX,
        blockPrefix: blockPrefix !== undefined ? blockPrefix : BLOCK_PREFIX,
        blocksPrefix: blocksPrefix !== undefined ? blocksPrefix : BLOCKS_PREFIX,
        // isNextJS: isNextJS !== undefined ? isNextJS : IS_NEXTJS,
        isCodeHighlighter:
          isCodeHighlighter !== undefined
            ? isCodeHighlighter
            : IS_CODE_HIGHLIGHTER,
        syntaxHighlighterCSS:
          syntaxHighlighterCSS !== undefined
            ? syntaxHighlighterCSS
            : SYNTAX_HIGHLIGHTER_CSS,
      }}
    >
      <NotionBlockCore block={block} />
    </Context.Provider>
  );
};

export default NotionBlock;

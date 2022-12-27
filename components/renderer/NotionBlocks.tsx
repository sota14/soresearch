import { FC } from "react";
import {
  BLOCKS_PREFIX,
  BLOCK_PREFIX,
  IS_CODE_HIGHLIGHTER,
  PREFIX,
  SYNTAX_HIGHLIGHTER_CSS,
} from "../../utils/rendererutils";
import { RenderBlocksProps } from "../../types/types";
import { Context } from "../../utils/rendererutils";
import { getBlocks } from "./BlockRenderer";

const NotionBlocks: FC<RenderBlocksProps> = ({
  blocks,
  prefix,
  blockPrefix,
  blocksPrefix,
  isCodeHighlighter,
  syntaxHighlighterCSS,
}) => {
  const initialPrefix = prefix !== undefined ? prefix : PREFIX;
  return (
    <Context.Provider
      value={{
        prefix: initialPrefix,
        blockPrefix: blockPrefix !== undefined ? blockPrefix : BLOCK_PREFIX,
        blocksPrefix: blocksPrefix !== undefined ? blocksPrefix : BLOCKS_PREFIX,
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
      <div className={`${initialPrefix}-${BLOCKS_PREFIX}`}>
        {getBlocks(blocks)}
      </div>
    </Context.Provider>
  );
};

export default NotionBlocks;

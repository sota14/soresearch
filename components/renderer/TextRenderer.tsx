import { FC } from "react";
import { annotationToClassName } from "../../utils/rendererutils";
import { Context } from "../../utils/rendererutils";
import { useContext } from "react";
import { TextProps } from "../../types/types";

const TextRenderer: FC<TextProps> = ({ richTextArr }) => {
  const { prefix } = useContext(Context);
  const linkName = `${prefix}-link`;
  return (
    <>
      {richTextArr.map((richText: any, index: number) => {
        const className = annotationToClassName(richText.annotations, prefix);
        if (richText.href) {
          return (
            <a
              key={index}
              href={richText.href}
              className={`${linkName} ${className}`}
            >
              {richText.plain_text}
            </a>
          );
        } else {
          return (
            <span key={index} className={className}>
              {richText.plain_text}
            </span>
          );
        }
      })}
    </>
  );
};
export default TextRenderer;

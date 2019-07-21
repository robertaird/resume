import React, { useContext, useEffect, useState } from "react";
import Prism from "../../prism";
import styled from "styled-components";
import { Grid, Tooltip, Typography as MuiTypography } from "@material-ui/core";
import { ActiveContext } from "containers/ActiveProvider";

type Props = {
  code: string;
} & Omit<React.ComponentProps<typeof Tooltip>, "title">;

const RootGrid = styled(Grid)`
  white-space: pre;
`;

const CodeGrid = styled(Grid)`
  font-family: "Inconsolata", monospace;
  background: ${props => props.theme.palette.background.default}AA;
  padding: 10px;
  margin: 10px;
  border: 1px solid ${props => props.theme.palette.background.default};
  border-radius: 3px;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

const Typography = styled(MuiTypography)`
  color: ${props => props.theme.palette.primary.light};
`;

const replaceText = `import Code from "containers/Code";\n// @ts-ignore\nimport txt from "!raw-loader!./index.tsx";\n`;

const removeFirstIndent = (code: string) => code.replace(/^(?:\s\s)/gm, "");

const relativeFileName = (fileName: string) => {
  return `src/${fileName.split("src/")[1]}`;
};

/**
 * Removing all the extra stuff I added to the code to create the code
 * blocks.
 */
const cleanCode = (code: string) => {
  const initial = code.replace(/\r\n/gm, "\n").replace(replaceText, "");
  const split = initial.split("Code");
  split[1] = removeFirstIndent(split[1]);
  return (
    split
      .map((section, i) => {
        const lines = section.split("\n");
        if (i !== 0) {
          lines.splice(0, 1);
        }
        if (i !== split.length - 1) {
          lines.splice(lines.length - 1, 1);
        }
        return lines.join("\n");
      })
      .join("\n") + "\n"
  );
};

/**
 * I didn't see any instances of Prism highlighting two different languages
 * in the same block, so, doing it myself. I realize this is not going to be
 * super reliable for all use cases.
 * @param code
 * @param next
 */
const parseStyled = (code: string, next?: number): string => {
  // don't count the import statement
  const initial = code.indexOf("styled-components") + 17;
  const startIndex = (typeof next === "number" ? next : initial) + 1;
  // should probably check for index of 'styled.' or 'styled(' instead
  const styledDeclaration = code.indexOf("styled", startIndex);
  const templateStart = code.indexOf("`", styledDeclaration) + 1;
  const templateEnd = code.indexOf("`", templateStart + 1);
  if (styledDeclaration > -1 && templateStart > -1 && templateEnd > -1) {
    return (
      Prism.highlight(
        code.substring(0, templateStart),
        Prism.languages.tsx,
        "tsx"
      ) +
      Prism.highlight(
        code.substring(templateStart, templateEnd),
        Prism.languages.css,
        "css"
      ) +
      parseStyled(code.substring(templateEnd), templateEnd + 1)
    );
  } else {
    return Prism.highlight(code, Prism.languages.tsx, "tsx");
  }
};

/**
 * Attempts to re-parse elements with the .plain-text class
 * @param el
 */
const replaceSpan = (el: HTMLElement) => {
  const stripped = el.innerText.replace(/ /g, "");
  // arbitrary
  if (stripped.length > 10) {
    el.outerHTML = Prism.highlight(el.innerText, Prism.languages.js, "js");
  }
  return el;
};

/**
 * Prism is missing some of my code. This is my overkill solution for
 * getting it to take another look.
 * @param code
 */
const cleanup = (code: string) => {
  const div = document.createElement("div");
  let plainTextNodes;
  div.innerHTML = code;
  plainTextNodes = div.getElementsByClassName("plain-text");
  if (plainTextNodes.length) {
    for (let i = 0; i < plainTextNodes.length; i++) {
      replaceSpan(plainTextNodes[i] as HTMLElement);
    }
  }
  return div.innerHTML;
};

const setChildrenProps = (
  children: React.ReactElement,
  id: string,
  setActive: React.Dispatch<any>
) => ({
  onMouseOver: (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(id);
  },
  ...children.props
});

export const Code: React.FC<Props> = ({ code, children, ...props }) => {
  // @ts-ignore
  const fileName = children._source ? children._source.fileName : "";
  const __html = cleanup(parseStyled(cleanCode(code)));
  const { enabled, activeEl, setActive, addId, idLength } = useContext(
    ActiveContext
  );
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setId(`code-key-${idLength() + 1}`);
      addId(id);
    }
  }, [id, setId, addId, idLength]);

  useEffect(() => {
    setOpen(activeEl === id);
  }, [activeEl, id, setOpen]);

  return (
    <Tooltip
      {...props}
      open={enabled && open}
      title={
        <RootGrid container direction="column">
          <Grid item>
            <Typography component="span">Code:</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" component="span">
              {relativeFileName(fileName)}
            </Typography>
          </Grid>
          <CodeGrid item>
            <div dangerouslySetInnerHTML={{ __html }} />
          </CodeGrid>
        </RootGrid>
      }
    >
      {React.cloneElement(children, {
        ...setChildrenProps(children, id, setActive)
      })}
    </Tooltip>
  );
};

export default Code;

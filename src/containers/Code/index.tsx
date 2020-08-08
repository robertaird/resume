/**
 * @module Code
 *
 * TODO: Display implementation of this component?
 */
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { styled } from 'imports';
import Prism from '@/prism';
import { ActiveContext } from '@/containers/ActiveProvider';
import { SourceContext } from '@/containers/SourceDrawer';

interface Props {
  code: string;
  children: React.ReactElement;
}

interface HoverAreaProps {
  'data-open': boolean;
  'data-adjust': number;
  'data-width': number;
  'data-height': number;
  'data-top': number;
  'data-left': number;
  'data-bottom': number;
  'data-right': number;
}

type CodeChildrenProps = { children: React.ReactNode } & HoverAreaProps;

interface Dimensions {
  height: number;
  width: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
  // x: number;
  // y: number;
}

/**
 * TODO: 
 * Over 200 classes were generated for component styled.div. 
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs({
    style: ({ background }) => ({
      background,
    }),
  })`width: 100%;`

 */
const HoverDiv = styled.div.attrs((props: HoverAreaProps) => ({
  style: {
    width: `calc(100% + ${10 + props['data-adjust'] * 2}px)`,
    height: `calc(100% + ${10 + props['data-adjust'] * 2}px)`,
    marginLeft: -(5 + props['data-adjust']),
    marginTop: -(5 + props['data-adjust']),
  },
}))`
  pointer-events: none;
  border-radius: 4px;
`;

const HoverArea = styled.div.attrs((props: HoverAreaProps) => ({
  style: {
    zIndex: Math.floor(
      100 -
        props['data-adjust'] -
        Math.max(0, Math.ceil(props['data-height'] / 5 / props['data-adjust'])),
    ),
    pointerEvents: props['data-open'] ? 'auto' : 'none',
    top: props['data-top'],
    left: props['data-left'],
    bottom: props['data-bottom'],
    right: props['data-right'],
    height: props['data-height'] - (20 - props['data-adjust'] * 2),
    width: props['data-width'] - (20 - props['data-adjust'] * 2),
    margin: 10 - props['data-adjust'],
  },
}))<HoverAreaProps>`
  /**
   pointer-events: ${(props) => (props['data-open'] ? 'auto' : 'none')}; */
  &:hover {
  }
  &:hover div {
    background: #aaaaaa77;
    border: 2px solid ${(props) => props.theme.palette.secondary.light};
  }
  /* & div {
    pointer-events: none;
    border-radius: 4px;
    width: calc(100% + ${(props) => 10 + props['data-adjust'] * 2}px);
    height: calc(100% + ${(props) => 10 + props['data-adjust'] * 2}px);
    margin-left: -${(props) => 5 + props['data-adjust']}px;
    margin-top: -${(props) => 5 + props['data-adjust']}px;
  } */
  /* top: ${(props) => props['data-top']}px;
  left: ${(props) => [props['data-left']]}px;
  bottom: ${(props) => props['data-bottom']}px;
  right: ${(props) => props['data-right']}px;
  height: ${(props) =>
    props['data-height'] - (20 - props['data-adjust'] * 2)}px;
  width: ${(props) => props['data-width'] - (20 - props['data-adjust'] * 2)}px;
  margin: ${(props) => 10 - props['data-adjust']}px;
  z-index: ${(props) =>
    100 -
    props['data-adjust'] -
    Math.max(0, Math.ceil(props['data-height'] / 5 / props['data-adjust']))}; */
  position: absolute;
`;

const replaceText = `import Code from 'containers/Code';\n// @ts-ignore\nimport txt from '!raw-loader!./index.tsx';\n`;

const removeFirstIndent = (code: string) => code.replace(/^(?:\s\s)/gm, '');

const relativeFileName = (fileName: string) => {
  return `src/${fileName.split('src/')[1]}`;
};

function isSingleChild(
  children: React.ReactElement | React.ReactElement[],
): children is React.ReactElement {
  return children.hasOwnProperty('props');
}
/**
 * Removing all the extra stuff I added to the code to create the code
 * blocks.
 */
const cleanCode = (code: string) => {
  const initial = code.replace(/\r\n/gm, '\n').replace(replaceText, '');
  const split = initial.split('Code');
  split[1] = removeFirstIndent(split[1]);
  return (
    split
      .map((section, i) => {
        const lines = section.split('\n');
        if (i !== 0) {
          lines.splice(0, 1);
        }
        if (i !== split.length - 1) {
          lines.splice(lines.length - 1, 1);
        }
        return lines.join('\n');
      })
      .join('\n') + '\n'
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
  const templateTag = '<span class="token string">`</span>';
  // don't count the import statement
  const initial = code.indexOf('styled-components') + 17;
  const startIndex = (typeof next === 'number' ? next : initial) + 1;
  // should probably check for index of 'styled.' or 'styled(' instead
  const styledDeclaration = code.indexOf('styled', startIndex);
  const templateStart = code.indexOf('`', styledDeclaration) + 1;
  const templateEnd = code.indexOf('`', templateStart + 1);
  if (styledDeclaration > -1 && templateStart > -1 && templateEnd > -1) {
    return (
      Prism.highlight(
        code.substring(0, templateStart - 1),
        Prism.languages.tsx,
        'tsx',
      ) +
      templateTag +
      Prism.highlight(
        code.substring(templateStart, templateEnd),
        Prism.languages.css,
        'css',
      ) +
      templateTag +
      parseStyled(code.substring(templateEnd + 1))
    );
  } else {
    return Prism.highlight(code, Prism.languages.tsx, 'tsx');
  }
};

/**
 * Attempts to re-parse elements with the .plain-text class. Doesn't catch
 * a lot, but it's better.
 * @param el
 */
const replaceSpan = (el: HTMLElement) => {
  const stripped = el.innerText.replace(/ /g, '');
  // arbitrary
  if (stripped.length > 10) {
    const round2 = Prism.highlight(el.innerText, Prism.languages.js, 'js');
    el.innerHTML = round2;
  }
  return el;
};

/**
 * Prism is missing some of my code. This is my overkill solution for
 * getting it to take another look.
 * @param code
 */
const cleanup = (code: string) => {
  const div = document.createElement('div');
  let plainTextNodes;
  div.innerHTML = code;
  plainTextNodes = div.getElementsByClassName('plain-text');
  if (plainTextNodes.length) {
    for (let i = 0; i < plainTextNodes.length; i++) {
      replaceSpan(plainTextNodes[i] as HTMLElement);
    }
  }
  return div.innerHTML;
};

/** Add props to the hover element */
const setChildrenProps = (id: string, setActive: React.Dispatch<string>) => ({
  onMouseOver: (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(id);
  },
});

/** Try to suss out approximately how high up the current child is in the tree */
const getTreeDepth = (
  children: React.ReactElement | React.ReactElement[],
  count = 0,
): number => {
  let newCount = count;
  if (children) {
    newCount += React.Children.count(children);
    if (isSingleChild(children)) {
      newCount = getTreeDepth(children.props.children, newCount);
    } else if (Array.isArray(children)) {
      newCount = children.reduce((count, child) => {
        return count + getTreeDepth(child, count);
      }, 0);
    }
  }
  return newCount;
};

/**
 * Little helper component to hold any refs passed to the Code component.
 */
const CodeChildren = React.forwardRef(function CodeChildren(
  { children, ...props }: CodeChildrenProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <Fragment>
      <HoverArea ref={ref} {...props}>
        <HoverDiv {...props} />
      </HoverArea>
      {children}
    </Fragment>
  );
});

// TODO: Store formatted text by filename?
export const Code: React.FC<Props> = ({ code, children }) => {
  // @ts-ignore
  const fileName = children._source
    ? // It really doesn't like me using source.
      // @ts-ignore
      relativeFileName(children._source.fileName)
    : '';
  const [html] = useState(cleanup(parseStyled(cleanCode(code))));
  const { activeEl, setActive, addId, idLength } = useContext(ActiveContext);
  const { open, setCode } = useContext(SourceContext);
  const [id, setId] = useState('');
  const [treeDepth] = useState(getTreeDepth(children));
  // TODO: Tree adjust 10 + (-0.8 - 10)/(1 + (x/5))
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const childRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (!id) {
      setId(`code-key-${idLength() + 1}`);
      addId(id);
    }
  }, [id, setId, addId, idLength]);

  useEffect(() => {
    // setOpen(activeEl === id);
    if (activeEl === id) {
      setCode({ fileName, html });
    }
  }, [activeEl, id, setCode, fileName, html]);

  useEffect(() => {
    // Giving a little time for the drawer animation to complete before re-setting.
    setTimeout(() => {
      if (childRef.current instanceof Element) {
        const rectangle = childRef.current.getBoundingClientRect();
        if (
          dimensions.width !== rectangle.width ||
          dimensions.height !== rectangle.height
        ) {
          setDimensions({
            width: rectangle.width,
            height: rectangle.height,
            top: rectangle.top,
            left: rectangle.left,
            bottom: rectangle.bottom,
            right: rectangle.right,
          });
        }
      }
    }, 200);
  }, [open, childRef, dimensions, setDimensions]);

  return (
    <CodeChildren
      // data-adjust={treeDepth}
      // data-adjust={10 + (-0.8 - 10) / (1 + treeDepth / 5)}
      data-adjust={30 + (-0.8 - 30) / (1 + treeDepth / 15)}
      data-height={dimensions.height}
      data-width={dimensions.width}
      data-top={dimensions.top}
      data-left={dimensions.left}
      data-bottom={dimensions.bottom}
      data-right={dimensions.right}
      data-open={open}
      {...setChildrenProps(id, setActive)}
    >
      {React.cloneElement(children, {
        ref: childRef,
        ...(children.props ? children.props : {}),
      })}
    </CodeChildren>
  );
};

export default Code;

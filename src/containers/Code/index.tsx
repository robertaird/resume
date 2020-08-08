/**
 * @module Code
 */
import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  // cleanCode,
  cleanup,
  calculateZIndex,
  getTreeDepth,
  parseStyled,
  relativeFileName,
  setChildrenProps,
  // isSingleChild,
  // removeFirstIndent,
  // replaceSpan,
} from './utils';
import { CodeContext } from './context';

interface CodeChildren extends React.ReactElement {
  _source?: {
    fileName: string;
  };
}

interface CodeProps {
  children: CodeChildren;
}

interface HoverFilePathProps {
  open: boolean;
  width: number;
  adjust: number;
}

interface HoverAreaProps {
  open: boolean;
  'data-z-index': number;
  'data-adjust': number;
  'data-width': number;
  'data-height': number;
  'data-top': number;
  'data-left': number;
  'data-bottom': number;
  'data-right': number;
}

type CodeChildrenProps = {
  children: React.ReactNode;
  fileName: string;
} & HoverAreaProps;

interface Dimensions {
  height: number;
  width: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
  offsetTop: number;
  offsetLeft: number;
}

interface Translates {
  translateX: number;
  translateY: number;
}

const HoverPath = styled.h5.attrs((props: HoverFilePathProps) => ({
  style: {
    display: props.open ? '' : 'none',
    width: props.width,
    // marginLeft: -(props.adjust / 2),
  },
}))<HoverFilePathProps>`
  position: absolute;
  margin: 0;
  max-width: 50vw;
  top: 0;
  left: 5px;
  white-space: nowrap;
  text-align: left;
`;

const HoverDiv = styled.div.attrs((props: HoverAreaProps) => ({
  style: {
    display: props.open ? '' : 'none',
    // marginLeft: -(props['data-adjust'] / 2),
    width: `calc(100% + ${props['data-adjust']}px)`,
    // width: `calc(100% - ${props['data-adjust']}px)`,
    height: props['data-height'],
  },
}))<HoverAreaProps>`
  max-width: 100vw;
  pointer-events: none;
  border-radius: 4px;
`;

const HoverArea = styled.div.attrs((props: HoverAreaProps) => ({
  style: {
    pointerEvents: props['open'] ? 'auto' : 'none',
    zIndex: props['data-z-index'],
    transform: `translate(${props['data-left']}px, ${props['data-top']}px)`,
    height: props['data-height'] - props['data-adjust'] / 2,
    width: props['data-width'] - props['data-adjust'],
    // top: props['data-top'] + props['data-adjust'],
    // left: props['data-left'] + props['data-adjust'] * 1.5,
    // right: props['data-right'] + props['data-adjust'],
    // margin: -props['data-adjust'],
  },
}))<HoverAreaProps>`
  transition: transform 300ms linear;
  will-change: transform;
  &:hover {
  }
  &:hover h5 {
    font-style: italic;
  }
  &:hover div {
    background: #aaaaaa77;
    border: 3px solid ${(props) => props.theme.palette.primary.light};
  }
  & div {
    border: 1px solid ${(props) => props.theme.palette.secondary.dark};
    background: #aaaaaa22;
    border-radius: 4px;
    margin-top: 0px;
  }
  position: absolute;
`;

const mountNode = document.getElementById('root') as HTMLElement;
/**
 * Little helper component to hold any refs passed to the Code component.
 */
const CodeChildren = React.forwardRef(
  (
    { children, fileName, open, ...props }: CodeChildrenProps,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <Fragment>
      {ReactDOM.createPortal(
        <HoverArea ref={ref} open={open} {...props}>
          <HoverPath
            open={open}
            width={props['data-width']}
            adjust={props['data-adjust']}
          >
            {fileName}
          </HoverPath>
          <HoverDiv open={open} {...props} />
        </HoverArea>,
        mountNode,
      )}
      {children}
    </Fragment>
  ),
);

const htmlPipeline = (code: string | null) => cleanup(parseStyled(code));

const mapElement = (
  el: HTMLElement,
  rectangle: DOMRect,
  setter: (dimensions: Dimensions) => void,
) => {
  setter({
    width: rectangle.width,
    height: rectangle.height,
    top: rectangle.top + window.scrollY,
    left: rectangle.left + window.scrollX,
    bottom: rectangle.bottom,
    right: rectangle.right,
    offsetTop: el.offsetTop,
    offsetLeft: el.offsetLeft,
  });
};
export const Code: React.FC<CodeProps> = ({ children }) => {
  /**
   * TODO: ActiveContext and SourceContet are kind of confusing. One of them
   * TODO: tracks the element and the other the code string.
   * TODO: Does this really make sense?
   *
   * It might just need a logic cleanup.
   * Maybe ActiveContext becomes ActiveElementContext, and SourceContext becomes
   * ActiveSourceContext.
   */
  const { sourceStore, addSource, ActiveContext, SourceContext } = useContext(
    CodeContext,
  );
  const fileName = children._source
    ? relativeFileName(children._source.fileName)
    : '';
  const code = sourceStore[fileName] || null;
  const [html, setHtml] = useState(htmlPipeline(code));
  const { activeEl, setActive, addId, idLength } = useContext(ActiveContext);
  const { open, setCode } = useContext(SourceContext);
  const [id, setId] = useState('');
  const [treeDepth] = useState(() => getTreeDepth(children));
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    offsetTop: 0,
    offsetLeft: 0,
  });
  const childRef = React.useRef<HTMLElement>(null);
  /** Math? */
  const something = Math.max(10, (Math.log(treeDepth) / 5) * 100);
  const itemAdjust = Math.abs(
    something + ((-0.8 - something) / (1 + treeDepth / 5)) * 1.5,
  );
  const zIndex = calculateZIndex(
    dimensions.height,
    dimensions.offsetTop,
    dimensions.offsetLeft,
    Math.max(2, treeDepth),
  );

  useEffect(() => {
    if (fileName.endsWith('.tsx') && !sourceStore[fileName]) {
      /** Dynamic importing. Yusssssss */
      import(
        `!raw-loader!../../../${fileName.substring(0, fileName.length - 4)}.tsx`
      ).then(({ default: txt }) => {
        addSource(fileName, txt);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName, sourceStore]);

  useEffect(() => {
    if (!id) {
      setId(`code-key-${idLength() + 1}`);
      addId(id);
    }
  }, [id, setId, addId, idLength]);

  useEffect(() => {
    if (activeEl === id) {
      if (html !== null) {
        setCode({ fileName, html });
      } else if (code !== null) {
        setHtml(htmlPipeline(code));
      }
    }
  }, [activeEl, id, setCode, fileName, html, code]);

  useLayoutEffect(() => {
    // Giving a little time for the drawer animation to complete before re-setting.
    if (childRef.current instanceof Element) {
      const el = childRef.current;
      setTimeout(() => {
        const rectangle = el.getBoundingClientRect();
        if (
          dimensions.width !== rectangle.width ||
          dimensions.height !== rectangle.height ||
          dimensions.left !== rectangle.left ||
          dimensions.top !== rectangle.top
        ) {
          mapElement(el, rectangle, setDimensions);
        }
      }, 0);
    }
  }, [open, childRef, dimensions, setDimensions]);

  return (
    <CodeChildren
      fileName={fileName}
      data-z-index={zIndex}
      data-adjust={itemAdjust}
      data-height={dimensions.height}
      data-width={dimensions.width}
      data-top={dimensions.top}
      data-left={dimensions.left}
      data-bottom={dimensions.bottom}
      data-right={dimensions.right}
      open={open}
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

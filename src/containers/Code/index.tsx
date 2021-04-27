/**
 * @module Code
 */
import React, {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { useImmer, Updater } from 'use-immer';
import { debounce } from 'lodash-es';
import {
  cleanup,
  calculateZIndex,
  getTreeDepth,
  parseStyled,
  relativeFileName,
  setChildrenProps,
} from './utils';
import { ActiveContext } from '../ActiveProvider';
import { SourceContext } from '../SourceProvider';
import { CodeContext } from './context';
import { HoverArea, HoverAreaProps, HoverDiv, HoverPath } from './styles';

// Add React Dev only properties
interface ReactElementDev extends React.ReactElement {
  _source?: {
    fileName: string;
  };
}
interface CodeProps {
  children: ReactElementDev;
  fileName?: string;
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
  rectangle: Partial<DOMRect>,
  setter: Updater<Dimensions>,
) => {
  setter((draft) => {
    Object.entries(rectangle).forEach(([key, val]) => {
      if (typeof val === 'number') {
        if (key === 'top') {
          draft.top = val + window.scrollY;
        } else if (key === 'left') {
          draft.left = val + window.scrollX;
        } else {
          draft[key as keyof typeof draft] = val;
        }
      }
    });
    draft.offsetTop = el.offsetTop;
    draft.offsetLeft = el.offsetLeft;
  });
};

export const Code: React.FC<CodeProps> = React.memo(
  ({ children, fileName: passedFileName }) => {
    /**
     * TODO: ActiveContext and SourceContet are kind of confusing. One of them
     * TODO: tracks the element and the other the code string.
     * TODO: Does this really make sense?
     *
     * It might just need a logic cleanup.
     * Maybe ActiveContext becomes ActiveElementContext, and SourceContext becomes
     * ActiveSourceContext.
     */
    const { sourceStore, addSource } = useContext(CodeContext);
    const fileName = useMemo(() => {
      if (passedFileName) {
        return relativeFileName(passedFileName);
      } else if (children._source) {
        // TODO: This only works in React development. Using Webpack definePlugin to set fileName prop...
        // eslint-disable-next-line no-console
        console.warn(
          'This method of retrieving the file name will only work in the React development build. Please provide a fileName prop to the Code component.',
        );
        return relativeFileName(children._source.fileName);
      }
      return '';
    }, [children, passedFileName]);
    const code = sourceStore[fileName] || null;
    const [html, setHtml] = useState(htmlPipeline(code));
    const { activeEl, setActive, addId, idLength } = useContext(ActiveContext);
    const { open, setCode } = useContext(SourceContext);
    const [id, setId] = useState('');
    const [treeDepth] = useState(() => getTreeDepth(children));
    const [dimensions, setDimensions] = useImmer<Dimensions>({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      offsetTop: 0,
      offsetLeft: 0,
    });
    const mountRef = useRef(true);
    const resizeObserver = useRef<ResizeObserver | null>(null);
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
          `!raw-loader!../../../${fileName.substring(
            0,
            fileName.length - 4,
          )}.tsx`
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
    /* eslint-disable react-hooks/exhaustive-deps */
    const accurateMap = useCallback(
      debounce(() => {
        /* eslint-enable */
        window.requestAnimationFrame(() => {
          if (childRef.current instanceof Element) {
            const rectangle = childRef.current.getBoundingClientRect();
            const topDiff = Math.abs(rectangle.top - dimensions.top);
            const leftDiff = Math.abs(rectangle.left - dimensions.left);
            const widthDiff = Math.abs(rectangle.width - dimensions.width);
            if (childRef.current.id === 'togglers') {
              console.log(
                JSON.stringify(rectangle),
                JSON.stringify(dimensions),
                topDiff,
                leftDiff,
                widthDiff,
              );
            }
            if (topDiff > 15 || leftDiff > 15 || widthDiff > 25) {
              mapElement(childRef.current, rectangle.toJSON(), setDimensions);
            }
          }
        });
      }, 100),
      [dimensions, setDimensions],
    );

    useLayoutEffect(() => {
      // Giving a little time for the drawer animation to complete before re-setting.
      if (childRef.current instanceof Element && !resizeObserver.current) {
        resizeObserver.current = new ResizeObserver(
          (entries: ResizeObserverEntry[]) => {
            const el = childRef.current;
            for (const entry of entries) {
              if (
                el instanceof Element &&
                (dimensions.width !== entry.contentRect.width ||
                  dimensions.height !== entry.contentRect.height ||
                  dimensions.left !== el.offsetLeft ||
                  dimensions.top !== el.offsetTop)
              ) {
                mapElement(
                  el,
                  {
                    height: entry.contentRect.height,
                    width: entry.contentRect.width,
                    top: el.offsetTop,
                    left: el.offsetLeft,
                  },
                  setDimensions,
                );
              }
            }
          },
        );
        resizeObserver.current.observe(childRef.current);
      }
    }, [open, childRef, dimensions, setDimensions]);
    /**
     * The previous method for getting `top` and `left` is inaccurate, but fast.
     * Check dimensions and location again after all the big changes complete and get
     * a more accurate reading.
     */
    useLayoutEffect(() => {
      if (open && dimensions.height !== 0 && dimensions.width !== 0) {
        accurateMap();
      }
    }, [open, dimensions, accurateMap]);

    useEffect(
      () => () => {
        mountRef.current = false;
        if (resizeObserver.current) {
          resizeObserver.current.disconnect();
          resizeObserver.current = null;
        }
      },
      [],
    );
    return (
      <CodeChildren
        fileName={fileName}
        data-z-index={isNaN(zIndex) ? 0 : zIndex}
        data-adjust={itemAdjust}
        data-height={isNaN(dimensions.height) ? 0 : dimensions.height}
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
  },
);

export default Code;

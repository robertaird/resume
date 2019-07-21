import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-typescript.min";
import "prismjs/components/prism-css";
import "prismjs/components/prism-css-extras";
import "prismjs/plugins/highlight-keywords/prism-highlight-keywords";
import "prismjs/plugins/custom-class/prism-custom-class";

// const prismHighlight = Prism.highlight;
// const highlight = (code: string) =>
//   prismHighlight(code, Prism.languages.tsx, "tsx");
Prism.plugins.customClass.map(function(className: string, language: string) {
  console.log(className, language);
  if (language === "css") {
    return `${className}.css`;
  } else {
    return className;
  }
});

Prism.languages.insertBefore(
  "typescript",
  "keyword",
  {
    module: {
      pattern: /\b(?:import|as|export|from|default)\b/,
      alias: "keyword"
    },
    op: {
      pattern: /\b(?:typeof|new|of|delete)\b/,
      alias: "keyword"
    },
    nil: {
      pattern: /\b(?:null|undefined)\b/,
      alias: "keyword"
    },
    flow: {
      pattern: /\b(?:return|await)\b/,
      alias: "keyword"
    },
    func: {
      pattern: /(\.\s*)[a-z_$][\w$]*(?=(\())/i,
      lookbehind: true,
      alias: "method"
    }
  },
  Prism.languages
);

Prism.languages.insertBefore(
  "typescript",
  "punctuation",
  {
    definition: {
      pattern: /[a-z]\w*(?=:)/i,
      lookbehind: true,
      alias: "property"
    },
    access: {
      pattern: /(\.\s*)[a-z_$][\w$]*/i,
      lookbehind: true,
      alias: "property"
    },
    dom: {
      pattern: /\b(?:window|document|navigator|performance|localStorage)\b/,
      alias: "variable"
    },
    console: /\bconsole\b/,
    class: {
      pattern: /\b[A-Z][A-Za-z0-9_]+\b/,
      alias: "class-name"
    }
  },
  Prism.languages
);

Prism.languages.insertBefore(
  "typescript",
  "operator",
  {
    spread: {
      pattern: /\.{3}/,
      alias: "punctuation"
    },
    arrow: {
      pattern: /=>/,
      alias: "operator"
    }
  },
  Prism.languages
);

Prism.languages.insertBefore(
  "typescript",
  "function",
  {
    method: {
      pattern: /(\.\s*)[a-z_$][\w$]*(?=(\())/i,
      lookbehind: true,
      alias: "function"
    }
  },
  Prism.languages
);

Prism.languages.tsx = { ...Prism.languages.jsx, ...Prism.languages.ts };

// Prism.highlight = highlight;

export default Prism;

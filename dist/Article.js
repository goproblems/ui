import { c as _c } from "react/compiler-runtime";
import { forwardRef } from "react";
import { clsx } from "clsx";

/** Presentation only: callers own content parsing, routing, and localization. */
import { jsx as _jsx } from "react/jsx-runtime";
const ArticleBase = /*#__PURE__*/forwardRef(function Article(t0, ref) {
  const $ = _c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = clsx("ui-article", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== ref || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("article", {
      ...props,
      ref: ref,
      "data-ui": "article",
      className: t1
    });
    $[5] = props;
    $[6] = ref;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
const ArticleHeader = /*#__PURE__*/forwardRef(function ArticleHeader(t0, ref) {
  const $ = _c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = clsx("ui-article-header", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== ref || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("header", {
      ...props,
      ref: ref,
      className: t1
    });
    $[5] = props;
    $[6] = ref;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
const ArticleTitle = /*#__PURE__*/forwardRef(function ArticleTitle(t0, ref) {
  const $ = _c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = clsx("ui-article-title", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== ref || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("h1", {
      ...props,
      ref: ref,
      className: t1
    });
    $[5] = props;
    $[6] = ref;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
const ArticleBody = /*#__PURE__*/forwardRef(function ArticleBody(t0, ref) {
  const $ = _c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = clsx("ui-article-body", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== ref || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("div", {
      ...props,
      ref: ref,
      className: t1
    });
    $[5] = props;
    $[6] = ref;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
const ArticleMeta = /*#__PURE__*/forwardRef(function ArticleMeta(t0, ref) {
  const $ = _c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = clsx("ui-article-meta", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== ref || $[7] !== t1) {
    t2 = /*#__PURE__*/_jsx("footer", {
      ...props,
      ref: ref,
      className: t1
    });
    $[5] = props;
    $[6] = ref;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
export const Article = Object.assign(ArticleBase, {
  Header: ArticleHeader,
  Title: ArticleTitle,
  Body: ArticleBody,
  Meta: ArticleMeta
});
export { ArticleHeader, ArticleTitle, ArticleBody, ArticleMeta };
//# sourceMappingURL=Article.js.map

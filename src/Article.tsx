import { forwardRef, type HTMLAttributes } from "react";
import { clsx } from "clsx";

/** Presentation only: callers own content parsing, routing, and localization. */
const ArticleBase = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function Article({ className, ...props }, ref) {
    return (
      <article
        {...props}
        ref={ref}
        data-ui="article"
        className={clsx("ui-article", className)}
      />
    );
  },
);

const ArticleHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function ArticleHeader({ className, ...props }, ref) {
    return (
      <header
        {...props}
        ref={ref}
        className={clsx("ui-article-header", className)}
      />
    );
  },
);

const ArticleTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(function ArticleTitle({ className, ...props }, ref) {
  return (
    <h1 {...props} ref={ref} className={clsx("ui-article-title", className)} />
  );
});

const ArticleBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ArticleBody({ className, ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx("ui-article-body", className)}
      />
    );
  },
);

const ArticleMeta = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function ArticleMeta({ className, ...props }, ref) {
    return (
      <footer
        {...props}
        ref={ref}
        className={clsx("ui-article-meta", className)}
      />
    );
  },
);

export const Article = Object.assign(ArticleBase, {
  Header: ArticleHeader,
  Title: ArticleTitle,
  Body: ArticleBody,
  Meta: ArticleMeta,
});
export { ArticleHeader, ArticleTitle, ArticleBody, ArticleMeta };

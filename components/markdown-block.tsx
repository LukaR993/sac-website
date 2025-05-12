"use client";
import { cn } from "@/lib/utils";

import ReactMarkdown from "react-markdown";
import { CopyIcon } from "lucide-react";
import { Element } from "hast";
import { ComponentProps, ComponentType, ElementType, FC, memo } from "react";
import SyntaxHighlighter, { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const generateId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <article className="prose dark:prose-invert max-w-none">
        <div className="markdown-content">
          <ReactMarkdown components={defaultComponents} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </article>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  }
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  return (
    <article className="prose dark:prose-invert max-w-none" key={id}>
      <div className="markdown-content">
        <ReactMarkdown components={defaultComponents} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
});

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, className }) => {
  const codeText = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  return (
    <div className="not-prose relative group my-4">
      <div className="absolute right-2 top-2 z-20">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(codeText);
            toast.success("Copied to clipboard");
          }}
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background"
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          borderRadius: "8px",
          padding: "16px",
          background: "rgb(24 24 27)",
        }}
        showLineNumbers={true}
        wrapLongLines={true}
        useInlineStyles={true}
      >
        {codeText.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

interface CodeProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}
interface CodeHeaderProps {
  node: Element;
  className?: string;
  children?: React.ReactNode;
}
type Components = {
  [Key in Extract<ElementType, string>]?: ComponentType<ComponentProps<Key>>;
} & {
  SyntaxHighlighter?: ComponentType<Omit<SyntaxHighlighterProps, "node">> | undefined;
  CodeHeader?: ComponentType<Omit<CodeHeaderProps, "node">> | undefined;
};

const areChildrenEqual = (prev: string | unknown, next: string | unknown) => {
  if (typeof prev === "string") return prev === next;
  return JSON.stringify(prev) === JSON.stringify(next);
};

export const areNodesEqual = (prev: Element | undefined, next: Element | undefined) => {
  // TODO troubleshoot why this is triggering for code blocks
  if (!prev || !next) return false;
  const isEqual = JSON.stringify(prev?.properties) === JSON.stringify(next?.properties) && areChildrenEqual(prev?.children, next?.children);
  return isEqual;
};

export const memoCompareNodes = (prev: { node?: Element | undefined }, next: { node?: Element | undefined }) => {
  return areNodesEqual(prev.node, next.node);
};

export const memoizeMarkdownComponents = (components: Components = {}) => {
  return Object.fromEntries(
    Object.entries(components ?? {}).map(([key, value]) => {
      if (!value) return [key, value];

      const Component = value as ComponentType;
      const WithoutNode = ({ node, ...props }: { node?: Element }) => {
        return <Component {...props} />;
      };
      return [key, memo(WithoutNode, memoCompareNodes)];
    })
  );
};

const defaultComponents = memoizeMarkdownComponents({
  h1: ({ className, children, ...props }) => {
    const id = generateId(String(children));
    return (
      <h1 id={id} className={cn("mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight last:mb-0", className)} {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ className, children, ...props }) => {
    const id = generateId(String(children));
    return (
      <h2 id={id} className={cn("mb-4 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 last:mb-0", className)} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ className, children, ...props }) => {
    const id = generateId(String(children));
    return (
      <h3 id={id} className={cn("mb-4 mt-6 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 last:mb-0", className)} {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ className, children, ...props }) => {
    const id = generateId(String(children));
    return (
      <h4 id={id} className={cn("mb-4 mt-6 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0", className)} {...props}>
        {children}
      </h4>
    );
  },
  h5: ({ className, ...props }) => <h5 className={cn("my-4 text-lg font-semibold first:mt-0 last:mb-0", className)} {...props} />,
  h6: ({ className, ...props }) => <h6 className={cn("my-4 font-semibold first:mt-0 last:mb-0", className)} {...props} />,
  p: ({ className, ...props }) => <p className={cn("mb-5 mt-5 leading-7  text-sm first:mt-0 last:mb-0", className)} {...props} />,
  a: ({ className, ...props }) => (
    <a className={cn("text-primary font-medium text-sm underline underline-offset-4", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => <blockquote className={cn("border-l-2 text-sm pl-6 italic", className)} {...props} />,
  ul: ({ className, ...props }) => <ul className={cn("my-5 ml-6 list-disc [&>li]:mt-2 text-sm", className)} {...props} />,
  ol: ({ className, ...props }) => (
    <ol className={cn("my-5 ml-6 list-decimal [&>li]:mt-2 text-sm", className)} {...props} data-ordered={""} />
  ),
  hr: ({ className, ...props }) => <hr className={cn("my-5 border-b", className)} {...props} />,
  table: ({ className, ...props }) => (
    <div className="my-5 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse border-spacing-0", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => <thead className={cn("bg-muted", className)} {...props} />,
  tbody: ({ className, ...props }) => <tbody className={cn("", className)} {...props} />,
  img: ({ className, ...props }) => <img className={cn("w-full rounded-md shadow-sm", className)} {...props} />,
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-muted-foreground px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border border-muted-foreground px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }) => <tr className={cn("m-0 border-t p-0", className)} {...props} />,
  sup: ({ className, ...props }) => <sup className={cn("[&>a]:text-xs [&>a]:no-underline", className)} {...props} />,
  code: function Code({ inline, className, children, ...props }: CodeProps) {
    if (!children) return null;

    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const codeText = String(children).replace(/\n$/, "");

    if (!inline) {
      return (
        <div className="not-prose relative group  my-4 z-0">
          <div className="absolute right-0 top-0 z-10">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(codeText);
                toast.success("Copied to clipboard");
              }}
              variant="default"
              size="icon"
              className="h-8 w-8"
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <SyntaxHighlighter
            language={language || "text"}
            style={atomOneDark}
            customStyle={{
              margin: 0,
              borderRadius: "8px",
              padding: "6px",
              fontSize: "12px",
              background: "rgb(24 24 27)",
            }}
            showLineNumbers={true}
            wrapLongLines={true}
            PreTag="code"
          >
            {codeText}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <code className={cn("bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono text-sm", className)} {...props}>
        {children}
      </code>
    );
  },
  // Handle pre tags
  pre: ({ className, ...props }) => <pre className={cn("not-prose", className)} {...props} />,
});

MemoizedMarkdown.displayName = "MemoizedMarkdown";

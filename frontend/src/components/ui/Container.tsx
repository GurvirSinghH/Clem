import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type ContainerWidth = "reading" | "content" | "composer";

/**
 * Centered width-constrained column. Widths come from TOKENS.md → Layout;
 * horizontal padding follows padding-container across breakpoints.
 */
const widthClasses: Record<ContainerWidth, string> = {
  reading: "max-w-reading",
  content: "max-w-content",
  composer: "max-w-composer",
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

export function Container({
  width = "reading",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-5 lg:px-6",
        widthClasses[width],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

import * as React from "react";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  const classes = [
    "animate-pulse",
    "rounded-md",
    "bg-muted",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}

export default Skeleton;



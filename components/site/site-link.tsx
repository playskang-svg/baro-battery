import type { AnchorHTMLAttributes } from 'react';

/**
 * Document navigation is intentional: the deployed Vinext client router throws
 * after preventing the anchor's default action. Native links preserve history,
 * modified clicks, query strings and navigation without JavaScript.
 */
export default function SiteLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{children}</a>;
}

// Pages are built on Netlify in UTC. Dates are shown in Maine time so a post
// published late in the evening doesn't render as the next day.
const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "America/New_York" });
const isoDateFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" });

export function formatDate(date: Date) {
  return dateFormat.format(date);
}

/** YYYY-MM-DD in Maine time, for <time datetime>. */
export function isoDate(date: Date) {
  return isoDateFormat.format(date);
}

/** True when `pathname` is `href` or a page beneath it ("/blog" matches "/blog/a-post/", not "/blogroll"). */
export function isCurrentSection(pathname: string, href: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const target = href.replace(/\/+$/, "") || "/";
  return path === target || (target !== "/" && path.startsWith(`${target}/`));
}

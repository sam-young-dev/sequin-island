// The visiting season: volunteer caretakers live on the island from Memorial Day
// through Labor Day. Used at build time for the static page and again in the
// browser, so a page built weeks ago still reports today's state.

/** Last Monday in May. */
export function memorialDay(year: number) {
  const date = new Date(Date.UTC(year, 4, 31));
  date.setUTCDate(31 - ((date.getUTCDay() + 6) % 7));
  return date;
}

/** First Monday in September. */
export function laborDay(year: number) {
  const date = new Date(Date.UTC(year, 8, 1));
  date.setUTCDate(1 + ((8 - date.getUTCDay()) % 7));
  return date;
}

/** Today's calendar date on the Maine coast, as a UTC midnight. */
export function maineToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(now);
  const part = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  return new Date(Date.UTC(part("year"), part("month") - 1, part("day")));
}

export interface SeasonState {
  open: boolean;
  /** Memorial Day that opens (or opened) the current or next season. */
  opens: Date;
  /** Labor Day that closes the current or next season. */
  closes: Date;
}

export function seasonState(now = new Date()): SeasonState {
  const today = maineToday(now);
  const year = today.getUTCFullYear();
  const opens = memorialDay(year);
  const closes = laborDay(year);
  if (today < opens) return { open: false, opens, closes };
  if (today <= closes) return { open: true, opens, closes };
  return { open: false, opens: memorialDay(year + 1), closes: laborDay(year + 1) };
}

export function formatSeasonDate(date: Date, withYear = false) {
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

/** The status lines for the season column, shared by the build and the browser. */
export function seasonCopy(state: SeasonState) {
  return state.open
    ? {
        season: "In season",
        caretakers: `On the island through Labor Day, ${formatSeasonDate(state.closes)}.`,
        tower: "Tours with a caretaker. Check the Keeper’s Blog for closures.",
      }
    : {
        season: "Off season",
        caretakers: `Back on the island Memorial Day, ${formatSeasonDate(state.opens, true)}.`,
        tower: "No tower or museum tours until the caretakers return. Camping reservations open March 1.",
      };
}

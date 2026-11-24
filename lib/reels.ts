/** Course story reels in public/videos/courses, keyed by course slug.
 *  Lives outside the "use client" StoryReel module so server pages can read it
 *  (a value exported from a client module is only a reference on the server). */
export const REELS: Record<string, string> = {
  bls: "bls",
  "heartsaver-cpr-first-aid-aed": "heartsaver",
  "pediatric-first-aid-cpr-aed": "pediatric",
};

# GridGuard
Hackathon project focused on improving power grid reliability, monitoring, and efficiency using smart software solutions.
Dataset

**45 real utility construction projects**, individually sourced from two public regulatory/planning documents — no fabricated or placeholder entries.

### Sources

- **2026 SERTP Preliminary Expansion Plan Report (Non-CEII)** — a real, current regional transmission planning document covering 10 Southeast utilities (southeasternrtp.com). 34 of our 45 projects come from here.
- **Dominion Energy's public "Power Line Projects" pages** — individual project pages with real construction timelines (dominionenergy.com). The remaining 9 projects (all Dominion Energy South Carolina) come from here.

### Composition

| Company | Projects | States covered |
|---|---|---|
| Georgia Power | 25 | GA, AL |
| Dominion Energy South Carolina | 9 | SC |
| Duke Energy | 6 | NC, SC |
| LG&E/KU | 2 | KY |
| PowerSouth | 2 | AL, FL |
| AECI | 1 | MO |

### Known limitations

- **Coordinates are city/town-center points, not exact project sites.** Utilities are legally restricted (CEII — Critical Energy Infrastructure Information) from publishing exact coordinates for high-voltage infrastructure, so precise site-level data isn't publicly available. Coordinates here are accurate to the named town/city, not the specific substation or line route.
- **Coordinate confidence varies by row** and is documented per-entry: roughly 20 were individually verified via web search this session, ~24 are high-confidence general knowledge of real incorporated cities, and 1 is a rougher estimate (a Savannah neighborhood).
- **Dates are a mix of real and estimated.** Some projects have real construction timelines pulled directly from source filings; others only had an "in-service year" published, so a plausible date was estimated rather than left blank.

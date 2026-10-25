# Releasing sciencebyhugs.com

The same rules apply in every Science By Hugs repository: Core, Nexus, Pulse and the website.

## Branches

| Branch | Means | Who changes it |
| --- | --- | --- |
| `main` | What is live on sciencebyhugs.com (GitHub Pages deploys every push to `main`) | Pull request only, merged by Anthony |
| `feat/…`, `fix/…`, `design/…`, `ci/…`, `docs/…` | One piece of work | Anyone; deleted automatically after merge |
| `archive/2026-10-25` | Old branches kept for reference (see `ARCHIVE.md` on that branch) | Never merged |

- Nobody pushes straight to `main`. Changes go through a pull request with CI passing.
- Work branches start from `main` and target it.
- Stacked work (one PR building on another) points each PR at the branch before it, so every PR shows only its own changes. Merge from the bottom up.

## Versions

sciencebyhugs.com uses `MAJOR.MINOR.PATCH`:

- **MAJOR**: a new generation of the app (1.0 → 2.0).
- **MINOR**: new features.
- **PATCH**: fixes only.

The website is versioned by date instead: `YYYY.MM.DD`, with `.2`, `.3` for more than one release on a day.

## Tags and releases

Every build that leaves the building gets a git tag and a GitHub Release.

| Kind | Tag | Example |
| --- | --- | --- |
| Website release | `site-YYYY.MM.DD` | `site-2026.10.15` (current live site, commit `5ca67f6`) |

The release notes say what changed, the exact commit, and how it was verified (CI run, device checks). 

Never tag a commit you can't prove the build came from.

## Approvals

- Draft PRs, branches and CI changes: anyone.
- Merging, deploying, signed builds, TestFlight or App Store uploads, and production changes: **Anthony only, each time, for that specific action**.
- Staging work never touches production backends.

## Restoring an archived branch

```sh
git fetch origin archive/2026-10-25
git show origin/archive/2026-10-25:ARCHIVE.md   # find the branch and its commit
git push origin <commit>:refs/heads/<branch>
```

## Description

Closes: regen-network/regen-registry#XXXX

<!-- Add a description of the changes that this PR introduces and the files that
are the most critical to review. -->

---

### Author Checklist

_All items are required. Please add a note to the item if the item is not applicable and
please add links to any relevant follow up issues._

I have...

- [ ] provided a link to the relevant issue or specification
- [ ] provided instructions on how to test
- [ ] reviewed "Files changed" and left comments if necessary
- [ ] confirmed all CI checks have passed
- [ ] once the PR is closed, set up backport PRs for `redwood`, `hambach` and optionally `master` (see below)

#### Setting up backport PRs

After merging your PR to `dev`, set up backports by doing the following:

1. If your branch does not have merge commits, add the following comment to
   your PR:

- If PR is a new feature: `@Mergifyio backport redwood hambach`.
- If PR is a bug fix: `@Mergifyio backport redwood hambach master`.

2. If your branch does have merge commits:

   a. Pull latest `dev`, `hambach` and `redwood` branches

   b. Create new branches for backports and merge `dev` (replace `<PR#>` with your PR #)

   ```
   git checkout -b hambach-backport-<PR#> hambach
   git merge dev
   git push origin hambach-backport-<PR#>
   git checkout -b redwood-backport-<PR#> redwood
   git merge dev
   git push origin redwood-backport-<PR#>`
   ```

   c. Open new PRs in regen-web targeting `hambach` and `redwood`, respectively.

   d. If PR is a bug fix repeat the same process for `master` branch.

### How to test

1.

### Reviewers Checklist

_All items are required. Please add a note if the item is not applicable and please **add
your handle next to the items reviewed if you only reviewed selected items**._

I have...

- [ ] confirmed all author checklist items have been addressed
- [ ] reviewed code correctness and readability
- [ ] verified React components follow DRY principles
- [ ] reviewed documentation is accurate
- [ ] reviewed tests
- [ ] manually tested (if applicable)

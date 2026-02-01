---
trigger: always_on
---

<!--
## **description:** Control which shell commands the agent may run automatically.
**allowAuto:** ["julia main.jl", "julia --project test/runtests.jl", "git status"]
**denyAuto:** ["rm -rf",, "Remove-Item", "git push --force", "curl | bash"]
**alwaysReview:** true
**scopes:** ["src/**", "test/**"]

# Execution Rules

* Only auto-execute commands that are explicitly listed in `allowAuto`.
* Commands in `denyAuto` must always be blocked, even if manually requested.
* All shell operations that create, modify, or delete files in `src/` or `test/` require human review.
* Alert if environment variables related to DB connection or secrets would be displayed or logged.
-->
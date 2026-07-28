---
applyTo: "**/*"
---

# Documentation Maintenance Requirements

Documentation is part of the implementation and must be maintained whenever code changes are made.

For every coding task, determine whether the change affects any of the following:

- Features or functionality
- User interface or user experience
- Configuration
- Installation
- Deployment
- Dependencies
- API contracts
- Data formats
- Architecture or design decisions
- Usage instructions
- Code examples
- Security-related behaviour
- Known limitations
- Troubleshooting guidance

If any of these areas are affected:

- Update README.md before considering the task complete.
- Ensure all examples match the current implementation.
- Remove obsolete or superseded documentation.
- Document any new functionality, configuration, dependencies, or behavioural changes.
- Ensure installation, deployment, configuration, and usage instructions remain accurate.

After every coding task:

1. Review README.md for accuracy and completeness.
2. Update README.md whenever required.
3. If no documentation changes are necessary, explicitly state:

   "README.md review completed - no updates required."

Documentation must never knowingly contradict the current implementation.

When implementing changes:

- Treat README.md updates as part of the definition of done.
- Prefer updating documentation in the same change as the code update.
- Flag any documentation gaps, ambiguities, or outdated content discovered during the task, even if unrelated to the requested change.
- Never assume documentation is correct without reviewing it against the implementation.

# Protected Content Files

Files under the following folder are maintained manually and are considered authoritative content:

- ai-prompts/

Rules:
- Never modify files under ai-prompts/.
- Never suggest wording improvements for files under ai-prompts/.
- Never reformat files under ai-prompts/.
- Never update files under ai-prompts/ as part of a feature implementation.
- Treat files under ai-prompts/ as read-only reference content.
- Only modify files under ai-prompts/ if the user explicitly requests a change to a specific file in that folder.

# Versioning and Changelog Maintenance

For every coding task, classify the change as one of:
- User-visible
- Internal (non-user-visible)
- Chore-only

Rules:
- User-visible: must update version in `js/version.js` and add or update an entry in `CHANGELOG.md`.
- Internal (non-user-visible): must also update version in `js/version.js` and add or update an entry in `CHANGELOG.md`.
- Chore-only: do not update version or changelog unless explicitly requested.

SemVer:
- PATCH: fixes, small improvements, and internal refactors, hardening, or performance updates.
- MINOR: new features or meaningful improvements (including significant internal engineering improvements).
- MAJOR: breaking changes.

Changelog format:
- User-visible changes under Added, Changed, or Fixed.
- Internal changes under Internal (or Changed: Internal).
- Keep the latest changelog version aligned with `APP_INFO.version` in `js/version.js`.

Required final-task statement:
- Version/Changelog updated: yes (classification: User-visible or Internal, version: X.Y.Z)
- or
- Version/Changelog updated: no (classification: Chore-only, reason: ...)

# AI-ABCX Operational Terminology

This file defines the intended meaning of the main operational terms that currently appear across the AI-ABCX product surfaces.

## Core distinction

- `Closeout`
  - Means the post-appointment outcome layer.
  - This is where the system records structured result truth, amount paid, cancellation truth, no-show truth, or whether the job must stay alive as follow-up.
  - Primary surface: `closeout.html`.

- `Follow-Up`
  - Means a job that stays alive after the main appointment because the business path is not actually finished yet.
  - Examples: estimate revision, approved but schedule hold, return visit required, service completion pending.
  - Follow-up is a job state, not a separate replacement for closeout.
  - Primary surfaces: President Dashboard filter state, President Follow-Up, Closeout outcome handling.

- `Tasks`
  - Means general management work items or operational action items that are broader than one appointment closeout.
  - Examples: callback queues, owner review actions, approval queues, management assignments, publishing tasks.
  - This term should remain available where the product is talking about real management work rather than the appointment closeout board.

## Naming rules

- Use `Closeout` when the surface is about:
  - appointment result truth
  - payment truth
  - cancellation / no-show truth
  - deciding whether the job closes or stays open as follow-up

- Use `Follow-Up` when the surface is about:
  - what next step keeps the same job alive
  - post-appointment pressure that is not fully resolved
  - structured reasons such as estimate revision or approved schedule hold

- Use `Tasks` only when the surface is about:
  - broader management work queues
  - callbacks or owner-review work not limited to one appointment closeout
  - future advanced management or staff-management layers

## Product wording guidance

- Preferred page name:
  - `Closeout Board`

- Preferred short nav label:
  - `Closeout`

- Avoid calling the Closeout Board:
  - `Tasks`
  - `My Tasks`
  - `Follow-Up Tasks`

- Keep `Tasks` wording when the content is actually a management-work queue and not the closeout surface.

## Practical examples

- Good:
  - `Closeout Board`
  - `Mark Follow-Up`
  - `Follow-Up Pressure`
  - `Management Tasks`

- Avoid:
  - using `Tasks` as the name of the closeout page
  - using `Follow-Up` as if it replaces closeout entirely
  - using `Tasks` when the actual function is payment/outcome truth

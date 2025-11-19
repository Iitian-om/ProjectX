ProjectX — n8n documentation
=============================

This folder contains n8n workflow exports and documentation for the ProjectX n8n setup.

Workflows in this folder
- `G3aM9xOHeetfs1Dz-ProjectX_Inbound_Sync.json`  — Original n8n Cloud export (Inbound Sync)
- `projectx-task-sync.json`                         — Working version created during migration
- `projectx-task-sync-FIXED.json`                   — Fixed version used in Render self-hosted
- `one.json`                                        — scratch / test export

Why these files exist
- We migrated from n8n Cloud (14-day trial) to a self-hosted n8n on Render.
- The exports are kept so workflows can be re-imported if the Render free service restarts (no persistent disk).

Summary of what we changed (high level)
- Created an n8n workflow that exposes a webhook `/projectx/sync` and routes CRUD actions (create, read, update, delete) to MongoDB.
- Fixed the workflow's Set/MongoDB nodes so the response format works with our API.
- Important: n8n's MongoDB node behavior created a wrapper in some inserts (`{ documents: [ {...} ] }`) — we handled this in the API and adjusted the Insert node to insert the correct document object when possible.
- Updated the frontend API `frontend/pages/api/tasks.js` to safely parse the responses returned by n8n (handles both wrapped `json.documents[0]` and flat `json` formats).

Notes / Known quirks
1. Inserted documents sometimes end up wrapped in a `documents` array (this is n8n/MongoDB node configuration dependent). We left the workflow able to insert both ways to preserve compatibility. The API now unwraps `json.documents[0]` when present.
2. Render free tier services may restart and lose workflows unless you add persistent disk on a paid plan. Keep exports in this repo and re-import after a restart.

Quick checklist after any workflow change
- Export workflow JSON and save to `n8n/workflows/` (filename with timestamp or workflow id is recommended)
- Commit the export(s) to the repo
- Test create/read/update/delete from the frontend and verify MongoDB contents in Atlas

Where to find import instructions
- See `n8n/IMPORT_AND_BACKUP.md` for step-by-step import, credentials, and backup instructions.

Contact
- If something in the workflow behaves unexpectedly, open an issue or DM with: logs from n8n execution (Executions view), the exact payload sent by the API (server logs), and a MongoDB sample document.

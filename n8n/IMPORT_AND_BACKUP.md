Import & Backup — n8n workflows for ProjectX
=============================================

This doc explains how to import the workflow exports in this repo into your running n8n instance, how to configure the MongoDB credentials, and how to back up workflows after editing.

Prerequisites
- An n8n instance (self-hosted). Example used in migration: Render service at `https://projectx-n8n-latest.onrender.com`.
- MongoDB Atlas connection string for the ProjectX database.
- Access to the n8n UI (admin account created during setup).

Importing a workflow
1. Open your n8n editor: https://<your-n8n-host>/
2. Login with your admin account.
3. Click the top-right menu (three dots) → Import from File.
4. Choose one of the files from `n8n/workflows/`, for example `projectx-task-sync-FIXED.json`.
5. Click Import.

Configure MongoDB credentials
1. Click any MongoDB node in the imported workflow.
2. Under "Credentials", click "Create New" (or select an existing credential).
3. For MongoDB Atlas, use the connection string in the following form:
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
4. Save the credential and select it for all MongoDB nodes in the workflow.

Key workflow configuration details (what we changed)
- Webhook node: path `/projectx/sync` (POST)
- Code/Function node: reads `body.action` (create/read/update/delete) and builds the MongoDB operation object
- Switch node: routes the action to the correct MongoDB node
- Insert node: configured to insert the document extracted from `documents[0]` when we pass an array wrapper
- Set nodes: format the response to return either `tasks`/`count` or success messages for create/update/delete

Handling the MongoDB "documents" wrapper
- Some Inserts created documents like `{ documents: [ { id, title, ... } ] }` in the collection. This happens when the MongoDB node was given an object with `documents` rather than the raw document.
- The frontend API (`frontend/pages/api/tasks.js`) now unwraps `json.documents[0]` if present so the website can display tasks regardless of that wrapper.
- Best practice: Configure the Insert node to pass `{{ $json.documents[0] }}` as the document to insert (or use the Document field in the node). This inserts a flat document.

Backup workflow after editing
1. In n8n Editor, open the workflow you modified.
2. Click the three-dot menu → Export → Save JSON to disk.
3. Copy the exported file into this repo under `n8n/workflows/` with a descriptive filename: e.g. `G3aM9xOHeetfs1Dz-ProjectX_Inbound_Sync-2025-11-15.json`.
4. Commit and push the file to GitHub.

Quick test checklist after import
- Activate the workflow (toggle ON)
- Ensure MongoDB credentials are set on each MongoDB node
- Use frontend: create a task → verify n8n Executions → verify document in Atlas
- If Insert created wrapped `documents` entries, either reconfigure Insert node (document mode) or leave it and rely on the API to unwrap when reading

Recover from Render restart (free tier)
- If Render restarts the service and workflows are gone:
  1. Re-import from the saved JSON in `n8n/workflows/`.
  2. Reconnect credentials.
  3. Activate the workflow.

Commit suggestions
- Add the exported JSON file to `n8n/workflows/` and commit.
- Add a short commit message: "Add n8n workflow export: ProjectX Inbound Sync — fixed insert/response"

If anything fails
- Capture the failing n8n Execution details (open the execution, expand node input / output and copy payloads)
- Share the payloads and any error messages in this repo's issue tracker or with the developer logs


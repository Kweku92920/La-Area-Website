# The La Area Website

Website for The Church of Pentecost, LA Area.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Check the production build with:

```bash
npm run build
```

Configure these variables in `.env.local` and in the deployment environment:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SITE_URL=https://coplaarea.org
SANITY_WRITE_TOKEN=
SANITY_REVALIDATE_SECRET=
```

`SANITY_WRITE_TOKEN` is used only by trusted server-side mutation helpers and
the seed script. Use a Sanity API token with write access. Never expose it
through a `NEXT_PUBLIC_` variable or browser code. Sanity Studio writes use the
signed-in Studio user's permissions.

## Publish changes from Sanity Studio

The frontend reads published documents from the `production` dataset. Draft
documents do not appear on public pages until published.

For immediate cache refresh after publishing, unpublishing, or deleting:

1. Set `SANITY_REVALIDATE_SECRET` to a long random value in the deployment
   environment.
2. In Sanity, create a webhook for the same project and `production` dataset.
   Select create, update, and delete events, and use this GROQ filter to cover
   the content types currently queried by the website while ignoring drafts:

   ```groq
   !(_id in path("drafts.**")) &&
   _type in ["district", "assembly", "event", "leader", "ministry", "sermon"]
   ```

3. Set its URL to `https://<your-site-host>/api/revalidate` and add an
   `x-sanity-webhook-secret` request header with the same revalidation secret.
4. Use the default document body (JSON). The endpoint invalidates the shared
   `sanity` cache tag and the district, assembly, detail, sitemap, and site
   layout paths. Do not use the Sanity API write token as the webhook secret.

Frontend Sanity reads use `useCdn: false` and the `sanity` cache tag. Without
the webhook, production data can remain cached for up to one hour.

### Verify the webhook

1. In Sanity's webhook settings, use **Test** with a published District or
   Assembly document. Check that the delivery returns HTTP `200` and a JSON
   response with `"revalidated": true`. A `401` means the custom header does
   not match `SANITY_REVALIDATE_SECRET`; `503` means that environment variable
   is missing from the deployed environment.
2. Publish an edit to a visible document, then reload its public page. Check
   the Sanity webhook delivery log for a successful request. Route-handler
   revalidation expires the cache immediately; the next page request fetches
   fresh Sanity data. It does not push updates into an already-open browser tab.
3. To test the endpoint manually from PowerShell, set
   `$env:SANITY_REVALIDATE_SECRET` in the current shell without echoing it,
   then send a test payload:

   ```powershell
   Invoke-RestMethod -Method Post `
     -Uri "https://<your-site-host>/api/revalidate" `
     -Headers @{ 'x-sanity-webhook-secret' = $env:SANITY_REVALIDATE_SECRET } `
     -ContentType "application/json" `
     -Body '{"_id":"manual-webhook-test","_type":"assembly"}'
   ```

   A successful response confirms the route and secret work. It does not
   confirm Sanity's webhook is configured; verify that separately in its
   delivery log.
4. If the webhook responds `200` but data is still old, confirm that the
   deployment uses the same project and `production` dataset, the document is
   published (not only a draft), its GROQ query returns the changed value, and
   the webhook filter includes its `_type`. Then check the Vercel function
   logs for errors.

## Create, update, delete, and clear images through a trusted server

Use the helpers in `src/sanity/mutations.ts` only from an authorized Route
Handler or Server Action. They support creating, partially updating, and
deleting District and Assembly documents, as well as uploading or clearing
image references. Successful mutations invalidate the Sanity cache and
relevant routes. Sanity generates document IDs for newly created documents.

To clear an image, call `clearAssemblyImage(documentId)` or
`clearDistrictImage(documentId)`. This unsets the document's image field; it
does not forcibly delete the underlying asset because Sanity assets may be
shared by other documents. The assembly query resolves `image.asset->url`, so
an unset image resolves to `null` and the assembly card displays its fallback.
Sanity Studio's standard image input also supports clearing this optional
field.

For example, `updateAssembly(id, { location: 'New location', image: null })`
updates a field and clears the image in one patch. Use `deleteAssembly(id)` or
`deleteDistrict(id)` to delete a document. These helpers are not public API
endpoints; any Route Handler or Server Action that calls them must authenticate
and authorize the caller before writing.

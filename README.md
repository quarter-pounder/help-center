# Help Center (Frontend)

A custom help center project originally requested as an extension of a no-code product.
When the product itself could not support the required features, this implementation was rebuilt
from scratch in **code** for long-term maintainability.

## Tech Stack

- **Next.js 15 + React 19**
- Zustand for state management
- Tailwind CSS + shadcn/ui + Radix primitives
- Apollo Client (GraphQL)
- Styled Components (selective use)
- TypeScript 5

## Environment

Set the following variables before running locally or building on Vercel:

- `NEXT_PUBLIC_GRAPHQL_URL` – points to the Cloud Run GraphQL endpoint.
- `SERVER_SIDE_ORIGIN` – absolute origin for server-side GraphQL calls. This value must also exist inside the backend `ALLOWED_ORIGINS` list so strict origin validation passes during SSR/builds.

### Notes
- Upgraded to **React 19** with aligned type packages (`@types/react`, `@types/react-dom`).
- One deprecated subdependency remains: `node-domexception@1.0.0`.
    - Transitive only, no impact — will clear once upstream updates.
- This repo can not run out of the box right now — configs and workflows are still WIP.

## Roadmap
Architecture:
```
Frontend (Vercel) → Cloud Run (API) → Neon (DB)
↘︎ GCS (media blob storage)
```

### To-Do
- [x] Backend dev-editor mappers
- [x] Frontend: categories, guides, FAQ
- [ ] Search
- [ ] GitHub workflows (later, once project stabilizes)

## Status

Most of the frontend foundation is built — only the structured content (categories, guides, FAQ)
and backend integration remain. The next step is **wrapping this up** into a functional app.

---

Here's a rough preview if you are curious: https://help-center-roan.vercel.app/

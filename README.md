# Moleculer sd issue repo
It's a minimal issue reproduction repo.
That repo shows bug with service discovery and registry.

## Steps to reproduce
1) Run 1 consumer node via `npm run dev:consumer`
2) Run 2 db node via `npm run dev:db`
3) Kill db node via `kill -15 <pid>` where <pid> is a db app process id
4) Often consumer service will fall with `Service 'db.products.find' is not available on 'pc-30480' node.` error.

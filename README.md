<h1 align="center">MockAPI</h1>

<p align="center">
  <strong><em>Stop waiting for the backend. Mock APIs in seconds.</em></strong>
</p>

<p align="center">
  Define REST endpoints, shape JSON responses, and capture incoming webhooks — without writing a single line of server code.
</p>

<p align="center">
  <img alt="Django" src="https://img.shields.io/badge/Django-REST-0C4B33?style=flat-square&logo=django&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/Auth-JWT%20Cookies-A83248?style=flat-square" />
</p>

<p align="center">
  <img src="docks/landing_page.png" alt="MockAPI — landing page" />
</p>

---

## § 01 — Features

<table>
  <tr>
    <td width="33%"><strong>Instant Endpoints</strong><br/><sub>GET, POST, PUT, DELETE in seconds. No server, no config.</sub></td>
    <td width="33%"><strong>Realistic Responses</strong><br/><sub>Any JSON, any status code, any headers. Match your real backend.</sub></td>
    <td width="33%"><strong>Webhook Catcher</strong><br/><sub>Capture incoming requests in real-time. Debug without deploying.</sub></td>
  </tr>
  <tr>
    <td><strong>Request Logs</strong><br/><sub>Every hit recorded — method, status, payload, timestamp.</sub></td>
    <td><strong>Private by Default</strong><br/><sub>Each user's mocks are isolated and authenticated.</sub></td>
    <td><strong>Auto Light/Dark</strong><br/><sub>Theme follows the visitor's OS preference.</sub></td>
  </tr>
</table>

---

## § 02 — Demo

> Captured in dark mode. The same pages render in a warm cream "engineer's notebook" theme when the OS is in light mode.

### Dashboard
Stats, recent activity, and quick access to the rest of the app.

![Dashboard](docks/Dashboard.png)

### Create a mock
Pick a path, method, status, headers, and JSON body. We'll give you a URL.

![Create Mock API](docks/Create_Mock_API.png)

### My mocks
Every endpoint you've created, with a one-click URL copy.

![My Mocks](docks/My_Mocks.png)

### Request logs
Every hit on every mock — method-coloured, status-coloured, timestamped.

![Logs](docks/Logs.png)

---

## § 03 — Tech Stack

<table>
  <tr><td><strong>Backend</strong></td><td>Django · Django REST Framework · djangorestframework-simplejwt · django-cors-headers · psycopg</td></tr>
  <tr><td><strong>Frontend</strong></td><td>React 19 · Vite 7 · React Router 7 · Axios · Tailwind CSS v4</td></tr>
  <tr><td><strong>Database</strong></td><td>PostgreSQL (local or managed via <a href="https://neon.tech">Neon</a>)</td></tr>
  <tr><td><strong>Auth</strong></td><td>JWT in HttpOnly cookies, with refresh-token rotation and blacklist on logout</td></tr>
  <tr><td><strong>Deployment</strong></td><td><a href="https://render.com">Render</a> (backend) · <a href="https://vercel.com">Vercel</a> (frontend)</td></tr>
</table>

---

## § 04 — Quick Start

**Prerequisites:** Python 3.11+, Node 20+, a Postgres database (free tier on [Neon](https://neon.tech) works).

### Backend

```bash
cd Backend/Main
python -m venv venv
venv\Scripts\activate              # Windows
# source venv/bin/activate         # macOS / Linux

pip install -r requirements.txt
```

Create `Backend/Main/.env`:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
SECRET_KEY=<generated key>
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173
```

> Generate a `SECRET_KEY`: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`

```bash
python manage.py migrate
python manage.py runserver
```

API available at **http://localhost:8000**

### Frontend

```bash
cd Frontend/myapp
npm install
```

Create `Frontend/myapp/.env`:

```env
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

App available at **http://localhost:5173**

---

## § 05 — Deployment

### Backend → Render

1. New **Web Service** pointing to this repo
2. Build: `pip install -r Backend/Main/requirements.txt`
3. Start: `cd Backend/Main && python manage.py migrate && gunicorn Main.wsgi`
4. Environment: copy the local backend `.env`, but set **`DEBUG=False`** and replace `localhost` with your real domains

### Frontend → Vercel

1. Import the repo
2. **Root directory:** `Frontend/myapp`
3. Framework auto-detected: Vite
4. Add env var: `VITE_API_URL=https://your-render-url.onrender.com`

After both are live, update the backend's `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to your Vercel URL.

---

## § 06 — API Reference

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/register/` | Register a new user |
| `POST` | `/login/` | Login; sets HttpOnly auth cookies |
| `POST` | `/refresh/` | Refresh access token using refresh cookie |
| `GET`  | `/logout/` | Logout and blacklist the refresh token |
| `GET`  | `/check/` | Verify the current session |
| `POST` | `/mock/` | Create a mock endpoint configuration |
| `GET`  | `/dashboard/` | Dashboard stats and recent logs |
| `GET`  | `/logs/` | Full request logs for current user |
| `GET`  | `/mymocks/` | List the current user's mocks |
| `*`    | `/mock/<endpoint_id>/` | Execute a mock — accepts any HTTP method |

---

## § 07 — Environment Reference

<details>
<summary><strong>Backend env vars</strong> (Backend/Main/.env)</summary>

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | yes | Postgres connection string |
| `SECRET_KEY` | yes | Django secret key |
| `DEBUG` | no | `True` for dev, `False` for prod |
| `ALLOWED_HOSTS` | yes (prod) | Comma-separated hostnames |
| `CORS_ALLOWED_ORIGINS` | yes | Frontend origin(s) |
| `CSRF_TRUSTED_ORIGINS` | yes | Frontend origin(s) |
| `JWT_ACCESS_MINUTES` | no | Access token lifetime, default `15` |
| `JWT_REFRESH_DAYS` | no | Refresh token lifetime, default `1` |

</details>

<details>
<summary><strong>Frontend env vars</strong> (Frontend/myapp/.env)</summary>

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | yes | Backend base URL — local or Render URL in prod |

</details>

---

## § 08 — Security

- `.env` files are gitignored — never commit secrets
- All auth cookies are `HttpOnly`; refresh tokens are blacklisted on logout
- Production must enforce HTTPS and `Secure` cookies (handled by Render/Vercel)
- Rotate `SECRET_KEY` and `DATABASE_URL` if either is ever exposed

---

<p align="center"><sub>MockAPI · 2026</sub></p>

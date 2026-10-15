// Creative Element website — zero-dependency Node server.
// Serves /public, accepts free-sample requests at POST /api/lead, and shows
// them in a password-protected /admin view (course lesson 10).

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = Number(process.env.PORT) || 3000;
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_BODY = 16 * 1024;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy':
    "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; " +
    "img-src 'self' data:; media-src 'self' https:; script-src 'self'; form-action 'self'; frame-ancestors 'none'",
};

// ---------- lead storage ----------

function readLeads() {
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeLeads(leads) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = LEADS_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(leads, null, 2));
  fs.renameSync(tmp, LEADS_FILE);
}

// ---------- validation ----------

const FIELDS = {
  name: { required: true, max: 80 },
  company: { required: true, max: 120 },
  email: { required: true, max: 160, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ },
  phone: { required: false, max: 30, pattern: /^[0-9+().\-\s]{7,30}$/ },
  town: { required: true, max: 80 },
  service: { required: true, max: 80 },
  message: { required: false, max: 1000 },
};

function validateLead(input) {
  const errors = {};
  const lead = {};
  for (const [key, rule] of Object.entries(FIELDS)) {
    const raw = typeof input[key] === 'string' ? input[key] : '';
    const value = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
    if (!value) {
      if (rule.required) errors[key] = 'Required';
      continue;
    }
    if (value.length > rule.max) errors[key] = `Keep it under ${rule.max} characters`;
    else if (rule.pattern && !rule.pattern.test(value)) errors[key] = 'Check the format';
    else lead[key] = value;
  }
  if (input.consent !== true && input.consent !== 'on' && input.consent !== 'true') {
    errors.consent = 'Please confirm we can contact you about your sample';
  }
  return { lead, errors };
}

// Naive in-memory rate limit: 5 submissions per IP per 10 minutes.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

// ---------- helpers ----------

function send(res, status, body, headers = {}) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers });
  res.end(body);
}

function sendJson(res, status, obj) {
  send(res, status, JSON.stringify(obj), { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' });
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(a).digest();
  const hb = crypto.createHash('sha256').update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function isAuthorized(req) {
  if (!ADMIN_PASSWORD) return false;
  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) return false;
  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const sep = decoded.indexOf(':');
  if (sep < 0) return false;
  // Compare both parts before combining so timing doesn't reveal which one failed.
  const userOk = safeEqual(decoded.slice(0, sep), ADMIN_USER);
  const passOk = safeEqual(decoded.slice(sep + 1), ADMIN_PASSWORD);
  return userOk && passOk;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('too large'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// ---------- routes ----------

async function handleLead(req, res) {
  const ip = req.socket.remoteAddress || 'unknown';
  if (rateLimited(ip)) return sendJson(res, 429, { ok: false, error: 'Too many requests. Try again later.' });
  if (!(req.headers['content-type'] || '').includes('application/json')) {
    return sendJson(res, 415, { ok: false, error: 'Send JSON' });
  }
  let input;
  try {
    input = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid request' });
  }
  if (!input || typeof input !== 'object') return sendJson(res, 400, { ok: false, error: 'Invalid request' });
  // Honeypot: real people leave this hidden field empty.
  if (typeof input.website === 'string' && input.website.trim() !== '') return sendJson(res, 200, { ok: true });

  const { lead, errors } = validateLead(input);
  if (Object.keys(errors).length) return sendJson(res, 422, { ok: false, errors });

  const leads = readLeads();
  leads.push({
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    status: 'new — needs human review',
    source: typeof input.source === 'string' ? input.source.slice(0, 40) : 'site',
    ...lead,
  });
  writeLeads(leads);
  return sendJson(res, 201, { ok: true });
}

function handleAdmin(req, res) {
  if (!ADMIN_PASSWORD) {
    return send(res, 503, 'Admin is disabled. Set the ADMIN_PASSWORD environment variable to enable it.', {
      'Content-Type': MIME['.txt'],
    });
  }
  if (!isAuthorized(req)) {
    return send(res, 401, 'Authentication required', {
      'WWW-Authenticate': 'Basic realm="Creative Element admin", charset="UTF-8"',
      'Content-Type': MIME['.txt'],
      'Cache-Control': 'no-store',
    });
  }
  const leads = readLeads().slice().reverse();
  const rows = leads
    .map(
      (l) => `<tr>
        <td>${escapeHtml(l.receivedAt.replace('T', ' ').slice(0, 16))}</td>
        <td>${escapeHtml(l.name)}</td><td>${escapeHtml(l.company)}</td>
        <td><a href="mailto:${escapeHtml(l.email)}">${escapeHtml(l.email)}</a></td>
        <td>${escapeHtml(l.phone)}</td><td>${escapeHtml(l.town)}</td><td>${escapeHtml(l.service)}</td>
        <td>${escapeHtml(l.message)}</td><td>${escapeHtml(l.source)}</td><td>${escapeHtml(l.status)}</td>
      </tr>`
    )
    .join('');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Leads · Creative Element admin</title><link rel="stylesheet" href="/styles.css"></head>
<body class="admin"><main class="wrap">
<h1>Free-sample requests <span class="count">${leads.length}</span></h1>
<p class="muted">Every request needs human review. Nothing here has been contacted automatically. Treat these details as unconfirmed until the business confirms them (intake/fact-rules.md).</p>
<div class="table-scroll"><table><thead><tr><th>Received (UTC)</th><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Town</th><th>Service</th><th>Message</th><th>Source</th><th>Status</th></tr></thead>
<tbody>${rows || '<tr><td colspan="10">No requests yet.</td></tr>'}</tbody></table></div>
</main></body></html>`;
  return send(res, 200, html, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' });
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === '/') rel = '/index.html';
  else if (!path.extname(rel)) rel += '.html';
  const file = path.normalize(path.join(PUBLIC_DIR, rel));
  if (!file.startsWith(PUBLIC_DIR + path.sep)) return send(res, 403, 'Forbidden');
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      const notFound = path.join(PUBLIC_DIR, '404.html');
      return fs.readFile(notFound, (e, body) =>
        send(res, 404, e ? 'Not found' : body, { 'Content-Type': MIME['.html'] })
      );
    }
    const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;
    if (range && type.startsWith('video/')) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      const start = m && m[1] ? Number(m[1]) : 0;
      const end = m && m[2] ? Number(m[2]) : stat.size - 1;
      if (start >= stat.size || end >= stat.size || start > end) {
        return send(res, 416, '', { 'Content-Range': `bytes */${stat.size}` });
      }
      res.writeHead(206, {
        ...SECURITY_HEADERS,
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
      });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { ...SECURITY_HEADERS, 'Content-Type': type, 'Content-Length': stat.size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');
    if (pathname === '/api/lead') {
      if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
      return await handleLead(req, res);
    }
    if (pathname === '/admin' || pathname.startsWith('/admin/')) return handleAdmin(req, res);
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');
    return serveStatic(req, res, pathname);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) send(res, 500, 'Server error');
  }
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Creative Element site on http://localhost:${PORT}`);
    if (!ADMIN_PASSWORD) console.log('Admin disabled: set ADMIN_PASSWORD to enable /admin');
  });
}

module.exports = { server, validateLead };

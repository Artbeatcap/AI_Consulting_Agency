/// <reference path="../pb_data/types.d.ts" />

/**
 * GHL Contact Proxy
 * POST /api/ghl/contact
 *
 * Keeps GHL_WEBHOOK_URL server-side only.
 * Validates input, enforces per-IP rate limiting, then forwards to GHL.
 *
 * Required server env var:
 *   GHL_WEBHOOK_URL  — your GrowthHub365 Inbound Webhook URL
 *
 * Optional server env var:
 *   GHL_CUSTOM_FIELD_HOW_DID_YOU_HEAR_ID — GHL custom field ID
 */

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter: max 5 submissions per IP per 15 minutes
// ---------------------------------------------------------------------------
const rateLimitMap = new Map(); // ip -> { count, windowStart }
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, 500); // cap field length
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------
routerAdd("POST", "/api/ghl/contact", (c) => {
  // --- Rate limiting ---
  const ip =
    c.request().header.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    c.realIP();

  if (isRateLimited(ip)) {
    return c.json(429, {
      error: "Too many submissions. Please wait 15 minutes and try again.",
    });
  }

  // --- Parse body ---
  const body = $apis.requestInfo(c).data;

  const firstName   = sanitize(body.firstName);
  const lastName    = sanitize(body.lastName);
  const email       = sanitize(body.email);
  const phone       = sanitize(body.phone);
  const company     = sanitize(body.company);
  const message     = sanitize(body.message);
  const howDidYouHear = sanitize(body.howDidYouHear);

  // --- Validate required fields ---
  if (!email || !isValidEmail(email)) {
    return c.json(400, { error: "A valid email address is required." });
  }
  if (!firstName) {
    return c.json(400, { error: "First name is required." });
  }

  // --- Resolve webhook URL from server env ---
  const webhookUrl = $os.getenv("GHL_WEBHOOK_URL");
  if (!webhookUrl) {
    console.error("[ghl_proxy] GHL_WEBHOOK_URL env var is not set.");
    return c.json(500, {
      error: "Form submission is temporarily unavailable. Please try again later.",
    });
  }

  // --- Build GHL payload ---
  const payload = {
    firstName,
    lastName,
    email,
    phone,
    company,
    message,
    howDidYouHear,
    source: "Website Strategy Call Form",
  };

  // Attach custom field if configured
  const customFieldId = $os.getenv("GHL_CUSTOM_FIELD_HOW_DID_YOU_HEAR_ID");
  if (customFieldId && howDidYouHear) {
    payload.customFields = [
      { id: customFieldId, field_value: howDidYouHear },
    ];
  }

  // --- Forward to GHL ---
  let res;
  try {
    res = $http.send({
      url: webhookUrl,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      timeout: 10, // seconds
    });
  } catch (err) {
    console.error("[ghl_proxy] HTTP send failed:", err);
    return c.json(502, {
      error: "Could not reach CRM. Please try again or contact us directly.",
    });
  }

  if (res.statusCode >= 200 && res.statusCode < 300) {
    return c.json(200, { success: true });
  }

  console.error(
    `[ghl_proxy] GHL returned non-2xx: ${res.statusCode} — ${res.raw}`
  );
  return c.json(502, {
    error: "Submission received but CRM returned an error. We'll follow up manually.",
  });
});

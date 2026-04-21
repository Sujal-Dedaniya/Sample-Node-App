const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = '3.0.0';
const COLOR = 'Purple';

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>App v${VERSION} — Purple</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;600&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --purple-deep:   #1a0533;
      --purple-mid:    #2e0b5e;
      --purple-accent: #7c3aed;
      --purple-glow:   #a855f7;
      --purple-soft:   #d8b4fe;
      --text:          #e2e8f0;
      --muted:         #64748b;
    }

    body {
      background: var(--purple-deep);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px);
      background-size: 40px 40px;
      animation: gridShift 20s linear infinite;
      pointer-events: none;
    }

    @keyframes gridShift {
      0%   { transform: translateY(0); }
      100% { transform: translateY(40px); }
    }

    .orb {
      position: fixed;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%);
      top: -100px; left: -100px;
      animation: orbFloat 8s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes orbFloat {
      0%, 100% { transform: translate(0, 0); }
      50%       { transform: translate(60px, 40px); }
    }

    .card {
      position: relative;
      z-index: 1;
      background: rgba(46, 11, 94, 0.6);
      border: 1px solid rgba(168, 85, 247, 0.25);
      border-radius: 20px;
      padding: 48px 56px;
      max-width: 560px;
      width: 90%;
      backdrop-filter: blur(20px);
      box-shadow:
        0 0 0 1px rgba(168,85,247,0.1),
        0 25px 60px rgba(0,0,0,0.5),
        inset 0 1px 0 rgba(255,255,255,0.06);
      animation: fadeUp 0.7s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(168,85,247,0.15);
      border: 1px solid rgba(168,85,247,0.35);
      border-radius: 999px;
      padding: 6px 16px;
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      letter-spacing: 2px;
      color: var(--purple-soft);
      text-transform: uppercase;
      margin-bottom: 28px;
    }

    .badge .dot {
      width: 7px; height: 7px;
      background: var(--purple-glow);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--purple-glow);
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.75); }
    }

    h1 {
      font-family: 'Space Mono', monospace;
      font-size: 2.6rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.1;
      margin-bottom: 10px;
    }

    h1 span { color: var(--purple-glow); }

    .subtitle {
      color: var(--muted);
      font-size: 0.95rem;
      font-weight: 300;
      margin-bottom: 36px;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 32px;
    }

    .meta-item {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      padding: 14px 16px;
    }

    .meta-label {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .meta-value {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--purple-soft);
      word-break: break-all;
    }

    .status-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(168,85,247,0.08);
      border: 1px solid rgba(168,85,247,0.2);
      border-radius: 10px;
      padding: 12px 16px;
      font-family: 'Space Mono', monospace;
      font-size: 12px;
      color: var(--purple-soft);
    }

    .status-bar .indicator {
      width: 8px; height: 8px;
      background: #a855f7;
      border-radius: 50%;
      box-shadow: 0 0 8px #a855f7;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
  <div class="orb"></div>
  <div class="card">
    <div class="badge"><span class="dot"></span> Purple Deployment · ECS</div>
    <h1>App <span>v${VERSION}</span></h1>
    <p class="subtitle">Third release — running on AWS ECS with blue/green deployment</p>

    <div class="meta-grid">
      <div class="meta-item">
        <div class="meta-label">Version</div>
        <div class="meta-value">${VERSION}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Environment</div>
        <div class="meta-value">Purple (Active)</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Hostname</div>
        <div class="meta-value">${os.hostname()}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Port</div>
        <div class="meta-value">${PORT}</div>
      </div>
    </div>

    <div class="status-bar">
      <span class="indicator"></span>
      Service is healthy and accepting traffic
    </div>
  </div>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    version: VERSION,
    color: COLOR,
    hostname: os.hostname(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🟣 App v${VERSION} (${COLOR}) running on port ${PORT}`);
});
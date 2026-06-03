/* =========================================================
   RATIO — client runtime
   Ported from the design prototype's three vanilla scripts:
   background canvas · signature interactives A/B/C · UI wiring,
   plus the final-CTA grain. Combined into a single init() that
   the client component runs exactly once after mount.
   ========================================================= */

export function initRatio() {
  initBackground();
  initInteractives();
  initUI();
  initGrain();
}

/* ---------------------------------------------------------
   Interactive background — a field of "data nodes".
   --------------------------------------------------------- */
function initBackground() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = 0,
    H = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const nodes = [];
  const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };
  const FIELD = 168; // radius of the cursor verification field
  let NODE_COUNT = 0;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    NODE_COUNT = Math.round(Math.min(120, Math.max(46, (W * H) / 15000)));
    seed();
  }

  function seed() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.8,
        lit: 0,
        seed: Math.random() * 6.28,
      });
    }
  }

  const sparks = [];
  function spawnSpark(a, b) {
    if (sparks.length > 60) return;
    sparks.push({
      ax: a.x,
      ay: a.y,
      bx: b.x,
      by: b.y,
      t: 0,
      sp: 0.012 + Math.random() * 0.02,
    });
  }

  const MAX_DIST = 132;
  let frame = 0;

  function tick() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      n.x += Math.sin(frame * 0.004 + n.seed) * 0.06;
      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;

      const dx = pointer.x - n.x,
        dy = pointer.y - n.y;
      const d = Math.hypot(dx, dy);
      if (pointer.active && d < FIELD) {
        const f = 1 - d / FIELD;
        n.lit = Math.min(1, n.lit + f * 0.12);
        n.x += (dx / d) * f * 0.5;
        n.y += (dy / d) * f * 0.5;
      } else {
        n.lit *= 0.94;
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x,
          dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) {
          const base = 1 - dist / MAX_DIST;
          const lit = Math.max(a.lit, b.lit);
          if (lit > 0.04) {
            ctx.strokeStyle = `rgba(245,181,68,${(base * lit * 0.6).toFixed(3)})`;
            ctx.lineWidth = 0.6 + lit * 0.7;
            if (lit > 0.55 && Math.random() < 0.012) spawnSpark(a, b);
          } else {
            ctx.strokeStyle = `rgba(154,154,162,${(base * 0.12).toFixed(3)})`;
            ctx.lineWidth = 0.5;
          }
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const lit = n.lit;
      if (lit > 0.04) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(245,181,68,${(lit * 0.16).toFixed(3)})`;
        ctx.arc(n.x, n.y, n.r + 7 * lit, 0, 6.2832);
        ctx.fill();
      }
      ctx.beginPath();
      const g = lit;
      const cr = Math.round(120 + g * 125);
      const cg = Math.round(110 + g * 71);
      const cb = Math.round(116 - g * 48);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${(0.45 + g * 0.5).toFixed(3)})`;
      ctx.arc(n.x, n.y, n.r + g * 0.8, 0, 6.2832);
      ctx.fill();
    }

    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.t += s.sp;
      if (s.t >= 1) {
        sparks.splice(i, 1);
        continue;
      }
      const x = s.ax + (s.bx - s.ax) * s.t;
      const y = s.ay + (s.by - s.ay) * s.t;
      ctx.beginPath();
      ctx.fillStyle = `rgba(247,194,90,${(1 - s.t).toFixed(3)})`;
      ctx.arc(x, y, 1.6, 0, 6.2832);
      ctx.fill();
    }

    if (pointer.active) {
      const grad = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        FIELD
      );
      grad.addColorStop(0, "rgba(245,181,68,0.06)");
      grad.addColorStop(1, "rgba(245,181,68,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, FIELD, 0, 6.2832);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener(
    "mousemove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    },
    { passive: true }
  );
  window.addEventListener("mouseleave", () => {
    pointer.active = false;
    pointer.x = -9999;
    pointer.y = -9999;
  });
  window.addEventListener("resize", resize);

  resize();
  if (reduce) {
    (function once() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < MAX_DIST) {
            ctx.strokeStyle = `rgba(154,154,162,${((1 - dist / MAX_DIST) * 0.1).toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(120,110,116,0.5)";
        ctx.arc(n.x, n.y, n.r, 0, 6.2832);
        ctx.fill();
      }
    })();
  } else {
    requestAnimationFrame(tick);
  }
}

/* ---------------------------------------------------------
   Signature interactives A · B · C
   --------------------------------------------------------- */
function initInteractives() {
  /* INTERACTIVE A — "One question. Two answers." */
  (function () {
    const root = document.getElementById("iv-a");
    if (!root) return;

    const DATA = {
      q1: {
        q: "What was Q3 net revenue?",
        wrongTables: ["rev_v1", "rev_v2", "rev_raw", "rev_v1"],
        landed: "rev_v1",
        wrongVal: "$2.41M",
        wrongFoot: "⚠ unverified · guessed from column names",
        rightVal: "$3.18M",
        why: [
          "net_revenue = gross − refunds − discounts",
          "source · rev_verified",
          "signed off · D. Osei",
        ],
      },
      q2: {
        q: "How many active users last week?",
        wrongTables: ["users", "events", "sessions", "events"],
        landed: "events",
        wrongVal: "84,120",
        wrongFoot: "⚠ unverified · counts bots + test accounts",
        rightVal: "48,210",
        why: [
          "excludes bot + test traffic",
          "source · events.qualifying",
          "signed off · M. Lin",
        ],
      },
      q3: {
        q: "What's our conversion rate?",
        wrongTables: ["orders", "sessions", "checkouts", "sessions"],
        landed: "sessions",
        wrongVal: "4.8%",
        wrongFoot: "⚠ unverified · sessions inflate denominator",
        rightVal: "2.6%",
        why: [
          "conversions ÷ unique visitors",
          "source · funnel_verified",
          "signed off · R. Patel",
        ],
      },
    };

    const chipWrap = root.querySelector(".iv-a-chips");
    const Lpick = root.querySelector(".left .table-pick");
    const Lval = root.querySelector(".left .ans-value");
    const Lfoot = root.querySelector(".left .ans-foot");
    const Rval = root.querySelector(".right .ans-value");
    const Rfoot = root.querySelector(".right .ans-foot");
    const Rchip = root.querySelector(".right .ans-head .right-chip");

    let gen = 0;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    async function run(key) {
      const d = DATA[key];
      const my = ++gen;

      Lpick.innerHTML = "";
      Lval.innerHTML = '<span class="ans-cursor show"></span>';
      Lfoot.textContent = "";
      Lfoot.style.opacity = 0;
      Rval.innerHTML = '<span class="ans-cursor show"></span>';
      Rfoot.innerHTML = "";
      Rfoot.style.opacity = 0;
      if (Rchip) Rchip.style.opacity = 0;

      await wait(350);
      if (my !== gen) return;

      Lpick.innerHTML = "picking a table… ";
      const tspan = document.createElement("span");
      tspan.className = "tbl flick";
      Lpick.appendChild(tspan);
      for (let i = 0; i < d.wrongTables.length; i++) {
        if (my !== gen) return;
        tspan.textContent = d.wrongTables[i];
        await wait(230);
      }
      tspan.textContent = d.landed;
      tspan.classList.remove("flick");
      Lpick.firstChild.textContent = "guessed table → ";

      await wait(250);
      if (my !== gen) return;
      await typeInto(Lval, d.wrongVal, my, "left");
      if (my !== gen) return;
      Lfoot.textContent = d.wrongFoot;
      Lfoot.style.transition = "opacity .3s ease";
      Lfoot.style.opacity = 1;

      await wait(150);
      if (my !== gen) return;
      await typeInto(Rval, d.rightVal, my, "right", 55);
      if (my !== gen) return;
      if (Rchip) {
        Rchip.style.transition = "opacity .3s ease";
        Rchip.style.opacity = 1;
      }
      Rfoot.innerHTML = d.why
        .map(
          (w, i) =>
            `<div class="why-line" style="opacity:0;transform:translateY(4px)">${i === 0 ? "<b>" + w + "</b>" : w}</div>`
        )
        .join("");
      Rfoot.style.opacity = 1;
      const lines = Rfoot.querySelectorAll(".why-line");
      for (const ln of lines) {
        if (my !== gen) return;
        ln.style.transition = "opacity .3s ease, transform .3s ease";
        ln.style.opacity = 1;
        ln.style.transform = "none";
        await wait(120);
      }
    }

    async function typeInto(el, text, my, side, speed = 70) {
      el.innerHTML = "";
      const cur = document.createElement("span");
      cur.className = "ans-cursor show";
      el.appendChild(document.createTextNode(""));
      el.appendChild(cur);
      for (let i = 0; i < text.length; i++) {
        if (my !== gen) return;
        el.firstChild.textContent = text.slice(0, i + 1);
        await wait(speed + (side === "left" ? Math.random() * 60 : 0));
      }
      cur.classList.remove("show");
    }

    Object.keys(DATA).forEach((key, i) => {
      const b = document.createElement("button");
      b.className = "q-chip" + (i === 0 ? " active" : "");
      b.textContent = DATA[key].q;
      b.addEventListener("click", () => {
        chipWrap
          .querySelectorAll(".q-chip")
          .forEach((c) => c.classList.remove("active"));
        b.classList.add("active");
        run(key);
      });
      chipWrap.appendChild(b);
    });

    let played = false;
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting && !played) {
            played = true;
            run("q1");
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(root);
  })();

  /* INTERACTIVE B — "Watch a metric get verified." */
  (function () {
    const root = document.getElementById("iv-b");
    if (!root) return;

    const METRICS = {
      active_users: {
        label: "active_users",
        ask: "Two raw tables: events, users. No labels, no intent.",
        tables: ["events", "users"],
        candidates: [
          { sql: "COUNT(user_id)", note: "counts bots" },
          { sql: "COUNT(DISTINCT user_id)", note: "includes test accounts" },
          { sql: "COUNT(DISTINCT session_id)", note: "wrong grain" },
        ],
        correct: "COUNT(DISTINCT user_id)\n  FILTER (WHERE events.qualifying)",
        edge: "excludes bot + test traffic",
        owner: "M. Lin",
        period: "2024-Q3",
        synonyms: "WAU, weekly actives",
      },
      net_revenue: {
        label: "net_revenue",
        ask: "Two raw tables: orders, refunds. Amounts everywhere.",
        tables: ["orders", "refunds"],
        candidates: [
          { sql: "SUM(amount)", note: "includes refunds" },
          { sql: "SUM(gross)", note: "pre-tax, double counts" },
          { sql: "SUM(amount) - SUM(refunds)", note: "misses discounts" },
        ],
        correct: "SUM(gross) - SUM(refunds)\n  - SUM(discounts)",
        edge: "discounts removed before recognition",
        owner: "D. Osei",
        period: "2024-Q3",
        synonyms: "net rev, NR",
      },
      conversion_rate: {
        label: "conversion_rate",
        ask: "Two raw tables: sessions, orders. Many ways to divide.",
        tables: ["sessions", "orders"],
        candidates: [
          { sql: "orders / sessions", note: "sessions inflate denom." },
          { sql: "orders / pageviews", note: "wrong denominator" },
          { sql: "checkouts / visitors", note: "counts abandoned carts" },
        ],
        correct: "conversions\n  / COUNT(DISTINCT visitor_id)",
        edge: "unique visitors, not sessions",
        owner: "R. Patel",
        period: "2024-Q3",
        synonyms: "CVR, conv %",
      },
    };

    const BEATS = [
      { n: "BEAT 1 / 4", title: "The ask", cap: "", capClass: "" },
      {
        n: "BEAT 2 / 4",
        title: "Machine guess",
        cap: "Three candidates. Each subtly wrong. Automatic tools stop here.",
        capClass: "red",
      },
      {
        n: "BEAT 3 / 4",
        title: "Human steps in",
        cap: "A reviewer strikes the wrong ones and writes the real logic.",
        capClass: "gold",
      },
      {
        n: "BEAT 4 / 4",
        title: "Verified",
        cap: "The metric snaps into a clean, owned, dated card. Trustworthy.",
        capClass: "",
      },
    ];
    const DUR = [2200, 3200, 3600, 3200];

    const cnt = root.querySelector(".beat-counter");
    const ttl = root.querySelector(".beat-title");
    const cap = root.querySelector(".beat-caption");
    const visual = root.querySelector(".iv-b-visual");
    const segs = [...root.querySelectorAll(".beat-seg")];
    const playBtn = root.querySelector(".play");
    const selWrap = root.querySelector(".metric-select");

    let metricKey = "active_users";
    let beat = 0,
      timer = null,
      playing = false,
      gen = 0;

    function renderNarration() {
      const b = BEATS[beat];
      const m = METRICS[metricKey];
      cnt.textContent = b.n;
      ttl.textContent = b.title;
      cap.className = "beat-caption " + (b.capClass || "");
      cap.textContent = beat === 0 ? `Define ${m.label}. ${m.ask}` : b.cap;
    }

    function renderVisual() {
      const m = METRICS[metricKey];
      const my = gen;
      visual.innerHTML = "";

      if (beat === 0) {
        m.tables.forEach((t, i) => {
          const d = document.createElement("div");
          d.className = "cand";
          d.style.opacity = 0;
          d.innerHTML = `<span style="color:var(--muted-2)">table</span> &nbsp; ${t} <span style="float:right;color:var(--muted-2)">? rows</span>`;
          visual.appendChild(d);
          setTimeout(
            () => {
              if (my === gen) {
                d.style.transition = "opacity .4s";
                d.style.opacity = 1;
              }
            },
            180 * i + 100
          );
        });
        const hint = document.createElement("div");
        hint.style.cssText =
          "color:var(--muted-2);margin-top:14px;font-size:12px";
        hint.textContent = "// which definition is correct?";
        visual.appendChild(hint);
      }

      if (beat === 1) {
        m.candidates.forEach((c, i) => {
          const d = document.createElement("div");
          d.className = "cand bad";
          d.style.animation = `flickerBad 1.4s ${i * 0.18}s infinite`;
          d.innerHTML = `${c.sql} <span style="float:right;opacity:.8">✕ ${c.note}</span>`;
          visual.appendChild(d);
        });
        const stop = document.createElement("div");
        stop.style.cssText =
          "color:var(--red);margin-top:12px;font-size:12px;font-style:italic";
        stop.textContent = "// no single answer is trustworthy";
        visual.appendChild(stop);
      }

      if (beat === 2) {
        const cur = document.createElement("div");
        cur.className = "review-cursor";
        cur.innerHTML =
          '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M1 1l5 14 2.2-5.6L14 7 1 1z"/></svg>';
        visual.appendChild(cur);

        m.candidates.forEach((c, i) => {
          const d = document.createElement("div");
          d.className = "cand bad";
          d.innerHTML = `${c.sql} <span style="float:right;opacity:.8">✕ ${c.note}</span>`;
          visual.appendChild(d);
          setTimeout(
            () => {
              if (my !== gen) return;
              cur.style.opacity = 1;
              cur.style.transform = `translate(8px, ${18 + i * 44}px)`;
              setTimeout(() => {
                if (my === gen) d.classList.add("struck");
              }, 300);
            },
            350 * i + 200
          );
        });

        const good = document.createElement("div");
        good.className = "cand good";
        good.style.cssText = "opacity:0;white-space:pre;margin-top:6px";
        visual.appendChild(good);
        const note = document.createElement("div");
        note.style.cssText =
          "color:var(--gold);font-size:12px;margin-top:8px;opacity:0";
        note.textContent = `// edge case: ${m.edge}`;
        visual.appendChild(note);

        setTimeout(
          () => {
            if (my !== gen) return;
            cur.style.transform = `translate(8px, ${18 + m.candidates.length * 44 + 4}px)`;
            good.style.transition = "opacity .3s";
            good.style.opacity = 1;
            typeText(good, "✓ " + m.correct, my, () => {
              note.style.transition = "opacity .4s";
              note.style.opacity = 1;
            });
          },
          350 * m.candidates.length + 400
        );
      }

      if (beat === 3) {
        const card = document.createElement("div");
        card.className = "verified-card";
        card.style.opacity = 0;
        card.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <span style="width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green)"></span>
            <b style="color:var(--ink);font-size:14px">${m.label}</b>
            <span style="margin-left:auto;color:var(--green)">✓ Verified</span>
          </div>
          <div class="vrow"><span class="vk">definition</span><span class="vv" style="text-align:right;white-space:pre;color:var(--green)">${m.correct.replace(/\n\s*/g, " ")}</span></div>
          <div class="vrow"><span class="vk">verified by</span><span class="vv"><b style="color:var(--green)">${m.owner}</b> · ${m.period}</span></div>
          <div class="vrow"><span class="vk">edge cases</span><span class="vv">${m.edge}</span></div>
          <div class="vrow"><span class="vk">synonyms</span><span class="vv">${m.synonyms}</span></div>`;
        visual.appendChild(card);
        setTimeout(() => {
          if (my === gen) {
            card.style.transition = "opacity .5s, transform .5s";
            card.style.transform = "translateY(0)";
            card.style.opacity = 1;
          }
        }, 120);
      }
    }

    function typeText(el, text, my, done) {
      let i = 0;
      (function step() {
        if (my !== gen) return;
        el.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) setTimeout(step, 22);
        else if (done) done();
      })();
    }

    function showBeat(idx, animate = true) {
      gen++;
      beat = idx;
      renderNarration();
      renderVisual();
      segs.forEach((s, i) => {
        const bar = s.querySelector("i");
        s.classList.toggle("active", i === idx);
        if (i < idx) {
          bar.style.transition = "none";
          bar.style.width = "100%";
        } else if (i > idx) {
          bar.style.transition = "none";
          bar.style.width = "0%";
        } else {
          bar.style.transition = "none";
          bar.style.width = "0%";
          if (animate && playing) {
            requestAnimationFrame(() => {
              bar.style.transition = `width ${DUR[idx]}ms linear`;
              bar.style.width = "100%";
            });
          } else {
            bar.style.width = "100%";
          }
        }
      });
    }

    function play(from = 0) {
      clearTimeout(timer);
      playing = true;
      playBtn.innerHTML = pauseIcon;
      const advance = (i) => {
        showBeat(i, true);
        if (i < BEATS.length - 1) {
          timer = setTimeout(() => advance(i + 1), DUR[i]);
        } else {
          timer = setTimeout(() => {
            playing = false;
            playBtn.innerHTML = replayIcon;
          }, DUR[i]);
        }
      };
      advance(from);
    }

    const playIcon =
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    const pauseIcon =
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';
    const replayIcon =
      '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 5V1L7 6l5 5V7a5 5 0 11-5 5H5a7 7 0 107-7z"/></svg>';

    playBtn.innerHTML = playIcon;
    playBtn.addEventListener("click", () => {
      if (playing) {
        clearTimeout(timer);
        playing = false;
        playBtn.innerHTML = playIcon;
        const b = segs[beat].querySelector("i");
        b.style.transition = "none";
      } else {
        play(beat >= BEATS.length - 1 ? 0 : beat);
      }
    });

    segs.forEach((s, i) =>
      s.addEventListener("click", () => {
        clearTimeout(timer);
        playing = false;
        playBtn.innerHTML = playIcon;
        showBeat(i, false);
      })
    );

    selWrap.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        selWrap
          .querySelectorAll("button")
          .forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        metricKey = b.dataset.metric;
        play(0);
      });
    });

    showBeat(0, false);

    let started = false;
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            play(0);
          }
        });
      },
      { threshold: 0.45 }
    );
    io.observe(root);
  })();

  /* INTERACTIVE C — "The Glass Box" */
  (function () {
    const root = document.getElementById("glassbox");
    if (!root) return;
    const btn = root.querySelector(".gb-btn");
    const layers = [...root.querySelectorAll(".gb-layer")];
    let open = false;

    btn.addEventListener("click", () => {
      open = !open;
      if (open) {
        btn.querySelector(".gb-label").textContent = "hide the proof";
        layers.forEach((l, i) =>
          setTimeout(() => l.classList.add("show"), i * 180)
        );
      } else {
        btn.querySelector(".gb-label").textContent = "show the proof";
        [...layers]
          .reverse()
          .forEach((l, i) =>
            setTimeout(() => l.classList.remove("show"), i * 90)
          );
      }
    });
  })();
}

/* ---------------------------------------------------------
   UI wiring — cursor, nav, reveals, count-ups, chart, stepper,
   proof toggle, node flow, FAQ accordion, smooth anchors.
   --------------------------------------------------------- */
function initUI() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* custom cursor */
  const cur = document.getElementById("cursor");
  if (cur && window.matchMedia("(pointer: fine)").matches) {
    let x = innerWidth / 2,
      y = innerHeight / 2,
      tx = x,
      ty = y;
    window.addEventListener(
      "mousemove",
      (e) => {
        tx = e.clientX;
        ty = e.clientY;
      },
      { passive: true }
    );
    (function loop() {
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    })();
    const interactive =
      "a, button, .q-chip, .vchip, .faq-q, .beat-seg, [data-cursor]";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactive)) cur.classList.add("ring");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactive)) cur.classList.remove("ring");
    });
  }

  /* nav scroll state */
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* auto-stagger groups: assign delays BEFORE observing reveals */
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    [...group.querySelectorAll("[data-reveal]")].forEach((el, i) => {
      el.dataset.delay = String(i * 60);
    });
  });

  /* scroll reveal with stagger */
  const revs = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          const delay = parseInt(e.target.dataset.delay || "0", 10);
          setTimeout(() => e.target.classList.add("in"), delay);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  revs.forEach((r) => io.observe(r));

  /* count-up */
  function countUp(el) {
    const raw = el.dataset.count;
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const dur = 1300;
    const start = performance.now();
    if (raw.includes("-")) {
      const [a, b] = raw.split("-").map(Number);
      function step(t) {
        const p = Math.min(1, (t - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent =
          prefix + Math.round(a * e) + "–" + Math.round(b * e) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      return;
    }
    const target = parseFloat(raw);
    const decimals = (raw.split(".")[1] || "").length;
    function step(t) {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const v = target * e;
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const counters = document.querySelectorAll("[data-count]");
  const cio = new IntersectionObserver(
    (ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          reduce
            ? (e.target.textContent =
                (e.target.dataset.prefix || "") +
                e.target.dataset.count +
                (e.target.dataset.suffix || ""))
            : countUp(e.target);
          cio.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => cio.observe(c));

  /* §5 chart draw-in */
  const chart = document.getElementById("cost-chart-svg");
  if (chart) {
    const paths = chart.querySelectorAll("path.line");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });
    const area = chart.querySelector(".area-green");
    const chio = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            paths.forEach((p, i) => {
              p.style.transition = `stroke-dashoffset 1.6s ${0.2 + i * 0.25}s var(--ease)`;
              p.style.strokeDashoffset = "0";
            });
            if (area) {
              area.style.transition = "opacity 1s 1.2s ease";
              area.style.opacity = "1";
            }
            chio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    chio.observe(chart);
  }

  /* §8 stepper progress fill */
  const stepper = document.getElementById("stepper");
  if (stepper) {
    const fill = stepper.querySelector(".step-fill");
    const steps = [...stepper.querySelectorAll(".step")];
    const vertical = () => window.innerWidth <= 760;
    function update() {
      const rect = stepper.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(
        0,
        Math.min(1, (vh * 0.7 - rect.top) / (rect.height * 0.8))
      );
      if (vertical()) {
        fill.style.height = p * 100 + "%";
      } else {
        fill.style.width = p * 100 + "%";
      }
      steps.forEach((s, i) => {
        const threshold = (i / (steps.length - 1)) * 0.9;
        s.classList.toggle("on", p >= threshold - 0.02);
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* §10 proof before/after toggle */
  const proof = document.getElementById("proof");
  if (proof) {
    const btns = [...proof.querySelectorAll(".proof-toggle button")];
    const slide = proof.querySelector(".proof-slide");
    const rows = [...proof.querySelectorAll(".proof-row")];
    const PAIRS = [
      ["AI answers contradict each other", "One verified answer, every time"],
      ["Execs don't trust dashboards", "Numbers nobody argues about"],
      ["Months to onboard a new AI tool", "New agents plug in instantly"],
      ["Knowledge trapped in one head", "Documented, owned, governed"],
    ];
    function setMode(mode) {
      const after = mode === "after";
      btns.forEach((b) =>
        b.classList.toggle("active", b.dataset.mode === mode)
      );
      const target = proof.querySelector(
        `.proof-toggle button[data-mode="${mode}"]`
      );
      slide.style.width = target.offsetWidth + "px";
      slide.style.transform = `translateX(${target.offsetLeft - 5}px)`;
      slide.style.background = after
        ? "rgba(31,170,110,0.16)"
        : "rgba(216,58,58,0.14)";
      rows.forEach((r, i) => {
        setTimeout(() => {
          r.classList.toggle("is-after", after);
          r.classList.toggle("is-before", !after);
          r.querySelector(".txt").textContent = PAIRS[i][after ? 1 : 0];
          r.querySelector(".mk").textContent = after ? "✓" : "✕";
        }, i * 70);
      });
    }
    btns.forEach((b) =>
      b.addEventListener("click", () => setMode(b.dataset.mode))
    );
    requestAnimationFrame(() => setMode("before"));
    window.addEventListener("resize", () => {
      const active = proof.querySelector(".proof-toggle button.active");
      slide.style.width = active.offsetWidth + "px";
      slide.style.transform = `translateX(${active.offsetLeft - 5}px)`;
    });
  }

  /* §6 node diagram flow particles */
  const flow = document.getElementById("sol-flow");
  if (flow && !reduce) {
    flow.querySelectorAll(".flow-path").forEach((p, i) => {
      p.style.animationDelay = i * 0.4 + "s";
    });
  }

  /* §12 FAQ accordion */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = "0px";
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* smooth anchor for nav links */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          window.scrollTo({
            top: t.getBoundingClientRect().top + window.scrollY - 70,
            behavior: reduce ? "auto" : "smooth",
          });
        }
      }
    });
  });
}

/* ---------------------------------------------------------
   Final-CTA animated grain
   --------------------------------------------------------- */
function initGrain() {
  const c = document.getElementById("cta-grain");
  if (!c) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = c.getContext("2d");
  function fit() {
    const p = c.parentElement.getBoundingClientRect();
    c.width = p.width;
    c.height = p.height;
  }
  fit();
  window.addEventListener("resize", fit);
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    const img = ctx.createImageData(c.width, c.height);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      d[i] = 245;
      d[i + 1] = 181;
      d[i + 2] = 68;
      d[i + 3] = Math.random() < 0.04 ? 18 : 0;
    }
    ctx.putImageData(img, 0, 0);
    setTimeout(() => {
      requestAnimationFrame(draw);
    }, 90);
  }
  draw();
}

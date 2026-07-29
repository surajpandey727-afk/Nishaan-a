'use client'

import { useEffect, useRef } from 'react'

/**
 * Embeds the Nishaan-a Score diagnostic module.
 * Inherits site design language: typography, spacing, colors, animations.
 * Fully self-contained and scoped styling.
 */
export function NishaaScore() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inject the HTML module content
    if (!containerRef.current) return

    containerRef.current.innerHTML = `
      <style>
        .ns-module-wrap {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .ns-module-title {
          font-family: inherit;
          font-size: clamp(1.3rem, 2.2vw, 1.7rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .ns-module-subtitle {
          font-size: 0.875rem;
          letter-spacing: 0.02em;
          color: #B4A89E;
          font-weight: 500;
          margin: 0;
        }
        :root{
          --bg:#170D0F;
          --panel:#231316;
          --line:#3A2226;
          --ivory:#F3EFE7;
          --ivory-dim:#B4A89E;
          --oxblood:#7A1220;
          --oxblood-bright:#B4243A;
        }
        .ns-wrap{width:100%;max-width:680px;}
        .ns-eyebrow{
          font-size:12px;
          letter-spacing:0.02em;
          color:var(--ivory-dim);
          margin-bottom:16px;
          font-weight:500;
          display: none;
        }
        .ns-eyebrow b{color:var(--ivory);font-weight:600;}
        .ns-title{
          font-family: inherit;
          font-weight:700;
          font-size:clamp(1.3rem,2.2vw,1.7rem);
          line-height:1.08;
          margin:0 0 6px;
          letter-spacing:-0.01em;
          display: none;
        }
        .ns-sub{
          color:var(--ivory-dim);
          font-size:14px;
          line-height:1.65;
          max-width:480px;
          margin-bottom:24px;
          display: none;
        }
        .ns-console{
          display:flex;
          gap:10px;
          border:1px solid var(--line);
          background:var(--panel);
          border-radius:2px;
          padding:6px;
        }
        .ns-input{
          flex:1;
          background:transparent;
          border:none;
          outline:none;
          color:var(--ivory);
          font-family: inherit;
          font-size:14px;
          padding:12px 14px;
        }
        .ns-input::placeholder{color:#6E5A5C;}
        .ns-input:focus-visible {
          outline: 1px solid #B4243A;
          outline-offset: 1px;
        }
        .ns-btn{
          background:var(--ivory);
          color:var(--bg);
          border:none;
          border-radius:1px;
          font-family: inherit;
          font-weight:600;
          font-size:12px;
          letter-spacing:0.02em;
          padding:0 18px;
          cursor:pointer;
          transition:opacity .2s ease;
          white-space: nowrap;
        }
        .ns-btn:hover{opacity:0.85;}
        .ns-btn:disabled{opacity:0.4;cursor:not-allowed;}
        .ns-btn:focus-visible {
          outline: 1px solid #B4243A;
          outline-offset: 2px;
        }

        .ns-loading{
          margin-top:20px;
          font-family: 'Courier New', monospace;
          font-size:12px;
          color:var(--ivory-dim);
          display:none;
          flex-direction:column;
          gap:6px;
        }
        .ns-loading.active{display:flex;}
        .ns-loading .tick{opacity:0;animation:ns-fade .4s ease forwards;}
        .ns-loading .tick::before{content:"→ ";color:var(--oxblood-bright);}
        @keyframes ns-fade{to{opacity:1;}}

        .ns-error{
          margin-top:16px;
          border:1px solid var(--line);
          background:var(--panel);
          color:#E0B3AE;
          font-size:12px;
          padding:12px 14px;
          border-radius:2px;
          display:none;
        }
        .ns-error.active{display:block;animation:ns-fade .3s ease;}

        .ns-report{display:none;margin-top:32px;}
        .ns-report.active{display:block;animation:ns-fade .4s ease;}

        .ns-score-row{
          display:flex;
          align-items:baseline;
          gap:18px;
          border-bottom:1px solid var(--line);
          padding-bottom:24px;
          margin-bottom:24px;
          flex-wrap:wrap;
        }
        .ns-score-num{
          font-family: 'Courier New', monospace;
          font-weight:600;
          font-size:48px;
          color:var(--ivory);
          line-height:1;
        }
        .ns-score-suffix{font-size:16px;color:var(--ivory-dim);}
        .ns-verdict{
          font-family: inherit;
          font-size:16px;
          font-weight: 600;
        }
        .ns-stars{
          font-family: 'Courier New', monospace;
          color:var(--oxblood-bright);
          letter-spacing:2px;
          font-size:12px;
          margin-top:3px;
        }
        .ns-summary{
          font-size:13px;
          line-height:1.7;
          color:#DCD5CB;
          margin-bottom:32px;
        }

        .ns-cat{
          padding:14px 0;
          border-bottom:1px solid var(--line);
        }
        .ns-cat-head{
          display:flex;
          justify-content:space-between;
          align-items:baseline;
          margin-bottom:8px;
          gap:12px;
          flex-wrap: wrap;
        }
        .ns-cat-label{font-size:13px;font-weight:500;}
        .ns-cat-nums{
          font-family:'Courier New', monospace;
          font-size:11px;
          color:var(--ivory-dim);
          white-space:nowrap;
        }
        .ns-cat-nums b{color:var(--oxblood-bright);font-weight:600;}
        .ns-track{
          position:relative;
          height:3px;
          background:
            repeating-linear-gradient(90deg, var(--line) 0 1px, transparent 1px 20%);
          background-color:#2C1A1D;
          margin-bottom:8px;
          overflow:hidden;
        }
        .ns-fill{
          position:absolute;left:0;top:0;bottom:0;
          background:var(--oxblood-bright);
          width:0%;
          transition:width .8s cubic-bezier(.2,.8,.2,1);
        }
        .ns-rationale{
          font-size:12px;
          color:var(--ivory-dim);
          line-height:1.6;
        }

        @media(max-width:768px){
          .ns-score-num{font-size:40px;}
          .ns-console{flex-direction:column;}
          .ns-btn{padding:10px 16px;width:100%;}
        }
        @media(max-width:520px){
          .ns-score-num{font-size:36px;}
        }
      </style>
      
      <div class="ns-module-wrap">
        <div>
          <h3 class="ns-module-title">The Nishaan-a Score™</h3>
          <p class="ns-module-subtitle">Name Diagnostic</p>
        </div>
        
        <div class="ns-wrap">
          <div class="ns-console">
            <input id="ns-input" class="ns-input" type="text" placeholder="Enter a name" autocomplete="off" />
            <button id="ns-btn" class="ns-btn">SCORE</button>
          </div>

          <div id="ns-loading" class="ns-loading"></div>
          <div id="ns-error" class="ns-error"></div>
          <div id="ns-report" class="ns-report"></div>
        </div>
      </div>
    `

    // Initialize the scoring logic
    const input = containerRef.current.querySelector('#ns-input') as HTMLInputElement
    const btn = containerRef.current.querySelector('#ns-btn') as HTMLButtonElement
    const loadingEl = containerRef.current.querySelector('#ns-loading') as HTMLElement
    const errorEl = containerRef.current.querySelector('#ns-error') as HTMLElement
    const reportEl = containerRef.current.querySelector('#ns-report') as HTMLElement

    const LOADING_LINES = [
      'Reading structural signature...',
      'Cross-referencing archetype library...',
      'Weighing cultural and narrative load...',
      'Compiling weighted readout...',
    ]

    function runLoadingSequence() {
      loadingEl.innerHTML = ''
      loadingEl.classList.add('active')
      LOADING_LINES.forEach((line, i) => {
        const d = document.createElement('div')
        d.className = 'tick'
        d.textContent = line
        d.style.animationDelay = i * 0.35 + 's'
        loadingEl.appendChild(d)
      })
    }

    function starString(n: number) {
      return '★'.repeat(n) + '☆'.repeat(5 - n)
    }

    function renderReport(data: {
      weighted_total: number
      verdict: { band: string; stars: number }
      summary: string
      categories: Array<{
        label: string
        raw_score: number
        weight: number
        rationale: string
      }>
    }) {
      const catsHtml = data.categories
        .map(
          (c) => `
        <div class="ns-cat">
          <div class="ns-cat-head">
            <div class="ns-cat-label">${c.label}</div>
            <div class="ns-cat-nums"><b>${c.raw_score}</b>/5 &nbsp;·&nbsp; ${Math.round((c.raw_score / 5) * c.weight * 10) / 10}/${c.weight}</div>
          </div>
          <div class="ns-track"><div class="ns-fill" style="width:0%" data-w="${Math.max(0, Math.min(100, (c.raw_score / 5) * 100))}"></div></div>
          <div class="ns-rationale">${c.rationale}</div>
        </div>`
        )
        .join('')

      reportEl.innerHTML = `
        <div class="ns-score-row">
          <div>
            <span class="ns-score-num">${data.weighted_total}</span><span class="ns-score-suffix">/100</span>
          </div>
          <div>
            <div class="ns-verdict">${data.verdict.band}</div>
            <div class="ns-stars">${starString(data.verdict.stars)}</div>
          </div>
        </div>
        <div class="ns-summary">${data.summary}</div>
        ${catsHtml}
      `
      reportEl.classList.add('active')
      requestAnimationFrame(() => {
        reportEl.querySelectorAll('.ns-fill').forEach((el) => {
          const htmlEl = el as HTMLElement
          htmlEl.style.width = htmlEl.getAttribute('data-w') + '%'
        })
      })
    }

    const SCORE_ENDPOINT = 'https://nishaan-score-worker.nishaan-score-worker.workers.dev'

    async function runDiagnostic() {
      const name = input.value.trim()
      if (!name) {
        input.focus()
        return
      }

      btn.disabled = true
      errorEl.classList.remove('active')
      reportEl.classList.remove('active')
      runLoadingSequence()

      try {
        const response = await fetch(SCORE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        })

        const data = await response.json()
        loadingEl.classList.remove('active')

        if (!response.ok) {
          errorEl.textContent = data.error || 'Scoring failed. Try again.'
          errorEl.classList.add('active')
        } else {
          renderReport(data)
        }
      } catch (error) {
        loadingEl.classList.remove('active')
        errorEl.textContent = 'Network error. Check your connection.'
        errorEl.classList.add('active')
      } finally {
        btn.disabled = false
      }
    }

    btn.addEventListener('click', runDiagnostic)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runDiagnostic()
    })

    return () => {
      btn.removeEventListener('click', runDiagnostic)
      input.removeEventListener('keydown', () => {})
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="ns-score-container"
      role="region"
      aria-label="Nishaan-a Score diagnostic"
    />
  )
}

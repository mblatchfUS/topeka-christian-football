import { useEffect, useState } from 'react'

type Page = 'home' | 'forms'
type DriveFile = { name: string; type: string; date: string; url: string }

const driveFolderUrl = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_URL || 'https://drive.google.com/drive/u/0/folders/1iHMpQr3fs_DjzZuyNgRoDZlH5zKqGAG6'
const driveFeedUrl = import.meta.env.VITE_GOOGLE_DRIVE_FEED_URL || ''

const fallbackFiles: DriveFile[] = [
  { name: '2026 Player Registration FINAL.pdf', type: 'Registration', date: 'Aug 04, 2026', url: driveFolderUrl },
  { name: 'Medical Release FINAL.pdf', type: 'Medical', date: 'Aug 04, 2026', url: driveFolderUrl },
  { name: 'Code of Conduct FINAL.pdf', type: 'Policies', date: 'Jul 28, 2026', url: driveFolderUrl },
  { name: 'Practice & Game Day Guide FINAL.pdf', type: 'Information', date: 'Jul 28, 2026', url: driveFolderUrl },
]

function navigate(page: Page) {
  window.history.pushState({}, '', page === 'home' ? '/' : '/forms')
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function App() {
  const [page, setPage] = useState<Page>(window.location.pathname.startsWith('/forms') ? 'forms' : 'home')

  useEffect(() => {
    const onPopState = () => setPage(window.location.pathname.startsWith('/forms') ? 'forms' : 'home')
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => navigate('home')} aria-label="Go to home page">
          <span className="brand-mark">TC</span>
          <span className="brand-copy"><strong>Topeka Christian</strong><small>Football Association</small></span>
        </button>
        <nav aria-label="Main navigation">
          <button className={page === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('home')}>Home</button>
          <button className={page === 'forms' ? 'nav-link active' : 'nav-link'} onClick={() => navigate('forms')}>Forms & Info</button>
          <a className="nav-cta" href="mailto:football@topekachristianfootball.org">Contact us <span>↗</span></a>
        </nav>
      </header>

      {page === 'home' ? <HomePage /> : <FormsPage />}

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">TC</span><span><strong>Topeka Christian Football Association</strong><small>First season · 2026</small></span></div>
        <div className="footer-meta"><span>Est. 2026 · Topeka, Kansas</span><a href="mailto:football@topekachristianfootball.org">football@topekachristianfootball.org</a></div>
      </footer>
    </div>
  )
}

function HomePage() {
  return <main>
    <section className="hero">
      <div className="hero-image" role="img" aria-label="American football on a field" />
      <div className="hero-overlay" />
      <div className="hero-content page-width">
        <p className="eyebrow light">One team. One purpose.</p>
        <h1>Built for<br /><em>more.</em></h1>
        <p className="hero-lede">A new football club for Christian homeschool families across Topeka. Play hard. Live faithfully. Leave it all on the field.</p>
        <div className="hero-actions"><button className="button button-red" onClick={() => navigate('forms')}>Get season forms <span>↓</span></button><a className="text-link light" href="#season">Meet the club <span>↓</span></a></div>
      </div>
      <div className="hero-stamp"><span>TCFA</span><small>FIRST<br />SEASON<br />2026</small></div>
      <div className="scroll-cue"><span /> Scroll to explore</div>
    </section>

    <section className="intro page-width" id="season">
      <div><p className="eyebrow">The beginning of something</p><h2>Football with<br /><span>foundation.</span></h2></div>
      <div className="intro-copy"><p>We are Topeka Christian Football Association: a brand-new club grounded in faith, family, and the joy of competition.</p><p>We are creating a place where young men can grow as athletes, teammates, and leaders.</p><button className="text-link" onClick={() => navigate('forms')}>Explore season details <span>→</span></button></div>
    </section>

    <section className="values-band"><div className="page-width values-grid"><Value number="01" title="Faith" text="We compete with character and keep our purpose bigger than the scoreboard." /><Value number="02" title="Family" text="Every player, coach, and family has a place in this club." /><Value number="03" title="Grit" text="We show up ready to work, together, for every down." /></div></section>

    <section className="season-section page-width"><div className="section-heading"><div><p className="eyebrow">Season one / 2026</p><h2>Get in the game.</h2></div><span className="heading-note">Roster spots are forming now</span></div><div className="season-cards"><div className="season-card card-image"><div className="season-card-photo" /><div><p className="card-kicker">For families</p><h3>Everything you need<br />to get started.</h3><button className="text-link" onClick={() => navigate('forms')}>View forms & info <span>→</span></button></div></div><div className="season-card red-card"><p className="card-kicker">Questions?</p><h3>Let’s talk<br />football.</h3><a className="text-link light" href="mailto:football@topekachristianfootball.org">Email the association <span>↗</span></a><span className="card-number">TCFA<br />2026</span></div></div></section>
  </main>
}

function Value({ number, title, text }: { number: string; title: string; text: string }) { return <article className="value"><span className="value-number">{number}</span><h3>{title}</h3><p>{text}</p></article> }

function FormsPage() {
  const [files, setFiles] = useState<DriveFile[]>(fallbackFiles)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!driveFeedUrl) return
    fetch(driveFeedUrl).then((response) => response.ok ? response.json() : Promise.reject()).then((data: DriveFile[]) => {
      setFiles(data.filter((file) => file.name.toUpperCase().includes('FINAL')))
      setIsLive(true)
    }).catch(() => setIsLive(false))
  }, [])

  return <main className="forms-page page-width"><div className="forms-hero"><div><p className="eyebrow">Season 01 / Family resources</p><h1>Forms &<br /><em>information.</em></h1></div><p className="forms-intro">The latest forms, guides, and policies for the 2026 season, all in one place. Download what you need, then get ready to play.</p></div><div className="drive-status"><span className={isLive ? 'status-dot live' : 'status-dot'} />{isLive ? 'Live from the team Drive' : 'Team Drive folder'}<a href={driveFolderUrl} target="_blank" rel="noreferrer">Open shared folder ↗</a></div><section className="files-section"><div className="files-heading"><h2>Current documents</h2><span>{files.length} files</span></div><div className="file-list">{files.map((file) => <a className="file-row" href={file.url} target="_blank" rel="noreferrer" key={file.name}><span className="file-icon">PDF</span><span className="file-name"><strong>{file.name.replace(' FINAL', '')}</strong><small>{file.type} · {file.date}</small></span><span className="download">Download <b>↓</b></span></a>)}</div></section><section className="final-note"><span className="note-mark">✓</span><div><h3>Only the final word.</h3><p>We keep this page clean: when a document is ready for families, it is marked <strong>FINAL</strong> in the shared Drive and appears here automatically.</p></div></section></main>
}

export default App

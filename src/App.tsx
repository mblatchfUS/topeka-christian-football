import { useEffect, useState, type FormEvent } from "react";

type Page = "home" | "forms" | "application" | "season" | "about";
type DriveFile = { name: string; type: string; date: string; url: string };

const driveFeedUrl = import.meta.env.VITE_GOOGLE_DRIVE_FEED_URL || "";
const applicationEndpoint =
  import.meta.env.VITE_APPLICATION_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbzgTXntnRHSInZG_iGZ9MhVmqctteuT0RNv6vHt8TMHNcgCck9tUsq-Y5SWV5_AOH2C/exec";

// Additional context for email recipients

const fallbackFiles: DriveFile[] = [
  {
    name: "TCF - Statement of Faith 8-23-2026 FINAL.pdf",
    type: "PDF",
    date: "Aug 23, 2026",
    url: "https://drive.google.com/file/d/14nkyYbz3dOHqIRd4A_0xlwGkw8WRrABa/view",
  },
  {
    name: "Topeka Christian Football - Participant application (8-22-2026) FINAL.docx",
    type: "Document",
    date: "Aug 24, 2026",
    url: "https://drive.google.com/file/d/1dvsDEc34UKI9HV9yeYXNW5B9dIsxUo00/view",
  },
];

function navigate(page: Page) {
  window.location.hash = page === "home" ? "" : `/${page}`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resolvePage(): Page {
  const { hash, pathname } = window.location;
  if (hash === "#/application" || pathname.startsWith("/application"))
    return "application";
  if (hash === "#/season" || pathname.startsWith("/season")) return "season";
  if (hash === "#/about" || pathname.startsWith("/about")) return "about";
  if (hash === "#/forms" || pathname.startsWith("/forms")) return "forms";
  return "home";
}

function App() {
  const [page, setPage] = useState<Page>(resolvePage);

  useEffect(() => {
    const onHashChange = () => setPage(resolvePage());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Go to home page"
        >
          <span className="brand-mark">TCF</span>
          <span className="brand-copy">
            <strong>Topeka Christian Saints</strong>
            <small>Football Association</small>
          </span>
        </button>
        <nav aria-label="Main navigation">
          <button
            className={page === "home" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("home")}
          >
            Home
          </button>
          <button
            className={page === "season" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("season")}
          >
            2026 Season
          </button>
          <button
            className={page === "forms" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("forms")}
          >
            Forms & Info
          </button>
          <button
            className={page === "application" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("application")}
          >
            Application
          </button>
          <button
            className={page === "about" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("about")}
          >
            About
          </button>
          <a
            className="nav-cta"
            href="mailto:football@topekachristianfootball.org"
          >
            Contact us <span>↗</span>
          </a>
        </nav>
      </header>

      {page === "home" && <HomePage />}
      {page === "season" && <SeasonPage />}
      {page === "forms" && <FormsPage />}
      {page === "application" && <ApplicationPage />}
      {page === "about" && <AboutPage />}

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">TCF</span>
          <span>
            <strong>Topeka Christian Saints</strong>
            <small>First season · 2026</small>
          </span>
        </div>
        <div className="footer-meta">
          <span>Est. 2026 · Topeka, Kansas</span>
          <a href="mailto:football@topekachristianfootball.org">
            football@topekachristianfootball.org
          </a>
        </div>
      </footer>
    </div>
  );
}

function AboutPage() {
  return (
    <main className="about-page page-width">
      <section className="forms-hero">
        <div>
          <p className="eyebrow">Our story</p>
          <h1>
            About
            <br />
            <em>us.</em>
          </h1>
        </div>
        <p className="forms-intro">
          From a homeschool football program to a Christ-centered club open to
          every family who shares our faith and culture.
        </p>
      </section>

      <section className="about-body">
        <div className="about-timeline">
          <span className="about-tag">Est. August 2026 · Topeka, KS</span>
        </div>
        <div className="about-copy">
          <p>
            Founded by Kipp &amp; Tracy Van Camp in 2020 within the Cornerstone
            Family Schools organization, the football program served to provide a
            new sport for the Cornerstone homeschool family.
          </p>
          <p>
            After 6 years and a dwindling roster made up of entirely
            homeschooled athletes that are taught 51%+ by a parent, the coaching
            staff, athletes, football families and the CFS Board of Directors discussed branching the program to a club team.
          </p>
          <p>
            Through mutual agreement, it was decided on August 22, 2026 with a unanimous decision by the board, this was in the best interest of
            both programs and would allow Topeka Christian Football to roster
            players that meet our statement of faith and culture centered on
            Christ, but may not necessarily meet the 51%+ homeschool criteria required of CFS.
          </p>
          <p>
            In August, 2026 Topeka Christian Football was established.
          </p>
          <button
            className="text-link"
            onClick={() => navigate("application")}
          >
            Join the roster <span>→</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function HomePage() {
  const [faithOpen, setFaithOpen] = useState(false);
  return (
    <>
    <main>
      <section className="hero">
        <div
          className="hero-image"
          role="img"
          aria-label="American football on a field"
        />
        <div className="hero-overlay" />
        <div className="hero-content page-width">
          <p className="eyebrow light">One team. One purpose.</p>
          <h1>
            Built for
            <br />
            <em>more.</em>
          </h1>
          <p className="hero-lede">
            A new football club for Christian homeschool families across Topeka.
            Play hard. Live faithfully. Leave it all on the field. "Get a little better every day!"
          </p>
          <div className="hero-actions">
            <button
              className="button button-red"
              onClick={() => navigate("forms")}
            >
              Get season forms <span>↓</span>
            </button>
            <button
              className="text-link light"
              onClick={() => navigate("season")}
            >
              2026 schedule <span>→</span>
            </button>
          </div>
        </div>
        <div className="hero-stamp">
          <span>TCFA</span>
          <small>
            FIRST
            <br />
            SEASON
            <br />
            2026
          </small>
        </div>
        <div className="scroll-cue">
          <span /> Scroll to explore
        </div>
      </section>

      <section className="intro page-width" id="season">
        <div>
          <p className="eyebrow">The beginning of something</p>
          <h2>
            Football with
            <br />
            <span>foundation.</span>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            We are Topeka Christian Football Association: a brand-new club
            grounded in faith, family, and the joy of competition.
          </p>
          <p>
            We are creating a place where young men can grow as athletes,
            teammates, and leaders.
          </p>
          <button className="text-link" onClick={() => navigate("forms")}>
            Explore season details <span>→</span>
          </button>
        </div>
      </section>

      <section className="values-band">
        <div className="page-width values-grid">
          <Value
            number="01"
            title="Faith"
            text="We compete with character and keep our purpose bigger than the scoreboard."
            linkLabel="Read our Statement of Faith"
            onLink={() => setFaithOpen(true)}
          />
          <Value
            number="02"
            title="Family"
            text="Every player, coach, and family has a place in this club."
          />
          <Value
            number="03"
            title="Grit"
            text="We show up ready to work, together, for every down."
          />
        </div>
      </section>

      <section className="season-section page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Season one / 2026</p>
            <h2>Get in the game.</h2>
          </div>
          <span className="heading-note">Roster spots are forming now</span>
        </div>
        <div className="season-cards">
          <div className="season-card card-image">
            <div className="season-card-photo" />
            <div>
              <p className="card-kicker">For families</p>
              <h3>
                Everything you need
                <br />
                to get started.
              </h3>
              <button
                className="text-link"
                onClick={() => navigate("application")}
              >
                Start the online application <span>→</span>
              </button>
            </div>
          </div>
          <div className="season-card red-card">
            <p className="card-kicker">Questions?</p>
            <h3>
              Let’s talk
              <br />
              football.
            </h3>
            <a
              className="text-link light"
              href="mailto:football@topekachristianfootball.org"
            >
              Email the association <span>↗</span>
            </a>
            <span className="card-number">
              TCFA
              <br />
              2026
            </span>
          </div>
        </div>
        <section className="final-note final-note-centered">
          <span className="note-mark">★</span>
          <div>
            <h3>Cornerstone Family Schools</h3>
            <p>
              We’re proud to partner with Cornerstone Family Schools. If your
              athlete is a 51%+ homeschooled student interested in fine arts,
              events, testing, or other athletics, visit{" "}
              <a
                href="https://cfsks.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cornerstone Family Schools
              </a>
              .
            </p>
          </div>
        </section>
      </section>
    </main>
    <StatementOfFaithModal open={faithOpen} onClose={() => setFaithOpen(false)} />
    </>
  );
}

function Value({
  number,
  title,
  text,
  linkLabel,
  onLink,
}: {
  number: string;
  title: string;
  text: string;
  linkLabel?: string;
  onLink?: () => void;
}) {
  return (
    <article className="value">
      <span className="value-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      {linkLabel && onLink && (
        <button className="value-link" onClick={onLink}>
          {linkLabel} <span>→</span>
        </button>
      )}
    </article>
  );
}

const statementOfFaithUrl =
  "https://drive.google.com/file/d/14nkyYbz3dOHqIRd4A_0xlwGkw8WRrABa/view";

const statementOfFaithBeliefs: { title: string; body: string; refs: string }[] =
  [
    {
      title: "The Holy Scriptures",
      body: "We believe the Bible to be the only fully inspired, infallible, inerrant, and authoritative written Word of God.",
      refs: "2 Timothy 3:16; 2 Peter 1:21",
    },
    {
      title: "The Triune God",
      body: "We believe that there is one God, eternally existent in three persons: Father, Son, and Holy Spirit.",
      refs: "Genesis 1:1; John 10:30, 37, 38",
    },
    {
      title: "The Lord Jesus Christ",
      body: "We believe in the full deity and full humanity of our Lord Jesus Christ, in His virgin birth, in His sinless life, in His miracles, in His vicarious and substitutionary atonement through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father, and in His personal return in power and glory.",
      refs: "Isaiah 7:14; Matthew 1:23; Luke 1:35; Hebrews 4:15, 7:25, 9:12; John 2:11, 11:25; Colossians 1:14; Acts 1:11; Revelation 19:11, 16",
    },
    {
      title: "Atonement & Salvation",
      body: "We believe that the human race is fallen in Adam and that the salvation of lost and sinful man depends upon the substitutionary death of Jesus Christ and is made effectual by grace through faith.",
      refs: "Romans 3:23; John 3:16, 19, 4:24; Ephesians 2:8-9; Titus 3:5-6",
    },
    {
      title: "The Holy Spirit",
      body: "We believe in the present ministry of the Holy Spirit, by whose indwelling and filling the Christian is enabled to live a godly life.",
      refs: "Ephesians 5:18, 4:30; 1 Corinthians 3:16, 6:19-20",
    },
    {
      title: "Eternal Resurrection",
      body: "We believe in the resurrection of both the saved and the lost; they who are saved unto the resurrection of life and they who are lost unto the resurrection of damnation.",
      refs: "John 5:28, 29",
    },
    {
      title: "The Body of Christ",
      body: "We believe in the spiritual unity of believers in our Lord Jesus Christ. We believe that all disciples are called to attend, worship, and serve Him in a local congregation or fellowship that is part of His Body, the Church.",
      refs: "Romans 8:9; 1 Corinthians 12:12, 13; Galatians 3:26, 28",
    },
    {
      title: "Parental Stewardship & Authority",
      body: "We hold as belief and conviction that children are given by God as a stewardship to the parent and not the state, and that parents have the primary responsibility and authority to teach, educate, and train their own children.",
      refs: "Proverbs 22:6; Deuteronomy 6:6-7; Ephesians 6:4; Psalms 127:3-5",
    },
    {
      title: "Sanctity of Life",
      body: "We believe that man was created in the image of God and that, from the moment of conception, each bears His image.",
      refs: "Genesis 1:26-28, 5:1-2",
    },
    {
      title: "Christian Marriage",
      body: "We believe marriage constitutes the union between one biological man and one biological woman.",
      refs: "Genesis 2:22-24; Matthew 19:4-6; Hebrews 13:4-7; Mark 10:6-9; 1 Corinthians 7:10-16",
    },
    {
      title: "Moral Conduct & Sexual Integrity",
      body: "We believe that sexual immorality, defined as those sexual acts committed outside of marriage, is prohibited and sinful. Such acts include, but are not limited to: adultery, fornication, incest, prostitution, pedophilia, polygamy, and same-sex acts or relationships.",
      refs: "Exodus 20:14; Leviticus 18:7-23, 20:10-21; Deuteronomy 5:18; Matthew 15:19, 5:27-28; Romans 1:26-27; Colossians 3:5; Ephesians 4:17-19; Galatians 5:19; Hebrews 13:4; 1 Thessalonians 4:3; 1 Corinthians 6:9-13",
    },
    {
      title: "Biological Sex & Gender Identity",
      body: "We believe that God created mankind in His image: male (man) and female (woman), sexually different but with equal personal and human dignity. Attempts to physically alter or disagree with one’s predetermined biological sex, including but not limited to elective sex reassignment, transvestite, transgender, or non-binary “gender-queer” acts or conduct, are prohibited and sinful.",
      refs: "Genesis 1:26-28; Romans 1:26-32; 1 Corinthians 6:9-11",
    },
    {
      title: "Design of Human Sexuality",
      body: "We believe that God created and ordered human sexuality to the permanent, exclusive, comprehensive, and conjugal “one-flesh” union of a biologically ordered man and biologically ordered woman, intrinsically ordered to procreation and the biological family, and in furtherance of the moral, spiritual, and public good of binding father, mother, and child. Consequently, we affirm the sexual complementarity of man and woman, and resolve to resist same-sex attractions and refrain from same-sex acts or conduct, which are intrinsically disordered.",
      refs: "Genesis 1:27, 2:24; Matthew 19:4-6; Mark 10:5-9; Romans 1:26-27; 1 Corinthians 6:9-11; Ephesians 5:25-27; Revelation 19:7-9, 21:2",
    },
  ];

function StatementOfFaithModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sof-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal-head">
          <p className="eyebrow">Topeka Christian Football</p>
          <h2 id="sof-title">Statement of Faith &amp; Core Beliefs</h2>
          <p className="modal-sub">Adopted August 25, 2026</p>
        </div>
        <div className="modal-body">
          <p className="modal-lede">
            As an independent, Christ-centered youth athletic ministry, Topeka
            Christian Football is founded upon the eternal truths of the
            Christian faith. We operate not merely as an athletic organization,
            but as a discipleship ministry designed to build Christian
            character, mentor youth, and cultivate spiritual discipline to the
            glory of God. All directors, coordinators, coaches, and volunteer
            staff must subscribe to and uphold this Statement of Faith in its
            entirety. Furthermore, participating players and their parents or
            legal guardians must acknowledge, respect, and commit to aligning
            with this statement as a condition of their participation in the
            Topeka Christian Football program.
          </p>
          <ol className="sof-list">
            {statementOfFaithBeliefs.map((b) => (
              <li key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
                <span className="sof-refs">{b.refs}</span>
              </li>
            ))}
          </ol>
          <div className="sof-principle">
            <h3>Core Ministry Principle</h3>
            <p>
              Topeka Christian Football exists to teach youth to do hard things,
              develop physical perseverance, and foster Christian brotherhood.
              On and off the field, our coaching staff is committed to investing
              in these young men to help them grow into faithful, sacrificial
              leaders. Our defining daily operational focus and team prayer is
              “getting a little better every day.”
            </p>
          </div>
          <p className="sof-covenant">
            Participation requires a signed acknowledgement and covenant
            commitment, completed with the participation application.
          </p>
        </div>
        <div className="modal-foot">
          <a
            className="text-link"
            href={statementOfFaithUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the full document <span>↗</span>
          </a>
          <button className="button button-red" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

type Game = {
  day: string;
  month: string;
  opponent: string;
  place: "Home" | "Away";
  detail: string;
  result?: string;
  status?: "Confirmed" | "Pending" | "Unlikely" | "Canceled";
  open?: boolean;
};

type Player = {
  number: string;
  name: string;
  grade: string;
};

const schedule: Game[] = [
  {
    day: "28",
    month: "Aug",
    opponent: "KC East",
    place: "Away",
    detail: "Varsity · 7:00 PM",
    status: "Confirmed",
  },
  {
    day: "4",
    month: "Sep",
    opponent: "",
    place: "Home",
    detail: "Friday night available",
    open: true,
  },
  {
    day: "11",
    month: "Sep",
    opponent: "Northland Christian",
    place: "Away",
    detail: "Varsity · 7:00 PM",
    status: "Canceled",
  },
  {
    day: "18",
    month: "Sep",
    opponent: "Sunrise",
    place: "Home",
    detail: "Homecoming · Alumni game 5:00 PM · Varsity 7:00 PM",
    status: "Confirmed",
  },
  {
    day: "25",
    month: "Sep",
    opponent: "Life Prep",
    place: "Home",
    detail: "Senior Night · Varsity 7:00 PM",
    status: "Confirmed",
  },
  {
    day: "2",
    month: "Oct",
    opponent: "",
    place: "Home",
    detail: "Friday night available",
    open: true,
  },
  {
    day: "3",
    month: "Oct",
    opponent: "Joplin Cornerstone",
    place: "Away",
    detail: "Time TBA",
    status: "Pending",
  },
  {
    day: "9",
    month: "Oct",
    opponent: "Wichita Defenders",
    place: "Away",
    detail: "Varsity · 7:00 PM",
    status: "Confirmed",
  },
  {
    day: "16",
    month: "Oct",
    opponent: "",
    place: "Home",
    detail: "Friday night available",
    open: true,
  },
  {
    day: "23",
    month: "Oct",
    opponent: "Manhattan Eagles",
    place: "Away",
    detail: "Varsity · 7:00 PM",
    status: "Confirmed",
  },
];

// Roster is confirmed closer to kickoff. Add players here to populate the
// table below; an empty list renders the "coming soon" state.
const roster: Player[] = [
  { number: "1", name: "Max Blatchford", grade: "12" },
  { number: "4", name: "Greyson Jones", grade: "12" },
  { number: "5", name: "Abrahm Tarwater", grade: "12" },
  { number: "7", name: "Desmond Grindal", grade: "12" },
  { number: "9", name: "Levi Hoskinson", grade: "12" },
  { number: "15", name: "Jaxon Duis", grade: "11" },
  { number: "16", name: "Obadiah Hurr", grade: "10" },
  { number: "17", name: "Ethan Lauver", grade: "11" },
  { number: "18", name: "Boone Clark", grade: "9" },
  { number: "20", name: "Easton Cook", grade: "12" },
  { number: "32", name: "Gideon Hawkinson", grade: "11" },
  { number: "42", name: "Nehemiah Hurr", grade: "11" },
  { number: "55", name: "Seamus Mason", grade: "11" },
  { number: "56", name: "Ethan Dinkel", grade: "—" },
  { number: "68", name: "Lee Napier", grade: "12" },
  { number: "72", name: "Logan Reihm", grade: "12" },
  { number: "75", name: "Levi Ketchem", grade: "10" },
  { number: "77", name: "Paddy Mason", grade: "—" },
  { number: "81", name: "Thomas Walker", grade: "11" },
  { number: "95", name: "Brayden Elliott", grade: "11" },
  { number: "98", name: "Declan Mason", grade: "10" },
];

const coachingStaff: { role: string; names: string }[] = [
  { role: "Head Coach", names: "James Allen" },
  {
    role: "Assistant Coaches",
    names: "Ben Post, Grady Stegall, Jeremy Duis, Mark Ketchem & Mike Blatchford",
  },
  { role: "Coordinator", names: "Shauna Allen" },
  { role: "Managers", names: "Natalie Evans, Emma Ketchem & Paige Wellman" },
];

function SeasonPage() {
  const wins = schedule.filter((game) => game.result?.startsWith("W")).length;
  const losses = schedule.filter((game) => game.result?.startsWith("L")).length;
  const games = schedule.filter(
    (game) => !game.open && game.status !== "Canceled",
  );
  const gameCount = games.length;
  const homeGames = games.filter((game) => game.place === "Home").length;

  return (
    <main className="season-page page-width">
      <div className="forms-hero">
        <div>
          <p className="eyebrow">Season one / 2026</p>
          <h1>
            2026
            <br />
            <em>season.</em>
          </h1>
        </div>
        <p className="forms-intro">
          Seven games, one brotherhood. Come loud, come faithful.
        </p>
      </div>

      <section className="home-field">
        <div className="home-field-copy">
          <span className="home-field-label">Home field</span>
          <strong>Bennett Field</strong>
          <span className="home-field-addr">
            1470 N 1000 Rd, Lawrence, KS 66046
          </span>
        </div>
        <a
          className="button button-red"
          href="https://www.google.com/maps/dir/?api=1&destination=1470+N+1000+Rd,+Lawrence,+KS+66046"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions <span>↗</span>
        </a>
      </section>

      <section className="live-stream">
        <div className="live-stream-copy">
          <span className="live-badge">Live</span>
          <div>
            <strong>Can’t make it? Watch live.</strong>
            <small>
              Home games stream on our Facebook group.
            </small>
          </div>
        </div>
        <a
          className="text-link"
          href="https://www.facebook.com/groups/1439602686896703"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook Live <span>↗</span>
        </a>
      </section>

      <div className="season-stats">
        <div className="season-stat">
          <strong>
            {wins}–{losses}
          </strong>
          <small>Record</small>
        </div>
        <div className="season-stat">
          <strong>{gameCount}</strong>
          <small>Games</small>
        </div>
        <div className="season-stat">
          <strong>{homeGames}</strong>
          <small>Home games</small>
        </div>
      </div>

      <section className="schedule-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The slate</p>
            <h2>Schedule &amp; results.</h2>
          </div>
          <span className="heading-note">Home field · Bennett Field</span>
        </div>
        <div className="schedule">
          {schedule.map((game) =>
            game.open ? (
              <div
                className="schedule-row is-open"
                key={`${game.month}-${game.day}`}
              >
                <div className="schedule-date">
                  <strong>{game.day}</strong>
                  <small>{game.month}</small>
                </div>
                <div className="schedule-matchup">
                  <span className="place-tag open">Open</span>
                  <strong>Open Game Slot</strong>
                  <small>{game.detail}</small>
                </div>
                <div className="schedule-result">Seeking opponent</div>
              </div>
            ) : (
            <div
              className={
                game.place === "Home"
                  ? "schedule-row is-home"
                  : "schedule-row"
              }
              key={`${game.month}-${game.day}`}
            >
              <div className="schedule-date">
                <strong>{game.day}</strong>
                <small>{game.month}</small>
              </div>
              <div className="schedule-matchup">
                <span
                  className={
                    game.place === "Home" ? "place-tag home" : "place-tag away"
                  }
                >
                  {game.place}
                </span>
                <strong>
                  {game.place === "Home" ? "vs" : "at"}{" "}
                  {game.status === "Canceled" ? (
                    <s>{game.opponent}</s>
                  ) : (
                    game.opponent
                  )}
                  {game.status && (
                    <span
                      className={`status-tag ${game.status.toLowerCase()}`}
                    >
                      {game.status}
                    </span>
                  )}
                </strong>
                <small>{game.detail}</small>
              </div>
              <div className="schedule-result">
                {game.result ?? "Upcoming"}
              </div>
            </div>
            ),
          )}
        </div>
      </section>

      <section className="roster-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Team</p>
            <h2>2026 roster.</h2>
          </div>
          <span className="heading-note">Announced before kickoff</span>
        </div>
        {roster.length > 0 ? (
          <>
            <table className="roster-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((player) => (
                  <tr key={player.number + player.name}>
                    <td className="roster-num">{player.number}</td>
                    <td>
                      {player.name}
                      {player.grade === "12" && (
                        <span className="status-tag senior">Senior</span>
                      )}
                    </td>
                    <td>{player.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="coaching-staff">
              <h3>Coaching staff</h3>
              <dl>
                {coachingStaff.map((s) => (
                  <div key={s.role}>
                    <dt>{s.role}</dt>
                    <dd>{s.names}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </>
        ) : (
          <div className="roster-empty">
            <span className="note-mark">★</span>
            <div>
              <h3>Roster coming soon.</h3>
              <p>
                Players are still being confirmed for the season. Want to be on
                it? Complete the participation application to claim your spot.
              </p>
              <button
                className="button button-red"
                onClick={() => navigate("application")}
              >
                Start the application <span>→</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function FormsPage() {
  const [files, setFiles] = useState<DriveFile[]>(fallbackFiles);

  useEffect(() => {
    if (!driveFeedUrl) return;
    fetch(driveFeedUrl)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: DriveFile[]) => {
        setFiles(
          data.filter((file) => file.name.toUpperCase().includes("FINAL")),
        );
      })
      .catch(() => {});
  }, []);

  return (
    <main className="forms-page page-width">
      <div className="forms-hero">
        <div>
          <p className="eyebrow">Season 01 / Family resources</p>
          <h1>
            Forms &<br />
            <em>information.</em>
          </h1>
        </div>
        <p className="forms-intro">
          The latest forms, guides, and policies for the 2026 season, all in one
          place. Download what you need, then get ready to play.
        </p>
      </div>
      <section className="files-section">
        <div className="files-heading">
          <h2>Current documents</h2>
          <span>{files.length} files</span>
        </div>
        <div className="file-list">
          {files.map((file) => (
            <a
              className="file-row"
              href={file.url}
              target="_blank"
              rel="noreferrer"
              key={file.name}
            >
              <span className="file-icon">PDF</span>
              <span className="file-name">
                <strong>{file.name.replace(" FINAL", "")}</strong>
                <small>
                  {file.type} · {file.date}
                </small>
              </span>
              <span className="download">
                Download <b>↓</b>
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="files-section">
        <div className="files-heading">
          <h2>Team resources</h2>
          <span>Players &amp; coaches</span>
        </div>
        <div className="file-list">
          <a
            className="file-row"
            href="https://qwikcut.com/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="file-icon">FILM</span>
            <span className="file-name">
              <strong>Game film on QwikCut</strong>
              <small>Practice, scouting &amp; game review</small>
            </span>
            <span className="download">
              Open <b>↗</b>
            </span>
          </a>
          <a className="file-row" href="/play-count-sheet.xlsx" download>
            <span className="file-icon">XLSX</span>
            <span className="file-name">
              <strong>Play count &amp; rotation sheet</strong>
              <small>Sideline snap tracker · rotate every 4–6 downs</small>
            </span>
            <span className="download">
              Download <b>↓</b>
            </span>
          </a>
        </div>
      </section>
      <section className="final-note">
        <span className="note-mark">→</span>
        <div>
          <h3>Ready to sign up?</h3>
          <p>
            Complete the <strong>participation application</strong> online—it
            only takes a few minutes.{" "}
            <button
              className="text-link"
              onClick={() => navigate("application")}
            >
              Open the application <span>→</span>
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

function ApplicationPage() {
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitState("sending");
    setSubmitError("");
    const form = new FormData(formElement);
    const values = new URLSearchParams();
    form.forEach((value, key) => values.append(key, String(value)));
    try {
      if (!applicationEndpoint)
        throw new Error("Application endpoint is not configured.");
      const response = await fetch(applicationEndpoint, {
        method: "POST",
        body: values,
      });
      const result = await response
        .json()
        .catch(() => ({ ok: response.ok }) as { ok: boolean; error?: string });
      if (!response.ok || result.ok === false)
        throw new Error(result.error || "Application submission failed.");
      formElement.reset();
      setSubmitState("sent");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : String(error));
      setSubmitState("error");
    }
  }

  return (
    <main className="forms-page page-width">
      <div className="forms-hero">
        <div>
          <p className="eyebrow">Season 01 / Player sign-up</p>
          <h1>
            Participation
            <br />
            <em>application.</em>
          </h1>
        </div>
        <p className="forms-intro">
          Please read and sign. You will also need to fill out the liability
          waiver, practice field waiver, and medical waiver from the{" "}
          <button className="text-link" onClick={() => navigate("forms")}>
            Forms &amp; Info
          </button>{" "}
          page.
        </p>
      </div>
      <section className="application-section application-section--standalone">
        <div className="application-heading">
          <p className="eyebrow">Electronic submission</p>
          <h2>
            Player
            <br />
            <em>details.</em>
          </h2>
          <p>
            Please read the Statement of Faith before submitting. A copy of the
            completed application is emailed to the association for review.
          </p>
        </div>
        <form className="application-form" onSubmit={submitApplication}>
          <fieldset>
            <legend>Student information</legend>
            <label>
              Name of student
              <input name="studentName" required />
            </label>
            <div className="form-grid form-grid--pair">
              <label>
                Grade
                <input name="grade" required />
              </label>
              <label>
                Date of birth (DOB)
                <input name="dateOfBirth" type="date" required />
              </label>
            </div>
            <label>
              Student is currently
              <select name="schoolStatus" required>
                <option value="">Select one</option>
                <option>Homeschooled</option>
                <option>Enrolled in a private school</option>
                <option>Enrolled in a public school</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              If other, please describe
              <input name="schoolStatusOther" />
            </label>
            <p className="form-note">
              If the player is currently involved in other sports at their
              current organization, it is the player's / family's
              responsibility to verify eligibility with that organization for
              other sports.
            </p>
          </fieldset>
          <fieldset>
            <legend>Parent or guardian contacts</legend>
            <div className="form-grid">
              <label>
                Father's name
                <input name="fatherName" />
              </label>
              <label>
                Phone
                <input name="fatherPhone" type="tel" />
              </label>
              <label>
                Email
                <input name="fatherEmail" type="email" />
              </label>
              <label>
                Mother's name
                <input name="motherName" />
              </label>
              <label>
                Phone
                <input name="motherPhone" type="tel" />
              </label>
              <label>
                Email
                <input name="motherEmail" type="email" />
              </label>
            </div>
            <label>
              Address
              <textarea name="address" rows={2} required />
            </label>
          </fieldset>
          <fieldset>
            <legend>Agreements &amp; sponsor</legend>
            <p className="form-instruction">
              Please read the Statement of Faith before submitting. Each
              statement below requires a parent initial.
            </p>
            <div className="agreement">
              <p>We (parents) have read and agree to the Statement of Faith.</p>
              <div className="initial-grid">
                <label>
                  Parent initial
                  <input
                    name="statementOfFaithInitialOne"
                    maxLength={5}
                    required
                  />
                </label>
                <label>
                  Parent initial
                  <input
                    name="statementOfFaithInitialTwo"
                    maxLength={5}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="agreement">
              <p>
                We agree to pay applicable fees to participate in the specified
                activity.
              </p>
              <div className="initial-grid">
                <label>
                  Initial
                  <input name="feeAgreementInitial" maxLength={5} required />
                </label>
              </div>
            </div>
            <div className="agreement">
              <p>We understand volunteer time is required.</p>
              <div className="initial-grid">
                <label>
                  Initial
                  <input name="volunteerInitial" maxLength={5} required />
                </label>
              </div>
            </div>
            <label>
              Parents' signatures
              <input name="parentSignatures" required />
            </label>
            <label>
              Name of sponsor
              <input name="sponsorName" required />
            </label>
            <p className="form-note">
              The sponsor must be a current Topeka Christian Football (TCF)
              member or coach, in good standing, who knows the applicant's
              family and agrees that the family meets the standards expected by
              TCF. If there is no sponsor with a strong knowledge of the player
              and his family, the applicant and family will be interviewed by
              one or more members of the TCF board, as is the procedure for new
              members.
            </p>
          </fieldset>
          <button
            className="button button-red submit-button"
            type="submit"
            disabled={submitState === "sending"}
          >
            {submitState === "sending"
              ? "Sending application..."
              : "Submit application →"}
          </button>
          {submitState === "sent" && (
            <p className="form-message success" role="status">
              Application submitted successfully. The association has been
              emailed a copy for review.
            </p>
          )}
          {submitState === "error" && (
            <p className="form-message error" role="alert">
              We couldn't submit your application
              {submitError ? `: ${submitError}` : "."} Please try again, or
              email{" "}
              <a href="mailto:football@topekachristianfootball.org">
                football@topekachristianfootball.org
              </a>
              .
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default App;

import { useEffect, useState, type FormEvent } from "react";

type Page = "home" | "forms" | "application";
type DriveFile = { name: string; type: string; date: string; url: string };

const driveFolderUrl =
  import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_URL ||
  "https://drive.google.com/drive/u/0/folders/1iHMpQr3fs_DjzZuyNgRoDZlH5zKqGAG6";
const driveFeedUrl = import.meta.env.VITE_GOOGLE_DRIVE_FEED_URL || "";
const applicationEndpoint =
  import.meta.env.VITE_APPLICATION_FORM_ENDPOINT ||
  "https://script.google.com/macros/s/AKfycbzgTXntnRHSInZG_iGZ9MhVmqctteuT0RNv6vHt8TMHNcgCck9tUsq-Y5SWV5_AOH2C/exec";

// Additional context for email recipients

const fallbackFiles: DriveFile[] = [
  {
    name: "2026 Player Registration FINAL.pdf",
    type: "Registration",
    date: "Aug 04, 2026",
    url: driveFolderUrl,
  },
  {
    name: "Medical Release FINAL.pdf",
    type: "Medical",
    date: "Aug 04, 2026",
    url: driveFolderUrl,
  },
  {
    name: "Code of Conduct FINAL.pdf",
    type: "Policies",
    date: "Jul 28, 2026",
    url: driveFolderUrl,
  },
  {
    name: "Practice & Game Day Guide FINAL.pdf",
    type: "Information",
    date: "Jul 28, 2026",
    url: driveFolderUrl,
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
          <span className="brand-mark">TC</span>
          <span className="brand-copy">
            <strong>Topeka Christian</strong>
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
          <a
            className="nav-cta"
            href="mailto:football@topekachristianfootball.org"
          >
            Contact us <span>↗</span>
          </a>
        </nav>
      </header>

      {page === "home" && <HomePage />}
      {page === "forms" && <FormsPage />}
      {page === "application" && <ApplicationPage />}

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">TC</span>
          <span>
            <strong>Topeka Christian Football Association</strong>
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

function HomePage() {
  return (
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
            Play hard. Live faithfully. Leave it all on the field.
          </p>
          <div className="hero-actions">
            <button
              className="button button-red"
              onClick={() => navigate("forms")}
            >
              Get season forms <span>↓</span>
            </button>
            <a className="text-link light" href="#season">
              Meet the club <span>↓</span>
            </a>
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
      </section>
    </main>
  );
}

function Value({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="value">
      <span className="value-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FormsPage() {
  const [files, setFiles] = useState<DriveFile[]>(fallbackFiles);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!driveFeedUrl) return;
    fetch(driveFeedUrl)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: DriveFile[]) => {
        setFiles(
          data.filter((file) => file.name.toUpperCase().includes("FINAL")),
        );
        setIsLive(true);
      })
      .catch(() => setIsLive(false));
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
      <div className="drive-status">
        <span className={isLive ? "status-dot live" : "status-dot"} />
        {isLive ? "Live from the team Drive" : "Team Drive folder"}
        <a href={driveFolderUrl} target="_blank" rel="noreferrer">
          Open shared folder ↗
        </a>
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
      <section className="final-note">
        <span className="note-mark">✓</span>
        <div>
          <h3>Only the final word.</h3>
          <p>
            We keep this page clean: when a document is ready for families, it
            is marked <strong>FINAL</strong> in the shared Drive and appears
            here automatically.
          </p>
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
          Complete this application, then submit it for review. You will also
          need the liability, practice field, and medical waivers from the{" "}
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
            <div className="form-grid">
              <label>
                Student name
                <input name="studentName" required />
              </label>
              <label>
                Grade
                <input name="grade" required />
              </label>
              <label>
                Date of birth
                <input name="dateOfBirth" type="date" required />
              </label>
            </div>
            <label>
              Current school status
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
          </fieldset>
          <fieldset>
            <legend>Parent or guardian contacts</legend>
            <div className="form-grid">
              <label>
                Father's name
                <input name="fatherName" />
              </label>
              <label>
                Father's phone
                <input name="fatherPhone" type="tel" />
              </label>
              <label>
                Father's email
                <input name="fatherEmail" type="email" />
              </label>
              <label>
                Mother's name
                <input name="motherName" />
              </label>
              <label>
                Mother's phone
                <input name="motherPhone" type="tel" />
              </label>
              <label>
                Mother's email
                <input name="motherEmail" type="email" />
              </label>
            </div>
            <label>
              Address
              <textarea name="address" rows={2} required />
            </label>
          </fieldset>
          <fieldset>
            <legend>Agreement and sponsorship</legend>
            <p className="form-instruction">
              Please read the Statement of Faith before submitting this
              application.
            </p>
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
              <label>
                Fee agreement initial
                <input name="feeAgreementInitial" maxLength={5} required />
              </label>
            </div>
            <label>
              Parent signatures
              <input name="parentSignatures" required />
            </label>
            <label>
              Name of sponsor
              <input name="sponsorName" required />
            </label>
            <label className="checkbox-label">
              <input
                name="eligibilityAcknowledgement"
                type="checkbox"
                required
              />{" "}
              I understand that it is my family's responsibility to verify
              eligibility with any other organization where my student
              participates.
            </label>
            <label className="checkbox-label">
              <input name="policiesAcknowledgement" type="checkbox" required />{" "}
              We have read and agree to the Statement of Faith and agree to pay
              applicable participation fees.
            </label>
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

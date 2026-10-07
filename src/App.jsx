import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Search,
  Copy,
  Check,
  Terminal,
  ChevronDown,
  Globe,
  X,
  Wifi,
  Zap,
  Database,
  Crosshair,
  Activity,
  Lock,
  Command,
} from "lucide-react";

import { payloadDatabase } from "./data/payloads";
import "./App.css";

function App() {
  const categories = Object.keys(payloadDatabase);

  const [target, setTarget] = useState("");
  const [category, setCategory] = useState(categories[0] || "");
  const [technique, setTechnique] = useState("");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [booted, setBooted] = useState(false);
  const [time, setTime] = useState(new Date());

  const techniques = Object.keys(payloadDatabase[category] || {});

  useEffect(() => {
    if (techniques.length && !techniques.includes(technique)) {
      setTechnique(techniques[0]);
    }
  }, [category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooted(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  const payloads =
    payloadDatabase[category]?.[technique] || [];

  const filteredTechniques = useMemo(() => {
    return techniques.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [techniques, search]);

  const extractDomain = (url) => {
    if (!url) return "";

    try {
      return new URL(
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`
      ).hostname;
    } catch {
      return url
        .replace(/^https?:\/\//, "")
        .split("/")[0];
    }
  };

  const generateValue = (item) => {
    const raw =
      item.command ||
      item.payload ||
      item.example ||
      "";

    const domain = extractDomain(target);

    return raw
      .replaceAll("{{target}}", target || "https://target.example")
      .replaceAll("{{domain}}", domain || "target.example");
  };

  const handleCategoryChange = (value) => {
    const nextTechniques = Object.keys(
      payloadDatabase[value] || {}
    );

    setCategory(value);
    setTechnique(nextTechniques[0] || "");
    setSearch("");
  };

  const copyPayload = async (value, index) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(index);

      setTimeout(() => {
        setCopied(null);
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const getType = (item) => {
    if (item.command) return "COMMAND";
    if (item.payload) return "PAYLOAD";
    return "EXAMPLE";
  };

  const categoryIcon =
    category === "OWASP" ? (
      <Shield size={18} />
    ) : (
      <Globe size={18} />
    );

  return (
    <div className={`app ${booted ? "booted" : ""}`}>
      {/* Cinematic scan beam */}
      <div className="scan-beam"></div>

      {/* Floating background particles */}
      <div className="cyber-particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-icon">
            <Shield size={20} />
          </div>

          <div>
            <div className="brand-name">
              OWASP<span>_</span>PAYLOAD
            </div>

            <div className="brand-subtitle">
              SECURITY REFERENCE SYSTEM
            </div>
          </div>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          <span>SYSTEM ONLINE</span>
        </div>
      </nav>

      {/* ================= BOOT OVERLAY ================= */}

      {!booted && (
        <div className="boot-screen">
          <div className="boot-content">
            <div className="boot-logo">
              <Shield size={42} />
            </div>

            <div className="boot-title">
              OWASP PAYLOAD HUB
            </div>

            <div className="boot-lines">
              <div>
                <span>[+]</span> INITIALIZING SECURITY CORE...
              </div>

              <div>
                <span>[+]</span> LOADING ENUMERATION MODULE...
              </div>

              <div>
                <span>[+]</span> LOADING OWASP DATABASE...
              </div>

              <div>
                <span>[+]</span> ESTABLISHING LOCAL SESSION...
              </div>

              <div className="boot-success">
                <span>[✓]</span> SYSTEM READY
              </div>
            </div>

            <div className="boot-progress">
              <div></div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN ================= */}

      <main className="main-container">

        {/* ================= HERO ================= */}

        <section className="hero">

          <div className="hero-status">
            <span className="pulse-ring"></span>
            AUTHORIZED SECURITY TESTING ENVIRONMENT
          </div>

          <h1 className="hero-title">
            <span className="glitch-text" data-text="OWASP">
              OWASP
            </span>

            <br />

            <span className="hero-highlight">
              PAYLOAD HUB
            </span>

            <span className="cursor">_</span>
          </h1>

          <p className="hero-description">
            Recon.
            <span> Analyze.</span>
            <span> Test.</span>
          </p>

          <p className="hero-subtitle">
            A fast local reference toolkit for authorized
            web security testing.
          </p>

          {/* System stats */}

          <div className="system-stats">

            <div className="stat">
              <Database size={15} />
              <div>
                <strong>
                  {categories.length}
                </strong>
                <span>MODULES</span>
              </div>
            </div>

            <div className="stat">
              <Crosshair size={15} />
              <div>
                <strong>
                  {techniques.length}
                </strong>
                <span>TECHNIQUES</span>
              </div>
            </div>

            <div className="stat">
              <Activity size={15} />
              <div>
                <strong>LOCAL</strong>
                <span>EXECUTION</span>
              </div>
            </div>

            <div className="stat">
              <Lock size={15} />
              <div>
                <strong>SAFE</strong>
                <span>REFERENCE</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= TARGET ================= */}

        <section className="target-panel">

          <div className="panel-heading">
            <div className="panel-heading-left">

              <div className="terminal-icon">
                <Terminal size={19} />
              </div>

              <div>
                <div className="panel-title">
                  TARGET CONFIGURATION
                </div>

                <div className="panel-subtitle">
                  DEFINE AUTHORIZED TEST TARGET
                </div>
              </div>

            </div>

            <div className="connection-status">
              <Wifi size={14} />
              LOCAL
            </div>
          </div>

          <div className="target-input-wrapper">

            <span className="terminal-prefix">
              $
            </span>

            <input
              value={target}
              onChange={(e) =>
                setTarget(e.target.value)
              }
              placeholder="https://target.example"
              spellCheck="false"
            />

            {target && (
              <button
                className="clear-target"
                onClick={() => setTarget("")}
                title="Clear target"
              >
                <X size={16} />
              </button>
            )}

            <button
              className="analyze-button"
              onClick={() =>
                window.scrollTo({
                  top: 500,
                  behavior: "smooth",
                })
              }
            >
              <Zap size={16} />
              ANALYZE
            </button>

          </div>

          <div className="target-note">
            <span>!</span>
            Only test systems you own or have explicit
            authorization to assess.
          </div>

        </section>

        {/* ================= CONTROLS ================= */}

        <section className="controls-panel">

          <div className="control-group">

            <label>
              <span className="label-number">
                01
              </span>

              CATEGORY
            </label>

            <div className="select-wrapper">

              <div className="select-icon">
                {categoryIcon}
              </div>

              <select
                value={category}
                onChange={(e) =>
                  handleCategoryChange(
                    e.target.value
                  )
                }
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="select-arrow"
                size={16}
              />

            </div>
          </div>

          <div className="control-group">

            <label>
              <span className="label-number">
                02
              </span>

              TECHNIQUE
            </label>

            <div className="select-wrapper">

              <div className="select-icon">
                <Command size={17} />
              </div>

              <select
                value={technique}
                onChange={(e) =>
                  setTechnique(
                    e.target.value
                  )
                }
              >
                {techniques.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="select-arrow"
                size={16}
              />

            </div>
          </div>

          <div className="control-group">

            <label>
              <span className="label-number">
                03
              </span>

              SEARCH MODULES
            </label>

            <div className="search-wrapper">

              <Search size={16} />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search techniques..."
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="search-clear"
                >
                  <X size={14} />
                </button>
              )}

            </div>
          </div>

        </section>

        {/* ================= TECHNIQUE SEARCH ================= */}

        {search && (
          <section className="search-results">

            <div className="search-results-header">
              <span>
                SEARCH RESULTS
              </span>

              <span className="result-count">
                {filteredTechniques.length} MATCH
                {filteredTechniques.length === 1
                  ? ""
                  : "ES"}
              </span>
            </div>

            <div className="technique-results">

              {filteredTechniques.length > 0 ? (
                filteredTechniques.map(
                  (item) => (
                    <button
                      key={item}
                      className={
                        item === technique
                          ? "technique-result active"
                          : "technique-result"
                      }
                      onClick={() => {
                        setTechnique(item);
                        setSearch("");
                      }}
                    >
                      <Command size={14} />
                      {item}
                    </button>
                  )
                )
              ) : (
                <div className="no-results">
                  NO TECHNIQUES FOUND
                </div>
              )}

            </div>
          </section>
        )}

        {/* ================= PAYLOAD SECTION ================= */}

        <section className="payload-section">

          <div className="section-header">

            <div>
              <div className="section-kicker">
                <span className="live-dot"></span>
                PAYLOAD DATABASE
              </div>

              <h2>
                {technique || "SELECT MODULE"}
              </h2>

              <p>
                Security testing references for
                authorized environments.
              </p>
            </div>

            <div className="payload-counter">
              <span>ENTRIES</span>
              <strong>
                {String(payloads.length).padStart(
                  2,
                  "0"
                )}
              </strong>
            </div>

          </div>

          <div className="payload-grid">

            {payloads.map((item, index) => {

              const value =
                generateValue(item);

              const type =
                getType(item);

              return (
                <article
                  className="payload-card"
                  key={`${item.name}-${index}`}
                >

                  {/* Card top */}

                  <div className="payload-card-top">

                    <div className="payload-index">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="payload-type">
                      <span></span>
                      {type}
                    </div>

                  </div>

                  {/* Title */}

                  <div className="payload-title-row">

                    <div className="payload-icon">
                      {type === "COMMAND" ? (
                        <Terminal size={17} />
                      ) : type === "PAYLOAD" ? (
                        <Crosshair size={17} />
                      ) : (
                        <Globe size={17} />
                      )}
                    </div>

                    <h3>
                      {item.name}
                    </h3>

                  </div>

                  {/* Description */}

                  <p className="payload-description">
                    {item.description}
                  </p>

                  {/* Code */}

                  <div className="code-container">

                    <div className="code-header">

                      <div className="terminal-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>

                      <span>
                        {type === "COMMAND"
                          ? "TERMINAL"
                          : "INPUT"}
                      </span>

                    </div>

                    <div className="code-body">

                      <span className="code-prefix">
                        {type === "COMMAND"
                          ? "$"
                          : ">"}
                      </span>

                      <code>
                        {value}
                      </code>

                    </div>

                    <button
                      className={
                        copied === index
                          ? "copy-button copied"
                          : "copy-button"
                      }
                      onClick={() =>
                        copyPayload(
                          value,
                          index
                        )
                      }
                    >
                      {copied === index ? (
                        <>
                          <Check size={14} />
                          COPIED
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          COPY
                        </>
                      )}
                    </button>

                  </div>

                  {/* Testing tip */}

                  {item.tip && (
                    <div className="testing-tip">

                      <span className="tip-icon">
                        💡
                      </span>

                      <div>
                        <strong>
                          TESTING TIP
                        </strong>

                        <p>
                          {item.tip}
                        </p>
                      </div>

                    </div>
                  )}

                </article>
              );
            })}

          </div>

          {/* Empty state */}

          {payloads.length === 0 && (
            <div className="empty-state">

              <Terminal size={34} />

              <h3>
                NO MODULE DATA
              </h3>

              <p>
                Select another security technique.
              </p>

            </div>
          )}

        </section>

        {/* ================= TERMINAL FOOTER ================= */}

        <section className="terminal-footer">

          <div className="terminal-line">

            <span className="terminal-green">
              root@payload-hub
            </span>

            <span>:</span>

            <span className="terminal-blue">
              ~/security
            </span>

            <span>$</span>

            <span className="terminal-command">
              system_status
            </span>

            <span className="terminal-cursor">
              █
            </span>

          </div>

          <div className="terminal-output">
            <span>[OK]</span>
            &nbsp; All security modules operational.
          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-left">

          <Shield size={15} />

          <span>
            OWASP PAYLOAD HUB
          </span>

          <span className="footer-separator">
            //
          </span>

          <span>
            LOCAL SECURITY TOOLKIT
          </span>

        </div>

        <div className="footer-right">

          <span>
            {time.toLocaleTimeString(
              "en-IN",
              {
                hour12: false,
              }
            )}
          </span>

          <span className="footer-separator">
            //
          </span>

          <span>
            v1.0.0
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;

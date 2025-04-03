import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <NavigationBar />
    </div>
  );
}

function NavigationBar() {
  const [hoveredSection, setHoveredSection] = useState(null);

  return (
    <div
      className="nav-container"
      style={{
        backgroundColor: "#0f172a",
        color: "#94a3b8",
        padding: "20px 0",
        width: "100%",
      }}
    >
      <div
        className="nav-content"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {/* Logo */}
        <div className="logo" style={{ marginRight: "40px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#4f46e5",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: "#818cf8",
                borderRadius: "2px",
                position: "absolute",
                top: "5px",
                left: "5px",
              }}
            ></div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div
          className="nav-sections"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <NavSection
            title="PRODUCTS"
            links={[
              "Cube Manage",
              "Cube Analyse",
              "Cube Launch",
              "Experimentation",
            ]}
            isHovered={hoveredSection === "products"}
            onHover={() => setHoveredSection("products")}
            onLeave={() => setHoveredSection(null)}
          />

          <NavSection
            title="RESOURCES"
            links={[
              "Blog",
              "Cheat Sheet",
              "Channel Partners",
              "Affiliate Program",
            ]}
            isHovered={hoveredSection === "resources"}
            onHover={() => setHoveredSection("resources")}
            onLeave={() => setHoveredSection(null)}
          />

          <NavSection
            title="PROJECTS"
            links={[
              "Session Recording",
              "Feature Flags",
              "Heatmaps",
              "Correlation Analysis",
            ]}
            isHovered={hoveredSection === "projects"}
            onHover={() => setHoveredSection("projects")}
            onLeave={() => setHoveredSection(null)}
          />

          <NavSection
            title="COMPANY"
            links={["About Us", "Our Story", "Work With Us"]}
            isHovered={hoveredSection === "company"}
            onHover={() => setHoveredSection("company")}
            onLeave={() => setHoveredSection(null)}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="footer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "40px auto 0",
          padding: "20px 20px 0",
          borderTop: "1px solid #334155",
        }}
      >
        <div className="footer-links">
          <a
            href="#terms"
            style={{
              color: "#94a3b8",
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            Terms
          </a>
          <a
            href="#privacy"
            style={{ color: "#94a3b8", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
        </div>

        <div
          className="social-icons"
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <a href="#twitter" aria-label="Twitter">
            <SocialIcon type="twitter" />
          </a>
          <a href="#medium" aria-label="Medium">
            <SocialIcon type="medium" />
          </a>
          <a href="#github" aria-label="GitHub">
            <SocialIcon type="github" />
          </a>
        </div>
      </div>
    </div>
  );
}

function NavSection({ title, links, isHovered, onHover, onLeave }) {
  return (
    <div
      className="nav-section"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ padding: "0 15px" }}
    >
      <h3
        style={{
          color: "#ffffff",
          marginBottom: "15px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: isHovered ? "block" : "block",
        }}
      >
        {links.map((link, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "14px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ type }) {
  const getIcon = () => {
    switch (type) {
      case "twitter":
        return (
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.13 1.2 4.92 4.92 0 00-8.384 4.48C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        );
      case "medium":
        return (
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "currentColor",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              fontWeight: "bold",
            }}
          >
            M
          </div>
        );
      case "github":
        return (
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        color: "#94a3b8",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
      onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
    >
      {getIcon()}
    </div>
  );
}

export default App;

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "OP & LFANT (Insurance Portals)",
      emoji: "🛡️",
      description:
        "Integrated modular architecture, metadata-driven forms with RBAC, REST API integration, and admin dashboards using Angular and PrimeNG — cutting dev time by 50%.",
    },
    {
      id: 2,
      name: "WMStandard (Finance App)",
      emoji: "💹",
      description:
        "Engineered a secure, cross-platform trading app using React Native and .NET backend with real-time stock updates, boosting DAUs by 30%.",
    },
    {
      id: 3,
      name: "PortfolioX (Wealth Mgmt. Admin Panel)",
      emoji: "📊",
      description:
        "Led frontend in Angular, streamlined UI workflows, and increased admin efficiency by 35%.",
    },
    {
      id: 4,
      name: "SBM (Mobile Banking App)",
      emoji: "🏦",
      description:
        "Migrated legacy Ionic codebase to React Native, improving load time by 40% and UX responsiveness.",
    },
    {
      id: 5,
      name: "UI Components Library",
      emoji: "🧩",
      description:
        "Created reusable UI components in React/Angular, reducing redundancy and improving consistency across 5+ projects.",
    },
    {
      id: 6,
      name: "Lyricalwings (Publishing Platform)",
      emoji: "📝",
      description:
        "Built a dual-portal platform with real-time analytics, moderation tools, and mobile/tablet optimizations using React & Firebase.",
    },
    {
      id: 7,
      name: "HR (Consultancy Platform)",
      emoji: "🤝",
      description:
        "Developed MVP with category filters, lead tracking, Firebase backend. Coordinating with client for productization.",
    },
    {
      id: 8,
      name: "AdSmart (Marketing Solution)",
      emoji: "📈",
      description:
        "Built data-driven campaign dashboard with advanced filters, SEO-friendly structure, and role-based UI segmentation.",
    },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
    <div className="container py-5">
      <div className="row g-4">
        {projects.map((project) => (
          <div className="col-sm-6 col-lg-4" key={project.id}>
            <div className="card border-0 shadow-sm h-100 hover-shadow transition-all">
              <div className="card-body">
                <div className="d-flex align-items-start mb-3">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "50px", height: "50px", fontSize: "1.6rem" }}
                  >
                    {project.emoji}
                  </div>
                  <h5 className="fw-semibold mb-0">{project.name}</h5>
                </div>
                <p className=" small">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Projects;

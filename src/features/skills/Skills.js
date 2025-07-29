const Skills = () => {
  const skills = [
    {
      id: 1,
      name: "JavaScript",
      icon: "🟨",
      description: "Proficient in JavaScript, including ES6+ features and async programming.",
      level: "Advanced",
    },
    {
      id: 2,
      name: "React",
      icon: "⚛️",
      description: "Experienced in building UIs with React, including hooks and state management.",
      level: "Advanced",
    },
    {
      id: 3,
      name: "CSS",
      icon: "🎨",
      description: "Skilled in Flexbox, Grid layouts, and responsive design.",
      level: "Intermediate",
    },
    {
      id: 4,
      name: "Node.js",
      icon: "🌿",
      description: "Familiar with server-side development and RESTful APIs.",
      level: "Intermediate",
    },
    {
      id: 5,
      name: "Git",
      icon: "🔧",
      description: "Experienced with Git workflows, branching, and collaboration.",
      level: "Advanced",
    },
    {
      id: 6,
      name: "TypeScript",
      icon: "🔷",
      description: "Type-safe development using TypeScript in frontend apps.",
      level: "Intermediate",
    },
    {
      id: 7,
      name: "Testing",
      icon: "🧪",
      description: "Familiar with Jest and React Testing Library.",
      level: "Intermediate",
    },
    {
      id: 8,
      name: "API Dev",
      icon: "🔌",
      description: "Built RESTful APIs with auth, CRUD, and middleware logic.",
      level: "Intermediate",
    },
    {
      id: 9,
      name: "Responsive Design",
      icon: "📱",
      description: "Ensures websites work well on all screen sizes.",
      level: "Intermediate",
    },
    {
      id: 10,
      name: "Performance",
      icon: "🚀",
      description: "Optimized apps with lazy loading, code splitting.",
      level: "Intermediate",
    },
  ];

  const getProgress = (level) => {
    switch (level) {
      case "Beginner":
        return 40;
      case "Intermediate":
        return 70;
      case "Advanced":
        return 90;
      default:
        return 50;
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
    <div className="container py-5">
      <div className="row g-4">
        {skills.map((skill) => (
          <div className="col-sm-6 col-lg-3" key={skill.id}>
            <div className="card border-0 shadow-sm h-100 hover-shadow transition-all">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                    style={{ width: "50px", height: "50px", fontSize: "1.8rem" }}
                  >
                    {skill.icon}
                  </div>
                  <h5 className="mb-0 fw-semibold">{skill.name}</h5>
                </div>
                <p className=" small mb-3">{skill.description}</p>
                <div className="progress mb-1" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${getProgress(skill.level)}%` }}
                    aria-valuenow={getProgress(skill.level)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <small className="">{skill.level}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Skills;

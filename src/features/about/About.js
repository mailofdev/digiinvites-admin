import DisplayImage from "../../components/display/DisplayImage";
import heroImage from "../../assets/images/ankit.png";

const About = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Left Text Section */}
          <div className="col-md-7">
            <p className="lead fs-3  mb-3">
              👋 Hi, I'm <strong className="">Ankit</strong>, a passionate Web Developer who loves turning ideas into interactive, scalable web experiences.
            </p>
            <p className=" mb-3">
              I bring <strong>3+ years of experience</strong> in crafting modern web/mobile apps using
              <strong> React.js, React Native, Angular, JavaScript, and TypeScript</strong>. My expertise lies in building
              <strong> SPA, PWA, responsive UIs</strong>, ensuring accessibility (WCAG), and using
              <strong> Redux, Context API, and REST APIs</strong>.
            </p>
            <p className=" mb-4">
              ⏱️ Reduced dev time by <strong>50%</strong> and boosted conversions by <strong>40–50%</strong> through UI optimization and Agile delivery across
              <strong> finance, insurance, and marketing domains</strong>.
            </p>

            <ul className="list-unstyled  fs-6">
              <li className="mb-2">✅ Built scalable, production-ready apps using <strong>React Native, Angular, JavaScript</strong>, and <strong>TypeScript</strong></li>
              <li className="mb-2">✅ Improved performance and reusability by <strong>40%</strong> with modular components</li>
              <li className="mb-2">✅ Delivered responsive, real-time platforms using <strong>React.js, Firebase, Redux, Tailwind CSS</strong></li>
              <li className="mb-2">✅ Focused on <strong>WCAG accessibility</strong>, CI/CD, Git workflows, and <strong>Firebase Hosting</strong></li>
              <li className="mb-2">✅ Known for <strong>rapid prototyping</strong>, clean architecture, and Agile teamwork</li>
            </ul>
          </div>

          {/* Right Image Section */}
          <div className="col-md-5 text-center">
            <div className="bg-white rounded-circle p-3 shadow-lg d-inline-block">
              <DisplayImage
                src={heroImage}
                alt="Ankit Patil - Web Developer"
                width="300px"
                height="300px"
                className="rounded-circle border border-3 border-primary shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

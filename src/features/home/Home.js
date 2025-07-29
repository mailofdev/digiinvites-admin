import { useNavigate } from "react-router-dom";
import DisplayImage from "../../components/display/DisplayImage";
import heroImage from "../../assets/images/ankit.png";
import { MdEmail } from "react-icons/md";
import { GrGithub } from "react-icons/gr";
import { LiaLinkedin } from "react-icons/lia";
import { FaCode, FaLaptop } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contactme");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/files/Ankit_Patil_CV_2025.pdf";
    link.setAttribute("download", "Ankit_Patil_CV_2025.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <div className="py-5 container">
        <div className="row align-items-center justify-content-center g-5">
          {/* Left - Image */}
          <div className="col-lg-5 col-md-6 text-center">
            <div className="position-relative d-inline-block">
              <div className="bg-white rounded-circle p-3 shadow-lg">
                <DisplayImage
                  src={heroImage}
                  alt="Ankit Patil - Web Developer"
                  width="280px"
                  height="280px"
                  className="rounded-circle border border-4 border-primary shadow"
                />
              </div>

              {/* Floating Icons */}
              <div
                className="position-absolute top-0 start-0 bg-warning rounded-circle p-2 shadow d-flex align-items-center justify-content-center animate__animated animate__bounce"
                style={{ width: '40px', height: '40px', transform: 'translate(-30%, -30%)' }}
              >
                <FaCode />
              </div>
              <div
                className="position-absolute bottom-0 end-0 bg-info rounded-circle p-2 shadow d-flex align-items-center justify-content-center animate__animated animate__bounce"
                style={{ width: '40px', height: '40px', transform: 'translate(30%, 30%)' }}
              >
                <FaLaptop />
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div className="col-lg-7 col-md-6 text-center text-md-start">
            <div className="mb-4">
              <span className="badge bg-warning  fs-6 mb-3 px-3 py-2 rounded-pill">
                👋 Hello, I'm
              </span>
              <h1 className="display-3 fw-bold mb-3 text-primary">Ankit</h1>
              <h2 className="h3 mb-4  fw-light">
                Passionate Web Developer & UI/UX Enthusiast
              </h2>
              <p className="lead mb-4 fs-5">
                I build beautiful, fast, and accessible web applications using modern technologies. Let’s craft digital experiences that users love!
              </p>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-5 justify-content-center justify-content-md-start">
              <button
                className="btn btn-warning btn-lg px-4 py-3 rounded-pill shadow-sm fw-semibold"
                onClick={handleContactClick}
              >
                <i className="fas fa-paper-plane me-2"></i>
                Get In Touch
              </button>

              <button
                className="btn btn-outline-primary btn-lg px-4 py-3 rounded-pill shadow-sm fw-semibold"
                onClick={handleDownloadCV}
              >
                <i className="fas fa-download me-2"></i>
                Download CV
              </button>
            </div>

            {/* Social Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
              <a
                className="btn btn-outline-secondary btn-lg rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                href="mailto:ankitjpatil28@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '62px', height: '62px' }}
                title="Send Email"
              >
                <MdEmail style={{ fontSize: '28px' }} />
              </a>

              <a
                className="btn btn-dark btn-lg rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                href="https://github.com/mailofdev"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '62px', height: '62px' }}
                title="GitHub Profile"
              >
                <GrGithub style={{ fontSize: '28px' }} />
              </a>

              <a
                className="btn btn-primary btn-lg rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                href="https://www.linkedin.com/in/ankitpatil28/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '62px', height: '62px' }}
                title="LinkedIn Profile"
              >
                <LiaLinkedin style={{ fontSize: '28px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

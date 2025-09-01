import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Globe from 'react-globe.gl';
import Button from './Button.jsx';

const zoomInAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.5, 0, 0.5, 1] }, // Smoother easing function
  },
};

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('ronitmittal0@gmail.com');
    setHasCopied(true);
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const handleScroll = () => {
    const section = document.getElementById('about');
    const sectionTop = section.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (sectionTop < viewportHeight * 0.8) {
      setIsVisible(true);
      controls.start("visible");
    } else {
      setIsVisible(false);
      controls.start("hidden");
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={zoomInAnimation}
          className="col-span-1 xl:row-span-3"
        >
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">Hi, I’m Ronit Mittal</p>
              <p className="grid-subtext">
              Hi, I’m Ronit Mittal — a passionate developer who believes in design thinking and continuous innovation. Through my projects and research, I’ve developed a strong curiosity for building and experimenting with technology. Whether it’s an AI model, or an interactive web app, I strive to add something unique to everything I create. This portfolio is a glimpse into my journey — how I learn, build, and grow. Welcome!
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={zoomInAnimation}
          className="col-span-1 xl:row-span-3"
        >
          <div className="grid-container">
            
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
              • Programming Languages:   Python, Java, C <br /><br />
              • AI & Machine Learning:   TensorFlow, PyTorch, Scikit-learn, DeepFace, OpenCV<br /><br />
              • Deep Learning:   CNNs, RNNs, Image SegmentaWon<br /><br />
              • Web Development:   Django, Flask, JavaScript, React.js, HTML5, CSS3, Bootstrap<br /><br />
              • Data Analysis:   Pandas, NumPy, Matplotlib, Seaborn, Plotly<br /><br />
              • Cloud & Deployment:   Docker<br /><br />
              • Frameworks & Tools:   Git, Jupyter Notebook, Anaconda, VS Code<br /><br />
              • Database:   MySQL<br /><br />
              • Version Control & CollaboraYon:   Git, GitHub<br /><br />
              • OperaYng Systems:   Windows, Linux, macOS<br /><br />
              • Other Skills:   OpenAI API, Hugging Face Transformers<br /><br />
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={zoomInAnimation}
          className="col-span-1 xl:row-span-4"
        >
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 30, lng: 78, text: 'I am Here', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={zoomInAnimation}
          className="xl:col-span-2 xl:row-span-3"
        >
          <div className="grid-container">
            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
              Coding, to me, is more than a profession — it's my way of thinking, building, and exploring the world.  
              I’m endlessly fascinated by how lines of code can evolve into powerful systems, intelligent applications,               and impactful solutions. My journey began with curiosity and has grown into a deep-rooted passion,              especially in the field of Artificial Intelligence and Machine Learning. From training CNNs for image             classification, to experimenting with natural language processing, and understanding how transformers like              Whisper or T5 work — I love diving into the math and the magic behind intelligent systems.<br />

              Alongside AI/ML, I’m passionate about research. I’ve authored multiple research papers that explore               innovative ways to solve real-world problems — whether it’s in image segmentation, medical imaging, or              unsupervised learning. I enjoy bridging the gap between theory and application, and I believe research is             the purest form of curiosity-driven development.<br />

              On the practical side, I build full-stack web applications using tools like React, Flask, and Tailwind CSS,               integrating AI models into dynamic and responsive UIs. I also explore the domain of cybersecurity, where              I’ve worked on tools like Wi-Fi auditing, secure login systems, and network monitoring. For me, writing             code is never about doing the bare minimum — it’s about crafting something useful, beautiful, and scalable.<br />

              Whether it’s designing a secure backend, translating a video using Whisper and ffmpeg, visualizing              segmentation maps in OpenCV, or deploying an interactive dashboard, I find joy in solving problems              creatively and collaboratively. I believe in clean code, meaningful work, and the endless power of learning             by building.<br />

              My ultimate goal is to be a part of meaningful AI-driven innovations — contributing to research, solving              real-world challenges, and making technology more inclusive and intelligent. This portfolio is a small              reflection of the larger vision I’m chasing.<br />
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={zoomInAnimation}
          className="xl:col-span-1 xl:row-span-2"
        >
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">ronitmittal0@gmail.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

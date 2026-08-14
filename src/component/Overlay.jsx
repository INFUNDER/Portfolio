import React from 'react';
import { Scroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 'omnimamba-unet',
    title: '3D Brain Stroke Segmentation (OmniMamba-UNet)',
    role: 'AI Researcher',
    description: 'Engineered a novel fully volumetric encoder-decoder network replacing traditional quadratic self-attention blocks with a Tri-Planar Selective State Space (S6) layer to process dense 3D volumes at voxel resolution in linear time. Evaluated on the ISLES 2022 dataset (250 subjects); achieved a five-fold cross-validation mean Dice coefficient of 0.7461 (peak fold 0.8236).',
    tech: ['PyTorch', 'MONAI', 'Mamba', 'Medical Imaging'],
    github: null,
    demo: null,
  },
  {
    id: 'cod-study',
    title: 'Controlled Decoders for Camouflaged Object Detection',
    role: 'AI Researcher',
    description: 'Conducted a highly controlled architectural benchmark isolating performance gains across CNN (ResNet-50), Vision Transformer, and linear-complexity Mamba decoders on the COD10K dataset (10,000 images). Developed a Swin-Tiny + Mamba hybrid architecture incorporating a specialized cross-attention fusion module, outperforming standard decoders with a structure measure Sm = 0.8401 and a Mean Absolute Error MAE = 0.0341 (a 22% error reduction).',
    tech: ['PyTorch', 'Swin Transformer', 'Mamba', 'Computer Vision'],
    github: null,
    demo: null,
  },
  {
    id: 'multimodal-osteoporosis',
    title: 'Multimodal Knowledge Distillation for Osteoporosis Diagnosis',
    role: 'Deep Learning Researcher',
    description: 'Designed a multimodal teacher-student regression pipeline using tabular clinical indicators and channel-stacked, six-channel dual-site image tensors (hip + spine DXA scans) to model cross-site density co-variation. Achieved a continuous T-score regression performance benchmark of R2 = 0.9111, MAE = 0.3157, and an overall 3-class clinical classification accuracy of 85.04% on a 3,585-patient cohort while reducing parameters by 55%.',
    tech: ['TensorFlow', 'PyTorch', 'ResNet', 'EfficientNet', 'Fusion'],
    github: null,
    demo: null,
  },
  {
    id: 'hemoglobin-prediction',
    title: 'PPG-HbNet: Non-Invasive Hemoglobin Estimation',
    role: 'Deep Learning Researcher',
    description: 'Developed a Wide & Deep hybrid neural network fusing raw 4-wavelength (660/730/850/940 nm) fingertip PPG signal segments with 71 handcrafted statistical and frequency-domain biomarkers via a linear bypass stream. Achieved a best-fold validation R2 score of 0.5490 on the open-source Hb-PPG dataset (252 subjects), outperforming traditional linear/Ridge metrics and establishing competitive parity with clinical pulse co-oximeters.',
    tech: ['PyTorch', '1D CNN', 'Transformer', 'Signal Processing'],
    github: null,
    demo: null,
  },
  {
    id: 'creatorpilot',
    title: 'CreatorPilot',
    role: 'AI Developer',
    description: 'An AI-powered web app that generates intelligent captions for both images and videos. Features real-time sentiment transformation, precise subtitle alignment, font customization, and multilingual subtitle support.',
    tech: ['React', 'Node.js', 'AI Models'],
    github: 'https://github.com/INFUNDER/Creator-Pilot',
    demo: null,
  },
  {
    id: 'insightai',
    title: 'INSIGHT AI',
    role: 'Lead Researcher',
    description: 'A Flask-based application that analyzes behavioral traits through AI, focusing on posture and facial expressions to provide personalized feedback for improving communication skills in various scenarios.',
    tech: ['Flask', 'Python', 'Computer Vision'],
    github: 'https://github.com/INFUNDER/INSIGHT_AI',
    demo: null,
  },
  {
    id: 'diseasepred',
    title: 'Disease Prediction System',
    role: 'ML Engineer',
    description: 'A web-based application that leverages machine learning to analyze user-reported symptoms and predict the likelihood of diseases such as Diabetes, Breast Cancer, and COVID-19.',
    tech: ['Machine Learning', 'Python', 'Web'],
    github: 'https://github.com/INFUNDER/Disease_Prediction',
    demo: null,
  },
  {
    id: 'kitewatch',
    title: 'KiteWatch',
    role: 'Embedded Systems & Aerodynamics Lead',
    description: 'Traditional Unmanned Aerial Vehicles (UAVs) are bottlenecked by short battery life and acoustic signatures. KiteWatch bypasses these constraints using a custom-engineered kite structure to hoist an advanced electronic payload capable of streaming live video and telemetry logs without consuming any power for flight propulsion.',
    tech: ['Embedded Systems', 'IoT', 'RF Telemetry', 'Aerodynamics', 'Edge Computing'],
    github: null,
    demo: null,
  },
  {
    id: 'wildlife-monitor',
    title: 'AI Wildlife Monitoring',
    role: 'Computer Vision Engineer',
    description: 'Developed an edge-ready, two-stage computer vision pipeline (YOLOv11 & Geometric Behavior Analysis) to detect invading primates in agricultural fields and analyze behavior in real time, achieving a Precision of 0.799 and mAP50 of 0.779 while eliminating false positives.',
    tech: ['Python', 'YOLOv11', 'OpenCV', 'NumPy', 'Roboflow'],
    github: null,
    demo: null,
  }
];

const publications = [
  {
    title: 'Hybrid Image-Based Wound Healing Analysis Using Entropy-Based Segmentation, Texture Features, and Optical Flow',
    venue: 'IEEE CICN 2026 (Accepted)',
    desc: 'Proceedings of the 2026 IEEE 18th International Conference on Computational Intelligence and Communication Networks (CICN).',
    link: 'https://doi.org/10.1109/CICN70047.2026.11594142'
  },
  {
    title: 'Human Presence Detection in Disaster Imagery Using Machine Learning',
    venue: 'IEEE CICN 2026 (Accepted)',
    desc: 'Proceedings of the 2026 IEEE 18th International Conference on Computational Intelligence and Communication Networks (CICN).',
    link: 'https://doi.org/10.1109/CICN70047.2026.11594393'
  },
  {
    title: 'Linear Systems Reduction using Differentiation and Mihailov Stability Criterion',
    venue: 'ICICV 2025 (Published)',
    desc: 'Proceedings of the 6th International Conference on Intelligent Communication Technologies and Virtual Mobile Networks (ICICV).',
    link: 'https://doi.org/10.1109/ICICV64824.2025.11085762'
  },
  {
    title: 'A Pragmatic DevOps Approach for Reducing the Time-to-Market for business using Git and DevOps',
    venue: 'ICICV 2025 (Published)',
    desc: 'Proceedings of the 6th International Conference on Intelligent Communication Technologies and Virtual Mobile Networks (ICICV).',
    link: 'https://doi.org/10.1109/ICICV64824.2025.11085714'
  },
  {
    title: 'Vote2Detect YOLO Framework',
    venue: 'Under-Review',
    desc: 'Enhanced spatial robustness using localized voting cells.',
    link: '#'
  }
];

export default function Overlay({ onProjectClick }) {
  const Section = ({ children, className }) => (
    <section className={`min-h-screen w-screen flex flex-col px-6 md:px-[10vw] py-24 md:py-32 ${className}`}>
      <div className="flex-grow min-h-[5vh]" />
      <div className="w-full flex flex-col items-center">
        {children}
      </div>
      <div className="flex-grow min-h-[5vh]" />
    </section>
  );

  return (
    <>
      <Scroll html>
        <div className="w-screen font-sans text-white pointer-events-none">

          {/* Hero Section */}
          <Section className="items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-2 md:mb-4 text-white">
                RONIT <br /><span className="text-gray-500">MITTAL</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-3xl text-gray-400 font-light max-w-2xl tracking-wide mx-auto">
                Machine Learning Engineer & Computer Vision Researcher. <br />
                <span className="text-white font-medium mt-2 block md:inline md:mt-0">Building the architecture of tomorrow.</span>
              </p>
            </motion.div>
          </Section>

          {/* About / Abstract */}
          <Section className="items-center text-center">
            <div className="max-w-2xl mx-auto px-4 md:px-0">
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 mb-6 uppercase font-bold">Research Focus</h2>
              <p className="text-xl sm:text-2xl md:text-4xl leading-relaxed md:leading-snug font-light text-gray-300">
                Deploying deep learning models for <span className="text-white font-medium">medical image segmentation</span>, NLP, and scalable AI infrastructure.
              </p>
            </div>
          </Section>

          {/* Education */}
          <Section className="items-center text-center">
            <div className="max-w-4xl pointer-events-auto mx-auto text-left w-full flex flex-col justify-center pb-20 md:pb-0">
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 mb-6 md:mb-8 uppercase font-bold text-center">Education</h2>
              <div className="flex flex-col gap-6">
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-white">Masters of Computer Application</h3>
                    <span className="text-xs tracking-widest text-red-400 uppercase mt-2 md:mt-0">Aug 2025 - Expected May 2027</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">The University of Petroleum and Energy Studies • Dehradun, India</p>
                </div>
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-white">Bachelor of Computer Application</h3>
                    <span className="text-xs tracking-widest text-red-400 uppercase mt-2 md:mt-0">Aug 2022 - May 2025</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">The University of Petroleum and Energy Studies • Dehradun, India</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    CGPA: 8.28
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Experience */}
          <Section className="items-center text-center">
            <div className="max-w-4xl pointer-events-auto mx-auto text-left w-full flex flex-col justify-center pb-20 md:pb-0">
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 mb-6 md:mb-8 uppercase font-bold text-center">Experience</h2>
              <div className="flex flex-col gap-6">
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-white">Research Internship</h3>
                    <span className="text-xs tracking-widest text-red-400 uppercase mt-2 md:mt-0">Apr 2026 - Expected Oct 2026</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Dalian University of Technology • Dalian, China</p>
                  <ul className="text-gray-400 text-sm leading-relaxed list-disc list-outside ml-4 space-y-2">
                    <li>Optimizing EdgeFace architecture for resource-constrained edge devices, focusing on structural modifications to significantly reduce model parameters and MFLOPs.</li>
                    <li>Introducing architectural novelty to the facial recognition framework, balancing aggressive model compression with rigorous benchmark evaluations to maintain baseline accuracy.</li>
                  </ul>
                </div>
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-white">Undergraduate Research Intern</h3>
                    <span className="text-xs tracking-widest text-red-400 uppercase mt-2 md:mt-0">Jun 2025 - Jul 2025</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">UPES School of Computer Science • Dehradun, India</p>
                  <ul className="text-gray-400 text-sm leading-relaxed list-disc list-outside ml-4 space-y-2">
                    <li>Developed and implemented a residual attention U-Net architecture, achieving a cross-validation mean Dice score of 0.7766 in the project's stroke-lesion segmentation.</li>
                    <li>Created a hybrid Focal-Tversky + Adaptive-Wing loss and residual attention U-Net that successfully handled a 145:1 background-to-lesion imbalance.</li>
                  </ul>
                </div>
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold text-white">Project Intern</h3>
                    <span className="text-xs tracking-widest text-red-400 uppercase mt-2 md:mt-0">Jun 2024 - Jul 2024</span>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Phemesoftware Pvt Ltd. • India</p>
                  <ul className="text-gray-400 text-sm leading-relaxed list-disc list-outside ml-4 space-y-2">
                    <li>Built and deployed predictive models for COVID-19, breast cancer, and diabetes using Scikit-learn, leveraging symptom and clinical data to assess risk levels.</li>
                    <li>Applied classification algorithms such as Logistic Regression for Diabetes Prediction achieving 77.27% accuracy, Random Forest for COVID-19 Prediction achieving 80.77% accuracy, and SVM for Breast Cancer Prediction achieving 94.24% accuracy.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Projects */}
          <Section className="items-center text-center">
            <div className="w-full max-w-6xl pointer-events-auto mx-auto text-left flex flex-col justify-center pb-20 md:pb-0">
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 mb-6 md:mb-10 uppercase font-bold text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                {projects.map((project, i) => (
                  <div
                    key={i}
                    onClick={() => onProjectClick(project)}
                    className="group relative border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8 cursor-pointer transition-all duration-500 hover:bg-white/5 hover:-translate-y-2 hover:border-white/30 flex flex-col"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500 transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white line-clamp-2">{project.title}</h3>
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed line-clamp-4">{project.description}</p>
                    <div className="flex items-center gap-2 mt-4 md:mt-6 text-red-400 font-medium text-xs md:text-sm uppercase tracking-widest group-hover:gap-4 transition-all mt-auto">
                      Initialize Sequence <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Publications */}
          <Section className="items-center text-center">
            <div className="w-full max-w-4xl pointer-events-auto mx-auto text-left flex flex-col justify-center">
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 mb-6 md:mb-10 uppercase font-bold text-center">Publications & Literature</h2>
              <div className="flex flex-col gap-4">
                {publications.map((pub, i) => (
                  <a
                    key={i}
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col md:flex-row justify-between items-start md:items-center border border-white/10 bg-black/40 backdrop-blur-md p-5 md:p-6 hover:border-white/50 transition-colors duration-300"
                  >
                    <div className="text-left mb-3 md:mb-0 max-w-[85%]">
                      <h3 className="text-base md:text-xl font-bold group-hover:text-red-400 transition-colors duration-300">{pub.title}</h3>
                      <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">{pub.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 group-hover:text-white transition-colors duration-300 mt-2 md:mt-0">
                      <span className="uppercase tracking-widest">{pub.venue}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Section>

          {/* Technical Skills */}
          <Section className="items-center text-center pb-20 md:pb-32">
            <div className="w-full max-w-4xl pointer-events-auto mx-auto text-left flex flex-col justify-center">
              <h2 className="text-xs md:text-sm tracking-[0.3em] text-red-500 mb-6 md:mb-10 uppercase font-bold text-center">Technical Skills</h2>
              <div className="border border-white/10 bg-black/40 backdrop-blur-md p-6 md:p-8">
                <ul className="text-gray-300 text-sm md:text-base leading-relaxed space-y-3">
                  <li><strong className="text-white">Languages:</strong> Python, Java, JavaScript, C, SQL</li>
                  <li><strong className="text-white">AI & Machine Learning:</strong> PyTorch, TensorFlow, Keras, Scikit-learn, MONAI, NumPy, Pandas</li>
                  <li><strong className="text-white">Computer Vision & Signal Processing:</strong> OpenCV, MediaPipe, YOLOv8, Image Segmentation, Signal Filtering</li>
                  <li><strong className="text-white">Specialized Architectures:</strong> State Space Models (Mamba, S6), U-Net, UNETR, Swin Transformer, ResNet, EfficientNet</li>
                  <li><strong className="text-white">Generative AI & LLMs:</strong> OpenAI API, Hugging Face, Vision-Language Models (VLMs), Prompt Engineering</li>
                  <li><strong className="text-white">Tools & Frameworks:</strong> Linux/HPC (PBS Clusters, qsub), Git, Docker, Flask, React.js</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </Scroll>
    </>
  );
}

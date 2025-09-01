import { AnimatedTestimonials } from "../components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {   
      quote:
        "Build an advanced image and video captioning system using deep learning models. Designing an image captioning pipeline that incorporates a CNN, Transformer Encoder, and Transformer Decoder.",
      designation: "CreatorPilot (Image & Video Captionon Generation)",
      src: "screenshot/Creatorpilot.png",
    },
    {
      quote:
        "Engineered an AI-powered tool with four core functionalities: text summarization, note-making, question-answer generation, and Excel data visualization. Developed a robust backend using Django to manage data processing and model execution efficiently.",
      
      designation: "RapidRecap (Automated Text SummarisaYon Tool) ",
      src: "",
    },
    {
      quote:
        "Built a Flask-based AI platform to analyze behavioral traits, including facial expressions, posture, and hand gestures.  Integrated TensorFlow, DeepFace, and OpenCV for real-time video processing and behavioral analysis.",
    
      designation: "INSIGHT_AI (Flask-Based Behavioural Analysis Pladorm) ",
      src: "screenshot/INSIGHTAI.png",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}

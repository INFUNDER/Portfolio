import React from "react";
import { Timeline } from "../components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "June 2024-July 2024",
      content: (
        <div>
          <p
            className="mb-8 text-lg font-normal text-neutral-200 md:text-lg dark:text-neutral-200">
            IBM Internship|Disease Outbreak Prediction Model
          </p>
          <p
            className="mb-8 text-xs font-normal text-neutral-200 md:text-sm dark:text-neutral-200">
 Machine Learning Engineer <br/>
• Built a disease outbreak prediction model leveraging Scikit-learn to assess symptom-based likelihood.<br/>
• Executed data preprocessing, feature extraction, and model validation to enhance accuracy.<br/> 
• Structured and documented the development process, ensuring scalability and maintainability. <br/>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="screenshot/DP1.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="screenshot/DP2.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
            <img
              src="screenshot/DP5.png"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "June 2023-July 2023",
      content: (
        <div>
          <p
            className="mb-8 text-xs font-normal text-neutral-200 md:text-sm dark:text-neutral-200">
            Social Internship|Youth Warriors 
          </p>
          <p
            className="mb-8 text-xs font-normal text-neutral-200 md:text-sm dark:text-neutral-200">
           Social Impact Coordinator <br/>
          • Led a strategic social media awareness campaign, expanding outreach to 100,000 potential viewers and
            boosting engagement by 30%.<br/>
          • Spearheaded an awareness initiative on gender-based violence, directly impacting 5,000 individuals and
            providing essential support resources.<br/>
          • Collaborated with team members to design and execute impactful digital content, fostering community
              awareness and engagement. <br/>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="screenshot/YW1.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },

  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}

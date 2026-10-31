export const profile = {
  name: 'Ronit Mittal',
  email: 'ronitmittal0@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ronitmittal/',
  github: 'https://github.com/INFUNDER',
  location: 'Dehradun, India',
  timezone: 'Asia/Kolkata',
  fields: ['Computational pathology', 'Spatial transcriptomics', 'Regulatory genomics'],
  statement:
    'I build interpretable deep learning models that link tissue morphology to gene regulation.',
  summary:
    'Master’s student working at the intersection of computational pathology, spatial transcriptomics and regulatory genomics. I combine pathology foundation models (UNI, CONCH), curated regulatory networks and DNABERT-based TF binding models (DeepVRegulome) into models whose predictions can be read, not just scored. Earlier work on linear-time 3D medical image segmentation with state space models (Mamba) led to a first-author journal manuscript under review and four IEEE conference papers.',
  interests: [
    'Interpretable machine learning for genomics',
    'Variant & regulatory interpretation',
    'Spatial transcriptomics',
    'Uncertainty quantification',
  ],
};

export const nav = [
  { id: 'research', label: 'Research' },
  { id: 'work', label: 'Work' },
  { id: 'publications', label: 'Publications' },
  { id: 'path', label: 'Path' },
  { id: 'contact', label: 'Contact' },
];

export const stats = [
  { value: 4, label: 'IEEE conference papers' },
  { value: 1, label: 'First-author journal manuscript, under review' },
  { value: 3, label: 'Research & industry internships' },
  { value: 8.28, decimals: 2, label: 'BCA CGPA' },
];

export const projects = [
  {
    id: 'lg-ncbm',
    scene: 'tissue',
    title: 'Interpretable Histology-to-Transcriptomics',
    short: 'LG-NCBM',
    stack: ['PyTorch', 'CONCH', 'DNABERT'],
    lede:
      'Predicts spatial gene expression from H&E patches through 40 named regulatory programs (signalling pathways, transcription factors, hallmarks), so every prediction can be traced back to biology.',
    metrics: [
      { value: '−0.002', label: 'ΔPCC vs. black-box predictor' },
      { value: '35–42%', label: 'of variance routed through named programs' },
      { value: '52', label: 'Xenium slides · 37 patients · 3 organs' },
    ],
    points: [
      'Programs are scored against frozen CONCH text anchors.',
      'A prior-guided decoder penalises non-curated TF→gene edges (CollecTRI, PROGENy) via proximal updates in Adam’s metric, keeping all 5,286 curated edges while zeroing 87.6% of off-prior weights.',
      'Regulatory edges are weighted by promoter-level DeepVRegulome (DNABERT) binding against dinucleotide-shuffled controls and ReMap ChIP-seq peaks.',
      'Leave-one-patient-out validation; outperforms ST-Net and BLEEP, with split-conformal intervals identifying which programs are readable from H&E.',
    ],
    figure: 'H&E tissue field. Nuclei in violet, stroma in pink, spatial transcriptomics spots above.',
  },
  {
    id: 'omnimamba',
    scene: 'brain',
    title: '3D Brain Stroke Segmentation',
    short: 'OmniMamba-UNet',
    stack: ['PyTorch', 'MONAI', 'Mamba'],
    status: 'First-author manuscript · under review at CMPB (Elsevier)',
    lede:
      'A fully volumetric encoder–decoder that replaces quadratic self-attention with a Tri-Planar Selective State Space (S6) layer, processing dense MRI volumes at voxel resolution in linear time.',
    metrics: [
      { value: '0.7461', label: 'Mean Dice, five-fold CV' },
      { value: '0.8236', label: 'Peak-fold Dice' },
      { value: '250', label: 'Subjects · ISLES 2022' },
    ],
    points: [
      'Tri-planar selective scans capture long-range context along axial, coronal and sagittal axes.',
      'Linear complexity makes full-resolution 3D inference practical without patch stitching.',
    ],
    figure: 'Brain volume as a point cloud. The pink cluster marks an ischaemic lesion.',
  },
  {
    id: 'bc-ssm',
    scene: 'polyp',
    title: 'Boundary-Conditioned State Space Models',
    short: 'BC-SSM · Polyp segmentation',
    stack: ['PyTorch', 'Mamba', 'Swin Transformer'],
    code: 'https://github.com/INFUNDER/B-Mamba',
    lede:
      'Vision Mamba models compute their memory from local appearance alone, so context leaks across weak lesion borders. BC-SSM feeds learned boundary tokens into the step size Δ and the B, C matrices across four-way scans.',
    metrics: [
      { value: '0.929', label: 'mDice on Kvasir' },
      { value: '0.822', label: 'mDice on unseen ETIS (+3.5% over Polyp-PVT)' },
      { value: '−12.1 px', label: 'HD95 vs. matched S6, at 2.0% extra compute' },
    ],
    points: [
      'Proved the block strictly contains standard selective SSMs (S6), and that positive boundary responses exponentially bound information flow across edges.',
      'Mechanistic probing confirmed a 2.04× step-size surge and a 4.8× drop in memory retention at polyp borders.',
      'Five-dataset PraNet protocol, leakage-checked split, three seeds.',
    ],
    figure: 'Polyp surface with its learned boundary in pink and the four-way scan lattice behind it.',
  },
  {
    id: 'osteo',
    scene: 'spine',
    title: 'Multimodal Distillation for Osteoporosis',
    short: 'Knowledge distillation · DXA',
    stack: ['PyTorch', 'TensorFlow', 'Fusion'],
    lede:
      'A teacher–student regression pipeline fusing clinical tabular indicators with six-channel, dual-site image tensors (hip + spine DXA) to model cross-site bone density co-variation.',
    metrics: [
      { value: '0.9111', label: 'R² on continuous T-score' },
      { value: '85.04%', label: '3-class clinical accuracy' },
      { value: '−55%', label: 'Parameters after distillation' },
    ],
    points: ['3,585-patient cohort; MAE = 0.3157 on T-score regression.'],
    figure: 'Lumbar vertebrae. Intervertebral discs in pink.',
  },
];

export const publications = [
  {
    year: '2026',
    authors: 'R. Mittal, M. Srivastav, P. C. Tripathi, A. Kumar',
    title:
      'OmniMamba-UNet: A Linear Selective State Space Architecture for Volumetric Stroke Lesion Delineation on MRI Datasets',
    venue: 'Computer Methods and Programs in Biomedicine (Elsevier)',
    tags: ['Journal', 'Under review', 'First author'],
    note: 'CMPB-D-26-06457',
  },
  {
    year: '2026',
    authors: 'R. Mittal, M. Srivastav, K. Venugopalachary',
    title:
      'Hybrid Image-Based Wound Healing Analysis Using Entropy-Based Segmentation, Texture Features, and Optical Flow',
    venue: 'IEEE CICN 2026 · Manila, Philippines · pp. 1023–1028',
    tags: ['Conference', 'First author'],
    doi: '10.1109/CICN70047.2026.11594142',
  },
  {
    year: '2026',
    authors: 'M. Srivastav, R. Mittal, K. Venugopalachary',
    title: 'Human Presence Detection in Disaster Imagery Using Machine Learning',
    venue: 'IEEE CICN 2026 · Manila, Philippines · pp. 419–424',
    tags: ['Conference'],
    doi: '10.1109/CICN70047.2026.11594393',
  },
  {
    year: '2025',
    authors: 'D. Sharma, A. Aggarwal, R. Mittal, G. Sharma, S. Aggarwal, A. Kumar',
    title: 'Linear Systems Reduction using Differentiation and Mihailov Stability Criterion',
    venue: 'IEEE ICICV 2025 · Tirunelveli, India · pp. 969–973',
    tags: ['Conference'],
    doi: '10.1109/ICICV64824.2025.11085762',
  },
  {
    year: '2025',
    authors: 'V. Singh, A. Aggarwal, S. Aggarwal, R. Mittal',
    title:
      'A Pragmatic DevOps Approach for Reducing the Time-to-Market for Business using Git and DevOps',
    venue: 'IEEE ICICV 2025 · Tirunelveli, India · pp. 974–978',
    tags: ['Conference'],
    doi: '10.1109/ICICV64824.2025.11085714',
  },
];

export const experience = [
  {
    org: 'Dalian University of Technology',
    role: 'Research Intern',
    place: 'Dalian, China',
    period: 'Apr – Oct 2026',
    points: [
      'Optimised the EdgeFace architecture for resource-constrained edge devices through structural changes that cut parameters and MFLOPs.',
      'Introduced architectural novelty to the face recognition framework, balancing aggressive compression against rigorous benchmark evaluation to hold baseline accuracy.',
    ],
  },
  {
    org: 'UPES School of Computer Science',
    role: 'Undergraduate Research Intern',
    place: 'Dehradun, India',
    period: 'Jun – Jul 2025',
    points: [
      'Built a residual attention U-Net for stroke-lesion segmentation reaching a cross-validated mean Dice of 0.7766.',
      'Designed a hybrid Focal-Tversky + Adaptive-Wing loss that handled a 145:1 background-to-lesion imbalance.',
    ],
  },
  {
    org: 'Phemesoftware Pvt. Ltd.',
    role: 'Project Intern',
    place: 'India',
    period: 'Jun – Jul 2024',
    points: [
      'Built and deployed risk models for COVID-19, breast cancer and diabetes from symptom and clinical tabular data with scikit-learn.',
      'Logistic Regression 77.27%, Random Forest 80.77% and SVM 94.24% accuracy.',
    ],
  },
];

export const education = [
  {
    degree: 'Master of Computer Applications',
    org: 'University of Petroleum and Energy Studies',
    period: 'Aug 2025 – May 2027 (expected)',
  },
  {
    degree: 'Bachelor of Computer Applications',
    org: 'University of Petroleum and Energy Studies',
    period: 'Aug 2022 – May 2025',
    detail: 'CGPA 8.28',
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'C', 'SQL'] },
  {
    group: 'Machine learning',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'MONAI', 'NumPy', 'Pandas'],
  },
  {
    group: 'Architectures',
    items: ['Mamba / S6', 'U-Net', 'UNETR', 'Swin Transformer', 'ResNet', 'GATv2'],
  },
  {
    group: 'Vision & signals',
    items: ['OpenCV', 'MediaPipe', 'YOLOv8', 'Image segmentation', 'Signal filtering'],
  },
  {
    group: 'Foundation models',
    items: ['UNI', 'CONCH', 'DNABERT', 'Hugging Face', 'VLMs', 'OpenAI API'],
  },
  {
    group: 'Infrastructure',
    items: ['Linux / HPC (PBS, qsub)', 'Git', 'Docker', 'Flask', 'React'],
  },
];

export const marquee = [
  'Computational pathology',
  'Spatial transcriptomics',
  'Regulatory genomics',
  'State space models',
  '3D medical segmentation',
  'Uncertainty quantification',
  'Foundation models',
];

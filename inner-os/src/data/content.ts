export const profile = {
  name: 'Jevan Bhatti',
  title: 'Software Engineer',
  showcaseYear: "Portfolio '26",
  location: 'Vancouver, BC, Canada',
  email: 'gurjevanbhatti@gmail.com',
  github: 'https://github.com/gurjevanbhatti',
  linkedin: 'https://www.linkedin.com/in/gurjevan-kaur-bhatti-35b42a185',
}

// The About page: Jevan's story in order, like chapters, then snapshots.
export const about = {
  quote: 'Switching my major was the greatest decision I have ever made.',
  chapters: [
    {
      title: ['Where it', 'started'],
      text: [
        "If you'd met me in elementary school, you probably wouldn't have guessed I'd end up here. I wasn't a great student, and school just never really clicked for me.",
        "That changed in high school, when I fell in love with math. Suddenly it felt easy, because at its core, math is just patterns. It still feels that way, and it's the same reason LeetCode feels more like a puzzle than a chore to me.",
      ],
    },
    {
      title: ['Finding my', 'path'],
      text: [
        "Everyone in my family works in healthcare, so biology felt like the natural path. I spent a couple of years in it before I realized healthcare just isn't where I belong. In pretty much my fourth year, I switched my major to data science. It was late in the game, but it was the greatest decision I have ever made.",
        "What I love most about it is the freedom. You can wake up with an idea and build it that same day, entirely on your own terms. Next, I get to keep doing that in my Master's in Data Science at Georgia Tech.",
      ],
      photo: { src: '/inner-os/photos/about-coding.jpg', alt: 'Laptop showing the code for this website', caption: 'A real photo of me building this website.' },
    },
    {
      title: ['Outside of', 'code'],
      text: [
        'I love hackathons, even the ones we lose, because trying something new with friends is the fun part.',
        "I also create content for about 25K followers, which lets me be creative on my own terms. And when I'm not building or filming, I'm probably planning my next vacation.",
      ],
      photo: { src: '/inner-os/photos/about-hackathon.jpg', alt: 'Jevan and three friends at a hackathon', caption: "My friends and me at a hackathon we didn't win. Still one of my favourites." },
    },
  ],
  snapshots: [
    { src: '/inner-os/photos/about-plane.jpg', alt: 'City lights seen from a plane window at night' },
    { src: '/inner-os/photos/snap-pink.jpg', alt: 'Pink leggings and sneakers on an escalator' },
    { src: '/inner-os/photos/snap-flowers.jpg', alt: 'Jevan holding a bouquet of pink flowers' },
    { src: '/inner-os/photos/snap-ramen.jpg', alt: 'Two bowls of ramen' },
  ],
}

// One-liners for the home page, newest first.
export const highlights = [
  { logo: '/inner-os/sf/logo-gt.png', year: "'27", text: 'Incoming MSc Data Science', org: 'Georgia Tech' },
  { logo: '/inner-os/sf/logo-sfu.png', year: "'26", text: 'BSc Data Science', org: 'Simon Fraser University' },
  { logo: '/inner-os/logos/meta.svg', year: "'25", text: 'Production Engineering Fellow', org: 'Meta × MLH' },
  { logo: '/inner-os/logos/amazon.svg', year: "'24", text: 'Student Software Developer', org: 'Amazon (SFU × AWS)' },
  { logo: '/inner-os/logos/trophy.svg', year: "'24", text: "2nd Place @ cmd-f, Canada's largest women's hackathon" },
]

// Shown beside the highlights. shape 'tall' spans two rows, 'wide' spans both columns.
export const photos = [
  { src: '/inner-os/photos/home-portrait.jpg', alt: 'Jevan Bhatti', shape: 'tall' },
  { src: '/inner-os/photos/home-campus.jpg', alt: 'Ivy-covered university building at sunset', position: '50% 45%' },
  { src: '/inner-os/photos/home-convocation.jpg', alt: 'Rows of graduates in caps and gowns at SFU convocation', position: '50% 52%' },
  { src: '/inner-os/photos/home-hackathon.jpg', alt: 'Group photo of hackathon participants in a lecture hall', shape: 'wide', position: '50% 62%' },
]

export const education = [
  {
    school: 'Georgia Institute of Technology',
    location: 'Atlanta, GA',
    degree: "Master's Degree, Data Science",
    date: 'Incoming 2027',
    link: 'https://www.gatech.edu/',
    logo: '/inner-os/sf/logo-gt.png',
    awards: [] as string[],
    activities: [] as string[],
  },
  {
    school: 'Simon Fraser University',
    location: 'Vancouver, BC',
    degree: 'Bachelor of Science - BS, Data Science',
    date: '2022 - 2026',
    link: 'https://www.sfu.ca/',
    logo: '/inner-os/sf/logo-sfu.png',
    awards: ['Undergraduate Award for Women in Faculty of Science (2025)'],
    activities: ['Women in Computer Science (WiCS)', 'Girls Who Code (GWC)'],
  },
]

export const skills = {
  Languages: ['Python', 'R', 'C', 'C++', 'JavaScript', 'HTML', 'CSS', 'Java', 'TypeScript'],
  'Frameworks / Libraries': [
    'Spring Boot',
    'React',
    'Node.js',
    'Express',
    'TensorFlow',
    'NumPy',
    'Pandas',
    'PyTorch',
  ],
  'Tools / Databases': [
    'AWS',
    'Azure',
    'SQL',
    'MongoDB',
    'Docker',
    'Postman',
    'CI/CD',
    'Git',
    'GitHub',
  ],
}

// Logo for each skill (in public/skills); anything missing shows without one.
export const skillIcons: Record<string, string> = {
  Python: 'python', R: 'r', C: 'c', 'C++': 'cplusplus', JavaScript: 'javascript', HTML: 'html5',
  CSS: 'css3', Java: 'java', TypeScript: 'typescript', 'Spring Boot': 'spring', React: 'react',
  'Node.js': 'nodejs', Express: 'express', TensorFlow: 'tensorflow', NumPy: 'numpy', Pandas: 'pandas',
  PyTorch: 'pytorch', AWS: 'amazonwebservices', Azure: 'azure', SQL: 'sql', MongoDB: 'mongodb',
  Docker: 'docker', Postman: 'postman', 'CI/CD': 'githubactions', Git: 'git', GitHub: 'github',
}

export const experience = [
  {
    company: 'Meta | Major League Hacking',
    link: 'https://mlh.io/',
    logo: '/inner-os/logos/meta.svg',
    role: 'Production Engineer',
    date: 'September 2025 - December 2025',
    bullets: [
      'Achieved 90% code coverage across the open-source repository by authoring 20+ unit and integration tests, optimizing database queries to execute in under 2 milliseconds.',
      'Collaborated with Meta Engineers in an Agile environment to integrate Prometheus and Grafana, establishing real-time system visualization and container monitoring for the deployment environment.',
    ],
    tech: ['Flask', 'MySQL', 'Docker', 'CI/CD', 'Grafana'],
  },
  {
    company: 'Simon Fraser University (SFU)',
    link: 'https://www.sfu.ca/',
    logo: '/inner-os/sf/logo-sfu.png',
    role: 'Software Engineer Intern',
    date: 'May 2025 - Aug 2025',
    bullets: [
      "Led early-stage modernization of Peru's dairy traceability infrastructure by architecting a full-stack digital quality management platform (React, TypeScript, Express, PostgreSQL) within a national dairy market serving ~24M consumers.",
      'Automated manual reconciliation, lab reporting, and supplier performance tracking workflows across operations and QA teams, driving up to 30% operational efficiency improvement and modeling up to ~$100K in annualized labor cost savings.',
    ],
    tech: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
  },
  {
    company: 'Simon Fraser University (SFU)',
    link: 'https://www.sfu.ca/',
    logo: '/inner-os/sf/logo-sfu.png',
    role: 'Data Analyst Intern',
    date: 'May 2025 - Aug 2025',
    bullets: [
      'Collaborated with Professor Jason Ho, PhD (UBC) to analyze enrollment trends across 200+ course sections, improving course scheduling for ~5,000+ current and future Beedie undergraduate students.',
      'Built interactive Power BI dashboards to visualize fill rates, waitlists, and cancellation patterns, enabling leadership to identify 45% summer under-enrollment and 30% spring over-capacity, guiding resource reallocation decisions.',
    ],
    tech: ['SQL', 'Power BI'],
  },
  {
    company: 'Amazon - SFU x AWS Collaboration',
    link: 'https://www.amazon.com/',
    logo: '/inner-os/logos/amazon.svg',
    role: 'Student Software Developer',
    date: 'May 2024 - September 2024',
    bullets: [
      'Developed a Spring Boot service in collaboration with the AWS Solution Architect Team, optimizing cross-region performance and reducing infrastructure latency by up to 85%.',
      'Designed and implemented a serverless, distributed architecture by deploying Lambdas across 30+ AWS regions using CDK, efficiently managing up to 330,000 client requests per second while ensuring performance and availability.',
    ],
    tech: ['Spring Boot', 'AWS Lambda', 'CDK', 'Bedrock', 'DynamoDB'],
  },
]

export const projects = [
  {
    name: 'Brick Kiln Detection',
    subtitle: '1st place winner, satellite image classification competition',
    date: 'November 2025',
    badge: { src: '/inner-os/badges/first.png', alt: '1st place' },
    tech: ['Python', 'PyTorch', 'ResNet-50', 'scikit-learn', 'Pandas'],
    media: {
      kind: 'image',
      src: '/inner-os/photos/project-kilns.jpg',
      alt: 'Two satellite photos side by side: a zigzag brick kiln and a fixed-chimney brick kiln',
      caption: 'Left: a cleaner zigzag kiln. Right: a polluting fixed-chimney kiln.',
    },
    bullets: [
      'Won 1st place with my team by fine-tuning a ResNet-50 image model on 1,617 satellite photos to tell cleaner zigzag kilns apart from polluting fixed-chimney kilns, a key source of air pollution in Bangladesh, using heavy data augmentation and class weighting to handle an imbalanced dataset.',
    ],
  },
  {
    name: 'RED SEA',
    subtitle: '2nd place winner, 2024 cmd-f hackathon',
    date: 'April 2024',
    badge: { src: '/inner-os/badges/second.png', alt: '2nd place' },
    tech: ['Python', 'JavaScript', 'HTML', 'CSS', 'PostgreSQL', 'Node.js', 'Mapbox API'],
    media: { kind: 'youtube', id: 'LY2TVymYyNM', title: 'RED SEA demo video' },
    bullets: [
      "Built an AI-powered web app that finds the safest evacuation routes for refugees fleeing war in Palestine, using 15,000 records of conflict and geospatial data, and took 2nd place out of 300+ participants at Canada's largest women's hackathon.",
    ],
  },
  {
    name: 'SPEAR',
    subtitle: 'Seizure Prediction via EEG Analysis and Recognition',
    date: 'December 2025',
    tech: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Flask'],
    media: { kind: 'video', src: '/inner-os/videos/spear-demo.mp4', title: 'SPEAR demo video' },
    bullets: [
      'Built a machine learning pipeline with a team of five that compared six models on 11,500 EEG recordings to detect epileptic seizures, where our Random Forest reached 97% accuracy (0.997 ROC AUC), served through a Flask web app for live predictions.',
    ],
  },
  {
    name: 'Instagram Creators Platform',
    subtitle: 'Engagement analytics for Meta Digital Creators',
    date: 'February 2024',
    tech: ['Python', 'SQL', 'Pandas', 'NumPy', 'PostgreSQL', 'GitHub'],
    media: {
      kind: 'image',
      src: '/inner-os/photos/project-ig-features.png',
      alt: 'Bar chart of random forest feature importance: shares per view is highest, then comments, likes and saves per view',
      caption: 'Shares per view turned out to be the strongest signal of a high-view post.',
    },
    bullets: [
      'Analyzed 50M+ views across 1M+ posts with Meta Digital Creators to find what drives high-performing content, building a data system that handles 5K+ daily interactions and cut manual analysis time by 40%.',
    ],
  },
]

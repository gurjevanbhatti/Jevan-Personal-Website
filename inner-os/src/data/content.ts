export const profile = {
  name: 'Jevan Bhatti',
  title: 'Software Engineer',
  showcaseYear: "Portfolio '26",
  location: 'Vancouver, BC, Canada',
  email: 'gurjevanbhatti@gmail.com',
  github: 'https://github.com/gurjevanbhatti',
  linkedin: 'https://www.linkedin.com/in/gurjevan-kaur-bhatti-35b42a185',
}

// The About page, in Jevan's own words: text rows with a photo each, then snapshots.
export const about = {
  quote: 'It feels powerful to build something on your own terms.',
  rows: [
    {
      text: [
        "What I love most about computer science is the freedom. You can wake up with an idea and build it that same day, entirely on your own terms. Not many fields let you do that, and I still think it's remarkable.",
      ],
      photo: { src: '/inner-os/photos/about-coding.jpg', alt: 'Laptop showing the code for this website', caption: 'A real photo of me building this website.' },
    },
    {
      text: [
        "I've always loved math because, at its core, it's patterns. That's also why LeetCode feels more like a puzzle than a chore to me. Data science is where the two meet: find the pattern, then build something with it.",
        'I love hackathons, even the ones we lose, because trying something new with friends is the fun part.',
      ],
      photo: { src: '/inner-os/photos/about-hackathon.jpg', alt: 'Jevan and three friends at a hackathon', caption: "My friends and me at a hackathon we didn't win. Still one of my favourites." },
    },
    {
      text: [
        "That same love of freedom shows up everywhere else in my life. I create content for about 25K followers because it lets me be creative on my own terms, and when I'm not building or filming, I'm probably planning my next vacation.",
      ],
      photo: { src: '/inner-os/photos/about-plane.jpg', alt: 'City lights seen from a plane window at night', caption: 'Somewhere between trips.', position: 'top' },
    },
  ],
  snapshots: [
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
  { logo: '/inner-os/logos/trophy.svg', year: "'24", text: "2nd Place at cmd-f, Canada's largest women's hackathon" },
]

// Shown beside the highlights. Add more and the panel becomes a grid.
export const photos = [
  { src: '/inner-os/photos/home-portrait.jpg', alt: 'Jevan Bhatti' },
  { src: '/inner-os/photos/home-coding.jpg', alt: 'Laptop with code and a git push in the terminal' },
  { src: '/inner-os/photos/home-travel.jpg', alt: 'Jevan on a grand staircase while travelling' },
  { src: '/inner-os/photos/home-convocation.jpg', alt: 'Rows of graduates in caps and gowns at SFU convocation' },
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
    name: 'RED SEA',
    subtitle: '2nd place winner, 2024 cmd-f hackathon',
    date: 'April 2024',
    tech: ['Python', 'JavaScript', 'HTML', 'CSS', 'PostgreSQL', 'Node.js', 'Mapbox API'],
    bullets: [
      "Spearheaded the development of an AI-powered web app that predicts the safest evacuation routes for refugees fleeing war in Palestine, securing 2nd place at Canada's largest hackathon for women with 300+ participants.",
      'Leveraged Amazon Aurora and PostgreSQL to optimize the querying process, efficiently storing 15,000 records of war casualties and geospatial data and achieving a rapid response time of 0.25 milliseconds during peak usage.',
    ],
  },
  {
    name: 'Instagram Creators Platform',
    subtitle: 'Engagement analytics for Meta Digital Creators',
    date: 'February 2024',
    tech: ['Python', 'SQL', 'Pandas', 'NumPy', 'PostgreSQL', 'GitHub'],
    bullets: [
      'Led development of an engagement analytics blueprint with Meta Digital Creators to identify drivers of high-performing content, analyzing 50M+ views from 1M+ posts.',
      'Developed a scalable data system handling 5K+ daily interactions with >99% accuracy, cutting manual analysis time by 40% and enabling faster decision-making.',
      'Collaborated in a SCRUM environment with Meta Digital Creators to source and prepare raw engagement data, powering analytics that informed growth strategies for 25K+ followers.',
    ],
  },
]

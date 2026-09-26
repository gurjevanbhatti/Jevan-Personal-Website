export const profile = {
  name: 'Jevan Bhatti',
  title: 'Software Engineer',
  showcaseYear: "Portfolio '26",
  location: 'Vancouver, BC, Canada',
  email: 'gurjevanbhatti@gmail.com',
  phone: '+1 (778) 929-6638',
  github: 'https://github.com/gurjevanbhatti',
  linkedin: 'https://www.linkedin.com/in/gurjevan-kaur-bhatti-35b42a185',
  tagline:
    'Software engineer and data scientist in Vancouver. I build cloud infrastructure and applied ML tools that hold up in production.',
  bio: "I've spent the last couple years bouncing between backend infrastructure, cloud architecture, and applied ML — deploying serverless systems built to handle hundreds of thousands of requests a second, and building AI tools aimed at solving real problems rather than just demoing well. I like projects that force me to learn the boring, load-bearing parts of a system, not just the parts that look good in a demo.",
}

// One-liners for the home page, newest first.
export const highlights = [
  { logo: '/inner-os/sf/logo-gt.png', year: "'27", text: 'Incoming MSc Data Science', org: 'Georgia Tech' },
  { logo: '/inner-os/sf/logo-sfu.png', year: "'26", text: 'BSc Data Science', org: 'Simon Fraser University' },
  { logo: '/inner-os/logos/meta.svg', year: "'25", text: 'Production Engineering Fellow', org: 'Meta × MLH' },
  { logo: '/inner-os/logos/amazon.svg', year: "'24", text: 'Student Software Developer', org: 'Amazon (SFU × AWS)' },
  { logo: '/inner-os/logos/instagram.svg', year: "'24", text: 'Analyzed 50M+ views for the Instagram Creators Platform' },
  { logo: '/inner-os/logos/trophy.svg', year: "'24", text: "2nd Place at cmd-f, Canada's largest women's hackathon" },
]

// Shown beside the highlights. Add more and the panel becomes a grid.
export const photos = [{ src: '/inner-os/me-portrait.jpg', alt: 'Jevan Bhatti' }]

export const education = [
  {
    school: 'Georgia Institute of Technology',
    location: 'Atlanta, GA',
    degree: 'Master of Science - Data Science',
    date: 'January 2027',
    logo: '/inner-os/sf/logo-gt.png',
  },
  {
    school: 'Simon Fraser University',
    location: 'Vancouver, BC',
    degree: 'Bachelor of Science - Data Science',
    date: 'September 2022 - May 2026',
    logo: '/inner-os/sf/logo-sfu.png',
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

export const profile = {
  name: 'Jevan Bhatti',
  title: 'Software Engineer',
  showcaseYear: "Showcase '26",
  location: 'Vancouver, BC, Canada',
  email: 'gurjevanbhatti@gmail.com',
  phone: '+1 (778) 929-6638',
  github: 'https://github.com/gurjevanbhatti',
  linkedin: 'https://www.linkedin.com/in/gurjevan-kaur-bhatti-35b42a185',
  intro:
    "I'm currently pursuing my Master of Science in Data Science at Georgia Tech, after finishing my B.S. in Data Science at Simon Fraser University. Thanks for taking the time to check out my portfolio — I hope you enjoy exploring it as much as I enjoyed building it. If you have any questions or comments, feel free to reach out through the contact page or shoot me an email.",
  bio: "I've spent the last couple years bouncing between backend infrastructure, cloud architecture, and applied ML — deploying serverless systems built to handle hundreds of thousands of requests a second, and building AI tools aimed at solving real problems rather than just demoing well. I like projects that force me to learn the boring, load-bearing parts of a system, not just the parts that look good in a demo.",
}

export const education = [
  {
    school: 'Georgia Institute of Technology',
    location: 'Atlanta, GA',
    degree: 'Master of Science - Data Science',
    date: 'January 2027',
  },
  {
    school: 'Simon Fraser University',
    location: 'Vancouver, BC',
    degree: 'Bachelor of Science - Data Science',
    date: 'September 2022 - May 2026',
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
    role: 'Production Engineer',
    date: 'September 2025 - December 2025',
    bullets: [
      'Engineered a production-ready Flask & MySQL web application template, establishing a reusable, scalable architecture for deploying secure environments.',
      'Architected the deployment pipeline on a DigitalOcean VPS, securing traffic with SSL/HTTPS, and utilizing Docker for consistent containerized isolation.',
      'Automated system recovery and deployment workflows using CI/CD pipelines to ensure high availability and reliable delivery of application updates.',
      'Collaborated with Meta Engineers in an Agile environment to integrate Prometheus and Grafana, establishing real-time system visualization and container monitoring for the deployment environment.',
      'Achieved 90% code coverage across the open-source repository by authoring 20+ unit and integration tests, optimizing database queries to execute in under 2 milliseconds.',
    ],
  },
  {
    company: 'Amazon - SFU x AWS Collaboration',
    link: 'https://www.amazon.com/',
    role: 'Student Software Developer',
    date: 'May 2024 - September 2024',
    bullets: [
      'Developed a Spring Boot service in collaboration with the AWS Solution Architect Team, optimizing cross-region performance and reducing infrastructure latency by up to 85%.',
      'Designed and implemented a serverless, distributed architecture by deploying Lambdas across 30+ AWS regions using CDK, efficiently managing up to 330,000 client requests per second while ensuring performance and availability.',
      'Developed a RAG chatbot with AWS Bedrock + Docker, enabling real-time retrieval of region trends, service availability, and incident reports; resolved 90% of user issues and reduced QA costs by thousands per month.',
      'Implemented a multi-region latency visualization feature using AWS API Gateway and DynamoDB, enabling trend analysis and performance benchmarking, improving decision-making for optimizing architecture.',
      'Conducted end-to-end API testing with Postman, ensuring cross-region performance stability and reliability of the system.',
    ],
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

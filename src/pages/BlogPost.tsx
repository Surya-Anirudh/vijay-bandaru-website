import { motion } from "framer-motion"
import { Link, useParams, Navigate } from "react-router-dom"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "note"; text: string }

type Post = {
  slug: string
  title: string
  category: string
  readTime: string
  date: string
  excerpt: string
  content: Block[]
}

const posts: Post[] = [
  {
    slug: "velocity-and-focus-factor-in-scrum",
    title: "Velocity and Focus Factor in Scrum",
    category: "Scrum",
    readTime: "5 min read",
    date: "October 14, 2023",
    excerpt: 'If you are working in a Scrum Project, you must be familiar with the word "Velocity". But are you aware of the term "Focus Factor" and how you can use it? In this article we are going to make it clear about "Velocity" and "Focus Factor" and how they bot are related.',
    content: [
      { type: "h3", text: "What is Velocity?" },
      { type: "p", text: "It is a measure of the amount of work a Scrum Team can complete in a Sprint. It is a good metric to self-evaluate a Scrum Team on how to improve their practices, processes, tools, collaboration, etc to improve its velocity naturally over a period of time. The Velocity is calculated at the end of the Sprint because by that time the Scrum Team is clearly aware of the amount of work done in the Sprint." },
      { type: "p", text: 'Velocity is the "Sum of the Story points completed in a Sprint". Here completed means the items that are meeting the Definition of Done. While the velocity is calculated at the end of the Sprint, the Sprint Progress should be tracked throughout the Sprint by the Developers. This will enhance the transparency to the Scrum Team on how the work is getting executed. Below is a simple way to understand the velocity with couple of scenarios:' },
      { type: "p", text: "Let us consider a Sprint of 2 weeks and below table gives the user stories pulled into the Sprint Backlog. The story points and status are also mentioned in the table for the selected user stories." },
      {
        type: "table",
        headers: ["User Story Title", "Story Points (Size)", "Status"],
        rows: [
          ["Registration", "5", "DONE"],
          ["Login", "3", "DONE"],
          ["Search", "8", "DONE"],
          ["Payment", "5", "DONE"],
        ],
      },
      { type: "p", text: 'The velocity of the Sprint is 21 Story points, because all the user stories are "DONE" so the sum of the user stories is 21 (5+3+8+5).' },
      { type: "p", text: "Below is another scenario." },
      {
        type: "table",
        headers: ["User Story Title", "Story Points (Size)", "Status"],
        rows: [
          ["Add to cart", "2", "DONE"],
          ["Change quantity", "1", "DONE"],
          ["Empty cart", "3", "NOT DONE"],
          ["Modify address of delivery", "3", "DONE"],
          ["List items of the cart", "5", "DONE"],
          ["Delete items from the cart", "3", "NOT DONE"],
          ["Clone the cart", "8", "DONE"],
        ],
      },
      { type: "p", text: 'The velocity of this Sprint is 19 because to calculate the velocity we have to consider only the items that are completed and meeting the Definition of Done. So in the above scenario out of 7 items, only 5 are completed and 2 are not done. So taking the items that are "DONE" the velocity is 19 (2+1+3+5+8).' },
      { type: "p", text: "Below is another scenario." },
      {
        type: "table",
        headers: ["User Story Title", "Story Points (Size)", "Status"],
        rows: [
          ["Add patient data", "5", "DONE"],
          ["Edit patient data", "3", "DONE"],
          ["List patient data", "2", "DONE"],
          ["View patient details", "2", "NOT DONE"],
          ["Delete patient data", "2", "70% DONE"],
          ["Search for patient data", "8", "DONE"],
          ["Export patient data into PDF", "5", "80% DONE"],
        ],
      },
      { type: "p", text: "The velocity of this Sprint is 18 because to calculate the velocity we have to consider only the items that are completed and meeting the Definition of Done. There are 3 items which are either not done or partially done, so they will be eligible for velocity calculation. So in the above scenario out of 7 items, only 4 are completed and meeting the definition of Done. So taking the items that are \"DONE\" the velocity is 18 (5+3+2+8)." },
      { type: "h3", text: "What happens to the items that are NOT DONE or PARTIALLY DONE?" },
      { type: "p", text: "They will be moved back to the Product Backlog according to the priority decided by the Product Owner. If they are still important, valuable and urgent compared to other items in the Product Backlog, then the Product Owner can place them on the top of the Product Backlog so that they may be taken up in the Next Sprint. The Product Owner may place them in the middle or bottom of the Product Backlog as per the latest priority. This is what is the 4th Agile manifesto value \"Responding to Change over Following a plan." },
      { type: "h3", text: "Be aware of the following points when using Velocity:" },
      {
        type: "ul",
        items: [
          "Do not use Velocity to compare different Scrum Teams, it is not meant for that",
          "Do not push the teams to increase velocity every Sprint, it should naturally improve",
          "Similar skilled, sized Scrum Teams will not have same velocity.",
          "Velocity is mainly to help for forecast as below:\n– For Developers to see how much they can pull into current Sprint using last Sprint velocity and current Sprint capacity\n– For Product Owner, to provide forecast to the Stakeholders based on most recent few (4 to 5) Sprints Best, Worst and Average Velocity",
        ],
      },
      { type: "h3", text: "How to improve Velocity of a Scrum Team naturally?" },
      {
        type: "ul",
        items: [
          "Creating a cross-functional training culture in the Scrum Team",
          "Let the team focus on the current Sprint items and avoid context switching",
          "Make the items small enough so that they can be done faster",
          "Create clear and proper acceptance criteria so that developers can understand well",
          "Make Product Backlog Refinement effective",
          "Identify the wastes that will impact the velocity such as delays, waiting, unclear requirements, dependencies etc and find the root causes of those wastes and address them continuously",
        ],
      },
      { type: "h3", text: "What is the Focus Factor?" },
      { type: "p", text: 'Focus Factor is a simple mathematical formula that helps Developers to forecast how many product backlog items can be pulled into the Sprint backlog. This number can be derived using the "Velocity" and the "Capacity" of the Developers in the Scrum Team. You are clear about the velocity in the above section of this article. Capacity is the "focused amount of time" available for the Developers after removing all the non-work related time such as meetings, Scrum events, public holidays, personal time off etc.' },
      { type: "note", text: "Formula for the Focus Factor: Velocity/Capacity" },
      { type: "p", text: 'We generally consider the "Average Velocity" of the most recent 4 to 5 Sprints in the above formula. Here is an example.' },
      {
        type: "ul",
        items: [
          "A team's average velocity is: 30 Story Points (Based on most recent 4 to 5 Sprints data)",
          "Their capacity (per person) is: 7 Days (In a 2 weeks Sprint after removing Scrum events time, and other non work related time)",
          "Number of Developers in the team: 6",
          "Therefore, the Focus Factor is: 30/(6 x 7) = 0.71",
        ],
      },
      { type: "p", text: "This Focus Factor can now be used to forecast the amount of work for upcoming Sprint as follows:" },
      { type: "p", text: "Let us consider there are only 5 members are available in the next Sprint, then the forecast for the next Sprint is: Focus Factor * Capacity:" },
      { type: "note", text: "0.71 * 5 x 7 = Approximately 25 Story points" },
      { type: "h3", text: "How to forecast for the very first Sprint?" },
      { type: "p", text: "As there will be no historical data for the first Sprint, let the team go with their gut feeling to decide how much work they can pull into the Sprint Backlog. In this case it may lead to below two scenarios:" },
      {
        type: "ol",
        items: [
          "Complete the selected work early: Let the Developers and Product Owner collaborate and take some additional work which will help to improve the Product value.",
          "Unable to complete all the work selected: Move the incomplete items back to the Product Backlog.",
        ],
      },
      { type: "p", text: "In either of the cases, it should be discussed in the Sprint Retrospective to find the root causes of the scenario and to learn what can be improved." },
      { type: "p", text: "The Developers and Product Owner can take below guidelines for the first Sprint:" },
      {
        type: "ul",
        items: [
          "Let the top few items be very clear and smaller",
          "All clarifications need to be addressed",
          "Create detailed tasks for each of the top few Product Backlog Items",
          "Let the Developers estimate each task in less than or equal to 6 hours",
          "Let the Developers calculate the available capacity of the Sprint",
          "See how many Product Backlog Items can be pulled to fill the available capacity as per the capacity hours and the sum of the total hours estimated for the Product Backlog Items",
        ],
      },
      { type: "p", text: "Even though this approach helps you to forecast the amount of work for a sprint, do not ignore the inspect and adapt approach. Scrum is all about continuous improvement with inspecting and adapting. So use Sprint Retrospective to brainstorm how to improve estimation, selecting the right amount of work into the Sprint, how to optimize the tools, practices and processes to get better." },
      { type: "p", text: "We provide practical scenarios and real time examples in our Certified Scrum Master (CSM) and Certified Scrum Product Owner (CSPO) workshops to understand the Agile and Scrum concepts." },
    ],
  },
  {
    slug: "7-wastes-of-agile-software-development",
    title: "How to Manage the 7 Wastes of Agile Software Development",
    category: "Agile",
    readTime: "7 min read",
    date: "October 12, 2023",
    excerpt: "Whether you are new to the role or seeking to enhance your skills as a Product Owner? Here is the right guide for you.",
    content: [
      { type: "p", text: "Whether you are new to the role or seeking to enhance your skills as a Product Owner? Here is the right guide for you." },
      { type: "p", text: "As a vital role in the Scrum framework, the Product Owner plays a crucial part in guiding the development team and ensuring the successful delivery of a valuable product. Learnovative is the best CSPO training institute in Hyderabad and offers specialised courses and programs designed to enhance the skills and knowledge of individuals aspiring to become product owners or those already working in the role." },
      { type: "p", text: "We have the best-certified team coach for CSPO in Hyderabad. We provide comprehensive training that covers various aspects of product ownership, including Agile methodologies, Scrum framework, product management principles, stakeholder engagement, and more. We are also providing Scrum Master training in Hyderabad, A-CSPO training in Hyderabad, Agile training in Hyderabad, A-CSM training in Hyderabad, PMP training in Hyderabad, and many more." },
      { type: "h3", text: "Understanding the Scrum Framework:" },
      { type: "p", text: "Scrum is an agile project management framework designed to deliver value to customers through iterative development and frequent feedback. As a Product Owner, it's essential to have a solid understanding of Scrum's core principles, including transparency, inspection, and adaptation. Familiarize yourself with the roles of the Product Owner, Scrum Master, and Development Team, and how they collaborate within the framework to achieve project success." },
      { type: "h3", text: "Embracing the Product Owner Role:" },
      {
        type: "ul",
        items: [
          "Defining the key responsibilities of a Product Owner",
          "Establishing a shared understanding of the role within the organization",
          "Developing the mindset and skills necessary for success",
        ],
      },
      { type: "h3", text: "Defining the Product Vision:" },
      { type: "p", text: "Crafting a compelling product vision is the foundation for driving development efforts. The product vision serves as a guiding light that aligns the team's work with business goals and customer needs. Learn how to articulate your product vision statement clearly, making it inspiring and understandable to stakeholders and team members. Effective communication of the vision ensures everyone is aligned and working towards the same objectives." },
      { type: "h3", text: "Building and Managing the Product Backlog:" },
      { type: "p", text: "The Product Backlog is a dynamic and prioritized list of features, enhancements, and bugs that make up the product roadmap. As a Product Owner, your role is to create and maintain a well-organized backlog. This includes defining user stories, prioritizing them based on value and effort, and continuously refining the backlog as new information emerges. Explore techniques for backlog grooming and refinement, such as user story mapping and backlog prioritization workshops." },
      { type: "h3", text: "Collaborating with Stakeholders:" },
      { type: "p", text: "Successful collaboration with stakeholders is crucial for understanding their requirements, gathering feedback, and managing expectations. Identify key stakeholders and establish clear channels of communication to engage them throughout the project. Actively involve stakeholders in backlog refinement sessions, sprint reviews, and release planning meetings. Develop strong relationships built on trust, transparency, and effective negotiation skills to ensure their needs are met while maintaining focus on the product vision." },
      { type: "h3", text: "Effective Release Planning:" },
      { type: "p", text: "Product development involves making strategic decisions about feature prioritization, releases, and timelines. Learn techniques for release planning and roadmap creation to ensure coherent and valuable product delivery. Prioritize features based on customer needs, market demand, and business goals. Regularly review and adapt the release plan as new information becomes available or priorities change. Flexibility is key to responding to evolving market conditions and customer feedback." },
      { type: "h3", text: "Engaging with the Development Team:" },
      { type: "p", text: "As a Product Owner, you bridge the gap between the stakeholders and the development team. Clear and concise communication is essential to convey product requirements, prioritize user stories, and provide timely feedback. Participate actively in Sprint Planning, where you collaborate with the development team to select user stories for the upcoming sprint. Engage in Daily Scrums to address any questions or concerns from the team and provide clarifications. Finally, actively participate in Sprint Reviews to gather feedback and showcase completed work." },
      { type: "h3", text: "Scaling Scrum and Continuous Improvement:" },
      { type: "p", text: "As the scope and complexity of projects grow, it becomes essential to scale Scrum to multiple teams and manage multiple products. Explore techniques and frameworks like Scrum of Scrums, Nexus, or LeSS (Large-Scale Scrum) to coordinate efforts across teams and synchronize product development. Learn strategies for managing multiple products simultaneously, including prioritization techniques, effective delegation, and maintaining a clear product roadmap for each product." },
      { type: "h3", text: "Overcoming Challenges and Pitfalls:" },
      {
        type: "ul",
        items: [
          "Common challenges faced by Product Owners and how to address them",
          "Techniques for handling competing priorities and managing expectations",
          "Strategies for maintaining motivation and resilience in the role",
        ],
      },
      { type: "h3", text: "Managing Product Quality and Success:" },
      {
        type: "ul",
        items: [
          "Defining and measuring metrics for product success",
          "Ensuring product quality through continuous integration and testing",
          "Techniques for gathering and incorporating user feedback",
        ],
      },
      { type: "p", text: "Being a Scrum Product Owner is a dynamic and challenging role that requires a combination of technical expertise, effective communication, and strong leadership skills. By following the principles and strategies outlined in this comprehensive guide, you'll be well-equipped to guide your team and deliver valuable products that meet customer needs and drive business success. Embrace the Scrum framework, collaborate effectively with stakeholders and the development team, and continuously learn and adapt to excel in your role as a Scrum Product Owner. If you are looking for the best institute to start product owner training in Hyderabad, visit Learnovative. We are providing the best scrum alliance courses by experts." },
    ],
  },
  {
    slug: "build-your-career-towards-agile-coach",
    title: "How to Build Your Career Towards Agile Coach",
    category: "Career",
    readTime: "8 min read",
    date: "November 2023",
    excerpt: 'As a Scrum Trainer, I often get this question in my workshops during coffee or lunch breaks. My participants want to know "what it takes to become an Agile Coach?"',
    content: [
      { type: "p", text: 'As a Scrum Trainer, I often get this question in my workshops during coffee or lunch breaks. My participants want to know "what it takes to become an Agile Coach?", in this article I am trying to attempt to answer that question.' },
      { type: "p", text: "First thing I want to make it clear is, if you are a Scrum Master, you should be a Coach. But at what level you are extending your coaching may vary. As Scrum Masters, you may be coaching your teams most of the time. Agile Coaches work beyond teams and they also coach the leadership and management and they focus at enterprise level. Scrum Master may be proficient with Scrum and helps team with Scrum implementation through facilitation, training, mentoring and coaching depending up on the need. Agile Coaches will work beyond Scrum, they have experience with different other Agile frameworks." },
      { type: "h3", text: "So how can you become an Agile Coach?" },
      { type: "h3", text: "Agile Fundamentals:" },
      { type: "p", text: 'Your Agile fundamentals should be very Strong. That means as a person, you should be "Agile" and have faith and strong understanding of Agile Manifesto Values and Principles. You should be very clear about the "why" part of these values and principles. If you are clear then only you can make others clear about these values and principles. In addition, you should be clear about Scrum Values and how they impact the teams and organizations.' },
      { type: "h3", text: "Work as a Scrum Master:" },
      { type: "p", text: "First step in becoming an Agile Coach is to have worked as a Scrum Master. This helps you to understand team dynamics and help experimenting your ideas within the team. I do not believe someone can become an Agile Coach without working as a Scrum Master." },
      { type: "h3", text: "Organizational Cultures:" },
      { type: "p", text: "You need to understand what are various types of organizational cultures (example: Competing, Controlling, Collaborative, Creative) and how Structure, Policies, Procedures, People, Tools work in those types of cultures. Also, understand how you can help those organizations to become more Agile without compromising their culture." },
      { type: "h3", text: "Leadership Types:" },
      { type: "p", text: "Different leaders behave and work in different ways. So unless you understand what are various leadership types (example: Expert Leaders, Achiever Leaders, and Catalyst Leaders) and accordingly you need to choose the coaching models to help those leaders to be more agile in their role." },
      { type: "h3", text: "Know beyond Scrum:" },
      { type: "p", text: "As an Agile Coach, you need to help organizations to transform into Agile ways of working and Scrum is one way to implement Agile. So depending up on the need there may be other frameworks and methods may be required as part of transformation (Example: Kanban). So it is important to have deeper knowledge and experience in other frameworks. Also, it will be an added advantage to gain experience and knowledge in the areas of Product Management and Product Development so that you can expand your coaching to the Product Owners and Product Managers in the organization." },
      { type: "h3", text: "Technical Practices & Tools awareness:" },
      { type: "p", text: 'As a Coach, you should help your organization in optimizing the tools and Technical practices. So having knowledge and experience in such practices like Test Driven Development, Refactoring, Continuous Integration, Continuous Delivery, and so on will be an added advantage. Having experience of more than one tool will also be an advantage. But, never forget the basic Agile Value "Individuals and Interactions OVER Processes and Tools".' },
      { type: "h3", text: "Professional Coaching:" },
      { type: "p", text: "You should have a Coaching Mindset and you should be familiar with the Professional Coaching and various coaching competencies such as Active Listening, Powerful Questions, Creating Awareness. You also need to know a bunch of change management models such as GROW, ADKAR, SCARF etc which are useful in coaching the teams and beyond." },
      { type: "p", text: 'Finally, I believe "Knowledge and experience is primary and certifications are the byproducts". So a few certifications you can try to achieve which helps you to shape up your career as Agile Coach, here are a few that I suggest.' },
      { type: "p", text: "ICF – ACC (International Coach Federation – Associate Certified Coach): This helps you understand the 11 professional coaching competencies and create a coaching mindset." },
      { type: "p", text: "Scrum Alliance CTC (Certified Team Coach): This certification helps you to become an effective Team Coach." },
      { type: "p", text: "Scrum Alliance CEC (Certified Enterprise Coach): This certification helps you become an enterprise Agile Coach." },
      { type: "p", text: "ICP ACC (ICAgile Certified Professional – Agile Coaching): This certification helps you understand various Agile coaching models, practices and tools." },
    ],
  },
  {
    slug: "what-is-cynefin-framework",
    title: "What is Cynefin Framework?",
    category: "Agile",
    readTime: "4 min read",
    date: "2024",
    excerpt: "The Cynefin Framework is a sense-making model used to help make decisions and solve problems based on the nature of the situation. Here's an explanation to understand easily.",
    content: [
      { type: "p", text: "The Cynefin Framework is a sense-making model used to help make decisions and solve problems based on the nature of the situation. Here's an explanation to understand easily." },
      { type: "h3", text: "Introduction with Everyday Example" },
      { type: "p", text: "Think of it as a map that tells you how to approach different types of challenges. For example:" },
      {
        type: "ul",
        items: [
          "If you're cooking a simple recipe, you follow clear steps.",
          "If you're trying a new dish for the first time, you experiment a bit.",
          "If you're organizing a surprise party, unexpected things might happen, and you adapt as you go.",
          "If you're in a chaotic situation, like a fire alarm going off, you act immediately.",
        ],
      },
      { type: "h3", text: "The Five Domains of the Cynefin Framework" },
      { type: "h3", text: "Clear (Simple)" },
      {
        type: "ul",
        items: [
          "What it is: The problem has a clear cause and effect. Best practices or known solutions exist.",
          "How to act: Identify the problem, follow the steps, and solve it.",
          "Example: Following a recipe or fixing a light bulb.",
        ],
      },
      { type: "h3", text: "Complicated" },
      {
        type: "ul",
        items: [
          "What it is: The problem has a cause-and-effect relationship, but it's not immediately obvious. Expertise is needed.",
          "How to act: Analyze the situation, consult experts, and apply good practices.",
          "Example: Designing a house or repairing a car engine.",
        ],
      },
      { type: "h3", text: "Complex" },
      {
        type: "ul",
        items: [
          "What it is: The problem has many unknowns and interconnected parts. There's no single right answer.",
          "How to act: Experiment, learn from feedback, and adapt.",
          "Example: Building team collaboration or developing a new product.",
        ],
      },
      { type: "h3", text: "Chaotic" },
      {
        type: "ul",
        items: [
          "What it is: The situation is unpredictable, and there's no time to figure things out.",
          "How to act: Take immediate action to stabilize things, then move it to another domain.",
          "Example: Responding to an emergency or a cybersecurity breach.",
        ],
      },
      { type: "h3", text: "Confused (Apex Domain)" },
      {
        type: "ul",
        items: [
          "What it is: You're unsure which domain the situation belongs to.",
          "How to act: Gather more information to understand the problem better.",
          "Example: Starting with a vague issue and figuring out whether it's clear, complicated, or complex.",
        ],
      },
      { type: "p", text: "Explore such important concepts in our upcoming Scrum Master and Product Owner training through live virtual mode and enhance your knowledge and make your career stronger." },
      { type: "p", text: "Explore important concepts like the Cynefin Framework in our upcoming CSM certification and CSPO training. Whether you're looking for A CSM course training or CSM certification training, our live virtual sessions will help you deepen your Agile knowledge and enhance your career. Don't miss the chance to master these frameworks and become a certified Scrum Master or Product Owner." },
    ],
  },
  {
    slug: "a-day-in-product-owners-life",
    title: "A Day in Product Owner's Life",
    category: "Product Ownership",
    readTime: "6 min read",
    date: "2024",
    excerpt: "The role of a Product Owner (PO) is one of the most dynamic and challenging in Scrum teams. While the Scrum Guide defines the PO as \"accountable for maximizing the value of the product\", the day-to-day life of a Product Owner involves juggling strategy, stakeholder management, and team collaboration.",
    content: [
      { type: "p", text: "The role of a Product Owner (PO) is one of the most dynamic and challenging in Scrum teams. While the Scrum Guide defines the PO as \"accountable for maximizing the value of the product\", the day-to-day life of a Product Owner involves juggling strategy, stakeholder management, and team collaboration." },
      { type: "p", text: "Let's walk through what a typical day in a Product Owner's life looks like." },
      { type: "h3", text: "1. Morning: Starting with Priorities" },
      { type: "h3", text: "Check Product Backlog & Roadmap" },
      { type: "p", text: "The day often begins by reviewing the Product Backlog to ensure priorities are clear and aligned with the product vision. POs may update backlog items based on new insights, feedback, or business changes." },
      { type: "h3", text: "Sync with Stakeholders (if needed)" },
      { type: "p", text: "Sometimes, early calls with business leaders or customers help realign priorities before the development team begins work." },
      { type: "p", text: "Tip: A great PO balances business needs with technical feasibility every morning." },
      { type: "h3", text: "2. Daily Scrum: Team Alignment" },
      { type: "p", text: "While the PO is not required to attend the Daily Scrum as per Scrum Guide, many do — especially when the team is new or the product is evolving rapidly." },
      { type: "p", text: "They listen in to understand progress, blockers, and dependencies." },
      { type: "p", text: "The goal is not to manage tasks, but to be aware of where the Developers might need clarification and to give them any important updates." },
      { type: "h3", text: "3. Midday: Developers and SME Collaboration" },
      { type: "ul", items: [
        "Answering Questions: Throughout the day, Developers may reach out with clarifications — a PO must be available and responsive.",
        "Collaborating with UX/Design & SMEs: POs often work closely with designers and architects to refine features before they hit the Sprint backlog.",
      ]},
      { type: "h3", text: "4. Afternoon: Stakeholder Engagement" },
      { type: "ul", items: [
        "Customer Feedback Reviews: Checking feedback from customers, support tickets, or analytics tools.",
        "Stakeholder Updates: Communicating progress and upcoming priorities to sponsors, leadership, or clients.",
        "Negotiating Priorities: Sometimes, different stakeholders push for different features — the PO ensures decisions tie back to product goals and vision.",
      ]},
      { type: "h3", text: "5. End of the Day: Strategic Thinking" },
      { type: "ul", items: [
        "Roadmap Updates: Reviewing whether upcoming releases are still aligned with market needs.",
        "Market Research: A PO may spend time analyzing competitors, trends, or new opportunities.",
        "Preparing for Tomorrow: Documenting learnings, updating priorities, and preparing agenda items for the next day.",
      ]},
      { type: "h3", text: "6. General Activities in a Product Owner's Day" },
      { type: "ul", items: [
        "Email checking and responding",
        "Product Backlog Management",
        "Participate in: Sprint Planning on the First day",
        "Attend Daily Scrum every day to provide clarifications and updates to Developers",
        "Attend Sprint Review and Sprint Retrospective last day",
        "Product Backlog Refinement during middle of the Sprint",
        "Writing User stories and Acceptance criteria",
        "Engaging with stakeholders",
        "Supporting the development team",
        "On going clarifications for the current Sprint items",
        "Provide feedback/approval for the completed items of the Sprint",
        "Measuring product progress (KPIs, metrics)",
        "Ensuring alignment with product vision and goals",
        "Review the Risks and come up with plan of actions",
        "Going through market changes",
      ]},
      { type: "h3", text: "Final Thoughts" },
      { type: "p", text: "A Product Owner's day is a blend of tactical and strategic work. From prioritizing backlog items to managing stakeholder expectations, a PO ensures the product team is always working on the most valuable items. It's a role that requires focus, adaptability, accountability, domain knowledge and strong communication skills — but it's also one of the most rewarding positions in Agile, as you directly shape the success of a product." },
      { type: "p", text: "The role of a Product Owner is as dynamic as it is demanding, blending strategy, communication, and value-driven decision-making every single day. Whether you're elevating your Agile expertise through CSPO Certification Training in Chennai, opting for A CSPO course online training in Hyderabad, or expanding your technical edge with an AI Course for Product Owners, understanding the real day-to-day life of a Product Owner is essential. This journey isn't just about managing a backlog — it's about shaping product success through clarity, collaboration, and continuous learning. Below is a refined walkthrough of what a typical day in a Product Owner's life looks like." },
    ],
  },
]

export const blogPosts = posts


function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h3":
      return <h2 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">{block.text}</h2>
    case "p":
      return <p key={i} className="text-slate-600 leading-relaxed text-base mb-4">{block.text}</p>
    case "ul":
      return (
        <ul key={i} className="mb-4 space-y-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-slate-600 text-base">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
              <span style={{ whiteSpace: "pre-line" }}>{item}</span>
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol key={i} className="mb-4 space-y-2 pl-1">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-600 text-base">
              <span className="shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold mt-0.5">{j + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      )
    case "table":
      return (
        <div key={i} className="mb-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {block.headers.map((h, j) => (
                  <th key={j} className="px-4 py-3 text-left font-semibold text-slate-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, j) => (
                <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  {row.map((cell, k) => (
                    <td key={k} className={`px-4 py-2.5 text-slate-600 ${k === 2 ? (cell === "DONE" ? "text-emerald-600 font-semibold" : cell === "NOT DONE" ? "text-red-500 font-semibold" : "text-amber-600 font-semibold") : ""}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "note":
      return (
        <div key={i} className="mb-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-semibold text-sm">
          {block.text}
        </div>
      )
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-slate-900 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-400 text-sm mb-8 hover:text-blue-300 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600 text-white">{post.category}</span>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock size={11} />{post.readTime}</span>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Calendar size={11} />{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.2] mb-5 tracking-tight">{post.title}</h1>
          <div className="mt-6 h-px bg-white/10" />
        </div>
      </div>


      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {post.content.map((block, i) => renderBlock(block, i))}
          </motion.div>

          {/* Author note */}
          <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-4">
            <img src="/logo.png" alt="Vijay Bandaru" className="w-12 h-12 rounded-xl object-contain shrink-0" />
            <div>
              <p className="font-bold text-slate-900 text-sm">Vijay Bandaru</p>
              <p className="text-slate-500 text-xs mb-2">Certified Scrum Trainer · Organizational Transformation Coach</p>
              <p className="text-slate-600 text-sm leading-relaxed">28+ years of hands-on experience in Agile transformation, Scrum training, and building high-performing teams across India and globally.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/blog">
              <button className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all hover:scale-105">
                ← Back to All Articles
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

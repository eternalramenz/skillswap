import Trader from './Trader.jsx'

const Traders = () => {
  const data = [
    {
      firstName: "Buddy",
      lastName: "Castillo",
      profilePicture: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      expertise: "Data Analyst",
      skills: [
        "Data Visualization", 
        "Machine Learning", 
        "Artificial Intelligence"
      ],
      bio: "Driven by a curiosity for uncovering meaningful patterns in data, I am Buddy Castillo, a Data Analyst. With a keen eye for detail, I transform raw data into actionable insights. My passion lies in utilizing statistical analysis and data visualization to make informed decisions. Let's turn your data into a story worth telling.",
      address: "Angeles, Pampanga",
      createdAt: "2022-01-01",
      ratings: 4.6,
      total: 265
    },
    {
      firstName: "Joshua",
      lastName: "Basilan",
      profilePicture: "https://images.pexels.com/photos/848117/pexels-photo-848117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      expertise: "Quality Assurance",
      skills: [
        "Attention to Detail",
        "Communication Skills",
        "Problem-Solving"
    ],
      bio: "Greetings! I'm Joshua Basilan, a meticulous and dedicated Quality Assurance Professional with a passion for ensuring excellence in every aspect of product development. With a keen eye for detail, I specialize in designing and implementing effective quality control processes to guarantee the delivery of high-quality products.",
      address: "Quezon City, Manila",
      createdAt: "2022-02-01",
      ratings: 4.9,
      total: 124
    },
    {
      firstName: "Ken",
      lastName: "Chang",
      profilePicture: "https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      expertise: "Project Manager",
      skills: [
        "Agile Methodology",
        "Risk Management", 
        "Stakeholder Communication",
      ],
      bio: "Hello, I'm Ken Chang, a Project Manager passionate about turning ideas into reality. With a background in project management, I specialize in navigating complexities, mitigating risks, and ensuring successful project delivery. Let's collaborate and bring your projects to fruition, on time and within scope",
      address: "Tokyo, Japan",
      createdAt: "2022-03-01",
      ratings: 4.2,
      total: 52
    },
    {
      firstName: "Sean",
      lastName: "Rinsky",
      profilePicture: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      expertise: "Civil Engineer",
      skills: [
        "Structural Design",
        "AutoCAD",
        "Geotechnical Engineering"
      ],
      bio: "Greetings from Sean Rinsky, a Civil Engineer dedicated to shaping the world through strong foundations and sustainable structures. Experienced in structural design and project management, I ensure that every detail is meticulously planned. Let's create lasting infrastructures that stand the test of time.",
      address: "Malolos, Bulacan",
      createdAt: "2022-04-01",
      ratings: 5.0,
      total: 142
    }
  ];

  
  return (
    <div className="flex flex-col gap-6 ">
      {data.map((trader, index) => (
        <Trader key={index} props={trader} />
      ))}
    </div>
  )
}

export default Traders
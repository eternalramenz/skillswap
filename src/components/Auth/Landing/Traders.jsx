import Trader from './Trader.jsx'

const Traders = () => {
  const data = [
    {
      firstName: "Buddy",
      lastName: "Castillo",
      profilePicture: "https://scontent.fmnl33-3.fna.fbcdn.net/v/t39.30808-6/273834897_3111427999175069_4338404308830887838_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=b52GzcxS0_MAX9OYjhA&_nc_ht=scontent.fmnl33-3.fna&oh=00_AfB3y0-Xz_FJJo9zNTjC1bepagQTVUkfozgAHTmEgKWQYw&oe=6574428A",
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
      profilePicture: "https://scontent.fmnl33-2.fna.fbcdn.net/v/t39.30808-6/327190062_562508785794199_7037371595985899164_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=m2lJUYtlJQMAX-5IimA&_nc_ht=scontent.fmnl33-2.fna&oh=00_AfBZF80T5DfDU6TaL3Hx93cJHDa8g9o7vV8ZszFrXjSy4A&oe=6574A492",
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
      profilePicture: "https://scontent.fmnl33-4.fna.fbcdn.net/v/t39.30808-6/393754319_5540888626036260_6849162553431203533_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=oF1XchtYKxwAX_5Kgle&_nc_ht=scontent.fmnl33-4.fna&oh=00_AfDNCX7QgCbiXGxta2vn9RrHwLr1rsZ1-kBY-cO-oopGDw&oe=657496C3",
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
      profilePicture: "https://scontent.fmnl33-3.fna.fbcdn.net/v/t39.30808-6/380433042_2268858719977005_4708406148470303738_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Cu4ECM5wltgAX82C-BO&_nc_ht=scontent.fmnl33-3.fna&oh=00_AfDKoPFxro204P48KtKeLiJF_ZLWz-5CFjt_Y2-75TbMMA&oe=6573F54D",
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
import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard'
import HomeCard from '../components/HomeCard'
import Footer from '../components/Footer'
//images
import workflowImage from '../assets/images/workflow.svg'
import about from '../assets/images/about.svg'
import memberSRC from '../assets/images/member.svg'
import workTeamSRC from '../assets/images/workteam.svg'
import addTaskSRC from '../assets/images/addTask.svg'
import taskTeamSRC from '../assets/images/taskTeam.svg'

const Home = () => {
  const aboutRef = useRef(null)
  return (
    <main>
      <header className='flex h-screen flex-col md:flex-row'>
        <div className='w-full h-[60%] md:h-full md:w-1/2 bg-palette-lightgreen rounded-br-full flex justify-center items-center'>
          <div className='w-[60%] h-full flex flex-col justify-center '>
            <h1 className='font-righteous text-[10vw] md:text-6xl'>Do tasks in an easy way</h1>
            <p className='font-righteous'>with</p>
            <p className='text-4xl font-righteous'><span className='text-palette-beige'>Task</span>Flow</p>
          </div>
        </div>
        <div className='w-full h-[40%] md:h-full md:w-1/2 flex justify-center items-center p-2'>
          <img src={workflowImage} alt='workFlow image' />
        </div>
      </header>
      <section className='w-full h-[400px] flex items-center px-8 mt-20'>
        <div className='w-1/2 h-full'>
          <img src={about} alt='about image' className='w-full h-full' />
        </div>
        <div className='w-1/2 h-full flex flex-col justify-center'>
          <h2 className='font-righteous text-4xl text-palette-dark'>Who we are</h2>
          <div className='w-[100px] h-[5px] bg-palette-lightgreen rounded-r-full'></div>
          <p className='w-[90%] font-jost text-lg text-justify text-palette-dark mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac suscipit ligula. Ut tempor fermentum rhoncus. Donec pulvinar magna aliquam urna congue, ut hendrerit neque congue. Vestibulum vestibulum nisi ut mi ultricies convallis vel sit amet erat. Donec ultrices tempor blandit. Cras tellus felis, semper eget efficitur et, convallis sit amet magna. Aenean sit amet venenatis enim. Pellentesque non cursus felis. Vivamus pellentesque massa posuere suscipit accumsan. Aliquam sit amet purus dui.</p>
        </div>
      </section>
      <section className='w-full h-[450px] mt-32'>
        <div className='w-full h-full bg-palette-beige mx-auto p-9'>
          <h1 className='font-righteous text-palette-dark text-4xl w-[80%] mx-auto '>Services</h1>
          <div className='w-[80%] h-[85%] mx-auto mt-4 grid grid-cols-3 gap-4'>
            <ServiceCard title={'Service 1#'} content={'Lorem ipsum dolor sit amet'} />
            <ServiceCard title={'Service 2#'} content={'Lorem ipsum dolor sit amet'} />
            <ServiceCard title={'Service 3#'} content={'Lorem ipsum dolor sit amet'} />
            <ServiceCard title={'Service 4#'} content={'Lorem ipsum dolor sit amet'} />
            <ServiceCard title={'Service 5#'} content={'Lorem ipsum dolor sit amet'} />
            <ServiceCard title={'Service 6#'} content={'Lorem ipsum dolor sit amet'} />
          </div>
        </div>
      </section>
      <section className='mt-32'>
        <HomeCard
          title={'Create your Work Teams'}
          parragraph={'Nunc malesuada tincidunt metus, id pharetra nibh cursus non. Praesent id consequat nunc, vel aliquet turpis. Nunc id aliquam augue. Pellentesque vel nunc sit amet justo gravida convallis quis non sem. Sed gravida neque eu iaculis pharetra. Praesent justo est, feugiat sed nulla id, semper consequat neque. Fusce molestie ligula ullamcorper mauris accumsan, tincidunt sodales erat consectetur'}
          image={workTeamSRC}
          reverse={false}
        />
        <HomeCard
          title={'Send invitation to add members to your teams'}
          parragraph={'Nunc malesuada tincidunt metus, id pharetra nibh cursus non. Praesent id consequat nunc, vel aliquet turpis. Nunc id aliquam augue. Pellentesque vel nunc sit amet justo gravida convallis quis non sem. Sed gravida neque eu iaculis pharetra. Praesent justo est, feugiat sed nulla id, semper consequat neque. Fusce molestie ligula ullamcorper mauris accumsan, tincidunt sodales erat consectetur'}
          image={memberSRC}
          reverse={true}
        />
        <HomeCard
          title={'Create Tasks for your groups as a Leader'}
          parragraph={'Nunc malesuada tincidunt metus, id pharetra nibh cursus non. Praesent id consequat nunc, vel aliquet turpis. Nunc id aliquam augue. Pellentesque vel nunc sit amet justo gravida convallis quis non sem. Sed gravida neque eu iaculis pharetra. Praesent justo est, feugiat sed nulla id, semper consequat neque. Fusce molestie ligula ullamcorper mauris accumsan, tincidunt sodales erat consectetur'}
          image={addTaskSRC}
          reverse={false}
        />
        <HomeCard
          title={'Or complete Tasks with your assigned teammates'}
          parragraph={'Nunc malesuada tincidunt metus, id pharetra nibh cursus non. Praesent id consequat nunc, vel aliquet turpis. Nunc id aliquam augue. Pellentesque vel nunc sit amet justo gravida convallis quis non sem. Sed gravida neque eu iaculis pharetra. Praesent justo est, feugiat sed nulla id, semper consequat neque. Fusce molestie ligula ullamcorper mauris accumsan, tincidunt sodales erat consectetur'}
          image={taskTeamSRC}
          reverse={true}
        />
      </section>
      <section className='w-full h-[400px] bg-palette-dark mt-32 flex items-center px-6'>
        <div className='w-[60%] h-[200px] border-8 p-8 border-dashed'>
          <p className='font-righteous text-3xl text-palette-beige'>Join <span className='text-palette-lightgreen'>TaskFlow</span> and get things done more easily</p>
          <Link to="/login" >
              <button className='w-44 h-11 mt-10 bg-palette-lightgreen font-jost text-xl font-semibold transition-all duration-700 ease-in-out hover:bg-palette-beige hover:scale-110 ' >Join</button> 
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Home
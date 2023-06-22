import { IoConstructOutline } from 'react-icons/io5'
import { useSpring, animated } from 'react-spring'


export default function Notifications() {
  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 800 // add a delay of 500ms before the animation starts
  })

  return (
    <animated.div className='text-black dark:text-white flex flex-col px-3 text-center items-center min-h-max py-2 overflow-hidden font-inter' style={fadeProps}>
      <br/>
      <IoConstructOutline size='48px' />
      <h1 className='font-bold'> We are working on this feature!</h1>
      <p>
        We always strive to bring you the best. If you have any suggestions, <br></br> 
        please let us know 
      </p>
    </animated.div>
  )
}

// import SingleResults from '../components/Single/SingleResults';
// import url from '../components/api/api';
// import axios from 'axios';
// const single=({query})=>
// {
    
//     return(
//         <>
        
//         <SingleResults query={query}/>
//         </>
//     )
// }
// export default single;

// export async function getServerSideProps(context) {
//     const htno=context.query.htno;
//     const response=await axios.get(url+'/api/single?htno='+htno);

//     return {
//         props: {query: await response.data}, // will be passed to the page component as props
//       }
//   }
  


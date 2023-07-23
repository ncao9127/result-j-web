import HomeNavLinks from '../components/Home/HomeNavigationLinks'
import Notify from '../components/ui/Notify'

export default function Home() {
  return (

    <main className='text-center flex flex-col items-center'>
      <HomeNavLinks />
      <Notify/>
    </main>
  )
}

import { useEffect } from 'react'
import { useReveal } from './hooks/useReveal'
import Hero from './components/Hero/Hero'
import Ticker from './components/Ticker/Ticker'
import ProjectGrid from './components/ProjectGrid/ProjectGrid'
import LeadershipStrip from './components/LeadershipStrip/LeadershipStrip'
import Awards from './components/Awards/Awards'
import CricketPanel from './components/CricketPanel/CricketPanel'
import PokemonBinder from './components/PokemonBinder/PokemonBinder'
import Photography from './components/Photography/Photography'
import FavoriteAnime from './components/FavoriteAnime/FavoriteAnime'
import TechStack from './components/TechStack/TechStack'
import Contact from './components/Contact/Contact'
import NeonCursor from './components/NeonCursor/NeonCursor'

export default function App() {
  useReveal(true)

  // low-velocity scroll drift: --scroll feeds parallax transforms in CSS
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() =>
        document.documentElement.style.setProperty('--scroll', String(window.scrollY)),
      )
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <NeonCursor />
      <Hero />
      <Ticker />
      <ProjectGrid />
      <LeadershipStrip />
      <Awards />
      <CricketPanel />
      <PokemonBinder />
      <Photography />
      <FavoriteAnime />
      <TechStack />
      <Contact />
    </>
  )
}

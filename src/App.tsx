import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { useReveal } from './hooks/useReveal'
import Hero from './components/Hero/Hero'
import Ticker from './components/Ticker/Ticker'
import ProjectGrid from './components/ProjectGrid/ProjectGrid'
import LeadershipStrip from './components/LeadershipStrip/LeadershipStrip'
import CricketPanel from './components/CricketPanel/CricketPanel'
import PokemonBinder from './components/PokemonBinder/PokemonBinder'
import Photography from './components/Photography/Photography'
import FavoriteAnime from './components/FavoriteAnime/FavoriteAnime'
import TechStack from './components/TechStack/TechStack'
import Contact from './components/Contact/Contact'
import NeonCursor from './components/NeonCursor/NeonCursor'

const BattleIntro = lazy(() => import('./components/BattleIntro/BattleIntro'))

const introHold = {
  position: 'fixed',
  inset: 0,
  zIndex: 999,
  background: 'var(--bg-obsidian)',
} as const

const alreadyBooted = () => sessionStorage.getItem('booted') === '1'

export default function App() {
  const [booted, setBooted] = useState(alreadyBooted)
  useReveal(booted)

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

  const finishBoot = useCallback(() => {
    sessionStorage.setItem('booted', '1')
    setBooted(true)
  }, [])

  return (
    <>
      {!booted && (
        <Suspense fallback={<div style={introHold} />}>
          <BattleIntro onComplete={finishBoot} />
        </Suspense>
      )}
      <NeonCursor />
      <Hero />
      <Ticker />
      <ProjectGrid />
      <LeadershipStrip />
      <CricketPanel />
      <PokemonBinder />
      <Photography />
      <FavoriteAnime />
      <TechStack />
      <Contact />
    </>
  )
}

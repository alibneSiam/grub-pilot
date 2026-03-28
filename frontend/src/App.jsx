import './App.css'
import Hero from './components/Hero'
import SignIn from './components/SignIn'
import MealPicker from './components/MealPicker'
import Tabs from './components/Tabs'
import Disclaimer from './components/Disclaimer'
import { useEffect, useState } from 'react'
import { pingBackend } from './lib/backendApi'

function App() {
  const [backendStatus, setBackendStatus] = useState('starting');
  const [activeTab, setActiveTab] = useState('readme');

  useEffect(() => {
    let alive = true

    const warmBackend = async () => {
      try {
        await pingBackend()
        if (alive) setBackendStatus('ready')
      } catch {
        if (alive) setBackendStatus('error')
      }
    }

    warmBackend()

    return () => {
      alive = false
    }
  }, [])
  
  const tabs = [
    { id: "readme", label: "📜 Read Me", content: <Disclaimer />},
     { id: "signin", label: "🔑 Account", content: <SignIn onSignupSuccess={() => setActiveTab('meal')} /> },
     { id: "meal", label: "👥 Users", content: <MealPicker /> },
  ]

  return (
      <div
        className="flex flex-col w-full max-w-[1240px] p-16
          bg-cover bg-center bg-black/85 backdrop-blur-[5px] rounded-[24px] text-amber-100 mx-auto"
      >
        {backendStatus !== 'ready' && (
          <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${backendStatus === 'starting' ? 'border-orange-300/40 bg-orange-400/15 text-orange-100 animate-pulse' : 'border-red-300/40 bg-red-500/15 text-red-100'}`}>
            {backendStatus === 'starting'
              ? 'Waking backend... this may take a moment on first load.'
              : 'Backend is unreachable right now. Retrying may help.'}
          </div>
        )}
        <Hero />
        <br />
         <Tabs tabs={tabs} defaultTab="readme" activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
  )
}

export default App

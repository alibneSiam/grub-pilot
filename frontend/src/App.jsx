import './App.css'
import './index.css';
import Hero from './components/Hero'
import SignIn from './components/SignIn'
import MealPicker from './components/MealPicker'
import Tabs from './components/Tabs'
import Disclaimer from './components/Disclaimer'
import Report from './components/Report'
import GoogleOneTap from './components/google auth/GoogleOneTap';

function App() {
  const tabs = [
    { id: "readme", label: "📜 Read Me", content: <Disclaimer />},
    { id: "signin", label: "🔑 Sign In", content: <SignIn /> },
    { id: "meal", label: "🍔 Meal Picker", content: <MealPicker /> },
    { id: "report", label: "📨 Report Issues", content: <Report /> },
  ]

  return (
      <div
        className="flex flex-col w-full max-w-[1080px] p-16
          bg-cover bg-center bg-black/85 backdrop-blur-[5px] rounded-[24px] text-amber-100 mx-auto"
      >
        <Hero />
        <br />
        <Tabs tabs={tabs} defaultTab="signin" />
        <GoogleOneTap />
      </div>
  )
}

export default App

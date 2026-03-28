import Choice from './Choice'


function ProteinPicker({ preferences, onPreferenceChange }) {
  return (
    <>
    <h3 className='text-2xl mb-4 font-semibold'>Protein Preference</h3>
    <p className="text-justify text-sm mb-8 text-base leading-relaxed mb-4">
      Drag and drop to rank your protein preferences. Your dinner will be chosen based on this order.  
      For example, if your ranked choice is <span className="font-semibold">Chicken 🍗 → Beef 🥩 → Fish 🐟</span>,
      the system will first try to select a meal with chicken. If chicken isn’t available, it will pick beef, and if that’s unavailable, it will choose fish.
    </p>
    <div className='w-full flex flex-wrap gap-8 justify-center'>
        {preferences.map((_, index) => (
          <Choice
            key={index}
            title={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][index]}
            preferenceOrder={preferences[index]}
            onChange={(value) => onPreferenceChange(index, value)}
          />
        ))}
      </div>
    </>
  ) 
}

export default ProteinPicker

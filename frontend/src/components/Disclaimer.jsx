const Disclaimer = () => {
  return (
    <div className="border-x-4 px-8 border-orange-400 p-6 rounded-lg text-justify space-y-4">
      <h3 className="text-xl font-bold">⚠ Warning!</h3>
      
      <p>
        <strong>gRUBPILOT</strong> uses <strong>Web Automation</strong> to order food on your behalf.
        <br /><br />
        Your password is thus <strong>not hashed</strong>, but instead <strong>encrypted</strong>.
        This allows gRUBPILOT to access your account.
        <br /> <br />
        <strong>To understand the difference please watch the following video:</strong>
        <br /><br />
        <iframe className="w-[80%] mx-auto aspect-[16/9]"
        src="https://www.youtube-nocookie.com/embed/GI790E1JMgw?si=qt3V5TNP4OvX2iIt" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
        encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </p>
    
    <br />
      <p>
        Even though passwords and encryption keys are stored securely in Google Firebase, this <strong>does not make them immune</strong> to potential breaches. 
        <br /><br />
        We strongly encourage that you<strong> change your AXBD cafeteria password to one that you do not use for any other accounts</strong> if you wish to avail this service.
      </p>
        <br />

    <h3 className="text-xl font-bold">📢 Disclaimer</h3>
      <p>
        If any data breach occurs, or your credentials are compromised in any way, <strong>gRUBPILOT will bear no responsibility</strong>. 
        <br /> <br />
        Likewise, if gRUBPILOT malfunctions and fails to order your meals correctly or at all, <strong>it will bear no responsibility</strong>.
      </p>

      <p className="italic text-sm">
        By signing up for gRUBPILOT, you acknowledge that you understand these risks and agree to use it at your own discretion.
      </p>
    </div>
  )
}

export default Disclaimer

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Report = () => {
  const form = useRef();
  const [buttonState, setButtonState] = useState("default");

  const sendEmail = (e) => {
    e.preventDefault();

    setButtonState("sending");

    emailjs
      .sendForm(
        "service_w3bk337",
        "template_39htwi2",
        form.current,
        "uuoBbMfp0D9fOnDjd"
      )
      .then(
        () => {
          setButtonState("success");
          form.current.reset();
          setTimeout(() => setButtonState("default"), 5000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setButtonState("error");

          setTimeout(() => setButtonState("default"), 5000);
        }
      );
  };

  const buttonProps = {
    default: { text: "Send", color: "bg-orange-400", hoverColor: "hover:bg-orange-500", disabled: false },
    sending: { text: "Sending...", color: "bg-orange-300", hoverColor: "hover:bg-orange-300", disabled: true },
    success: { text: "Report Sent ✅", color: "bg-green-500", hoverColor: "hover:bg-green-500", disabled: true },
    error: { text: "Failed ❌ Try Again Later", color: "bg-red-500", hoverColor: "hover:bg-red-500", disabled: true },
  };

  const { text, color, hoverColor, disabled } = buttonProps[buttonState];

  return (
    <div className="space-y-6 relative">
      <h3 className="text-2xl font-semibold">Got Issues? Report Me</h3>
      <h5 className="italic opacity-80 mb-8">(Fix Not Guaranteed.. Duh!)</h5>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-[50%] rounded-sm overflow-hidden">
          <img
            src="https://preview.redd.it/the-best-of-dark-souls-quotes-v0-epejswuwmcib1.jpg?width=640&crop=smart&auto=webp&s=ec7912aaee250f5df10dfaf3660b71ed65439292"
            alt="Dark Souls"
            className="w-full h-auto rounded-sm"
          />
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="w-full md:w-[45%] max-w-md bg-white/10 backdrop-blur-md rounded-sm p-4 space-y-3"
        >
          <input
            type="email"
            name="from"
            hidden
            defaultValue={"alibnesiam@gmail.com"}
          />

          <textarea
            rows={6}
            spellCheck={false}
            name="message"
            placeholder="Describe what went wrong"
            className="w-full px-3 py-2 rounded-sm
              bg-black/40
              outline-none focus:ring-1 focus:ring-orange-400
              resize-none"
            required
          />

          <button
            type="submit"
            disabled={disabled}
            className={`
              px-4 py-2 rounded-sm font-semibold w-full
              transition-all duration-500 ease-in-out text-black
              ${color} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${hoverColor}
            `}
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;

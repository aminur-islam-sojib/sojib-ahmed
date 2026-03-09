import { Send } from "lucide-react";

export default function SentButton() {
  return (
    <div className=" flex w-full md:justify-end my-5">
      <button
        className="relative w-full  h-12 md:w-auto px-5 rounded-xl text-primary bg-[#1e1e1f]  cursor-pointer border-none z-1 group"
        style={{
          boxShadow: "0 2px 5px #00000040",
          transition: "0.25s ease-in",
        }}
        type="submit"
      >
        {/* ::before pseudo-element - Gradient border (default state) */}
        <span
          className="absolute inset-0 rounded-xl -z-10 transition-all opacity-100 group-hover:opacity-0"
          style={{
            content: '""',
            padding: "1px",
            background:
              "linear-gradient(to bottom right, hsl(0, 0%, 25%) 0%, hsla(0, 0%, 25%, 0) 50%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* ::before hover state - Yellow gradient border */}
        <span
          className="absolute inset-0 rounded-xl -z-10 transition-all opacity-0 group-hover:opacity-100"
          style={{
            content: '""',
            padding: "1px",
            background:
              "linear-gradient(to bottom right, hsl(45, 100%, 71%) 0%, hsla(36, 100%, 69%, 0) 50%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* ::after pseudo-element - Inner background (default) */}
        <span
          className="absolute rounded-xl -z-10 transition-all"
          style={{
            content: '""',
            inset: "1px",
            background: "#1e1e1f",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* ::after hover state - Yellow tinted background */}
        <span
          className="absolute rounded-xl -z-10 transition-all opacity-0 group-hover:opacity-100"
          style={{
            content: '""',
            inset: "1px",
            background:
              "linear-gradient(135deg, hsla(45, 100%, 71%, 0.251) 0%, hsla(35, 100%, 68%, 0) 59.86%), hsl(240, 2%, 13%)",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* Button text */}
        <span className=" flex gap-2 justify-center ">
          {" "}
          <Send /> Send Message
        </span>
      </button>
    </div>
  );
}

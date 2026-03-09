import { ChevronDown } from "lucide-react";

interface GradientBorderButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function GradientBorderButton({
  isOpen,
  onToggle,
}: GradientBorderButtonProps) {
  return (
    <div className="">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Hide contacts" : "Show contacts"}
        onClick={onToggle}
        className="group relative z-1 h-12 w-auto cursor-pointer rounded-tr-2xl rounded-bl-2xl border-none bg-surface px-5 text-primary"
        style={{
          boxShadow: "0 2px 5px #00000040",
          transition: "0.25s ease-in",
        }}
      >
        {/* ::before pseudo-element - Gradient border (default state) */}
        <span
          className={`absolute inset-0 rounded-tr-2xl rounded-bl-2xl -z-10 transition-all ${
            isOpen ? "opacity-0" : "group-hover:opacity-0"
          }`}
          style={{
            content: '""',
            padding: "1px",
            background: "var(--button-border-neutral)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* ::before hover/active state - Yellow gradient border */}
        <span
          className={`absolute inset-0 rounded-tr-2xl rounded-bl-2xl -z-10 transition-all ${
            isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            content: '""',
            padding: "1px",
            background: "var(--button-border-active)",
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
          className={`absolute rounded-tr-2xl rounded-bl-2xl -z-10 transition-all ${
            isOpen ? "opacity-0" : ""
          }`}
          style={{
            content: '""',
            inset: "1px",
            background: "var(--surface)",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* ::after hover/active state - Yellow tinted background */}
        <span
          className={`absolute rounded-tr-2xl rounded-bl-2xl -z-10 transition-all ${
            isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{
            content: '""',
            inset: "1px",
            background: "var(--button-surface-active)",
            transition: "0.25s ease-in",
            zIndex: -1,
          }}
        />
        {/* Button text */}
        <span className="block sm:hidden">
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
        <span className=" hidden sm:block">
          {isOpen ? "Hide Contacts" : "Show Contacts"}
        </span>
      </button>
    </div>
  );
}

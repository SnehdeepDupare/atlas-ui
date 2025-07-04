export function DocGridPattern() {
  return (
    <div className="absolute inset-0 z-0 mx-0 max-w-none overflow-hidden">
      <div className="absolute top-0 left-1/2 ml-[-38rem] h-[25rem] w-[81.25rem] [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-100">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
          >
            <defs>
              <pattern
                id=":S1:"
                width="72"
                height="56"
                patternUnits="userSpaceOnUse"
                x="-12"
                y="4"
              >
                <path d="M.5 56V.5H72" fill="none"></path>
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#:S1:)"
            ></rect>
            <svg x="-12" y="4" className="overflow-visible">
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="288"
                y="168"
              ></rect>
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="144"
                y="56"
              ></rect>
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="504"
                y="168"
              ></rect>
              <rect
                strokeWidth="0"
                width="73"
                height="57"
                x="720"
                y="336"
              ></rect>
            </svg>
          </svg>
        </div>
        <svg
          viewBox="0 0 1113 440"
          aria-hidden="true"
          className="absolute top-0 left-1/2 ml-[-19rem] w-[69.5625rem] fill-white dark:fill-transparent blur-[26px]"
        >
          <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z"></path>
        </svg>
      </div>
    </div>
  );
}

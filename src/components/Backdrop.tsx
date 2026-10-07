/** Layered ambient background: aurora blobs, blueprint grid, vignette and a slow scanline. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-[18%] -top-[22%] h-[60vw] w-[60vw] animate-aurora rounded-full bg-violet/25 blur-[140px]" />
      <div className="absolute -right-[16%] top-[18%] h-[52vw] w-[52vw] animate-aurora rounded-full bg-neon/[0.14] blur-[150px] [animation-delay:-6s] [animation-direction:alternate-reverse]" />
      <div className="absolute bottom-[-24%] left-[22%] h-[48vw] w-[48vw] animate-aurora rounded-full bg-magenta/[0.09] blur-[150px] [animation-delay:-11s]" />
      <div className="bg-grid mask-fade-y absolute inset-0 opacity-70" />
      <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,5,10,0.85)_100%)]" />
    </div>
  );
}

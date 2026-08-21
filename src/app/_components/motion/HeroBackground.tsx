export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* slowly drifting purple glow */}
      <div
        className="hero-glow absolute left-1/2 top-1/3 -ml-[19rem] h-[38rem] w-[38rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 28%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}

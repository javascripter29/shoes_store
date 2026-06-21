const socials = ["TWITTER", "INSTAGRAM", "LINKEDIN", "GITHUB"];

function ArrowBadge() {
  return (
    <span className="grid size-4 place-items-center bg-[#d7e9e8] text-[10px] font-black leading-none text-black">
      ↗
    </span>
  );
}

export function Footer() {
  return (
    <footer className="mt-14 border-zinc-900 bg-zinc-950 px-1 py-8 text-[#d7e9e8] sm:mt-2 sm:py-10">
      <div className="grid gap-10 md:grid-cols-[1fr_0.9fr_1.55fr] md:items-start">
        <section className="footer-copy min-h-44">
          <p className="footer-muted">CONTACT:</p>
          <p className="mt-6 max-w-56">
            REACH OUT FOR FREELANCE COLLABORATIONS OR JUST TO SAY HI :)
          </p>
          <a className="footer-chip mt-4" href="mailto:hello@pulsekicks.store">
            EMAIL
            <ArrowBadge />
          </a>
        </section>

        <section className="footer-copy">
          <p className="footer-muted">SOCIALS:</p>
          <div className="mt-5 flex flex-col items-start gap-2">
            {socials.map((social) => (
              <a className="footer-chip" href="/" key={social}>
                {social}
                <ArrowBadge />
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[1fr_230px] md:items-start">
          <div className="relative hidden min-h-36 md:block">
            <div className="absolute right-0 top-0 flex items-center gap-1 text-2xl font-black leading-none text-[#d7e9e8]">
              <span>✱</span>
              <span className="text-lg">◉</span>
              <span className="grid size-4 place-items-center rounded-full bg-[#d7e9e8] text-[9px] text-black">
                2
              </span>
            </div>
            <div className="footer-mark" aria-hidden="true">
              <div className="footer-mark-cut" />
              <div className="footer-mark-stem" />
              <div className="footer-mark-bowl" />
            </div>
          </div>

          <div className="footer-card">
            <div className="border-b border-[#d7e9e8]/70 px-4 py-3 text-center">
              CATALOGUED WORKS C.25
            </div>
            <div className="grid min-h-24 place-items-center border-b border-[#d7e9e8]/70 px-5 py-5 text-center">
              <p>
                INTERACTIVE DEVELOPER AVAILABLE FOR FREELANCE BASED IN PARIS
                (FR)
              </p>
            </div>
            <div className="bg-[#d7e9e8] px-4 py-3 text-right text-black">
              AMINE ZEGMOU__©2025
            </div>
          </div>
        </section>
      </div>

      <div className="footer-copy mt-10 flex flex-col gap-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
        <p>ALL RIGHTS RESERVED.</p>
        <p className="flex items-center gap-2 sm:ml-auto">
          DESIGN &amp; DEV BY ME
          <span className="inline-flex gap-1">
            <span className="size-3 bg-[#d7e9e8]" />
            <span className="size-3 bg-[#d7e9e8]" />
          </span>
        </p>
      </div>
    </footer>
  );
}

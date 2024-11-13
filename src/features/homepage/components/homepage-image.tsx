export function HomepageImage(): JSX.Element {
  return (
    <div className="relative w-full max-w-[800px] aspect-video rounded-lg overflow-hidden shadow-xl">
      <img
        src="https://cdn.theatlantic.com/thumbor/lmnb95pY8lYMf3zd5Fz-V9Xlurw=/0x0:8192x4608/960x540/media/img/2022/12/BoB_Ode_moodswings/original.png"
        alt="Mood tracking illustration"
        className="w-full h-full object-cover"
      />
    </div>
  );
}


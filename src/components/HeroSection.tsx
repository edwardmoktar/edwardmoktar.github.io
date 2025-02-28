import { useEffect, useState } from 'react';

const HeroSection = () => {
  const companies = [
    { name: "Telos Labs", logo: "/images/0-telos.jpg" },
    { name: "Avocado DAO", logo: "/images/1-ag.png" },
    { name: "Emirates", logo: "/images/2-emirates.png" },
    { name: "EPS", logo: "/images/3-eps.png" },
    { name: "KN", logo: "/images/4-kn.png" },
    { name: "GV", logo: "/images/5-gv.png" },
    { name: "LV", logo: "/images/6-lv.png" },
  ];

  // State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to detect and update dark mode state
  useEffect(() => {
    // Initial check
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Set up observer to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const CompaniesSection = () => {
    return (
      <div className="w-full overflow-hidden py-10">
        <h3 className="text-center text-base font-medium text-neutral-600 dark:text-neutral-300 mb-8">
          COMPANIES I WORKED WITH
        </h3>
        <div className="relative w-full overflow-hidden">
          <div className="animate-carousel flex items-center gap-16 px-4" style={{ width: 'fit-content' }}>
            {[...Array(2)].map((_, dupeIndex) => (
              <div key={dupeIndex} className="flex items-center gap-16">
                {companies.map((company, idx) => (
                  <div
                    key={`${dupeIndex}-${idx}`}
                    className="relative w-[120px] h-[60px] company-logo-container"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain company-logo"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-foreground py-8 md:py-16 px-4 font-sf">
      {/* Profile Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
        <img
          src="/images/profile-icon.jpg"
          alt="Edward's profile picture"
          className="rounded-full object-cover border-4 border-border w-full h-full"
          loading="eager"
        />
      </div>

      {/* Greeting */}
      <h2 className="text-lg md:text-xl font-medium mb-4 flex items-center gap-2 text-[#594126] dark:text-[#f0c040]">
        <span className="wave">👋</span> Hi, I&apos;m Edward
      </h2>

      {/* Roles - Proper Case */}
      <div className="text-center space-y-0 mb-8">
        <h1 className="text-[60px] font-bold leading-tight tracking-wide text-[#594126] dark:text-[#f0c040]">
          Product Owner
        </h1>
        <h1 className="text-[60px] font-bold leading-tight tracking-wide text-[#8B7355] dark:text-[#e0c070]">
          Ops Manager
        </h1>
        <h1 className="text-[60px] font-bold leading-tight tracking-wide text-[#9F8170] dark:text-[#d0c090]">
          Analyst
        </h1>
        <h1 className="text-[60px] font-bold leading-tight tracking-wide text-[#B4A79A] dark:text-[#c0c0a0]">
          No-Coder
        </h1>
      </div>

      {/* Dynamic Achievement Text */}
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-16 text-sm text-[#594126] dark:text-[#f0c040]">
        <div className="flex items-center gap-2">
          {isDarkMode ? (
            <>
              <span role="img" aria-label="sponge">🧽</span>
              <span>Sponge for knowledge at night</span>
            </>
          ) : (
            <>
              <span role="img" aria-label="tools">🛠️</span>
              <span>Problem Solver by day</span>
            </>
          )}
        </div>
      </div>

      {/* Companies Section */}
      <CompaniesSection />
    </div>
  )
}

export default HeroSection
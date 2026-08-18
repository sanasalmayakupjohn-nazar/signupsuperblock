"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingHeader from "../components/tempHeader";
import {
  FaBuilding,
  FaMagic,
  FaChartBar,
  FaCompass,
  FaStar,
  FaBullhorn,
  FaHeadphones,
  FaBullseye,
  FaShoppingCart,
  FaCalendarAlt,
  FaUsers,
  FaProjectDiagram,
  FaRobot,
  FaChalkboardTeacher,
  FaBell,
} from "react-icons/fa";

const useCases = [
  {
    title: "Marketing campaigns",
    description: "Promotions, launches, drips.",
    icon: <FaBullhorn />,
    bg: "bg-[#FFF1DC]",
    text: "text-[#F59E0B]",
    selectedBorder: "border-[#F59E0B]",
  },
  {
    title: "Customer support",
    description: "Inbox, agents, SLAs.",
    icon: <FaHeadphones />,
    bg: "bg-[#E5F5FC]",
    text: "text-[#009FE3]",
    selectedBorder: "border-[#009FE3]",
  },
  {
    title: "Lead generation",
    description: "Capture, qualify, route.",
    icon: <FaBullseye />,
    bg: "bg-[#FFE9ED]",
    text: "text-[#F43F5E]",
    selectedBorder: "border-[#F43F5E]",
  },
  {
    title: "Ecommerce sales",
    description: "Carts, catalog, checkout.",
    icon: <FaShoppingCart />,
    bg: "bg-[#F0E8FF]",
    text: "text-[#7C3AED]",
    selectedBorder: "border-[#8B5CF6]",
  },
  {
    title: "Bookings & appointments",
    description: "Reminders, no-show recovery.",
    icon: <FaCalendarAlt />,
    bg: "bg-[#EDEBFF]",
    text: "text-[#6366F1]",
    selectedBorder: "border-[#6366F1]",
  },
  {
    title: "Community engagement",
    description: "Members, cohorts, events.",
    icon: <FaUsers />,
    bg: "bg-[#DDF7EE]",
    text: "text-[#10B981]",
    selectedBorder: "border-[#10B981]",
  },
  {
    title: "Automation & workflows",
    description: "Triggers, sequences.",
    icon: <FaProjectDiagram />,
    bg: "bg-[#E5EDFF]",
    text: "text-[#3B82F6]",
    selectedBorder: "border-[#3B82F6]",
  },
  {
    title: "AI chatbots",
    description: "RAG-powered conversations.",
    icon: <FaRobot />,
    bg: "bg-[#F8E8FF]",
    text: "text-[#D946EF]",
    selectedBorder: "border-[#D946EF]",
  },
  {
    title: "Webinars & coaching",
    description: "Hosting, reminders, replays.",
    icon: <FaChalkboardTeacher />,
    bg: "bg-[#FFF0E4]",
    text: "text-[#F97316]",
    selectedBorder: "border-[#F97316]",
  },
  {
    title: "Notifications & alerts",
    description: "Transactional, OTPs.",
    icon: <FaBell />,
    bg: "bg-[#E5F7FC]",
    text: "text-[#0891B2]",
    selectedBorder: "border-[#0891B2]",
  },
];

const steps = [
  {
    title: "Industry",
    subtitle: "Pick your industry",
    icon: <FaBuilding />,
  },
  {
    title: "Use cases",
    subtitle: "What you'll send",
    icon: <FaMagic />,
  },
  {
    title: "Scale",
    subtitle: "Team & volume",
    icon: <FaChartBar />,
  },
  {
    title: "Discovery",
    subtitle: "How you found us",
    icon: <FaCompass />,
  },
  {
    title: "Context",
    subtitle: "Notes & docs",
    icon: <FaStar />,
  },
];

export default function OnboardingPage() {
const router = useRouter();
const [selectedUseCases, setSelectedUseCases] = useState<string[]>([
    "Marketing campaigns",
    "Customer support",
    "Ecommerce sales",
    "Automation & workflows",
    "Notifications & alerts",
  ]);
  

  const [userName, setUserName] = useState("");

  useEffect(() => {
  const savedUser = localStorage.getItem("signup_user");

  if (!savedUser) return;

  try {
    const user = JSON.parse(savedUser);

    if (user.full_name) {
      setUserName(user.full_name);
    }
  } catch (error) {
    console.error("Failed to read signup user:", error);
  }
}, []);

  const toggleUseCase = (title: string) => {
  setSelectedUseCases((current) => {
    // If already selected, allow unselecting
    if (current.includes(title)) {
      return current.filter((item) => item !== title);
    }

    // Don't allow more than 5 selections
    if (current.length >= 5) {
      return current;
    }

    // Otherwise select it
    return [...current, title];
  });
};
const handleContinue = () => {
  localStorage.setItem(
    "onboarding_use_cases",
    JSON.stringify({
      use_cases: selectedUseCases,
    })
  );

  router.push("/scale");
};
  return (
    <>
          <OnboardingHeader />
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="px-0 pt-[10px]">

        <p className="text-[12px] font-medium tracking-[1.5px] text-[#77736D]">
          WELCOME TO SUPERBLOCK
        </p>

        <h1 className="mt-4 text-[40px] font-semibold leading-[46px] tracking-[-1.2px]">
          Hey {userName || "there"},{" "}
          <span className="text-[#3D4650]">
            let's shape your workspace.
          </span>
        </h1>

        <p className="mt-3 max-w-[800px] text-[15px] leading-[24px] text-[#555555]">
          Five quick questions — about a minute. We'll use them to pick
          channel defaults, suggest templates, and tune the copy across
          the app so it speaks your business's language from day one.
        </p>

      </div>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="mt-7 flex min-h-[620px] gap-[30px]">


        {/* =====================================================
            LEFT STEPS
        ===================================================== */}

        <aside className="w-[224px] shrink-0">

          <div className="space-y-1">

            {steps.map((step, index) => {

              const completed = index === 0;
              const active = index === 1;

              return (
                <div
                  key={step.title}
                  className={`relative flex h-[60px] items-center gap-3 rounded-[10px] px-3 ${
                    active
                      ? "border border-[#E2DFDA] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                      : "bg-transparent"
                  }`}
                >

                  {/* Vertical line */}

                  {index < steps.length - 1 && (
                    <div className="absolute left-[22px] top-[48px] h-[28px] w-px bg-[#E2DFDA]" />
                  )}


                  {/* Icon */}

                  <div
                    className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${
                      completed
                        ? "bg-[#075B48] text-white"
                        : active
                        ? "bg-[#7C3AED] text-white"
                        : "bg-[#F3F2EF] text-[#C5C3BE]"
                    }`}
                  >
                    <span className="text-[12px]">
                      {completed ? "✓" : step.icon}
                    </span>
                  </div>


                  {/* Text */}

                  <div>

                    <p
                      className={`text-[14px] font-semibold ${
                        active || completed
                          ? "text-[#202020]"
                          : "text-[#B5B2AC]"
                      }`}
                    >
                      {step.title}
                    </p>

                    <p
                      className={`mt-[1px] text-[12px] ${
                        active || completed
                          ? "text-[#8C8983]"
                          : "text-[#C4C1BC]"
                      }`}
                    >
                      {step.subtitle}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </aside>


        {/* =====================================================
            CENTER
        ===================================================== */}

        <section className="min-w-0 flex-1">

          <div className="relative h-full overflow-hidden rounded-[16px] border border-[#E1DED9] bg-white">

            {/* Purple top border */}

            <div className="h-[3px] w-full bg-[#7C3AED]" />

            <div className="px-[42px] pt-[44px]">

              {/* Step */}

              <p className="text-[12px] font-medium tracking-[1.2px] text-[#98948D]">
                STEP 2 OF 5
              </p>


              {/* Heading */}

              <h2 className="mt-4 text-[28px] font-semibold leading-[34px] tracking-[-0.8px] text-[#111111]">
                What will you send on Superblock?
              </h2>


              <p className="mt-2 max-w-[700px] text-[15px] leading-[24px] text-[#666666]">
                Pick everything that applies — we'll surface the right
                channels, templates, and automations on day one.
              </p>


              {/* =================================================
                  USE CASE GRID
              ================================================= */}

              <div className="mt-7 grid grid-cols-2 gap-[9px]">

                {useCases.map((useCase) => {

                  const selected =
                    selectedUseCases.includes(useCase.title);

                  return (
                    <button
                      key={useCase.title}
                      type="button"
                      onClick={() =>
                        toggleUseCase(useCase.title)
                      }
                      className={`relative flex min-h-[77px] items-center rounded-[10px] border p-3.5 text-left transition ${
                        selected
                          ? `${useCase.selectedBorder} shadow-[0_0_0_1px_rgba(0,0,0,0.02)]`
                          : "border-[#E1DED9] bg-white hover:border-[#B8B4AD]"
                      }`}
                    >

                      {/* Icon */}

                      <div
                        className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[7px] text-[16px] ${useCase.bg} ${useCase.text}`}
                      >
                        {useCase.icon}
                      </div>


                      {/* Text */}

                      <div className="ml-3 min-w-0">

                        <p className="text-[15px] font-semibold text-[#161616]">
                          {useCase.title}
                        </p>

                        <p className="mt-[2px] text-[12.5px] text-[#99958F]">
                          {useCase.description}
                        </p>

                      </div>


                      {/* Selected check */}

                      {selected && (
                        <div
                          className={`absolute right-3.5 top-3.5 flex h-[19px] w-[19px] items-center justify-center rounded-full ${useCase.bg} ${useCase.text}`}
                        >
                          <span className="text-[11px] font-bold">
                            ✓
                          </span>
                        </div>
                      )}

                    </button>
                  );
                })}

              </div>


              {/* =================================================
                  BOTTOM BUTTONS
              ================================================= */}

              <div className="relative mt-[42px] flex items-center justify-between border-t border-[#E2DFDA] pt-[22px]">

                <button
  type="button"
  onClick={() => router.push("/onboardingentry")}
  className="rounded-[8px] border border-[#E1DED9] bg-white px-4 py-2 text-[14px] text-[#202020]"
>
  ← Back
</button>


                <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#99958F]">
                  Step 2 of 5
                </span>


                <button
  type="button"
  onClick={handleContinue}
  className="rounded-[8px] bg-[#075B48] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#064D3E]"
>
  Continue →
</button>
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            RIGHT LIVE PREVIEW
        ===================================================== */}

        <aside className="w-[425px] shrink-0">

          <div className="rounded-[16px] border border-[#E1DED9] bg-white p-5">


            {/* Preview heading */}

            <div className="flex items-center justify-between">

              <p className="text-[12px] font-semibold tracking-[1.1px] text-[#99958F]">
                LIVE PREVIEW
              </p>

              <div className="flex items-center gap-1.5 rounded-full bg-[#E9F2EF] px-2.5 py-1 text-[10px] font-medium text-[#176653]">

                <span className="h-[5px] w-[5px] rounded-full bg-[#087F63]" />

                updates as you answer

              </div>

            </div>


            <p className="mt-2 text-[13px] leading-[20px] text-[#99958F]">
              Your workspace stays calm and neutral — the colours here
              on onboarding are just guideposts. Only the wording and
              which tools unlock change per business.
            </p>


            {/* =================================================
                MINI DASHBOARD
            ================================================= */}

            <div className="mt-5 overflow-hidden rounded-[10px] border border-[#DDD9D3]">


              {/* Browser bar */}

              <div className="flex h-[34px] items-center justify-between border-b border-[#DDD9D3] px-3">

                <div className="flex gap-1.5">

                  <span className="h-[7px] w-[7px] rounded-full bg-[#FF6257]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-[#FFBD2E]" />
                  <span className="h-[7px] w-[7px] rounded-full bg-[#28C840]" />

                </div>

                <span className="text-[9px] text-[#88837D]">
                  Superblock for ecommerce
                </span>

                <span className="h-[7px] w-[7px] rounded-full bg-[#12B886]" />

              </div>


              {/* Dashboard */}

              <div className="flex min-h-[235px]">


                {/* Sidebar */}

                <div className="w-[95px] border-r border-[#E2DFDA] p-2">

                  <div className="rounded-[5px] bg-[#E9F1EF] px-2 py-1.5 text-[9px] font-medium text-[#176653]">
                    ⌂ &nbsp; Home
                  </div>

                  <div className="mt-1 px-2 py-1.5 text-[9px] text-[#77736D]">
                    ♢ &nbsp; Inbox
                  </div>

                  <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                    ◇ &nbsp; Send
                  </div>

                  <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                    ♙ &nbsp; Contacts
                  </div>

                  <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                    ⚒ &nbsp; Build
                  </div>

                  <div className="px-2 py-1.5 text-[9px] text-[#77736D]">
                    ◫ &nbsp; Insights
                  </div>

                </div>


                {/* Dashboard content */}

                <div className="flex-1 p-3">

                  <h3 className="text-[12px] font-semibold">
                    Welcome back, {userName || "Sana"}
                  </h3>

                  <p className="mt-1 text-[9px] text-[#99958F]">
                    Superblock for ecommerce
                  </p>


                  {/* Customers */}

                  <div className="mt-3 rounded-[7px] border border-[#E2DFDA] p-2.5">

                    <p className="text-[8px] font-medium text-[#99958F]">
                      CUSTOMERS REACHED THIS WEEK
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="text-[17px] font-semibold">
                        1,284
                      </span>

                      <span className="rounded bg-[#E5F5ED] px-1 text-[7px] text-[#16805E]">
                        +12%
                      </span>

                    </div>


                    {/* Chart */}

                    <div className="mt-3 flex h-[22px] items-end gap-1">

                      {[8, 12, 9, 15, 10, 16, 13, 19, 14].map(
                        (height, index) => (
                          <div
                            key={index}
                            className={`flex-1 rounded-[2px] ${
                              index === 8
                                ? "bg-[#075B48]"
                                : "bg-[#D8D8D5]"
                            }`}
                            style={{
                              height: `${height}px`,
                            }}
                          />
                        )
                      )}

                    </div>

                  </div>


                  {/* Suggested */}

                  <div className="mt-3 rounded-[7px] border border-[#BBD6CD] bg-[#EDF6F2] p-2.5">

                    <div className="flex items-center gap-2">

                      <div className="flex h-6 w-6 items-center justify-center rounded-[5px] bg-[#075B48] text-[10px] text-white">
                        ✦
                      </div>

                      <div>

                        <p className="text-[9px] font-semibold">
                          Suggested: Abandoned-cart reco...
                        </p>

                        <p className="mt-0.5 text-[7px] text-[#77736D]">
                          Tap to scaffold a flow for customers.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                ENGAGEMENT TOOLS
            ================================================= */}

            <div className="mt-4 rounded-[8px] border border-[#E1DED9] p-3">

              <p className="text-[11px] font-semibold tracking-[0.5px] text-[#66615B]">
                ✣ &nbsp; ENGAGEMENT TOOLS UNLOCKED
              </p>

              <div className="mt-2 space-y-1.5">

                <p className="text-[11px] text-[#626262]">
                  ✓ Automation studio
                </p>

                <p className="text-[11px] text-[#626262]">
                  ✓ Offers
                </p>

                <p className="text-[11px] text-[#626262]">
                  ✓ Onboarding sequences
                </p>

              </div>

            </div>


            {/* =================================================
                PREVIEW DETAILS
            ================================================= */}

            <div className="mt-4 grid grid-cols-2 gap-y-4">

              <PreviewItem
                label="INDUSTRY"
                value="Ecommerce & D2C"
              />

              <PreviewItem
                label="TONE"
                value="Superblock for ecommerce"
              />

              <PreviewItem
                label="CONTACTS CALLED"
                value="Customers"
              />

              <PreviewItem
                label="AUDIENCE AS"
                value="Segment"
              />

              <PreviewItem
                label="USE CASES"
                value={`${selectedUseCases.length} picked`}
              />

              <PreviewItem
                label="TEAM"
                value="—"
              />

            </div>


            <p className="mt-5 text-[11px] text-[#99958F]">
              Everything is editable in{" "}
              <span className="font-semibold text-[#55514B]">
                Settings → Preferences
              </span>{" "}
              any time.
            </p>

          </div>

        </aside>

      </div>

    </main>
    </>
  );
}


/* ============================================================
   PREVIEW ITEM
============================================================ */

function PreviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-[10px] font-medium tracking-[0.7px] text-[#99958F]">
        {label}
      </p>

      <p className="mt-1 text-[13px] font-medium text-[#202020]">
        {value}
      </p>

    </div>
  );
}
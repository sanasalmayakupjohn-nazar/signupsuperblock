"use client";

import { useState, useEffect } from "react";
import OnboardingHeader from "@/components/OnboardingHeader";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useOnboarding } from "@/app/components/onboardingContext/page";

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

/* ============================================================
   USE CASES DATA
============================================================ */

const useCases = [
  {
    id: "marketing_campaigns",
    title: "Marketing campaigns",
    description: "Promotions, launches, drips.",
    icon: <FaBullhorn />,
    accent: "#F59E0B",
  },
  {
    id: "customer_support",
    title: "Customer support",
    description: "Inbox, agents, SLAs.",
    icon: <FaHeadphones />,
    accent: "#0EA5E9",
  },
  {
    id: "lead_generation",
    title: "Lead generation",
    description: "Capture, qualify, route.",
    icon: <FaBullseye />,
    accent: "#F43F5E",
  },
  {
    id: "ecommerce_sales",
    title: "Ecommerce sales",
    description: "Carts, catalog, checkout.",
    icon: <FaShoppingCart />,
    accent: "#8B5CF6",
  },
  {
    id: "appointment_booking",
    title: "Bookings & appointments",
    description: "Reminders, no-show recovery.",
    icon: <FaCalendarAlt />,
    accent: "#6366F1",
  },
  {
    id: "community_engagement",
    title: "Community engagement",
    description: "Members, cohorts, events.",
    icon: <FaUsers />,
    accent: "#14B8A6",
  },
  {
    id: "automation_workflows",
    title: "Automation & workflows",
    description: "Triggers, sequences.",
    icon: <FaProjectDiagram />,
    accent: "#3B82F6",
  },
  {
    id: "ai_chatbots",
    title: "AI chatbots",
    description: "RAG-powered conversations.",
    icon: <FaRobot />,
    accent: "#D946EF",
  },
  {
    id: "webinars_coaching",
    title: "Webinars & coaching",
    description: "Hosting, reminders, replays.",
    icon: <FaChalkboardTeacher />,
    accent: "#F97316",
  },
  {
    id: "notifications_alerts",
    title: "Notifications & alerts",
    description: "Transactional, OTPs.",
    icon: <FaBell />,
    accent: "#06B6D4",
  },
];

/* ============================================================
   STEPS
============================================================ */

const steps = [
  {
    id: 1,
    title: "Industry",
    subtitle: "Pick your industry",
    icon: <FaBuilding />,
  },
  {
    id: 2,
    title: "Use cases",
    subtitle: "What you'll send",
    icon: <FaMagic />,
  },
  {
    id: 3,
    title: "Scale",
    subtitle: "Team & volume",
    icon: <FaChartBar />,
  },
  {
    id: 4,
    title: "Discovery",
    subtitle: "How you found us",
    icon: <FaCompass />,
  },
  {
    id: 5,
    title: "Context",
    subtitle: "Workspace notes",
    icon: <FaStar />,
  },
];

/* ============================================================
   INDUSTRY TITLES
============================================================ */

const industryTitles: Record<string, string> = {
  ecommerce: "Ecommerce & D2C",
  saas: "SaaS & Software",
  education: "Education & Coaching",
  creator: "Creator & Community",
  healthcare: "Healthcare & Wellness",
  real_estate: "Real Estate & Property",
  financial_services: "Financial Services",
  agency: "Agency & Reseller",
  hospitality: "Hospitality & F&B",
  logistics: "Logistics & Delivery",
  nonprofit: "Nonprofit & NGO",
  manufacturing: "Manufacturing & B2B",
  other: "Something else",
};

/* ============================================================
   DEFAULT USE CASES
============================================================ */

const defaultUseCases = [
  "marketing_campaigns",
  "customer_support",
  "ecommerce_sales",
  "automation_workflows",
  "notifications_alerts",
];

/* ============================================================
   PAGE
============================================================ */

export default function UseCasesPage() {
  const { data, setUseCases } = useOnboarding();

  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(
    data.use_cases.length > 0 ? data.use_cases : defaultUseCases
  );

  /* ==========================================================
     GET DATA FROM ONBOARDING CONTEXT
  ========================================================== */

  const userName = data.signup.full_name;

  const industryTitle =
    industryTitles[data.industry] ||
    data.industry ||
    "Ecommerce & D2C";

  /* ==========================================================
     SYNC INITIAL DEFAULTS TO CONTEXT
  ========================================================== */

  useEffect(() => {
    if (data.use_cases.length === 0) {
      setUseCases(defaultUseCases);
    }
  }, [data.use_cases.length, setUseCases]);

  /* ==========================================================
     TOGGLE USE CASE
     MAXIMUM 5
  ========================================================== */

  const toggleUseCase = (id: string) => {
    setSelectedUseCases((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 5) {
        return current;
      }

      return [...current, id];
    });
  };

  /* ==========================================================
     CONTINUE
     SAVE ONLY TO ONBOARDING CONTEXT
  ========================================================== */

  const handleContinue = () => {
    setUseCases(selectedUseCases);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FAFAF8] text-[#111111]">
      <OnboardingHeader />

      {/* ====================================================
          BACKGROUND GLOW
      ==================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.18] blur-3xl transition-colors duration-[600ms]"
        style={{ backgroundColor: "#8B5CF6" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-44 -left-32 h-[420px] w-[420px] rounded-full opacity-[0.10] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6, 78, 59, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* ====================================================
          PAGE HEADER
      ==================================================== */}

      <section className="relative mx-auto px-5 pb-4 pt-8 sm:px-8 sm:pb-5 sm:pt-10">
        <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8E8B85]">
          WELCOME TO SUPERBLOCK
        </p>

        <h1 className="max-w-[720px] text-[28px] font-semibold leading-[1.05] tracking-[-0.028em] text-[#111111] sm:text-[32px]">
          {userName ? `Hey ${userName}, ` : "Hey there, "}
          <span className="font-medium text-[#525252]">
            let's shape your workspace.
          </span>
        </h1>

        <p className="mt-2.5 max-w-[640px] text-[13.5px] leading-[1.55] text-[#525252]">
          Five quick questions — about a minute. We'll use them to pick
          channel defaults, suggest templates, and tune the copy across the
          app so it speaks your business's language from day one.
        </p>
      </section>

      {/* ====================================================
          MAIN 3-COLUMN LAYOUT
      ==================================================== */}

      <main className="relative mx-auto grid grid-cols-1 gap-6 px-5 pb-12 sm:px-8 lg:grid-cols-[180px_minmax(0,1fr)_340px]">

        {/* ==================================================
            LEFT — STEPS NAV
        ================================================== */}

        <aside className="hidden lg:block">
          <nav aria-label="Onboarding steps" className="sticky top-6">
            <ul className="flex flex-col gap-1.5">
              {steps.map((step, index) => {
                const active = step.id === 2;
                const completed = step.id < 2;

                return (
                  <li key={step.id}>
                    <div
                      className={`flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-all duration-[180ms] ${
                        active
                          ? "border border-[#E8E5DF] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                          : completed
                          ? "cursor-pointer hover:bg-[#F5F4F0]"
                          : "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <span
                        className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] transition-all duration-[200ms] ${
                          completed
                            ? "bg-[#064E3B] text-white"
                            : active
                            ? "bg-[#8B5CF6] text-white"
                            : "bg-[#F5F4F0] text-[#8E8B85]"
                        }`}
                      >
                        {completed ? "✓" : step.icon}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`text-[12px] font-semibold leading-tight ${
                            active ? "text-[#111111]" : "text-[#525252]"
                          }`}
                        >
                          {step.title}
                        </p>

                        <p className="mt-0.5 text-[10.5px] leading-tight text-[#8E8B85]">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    {index < steps.length - 1 && (
                      <div
                        aria-hidden
                        className="my-0.5 ml-[18px] h-1.5 w-px bg-[#E8E5DF]"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* ==================================================
            CENTER — MAIN CARD
        ================================================== */}

        <section className="min-w-0">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-[#E8E5DF] bg-white shadow-sm">

            {/* Top Accent Gradient */}
            <div
              aria-hidden
              className="h-[3px] w-full"
              style={{
                background:
                  "linear-gradient(to right, #8B5CF6, rgba(139, 92, 246, 0.4) 35%, transparent)",
              }}
            />

            <div className="p-6 sm:p-8 lg:p-9">

              {/* Step Header */}

              <div className="mb-6">
                <p className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#8E8B85]">
                  STEP 2 OF 5
                </p>

                <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.022em] text-[#111111]">
                  What will you send on Superblock?
                </h2>

                <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-[1.5] text-[#525252]">
                  Pick everything that applies — we'll surface the right
                  channels, templates, and automations on day one.
                </p>
              </div>

              {/* =================================================
                  USE CASE GRID
              ================================================= */}

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {useCases.map((useCase) => {
                  const isSelected = selectedUseCases.includes(
                    useCase.id
                  );

                  return (
                    <button
                      key={useCase.id}
                      type="button"
                      onClick={() => toggleUseCase(useCase.id)}
                      className={`relative flex items-start gap-3 rounded-[8px] border bg-white p-3.5 text-left transition-colors duration-[160ms] ${
                        isSelected
                          ? "shadow-sm"
                          : "hover:bg-[#F5F4F0]"
                      }`}
                      style={{
                        borderColor: isSelected
                          ? useCase.accent
                          : "#E8E5DF",
                        boxShadow: isSelected
                          ? `0 0 0 2px ${useCase.accent}24`
                          : undefined,
                      }}
                    >
                      {/* Icon */}

                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[15px]"
                        style={{
                          backgroundColor: isSelected
                            ? useCase.accent
                            : `${useCase.accent}1A`,
                          color: isSelected
                            ? "#FFFFFF"
                            : useCase.accent,
                        }}
                      >
                        {useCase.icon}
                      </span>

                      {/* Text */}

                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-semibold leading-tight text-[#111111]">
                          {useCase.title}
                        </p>

                        <p className="mt-0.5 text-[11.5px] leading-[1.4] text-[#8E8B85]">
                          {useCase.description}
                        </p>
                      </div>

                      {/* Selected Check */}

                      {isSelected && (
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: useCase.accent,
                          }}
                        >
                          <span className="text-[9px] font-bold leading-none text-white">
                            ✓
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selection Count */}

              <p className="mt-3 text-[11px] text-[#8E8B85]">
                {selectedUseCases.length} of 5 selected
              </p>

              {/* =================================================
                  BOTTOM NAVIGATION
              ================================================= */}

              <OnboardingNavigation
                currentStep={2}
                nextPath="/scale"
                backPath="/onboarding/industry"
                onContinue={handleContinue}
              />
            </div>
          </div>
        </section>

        {/* ==================================================
            RIGHT — LIVE PREVIEW
        ================================================== */}

        <aside className="w-full shrink-0 self-start lg:sticky lg:top-6 lg:w-[340px]">
          <div className="overflow-hidden rounded-[16px] border border-[#E8E5DF] bg-white p-4 shadow-sm">

            {/* Header */}

            <div className="mb-1 flex items-center justify-between">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#8E8B85]">
                LIVE PREVIEW
              </p>

              <div className="inline-flex h-[18px] items-center gap-1 rounded-full bg-[#E8F5EE] px-1.5 text-[10px] font-medium text-[#064E3B]">
                <span className="h-1 w-1 rounded-full bg-[#064E3B]" />
                updates as you answer
              </div>
            </div>

            <p className="mb-3 text-[11px] leading-[1.45] text-[#8E8B85]">
              Your workspace stays calm and neutral — the colours here
              on onboarding are just guideposts. Only the{" "}
              <span className="font-medium text-[#525252]">
                wording
              </span>{" "}
              and which{" "}
              <span className="font-medium text-[#525252]">
                tools unlock
              </span>{" "}
              change per business.
            </p>

            {/* =================================================
                MINI DASHBOARD
            ================================================= */}

            <div className="overflow-hidden rounded-[8px] border border-[#E8E5DF] bg-[#FAFAF8]">

              {/* Browser Bar */}

              <div className="flex h-7 items-center justify-between border-b border-[#E8E5DF] bg-white px-2">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                </div>

                <span className="truncate text-[9px] font-medium text-[#8E8B85]">
                  Superblock for {industryTitle.toLowerCase()}
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              </div>

              {/* Dashboard Body */}

              <div className="flex">

                {/* Sidebar */}

                <div className="flex w-[88px] flex-col gap-[3px] border-r border-[#E8E5DF] bg-white px-1.5 py-2">
                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] bg-[#E8F5EE] px-1.5 text-[8.5px] font-semibold text-[#064E3B]">
                    <span>⌂</span> Home
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>♢</span> Inbox
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◇</span> Send
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>♙</span> Customers
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>⚒</span> Build
                  </div>

                  <div className="flex h-[18px] items-center gap-1.5 rounded-[4px] px-1.5 text-[8.5px] font-medium text-[#8E8B85]">
                    <span>◫</span> Insights
                  </div>
                </div>

                {/* Mini Content */}

                <div className="min-w-0 flex-1 space-y-2 p-2.5">

                  <div>
                    <p className="truncate text-[10.5px] font-semibold leading-tight text-[#111111]">
                      {userName
                        ? `Welcome back, ${userName}`
                        : "Welcome back"}
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-[#8E8B85]">
                      Superblock for {industryTitle.toLowerCase()}
                    </p>
                  </div>

                  {/* Stat Card */}

                  <div className="rounded-[6px] border border-[#E8E5DF] bg-white p-2">
                    <p className="text-[8px] font-medium uppercase tracking-[0.06em] text-[#8E8B85]">
                      CUSTOMERS REACHED THIS WEEK
                    </p>

                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-[14px] font-semibold tabular-nums text-[#111111]">
                        1,284
                      </span>

                      <span className="rounded-[3px] bg-[#E8F5EE] px-1 text-[8.5px] font-medium text-[#064E3B]">
                        +12%
                      </span>
                    </div>

                    {/* Chart */}

                    <div className="mt-2 flex h-[18px] items-end gap-px">
                      {[5, 9, 6, 11, 8, 12, 14, 10, 13, 15].map(
                        (height, index) => (
                          <span
                            key={index}
                            className={`flex-1 rounded-[2px] ${
                              index === 9
                                ? "bg-[#064E3B]"
                                : "bg-[#8E8B85]/30"
                            }`}
                            style={{
                              height: `${(height / 15) * 100}%`,
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Suggested Card */}

                  <div className="flex items-center gap-2 rounded-[6px] border border-[#064E3B]/15 bg-[#E8F5EE] p-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#064E3B] text-[10px] text-white">
                      ✦
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[9.5px] font-semibold leading-tight text-[#111111]">
                        Suggested: Abandoned-cart reco...
                      </p>

                      <p className="mt-0.5 truncate text-[8.5px] text-[#8E8B85]">
                        Tap to scaffold a flow for customers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                ENGAGEMENT TOOLS
            ================================================= */}

            <div className="mt-3 rounded-[6px] border border-[#E8E5DF] bg-[#FAFAF8] p-2.5">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#525252]">
                ✦ Engagement tools unlocked
              </p>

              <ul className="space-y-[3px]">
                <li className="flex items-center gap-1.5 text-[10.5px] text-[#525252]">
                  <span className="text-[9px] font-bold text-[#064E3B]">
                    ✓
                  </span>
                  Automation studio
                </li>

                <li className="flex items-center gap-1.5 text-[10.5px] text-[#525252]">
                  <span className="text-[9px] font-bold text-[#064E3B]">
                    ✓
                  </span>
                  Offers
                </li>

                <li className="flex items-center gap-1.5 text-[10.5px] text-[#525252]">
                  <span className="text-[9px] font-bold text-[#064E3B]">
                    ✓
                  </span>
                  Onboarding sequences
                </li>
              </ul>
            </div>

            {/* =================================================
                PREVIEW SPECS
            ================================================= */}

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
              <PreviewSpec
                label="INDUSTRY"
                value={industryTitle}
              />

              <PreviewSpec
                label="TONE"
                value={`Superblock for ${industryTitle.toLowerCase()}`}
              />

              <PreviewSpec
                label="CONTACTS CALLED"
                value="Customers"
              />

              <PreviewSpec
                label="AUDIENCE AS"
                value="Segment"
              />

              <PreviewSpec
                label="USE CASES"
                value={`${selectedUseCases.length} picked`}
              />

              <PreviewSpec
                label="TEAM"
                value="—"
              />
            </dl>

            {/* Footnote */}

            <p className="mt-3 text-[10.5px] leading-[1.5] text-[#8E8B85]">
              Everything is editable in{" "}
              <span className="font-medium text-[#525252]">
                Settings → Preferences
              </span>{" "}
              any time.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

/* ============================================================
   PREVIEW SPEC
============================================================ */

function PreviewSpec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-[#8E8B85]">
        {label}
      </dt>

      <dd className="mt-0.5 truncate text-[11.5px] font-medium text-[#111111]">
        {value}
      </dd>
    </div>
  );
}
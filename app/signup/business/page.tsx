"use client";


import { useState } from "react";

import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaSms,
  FaRobot,
  FaMicrophone,
  FaLock,
  FaCheck,
  FaBolt,
} from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";

export default function BusinessPage() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  const handleBusinessSubmit = () => {
  if (!companyName.trim()) {
    alert("Please enter your company name.");
    return;
  }

  if (!phone.trim()) {
    alert("Please enter your phone number.");
    return;
  }

  if (!industry) {
    alert("Please select your industry.");
    return;
  }

  // All required details are completed
  window.location.href = "/onboarding";
};

  return (
    <main className="min-h-screen w-full bg-[#FAFAF8] text-[#0A0A0A]">
      <div className="flex min-h-screen">

        {/* ================= LEFT ================= */}

        <section className="flex w-[55%] flex-col px-[52px] py-[52px]">

          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/super block 1.png"
              alt="Superblock"
              className="h-[34px] w-[128px] object-contain"
            />

            <span className="ml-[-35px] text-[24px] font-semibold tracking-[-0.4px] text-[#008A43]">
              Superblock
            </span>
          </div>

           {/* Badge */}
          <div className="mt-14 inline-flex w-fit rounded-full bg-[#E8EFEC] px-[10px] py-[5px]">

            <span className="text-[11px] font-medium leading-[16.5px] tracking-[0.88px] text-[#064E3B]">
              FREE FOREVER · NO CREDIT CARD
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-[26px] max-w-[620px] text-[44px] font-semibold leading-[46px] tracking-[-0.88px] text-[#0A0A0A]">
            Every channel your customers
            <br />
            use,{" "}
            <span className="text-[#064E3B]">
              in one workspace
            </span>
          </h1>

          {/* Description */}
                    <p className="mt-5 max-w-[448px] text-[15px] font-normal leading-[23.25px] text-[#525252]">
          
                      WhatsApp, RCS, Instagram, Email, SMS, AI voice,
                      chatbots, automations and funnels — built for teams
                      that need to ship and scale.
          
                    </p>
          
                    {/* Feature heading */}
                    <p className="mt-10 text-[11px] font-medium leading-[16.5px] tracking-[0.88px] text-[#8E8B85]">
          
                      BUILT INTO YOUR WORKSPACE
          
                    </p>
          
                    {/* =====================================================
                        FEATURE GRID
                    ===================================================== */}
          
                    <div className="mt-3 grid max-w-[620px] grid-cols-2 gap-3">
          
                      {/* WhatsApp */}
                      <FeatureCard
                        icon={
                          <FaWhatsapp className="text-[17px] text-[#16A34A]" />
                        }
                        iconBg="bg-[#E8F8EE]"
                        title="WhatsApp Business API"
                        description="Official Meta integration"
                      />
          
                      {/* RCS */}
                      <FeatureCard
                        icon={
                          <SiGooglemessages className="text-[17px] text-[#FF5B76]" />
                        }
                        iconBg="bg-[#FFE9ED]"
                        title="RCS Business Messaging"
                        description="Verified branded chats"
                      />
          
                      {/* Instagram */}
                      <FeatureCard
                        icon={
                          <FaInstagram className="text-[16px] text-[#FF4D91]" />
                        }
                        iconBg="bg-[#FDE8F0]"
                        title="Instagram DMs & Comments"
                        description="Auto-replies + creator tools"
                      />
          
                      {/* Email */}
                      <FeatureCard
                        icon={
                          <FaEnvelope className="text-[16px] text-[#149BD7]" />
                        }
                        iconBg="bg-[#E5F5FC]"
                        title="Email Marketing"
                        description="Drag-and-drop journeys"
                      />
          
                      {/* SMS */}
                      <FeatureCard
                        icon={
                          <FaSms className="text-[15px] text-[#8957E5]" />
                        }
                        iconBg="bg-[#F0E8FF]"
                        title="SMS Broadcast"
                        description="DLT-compliant routing"
                      />
          
                      {/* AI Voice */}
                      <FeatureCard
                        icon={
                          <FaMicrophone className="text-[15px] text-[#F59E0B]" />
                        }
                        iconBg="bg-[#FFF1DC]"
                        title="AI Voice Agents"
                        description="24/7 inbound + outbound"
                      />
          
                      {/* AI Chatbots */}
                      <FeatureCard
                        icon={
                          <FaRobot className="text-[16px] text-[#16B981]" />
                        }
                        iconBg="bg-[#DDF7EE]"
                        title="AI Chatbots"
                        description="RAG over your data"
                      />
          
                      {/* Funnels */}
                      <FeatureCard
                        icon={
                          <span className="text-[18px] text-[#169BE5]">
                            ▣
                          </span>
                        }
                        iconBg="bg-[#E5F4FC]"
                        title="Funnels & Page Builder"
                        description="Lead capture in minutes"
                      />
          
                      {/* Workflow */}
                      <FeatureCard
                        icon={
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="text-[#176B61]"
                          >
                            <path d="M6 3v6" />
                            <path d="M18 15v6" />
                            <path d="M6 9c0 3 2 6 6 6s6-3 6-6" />
                            <path d="M3 3h6" />
                            <path d="M15 21h6" />
                          </svg>
                        }
                        iconBg="bg-[#E5F0EE]"
                        title="Workflow Automations"
                        description="Connect your entire workflow"
                      />
          
                      {/* Blue Tick */}
                      <FeatureCard
                        icon={
                          <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#38A5E8] text-white">
                            <FaCheck className="text-[8px]" />
                          </span>
                        }
                        iconBg="bg-[#E5F4FC]"
                        title="Free Blue Tick Application"
                        description="Get your business verified"
                      />
          
                    </div>
          
                    {/* Security */}
          
                    
                    <div className="mt-10 border-t border-[#E7E5E0] pt-5">
          
            <div className="flex items-center gap-5">
          
              {/* SOC 2 Type II */}
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D5CF] bg-white">
                  🛡️
                </div>
                <span className="text-[10px] font-medium text-[#8E8B85]">
                  SOC 2 Type II
                </span>
              </div>
          
              {/* ISO 27001 */}
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D5CF] bg-white">
                  <FaLock className="text-[9px] text-[#8E8B85]" />
                </div>
                <span className="text-[10px] font-medium text-[#8E8B85]">
                  ISO 27001
                </span>
              </div>
          
              {/* GDPR */}
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D5CF] bg-white">
                  <FaCheck className="text-[9px] text-[#16A34A]" />
                </div>
                <span className="text-[10px] font-medium text-[#8E8B85]">
                  GDPR ready
                </span>
              </div>
          
              {/* 99.99% uptime */}
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#D8D5CF] bg-white">
                  <FaBolt className="text-[9px] text-[#EAB308]" />
                </div>
                <span className="text-[10px] font-medium text-[#8E8B85]">
                  99.99% uptime
                </span>
              </div>
          
            </div>
          
           
          
                      <p className="mt-4 text-[13px] font-medium text-[#525252]">
                        Trusted by 12,000+ brands
                      </p>
          
                    </div>
          
                    {/* Footer */}
                    <div className="mt-auto pt-8 text-[11px] text-[#8E8B85]">
          
                      © 2026 Superblock
                      {" · "}
                      Privacy
                      {" · "}
                      Terms
          
                    </div>
          
                  </section>


        {/* ================= RIGHT ================= */}
<section className="flex w-[45%] items-center justify-center border-l border-[#E7E5E0] bg-[#FAFAF8] px-10">

          {/* Signup Card */}
          <div className="w-full max-w-[420px] rounded-[12px] border border-[#E7E5E0] bg-white p-8">

            {/* Steps */}
            <div className="flex items-center gap-3">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#064E3B] text-[12px] font-medium text-[#064E3B]">
                ✓
              </div>

              <span className="text-[12px] font-medium text-[#0A0A0A]">
                Account
              </span>

              <div className="h-px flex-1 bg-[#E7E5E0]" />

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E7E5E0] text-[12px] text-[#8E8B85]">
                2
              </div>

              <span className="text-[12px] text-[#8E8B85]">
                Business
              </span>

            </div>


              {/* Heading */}

              <h2 className="mt-8 text-[24px] font-semibold leading-[27.6px] tracking-[-0.36px] text-[#0A0A0A]">
                Tell us about your business
              </h2>

              <p className="mt-[8px] text-[13px] leading-[20px] text-[#8E8B85]">
                This helps us personalize your workspace
              </p>


              {/* Company */}

              <div className="mt-[28px]">

                <label className="text-[13px] font-medium text-[#525252]">
                  Company name{" "}
                  <span className="text-[#EF4444]">*</span>
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Jane Smith Technologies"
                  className="
                    mt-[8px]
                    h-[44px]
                    w-full
                    rounded-[8px]
                    border
                    border-[#E7E5E0]
                    bg-white
                    px-[12px]
                    text-[13px]
                    text-[#0A0A0A]
                    outline-none
                    placeholder:text-[#8E8B85]
                    focus:border-[#064E3B]
                  "
                />

              </div>


              {/* Phone */}

              <div className="mt-[16px]">

                <label className="text-[13px] font-medium text-[#525252]">
                  Phone number{" "}
                  <span className="text-[#EF4444]">*</span>
                </label>

                <div className="mt-[8px] flex gap-[8px]">

                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="
                      h-[44px]
                      w-[78px]
                      rounded-[8px]
                      border
                      border-[#E7E5E0]
                      bg-white
                      px-[8px]
                      text-[13px]
                      text-[#0A0A0A]
                      outline-none
                      focus:border-[#064E3B]
                    "
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                  </select>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="
                      h-[44px]
                      flex-1
                      rounded-[8px]
                      border
                      border-[#E7E5E0]
                      bg-white
                      px-[12px]
                      text-[13px]
                      text-[#0A0A0A]
                      outline-none
                      placeholder:text-[#8E8B85]
                      focus:border-[#064E3B]
                    "
                  />

                </div>

              </div>


              {/* Industry */}

              <div className="mt-[16px]">

                <label className="text-[13px] font-medium text-[#525252]">
                  Industry
                </label>

                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="
                    mt-[8px]
                    h-[44px]
                    w-full
                    rounded-[8px]
                    border
                    border-[#E7E5E0]
                    bg-white
                    px-[12px]
                    text-[13px]
                    text-[#525252]
                    outline-none
                    focus:border-[#064E3B]
                  "
                >
                  <option value="">Select your industry</option>
                  <option value="Technology">Technology</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Other">Other</option>
                </select>

              </div>


              {/* Website + Location */}

              <div className="mt-[16px] grid grid-cols-2 gap-[12px]">

                <div>

                  <label className="text-[13px] font-medium text-[#525252]">
                    Website{" "}
                    <span className="text-[#8E8B85]">
                      (optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="company.com"
                    className="
                      mt-[8px]
                      h-[44px]
                      w-full
                      rounded-[8px]
                      border
                      border-[#E7E5E0]
                      bg-white
                      px-[12px]
                      text-[13px]
                      text-[#0A0A0A]
                      outline-none
                      placeholder:text-[#8E8B85]
                      focus:border-[#064E3B]
                    "
                  />

                </div>

                <div>

                  <label className="text-[13px] font-medium text-[#525252]">
                    Location{" "}
                    <span className="text-[#8E8B85]">
                      (optional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="
                      mt-[8px]
                      h-[44px]
                      w-full
                      rounded-[8px]
                      border
                      border-[#E7E5E0]
                      bg-white
                      px-[12px]
                      text-[13px]
                      text-[#0A0A0A]
                      outline-none
                      placeholder:text-[#8E8B85]
                      focus:border-[#064E3B]
                    "
                  />

                </div>

              </div>


              {/* Buttons */}

              <div className="mt-[22px] flex gap-[12px]">

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="
                    h-[44px]
                    w-[88px]
                    rounded-[8px]
                    border
                    border-[#E7E5E0]
                    bg-white
                    text-[13px]
                    font-medium
                    text-[#0A0A0A]
                    hover:bg-[#F5F4F0]
                  "
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleBusinessSubmit}
                  className="
                    h-[44px]
                    flex-1
                    rounded-[8px]
                    bg-[#064E3B]
                    text-[13px]
                    font-medium
                    text-white
                    hover:bg-[#065F46]
                  "
                >
                  Create account&nbsp;&nbsp; →
                </button>

              </div>


              {/* Encryption */}

              <p className="mt-[20px] flex items-center justify-center gap-[6px] text-[12px] text-[#8E8B85]">
                <FaLock className="text-[10px]" />
                256-bit encryption
              </p>


              {/* Bottom divider */}

              <div className="mt-[24px] border-t border-[#E7E5E0] pt-[20px] text-center">

                <span className="text-[13px] text-[#525252]">
                  Already have an account?
                </span>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  className="ml-[4px] text-[13px] font-medium text-[#064E3B] hover:text-[#065F46]"
                >
                  Sign in
                </button>

              </div>


              {/* Card footer */}

              <div className="mt-[20px] text-center text-[11px] text-[#8E8B85]">
                © 2026 Superblock · Privacy · Terms
              </div>

            </div>

          

        </section>

      </div>
    </main>
  );
}


/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-[60px] items-center gap-[12px] rounded-[8px] border border-[#E7E5E0] bg-white px-[12px]">

      <div
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[6px] ${iconBg}`}
      >
        {icon}
      </div>

      <div className="min-w-0">

        <h3 className="truncate text-[13px] font-medium leading-[19px] text-[#0A0A0A]">
          {title}
        </h3>

        <p className="truncate text-[11px] leading-[16px] text-[#8E8B85]">
          {description}
        </p>

      </div>

    </div>
  );
}


/* ================= SECURITY ITEM ================= */

function SecurityItem({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-[8px]">

      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full border border-[#D4D2CC] bg-white text-[10px]">
        {icon}
      </div>

      <span className="text-[10px] font-medium text-[#8E8B85]">
        {text}
      </span>

    </div>
  );
}
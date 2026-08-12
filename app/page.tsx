"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaSms,
  FaRobot,
  FaMicrophone,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaCheck,
  FaBolt,
} from "react-icons/fa";

import { SiGooglemessages } from "react-icons/si";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
  fullName: "",
  email: "",
  password: "",
});

 const handleSignup = async () => {
  console.log("Signup started");

  const newErrors = {
    fullName: "",
    email: "",
    password: "",
  };

  // Full name validation
  if (!fullName.trim()) {
    newErrors.fullName = "Full name is required.";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!emailRegex.test(email.trim())) {
    newErrors.email = "Enter a valid email address.";
  }

  // Password validation
  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters.";
  }

  setErrors(newErrors);

  // Stop if validation failed
  if (newErrors.fullName || newErrors.email || newErrors.password) {
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    if (error) {
      console.error("Auth error:", error);
      alert(error.message);
      return;
    }

    if (!data.user) {
      alert("Account creation failed.");
      return;
    }

    const { error: profileError } = await supabase
      .from("superblockusers")
      .insert({
        id: data.user.id,
        full_name: fullName.trim(),
        email: email.trim(),
      });

    if (profileError) {
      console.error("Database insert error:", profileError);
      alert(profileError.message);
      return;
    }

    alert("Account created successfully!");

    setFullName("");
    setEmail("");
    setPassword("");

    setErrors({
      fullName: "",
      email: "",
      password: "",
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Something went wrong. Check the browser console.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen w-full bg-[#FAFAF8] text-[#0A0A0A]">

      <div className="flex min-h-screen">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <section className="flex w-[55%] flex-col px-[52px] py-[52px]">

          {/* Logo */}
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

          {/* Main Heading */}
          <h1 className="mt-7 max-w-[620px] text-[44px] font-semibold leading-[46.2px] tracking-[-0.88px] text-[#0A0A0A]">

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


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <section className="flex w-[45%] items-center justify-center border-l border-[#E7E5E0] bg-[#FAFAF8] px-10">

          {/* Signup Card */}
          <div className="w-full max-w-[420px] rounded-[12px] border border-[#E7E5E0] bg-white p-8">

            {/* Steps */}
            <div className="flex items-center gap-3">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#064E3B] text-[12px] font-medium text-[#064E3B]">
                1
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
              Create your account
            </h2>

            <p className="mt-1.5 text-[13.5px] leading-[20.25px] text-[#8E8B85]">
              Get started with Superblock — takes under a minute
            </p>


            {/* Full Name */}
            <div className="mt-7">

              <label className="text-[13px] font-medium leading-[19.5px] text-[#525252]">
                Full name{" "}
                <span className="text-[#EF4444]">*</span>
              </label>

         <input
  type="text"
  placeholder="Jane Smith"
  value={fullName}
  onChange={(e) => {
    setFullName(e.target.value);
    setErrors((prev) => ({ ...prev, fullName: "" }));
  }}
  className={`mt-2 h-10 w-full rounded-[8px] border bg-white px-3 text-[13px] text-[#0A0A0A] outline-none placeholder:text-[#8E8B85] focus:border-[#064E3B] ${
    errors.fullName ? "border-[#EF4444]" : "border-[#E7E5E0]"
  }`}
/>

{errors.fullName && (
  <p className="mt-1 text-[11px] text-[#EF4444]">
    {errors.fullName}
  </p>
)}

            </div>


            {/* Email */}
            <div className="mt-4">

              <label className="text-[13px] font-medium leading-[19.5px] text-[#525252]">
                Work email{" "}
                <span className="text-[#EF4444]">*</span>
              </label>

             <input
  type="email"
  placeholder="jane@company.com"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  }}
  className={`mt-2 h-10 w-full rounded-[8px] border bg-white px-3 text-[13px] text-[#0A0A0A] outline-none placeholder:text-[#8E8B85] focus:border-[#064E3B] ${
    errors.email ? "border-[#EF4444]" : "border-[#E7E5E0]"
  }`}
/>

{errors.email && (
  <p className="mt-1 text-[11px] text-[#EF4444]">
    {errors.email}
  </p>
)}

            </div>


            {/* Password */}
            <div className="mt-4">
              {errors.password && (
  <p className="mt-1 text-[11px] text-[#EF4444]">
    {errors.password}
  </p>
)}


              <label className="text-[13px] font-medium leading-[19.5px] text-[#525252]">
                Password{" "}
                <span className="text-[#EF4444]">*</span>
              </label>

              <div className="relative mt-2">

               <input
  type={showPassword ? "text" : "password"}
  placeholder="Min. 8 characters"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  }}
  className="h-10 w-full rounded-[8px] border border-[#E7E5E0] bg-white px-3 pr-10 text-[13px] text-[#0A0A0A] outline-none placeholder:text-[#8E8B85] focus:border-[#064E3B]"
/>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8B85]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>


            {/* Continue */}
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="mt-6 h-10 w-full rounded-[8px] bg-[#064E3B] text-[13px] font-medium text-[#FAFAFA] transition hover:bg-[#053D30] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Continue   →"}
            </button>


            {/* Encryption */}
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[12px] text-[#8E8B85]">
              <FaLock className="text-[11px]" />
              256-bit encryption
            </p>


            {/* Sign In */}
            <div className="mt-7 border-t border-[#E7E5E0] pt-7 text-center text-[13px] text-[#525252]">

              Already have an account?
              <span
  className="ml-1 cursor-pointer font-medium text-[#064E3B]"
  onClick={() => {
    window.location.href = "/login";
  }}
>
  Sign in
</span>

                  </div>


            {/* Footer */}
            <div className="mt-8 text-center text-[11px] text-[#8E8B85]">

              © 2026 Superblock
              {" · "}
              Privacy
              {" · "}
              Terms

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


/* ============================================================
   FEATURE CARD COMPONENT
============================================================ */

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
    <div className="flex h-[60px] items-center gap-3 rounded-[8px] border border-[#E7E5E0] bg-white px-3">

      <div
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[7px] ${iconBg}`}
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
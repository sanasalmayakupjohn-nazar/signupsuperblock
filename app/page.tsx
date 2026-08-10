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

  const handleSignup = async () => {
    console.log("Signup started");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      console.log("Calling Supabase Auth...");

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      console.log("Supabase Auth response:", data);

      if (error) {
        console.error("Auth error:", error);
        alert(error.message);
        return;
      }

      if (!data.user) {
        alert("Account creation failed.");
        return;
      }

      console.log("User created:", data.user.id);

      console.log("Inserting into superblockusers...");

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

      console.log("Database insert successful");

      alert("Account created successfully!");

      setFullName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong. Check the browser console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <section className="flex w-1/2 flex-col px-16 py-10">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/super block 1.png"
            alt="Superblock logo"
            className="h-8 w-8 object-contain"
          />

          <span className="text-2xl font-bold tracking-tight text-green-700">
            Superblock
          </span>
        </div>

        {/* Badge */}
        <div className="mt-10 inline-flex w-fit rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold tracking-wide text-green-800">
          FREE FOREVER · NO CREDIT CARD
        </div>

        {/* Main Heading */}
        <h1 className="mt-8 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-gray-900">
          Every channel your customers use,
          <span className="block text-green-700">
            in one workspace
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base leading-7 text-gray-600">
          WhatsApp, RCS, Instagram, Email, SMS, AI voice,
          chatbots, automations and funnels — built for teams
          that need to ship and scale.
        </p>

        {/* Feature heading */}
        <p className="mt-10 text-xs font-semibold tracking-[0.15em] text-gray-500">
          BUILT INTO YOUR WORKSPACE
        </p>

        {/* Feature Grid */}
        <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-6">

          {/* WhatsApp */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
              <FaWhatsapp className="text-[22px] text-green-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                WhatsApp Business API
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Official Meta integration
              </p>
            </div>
          </div>

          {/* RCS */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <SiGooglemessages className="text-[21px] text-blue-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                RCS Business Messaging
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Verified branded chats
              </p>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50">
              <FaInstagram className="text-[21px] text-pink-500" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Instagram DMs & Comments
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Auto-replies + creator tools
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <FaEnvelope className="text-[19px] text-blue-500" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Email Marketing
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Drag-and-drop journeys
              </p>
            </div>
          </div>

          {/* SMS */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              <FaSms className="text-[21px] text-purple-500" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                SMS Broadcast
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                DLT-compliant routing
              </p>
            </div>
          </div>

          {/* AI Voice */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
              <FaMicrophone className="text-[18px] text-orange-500" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                AI Voice Agents
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                24/7 inbound + outbound
              </p>
            </div>
          </div>

          {/* AI Chatbots */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
              <FaRobot className="text-[20px] text-indigo-500" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                AI Chatbots
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                RAG over your data
              </p>
            </div>
          </div>

          {/* Funnels */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50">
              <span className="text-xl font-semibold text-gray-600">
                ◇
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Funnels & Page Builder
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Lead capture in minutes
              </p>
            </div>
          </div>

          {/* Workflow */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-emerald-600"
              >
                <path d="M6 3v6" />
                <path d="M18 15v6" />
                <path d="M6 9c0 3 2 6 6 6s6-3 6-6" />
                <path d="M3 3h6" />
                <path d="M15 21h6" />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Workflow Automations
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Connect your entire workflow
              </p>
            </div>
          </div>

          {/* Blue Tick */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <FaCheck className="text-[9px]" />
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Free Blue Tick Application
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Get your business verified
              </p>
            </div>
          </div>

        </div>

        {/* Security */}
        <div className="mt-10 border-t border-gray-100 pt-6">

          <div className="flex items-center gap-5 whitespace-nowrap">

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white">
                <FaLock className="text-[9px] text-gray-500" />
              </div>

              <span className="text-[10px] font-medium text-gray-500">
                ISO 27001
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white">
                <FaCheck className="text-[10px] text-green-600" />
              </div>

              <span className="text-[10px] font-medium text-gray-500">
                GDPR ready
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white">
                <FaBolt className="text-[10px] text-yellow-500" />
              </div>

              <span className="text-[10px] font-medium text-gray-500">
                99.99% uptime
              </span>
            </div>

          </div>

          <p className="mt-4 text-sm font-semibold text-gray-800">
            Trusted by 12,000+ brands
          </p>

        </div>

        {/* Footer */}
        <div className="mt-auto pt-10 text-xs text-gray-400">
          <span>© 2026 Superblock</span>
          {" · "}
          <span>Privacy</span>
          {" · "}
          <span>Terms</span>
        </div>

      </section>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <section className="flex w-1/2 items-center justify-center border-l border-gray-100 bg-gray-50 px-16 py-10">

        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">

          {/* Steps */}
          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-sm font-semibold text-white">
              1
            </div>

            <span className="text-sm font-semibold text-gray-900">
              Account
            </span>

            <div className="h-px flex-1 bg-gray-200" />

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-sm text-gray-500">
              2
            </div>

            <span className="text-sm text-gray-500">
              Business
            </span>

          </div>

          {/* Heading */}
          <h2 className="mt-10 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Get started with Superblock — takes under a minute
          </p>

          {/* Full Name */}
          <div className="mt-8">

            <label className="text-sm font-medium text-gray-800">
              Full name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

          {/* Email */}
          <div className="mt-5">

            <label className="text-sm font-medium text-gray-800">
              Work email{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              placeholder="jane@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

          {/* Password */}
          <div className="mt-5">

            <label className="text-sm font-medium text-gray-800">
              Password{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            className="mt-6 w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Continue →"}
          </button>

          {/* Security */}
          <p className="mt-6 text-center text-xs text-gray-500">
            🔒 256-bit encryption · Your data is secure
          </p>

          {/* Sign In */}
          <div className="mt-8 border-t border-gray-100 pt-7 text-center text-sm text-gray-500">
            Already have an account?

            <span className="ml-1 cursor-pointer font-semibold text-green-700">
              Sign in
            </span>
          </div>

          {/* Footer */}
          <div className="mt-10 text-center text-xs text-gray-400">
            © 2026 Superblock
            {" · "}
            Privacy
            {" · "}
            Terms
          </div>

        </div>

      </section>

    </main>
  );
}
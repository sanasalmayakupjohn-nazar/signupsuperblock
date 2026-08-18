"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Email = {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  snippet: string;
  date: string;
  labels?: {
    id: string;
    name: string;
  }[];
};

export default function EmailPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [replyText, setReplyText] = useState("");
  const [status, setStatus] = useState("");

  // --------------------------------
  // FETCH EMAILS
  // --------------------------------

  const fetchEmails = async () => {
    try {
      setLoading(true);
      setStatus("");

      const response = await fetch("/api/fetch-emails", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch emails");
      }

      setEmails(data.emails || []);
    } catch (error) {
      console.error(error);
      setStatus("Failed to fetch emails. Check your connection or webhook.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // --------------------------------
  // OPEN EMAIL
  // --------------------------------

  const selectEmail = (email: Email) => {
    setSelectedEmail(email);
    setReplyText("");
    setStatus("");
  };

  // --------------------------------
  // EXTRACT EMAIL ADDRESS
  // --------------------------------

  const getEmailAddress = (value: string) => {
    const match = value.match(/<([^>]+)>/);
    if (match) {
      return match[1];
    }
    return value;
  };

  // --------------------------------
  // FORMAT DATE
  // --------------------------------

  const formatDate = (date: string) => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
    } catch {
      return date;
    }
  };

  // --------------------------------
  // CUSTOMIZE REPLY
  // --------------------------------

  const customizeReply = () => {
    if (!selectedEmail) return;

    const sender = selectedEmail.from
      .replace(/<.*?>/, "")
      .replace(/"/g, "")
      .trim();

    setReplyText(
      `Hi ${sender || "there"},\n\nThank you for reaching out.\n\nI have received your message regarding "${selectedEmail.subject}".\n\nI will review the details and get back to you shortly.\n\nBest regards,\nSuperblock Team`
    );

    setStatus("");
  };

  // --------------------------------
  // SEND REPLY
  // --------------------------------

  const sendReply = async () => {
    if (!selectedEmail) {
      setStatus("Please select an email first.");
      return;
    }

    if (!replyText.trim()) {
      setStatus("Please write or customize your reply first.");
      return;
    }

    try {
      setSending(true);
      setStatus("");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: getEmailAddress(selectedEmail.from),
          subject: `Re: ${selectedEmail.subject}`,
          message: replyText,
          threadId: selectedEmail.threadId,
          emailId: selectedEmail.id,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send reply");
      }

      setStatus("Reply sent successfully!");
      setReplyText("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to send reply. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-20 text-[#0A0A0A]">
      {/* =========================
          TOP NAVBAR
      ========================= */}
      <header className="sticky top-0 z-50 border-b border-[#E8E5DF] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/super%20block%201.png"
              alt="Superblock"
              width={26}
              height={26}
              className="h-[26px] w-[26px] object-contain"
            />
            <span className="text-[15.5px] font-semibold text-[#111111]">
              Superblock
            </span>
          </Link>

          <Link
            href="/"
            className="text-[12.5px] font-medium text-[#8E8B85] hover:text-[#111111]"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}
      <section className="px-5 pb-12 pt-10 text-center">
        <h1 className="text-[32px] font-bold tracking-[-0.03em] text-[#111111] sm:text-[38px]">
          Email Assistant
        </h1>
        <p className="mt-2 text-[15.5px] text-[#525252]">
          Fetch, customize and send emails automatically.
        </p>

        <button
          type="button"
          onClick={fetchEmails}
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#111827] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1f2937] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Fetching..." : "↻ Fetch My Emails"}
        </button>
      </section>

      {/* =========================
          INBOX CARD
      ========================= */}
      <div className="mx-auto max-w-5xl px-5">
        <section className="overflow-hidden rounded-[16px] border border-[#E8E5DF] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E8E5DF] p-6 sm:px-8">
            <div>
              <h2 className="text-[20px] font-semibold text-[#111111]">
                My Inbox
              </h2>
              <p className="text-[13px] text-[#8E8B85]">
                {emails.length} emails available
              </p>
            </div>

            <span className="rounded-full bg-[#F5F4F0] px-3.5 py-1 text-[12px] font-medium text-[#525252]">
              {emails.length} emails
            </span>
          </div>

          <div className="divide-y divide-[#E8E5DF]">
            {emails.length === 0 && !loading && (
              <div className="py-16 text-center text-[14px] text-[#8E8B85]">
                No emails found. Click "Fetch My Emails" to load.
              </div>
            )}

            {emails.map((email) => {
              const isSelected = selectedEmail?.id === email.id;

              return (
                <div
                  key={email.id}
                  onClick={() => selectEmail(email)}
                  className={`flex cursor-pointer items-start gap-4 p-5 transition-colors sm:px-8 ${
                    isSelected ? "bg-[#F0FDF4]" : "hover:bg-[#FAFAF8]"
                  }`}
                >
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => selectEmail(email)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer rounded accent-[#064E3B]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <strong className="truncate text-[14px] font-semibold text-[#111111]">
                        {email.from}
                      </strong>
                      <span className="shrink-0 text-[12px] text-[#8E8B85]">
                        {formatDate(email.date)}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-[13.5px] font-medium text-[#0A0A0A]">
                      {email.subject}
                    </p>
                    <p className="mt-0.5 truncate text-[12.5px] text-[#8E8B85]">
                      {email.snippet}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================
            SELECTED EMAIL & REPLY
        ========================= */}
        {selectedEmail && (
          <section className="mt-8 rounded-[16px] border border-[#E8E5DF] bg-white p-6 shadow-sm sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#E8E5DF] pb-5">
              <div>
                <h2 className="text-[20px] font-semibold text-[#111111]">
                  Reply to Email
                </h2>
                <p className="text-[13px] text-[#525252]">
                  Replying to{" "}
                  <strong className="font-semibold text-[#111111]">
                    {getEmailAddress(selectedEmail.from)}
                  </strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedEmail(null);
                  setReplyText("");
                  setStatus("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F4F0] text-[18px] text-[#525252] hover:bg-[#E8E5DF]"
                aria-label="Close reply"
              >
                ×
              </button>
            </div>

            {/* Original Snippet */}
            <div className="mt-5 rounded-[10px] border border-[#E8E5DF] bg-[#FAFAF8] p-4 text-[13px]">
              <p className="font-medium text-[#8E8B85]">Original Email:</p>
              <p className="mt-1 font-semibold text-[#111111]">
                {selectedEmail.subject}
              </p>
              <p className="mt-1 text-[#525252]">{selectedEmail.snippet}</p>
            </div>

            {/* Form */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-[12.5px] font-medium text-[#525252]">
                  To
                </label>
                <input
                  readOnly
                  value={getEmailAddress(selectedEmail.from)}
                  className="mt-1.5 h-10 w-full rounded-[8px] border border-[#E8E5DF] bg-[#FAFAF8] px-3 text-[13.5px] text-[#525252] outline-none"
                />
              </div>

              <div>
                <label className="text-[12.5px] font-medium text-[#525252]">
                  Subject
                </label>
                <input
                  readOnly
                  value={`Re: ${selectedEmail.subject}`}
                  className="mt-1.5 h-10 w-full rounded-[8px] border border-[#E8E5DF] bg-[#FAFAF8] px-3 text-[13.5px] text-[#525252] outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[12.5px] font-medium text-[#525252]">
                    Customize your reply
                  </label>
                  <button
                    type="button"
                    onClick={customizeReply}
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#064E3B] hover:underline"
                  >
                    ✨ Auto Generate Reply
                  </button>
                </div>

                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply here..."
                  rows={6}
                  className="mt-1.5 w-full rounded-[8px] border border-[#E8E5DF] bg-white p-3 text-[13.5px] leading-relaxed text-[#111111] outline-none focus:border-[#064E3B] focus:ring-2 focus:ring-[#E8F5EE]"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEmail(null);
                    setReplyText("");
                    setStatus("");
                  }}
                  className="rounded-[8px] border border-[#E8E5DF] bg-white px-4 py-2 text-[13px] font-medium text-[#525252] hover:bg-[#F5F4F0]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={sendReply}
                  disabled={sending}
                  className="inline-flex items-center gap-1.5 rounded-[8px] bg-[#064E3B] px-5 py-2 text-[13px] font-medium text-white transition hover:bg-[#053D30] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending..." : "✈ Send Reply"}
                </button>
              </div>

              {/* Status Banner */}
              {status && (
                <div
                  className={`mt-4 rounded-[8px] p-3 text-[13px] ${
                    status.includes("successfully")
                      ? "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]"
                      : "border border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
                  }`}
                >
                  {status}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
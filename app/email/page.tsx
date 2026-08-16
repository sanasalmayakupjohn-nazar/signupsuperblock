"use client";

import { useEffect, useState } from "react";

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
      setStatus("Failed to fetch emails.");
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
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
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
      `Hi ${sender},

Thank you for your email.

I have received your message regarding "${selectedEmail.subject}".

I will review the details and get back to you shortly.

Best regards,
Sana`
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
      setStatus("Failed to send reply.");
    } finally {
      setSending(false);
    }
  };

  // --------------------------------
  // UI
  // --------------------------------

  return (
    <main className="page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="hero">

        <h1>Email Assistant</h1>

        <p>
          Fetch, customize and send emails automatically using n8n.
        </p>

        <button
          className="fetchButton"
          onClick={fetchEmails}
          disabled={loading}
        >
          {loading ? "Fetching..." : "↻ Fetch My Emails"}
        </button>

      </div>


      {/* =========================
          INBOX
      ========================= */}

      <section className="inboxCard">

        <div className="inboxHeader">

          <div>
            <h2>My Inbox</h2>

            <p>
              {emails.length} emails fetched
            </p>
          </div>

          <div className="emailCount">
            {emails.length} emails
          </div>

        </div>


        <div className="emailList">

          {emails.length === 0 && !loading && (
            <div className="empty">
              No emails found.
            </div>
          )}


          {emails.map((email) => (

            <div
              key={email.id}
              className={`emailRow ${
                selectedEmail?.id === email.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => selectEmail(email)}
            >

              <div className="checkBoxContainer">

                <input
                  type="checkbox"
                  checked={selectedEmail?.id === email.id}
                  onChange={() => selectEmail(email)}
                  onClick={(e) => e.stopPropagation()}
                />

              </div>


              <div className="emailDetails">

                <div className="emailTop">

                  <strong>
                    {email.from}
                  </strong>

                  <span>
                    {formatDate(email.date)}
                  </span>

                </div>


                <div className="subject">
                  {email.subject}
                </div>


                <div className="snippet">
                  {email.snippet}
                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =========================
          SELECTED EMAIL + REPLY
      ========================= */}

      {selectedEmail && (

        <section className="replyCard">

          {/* REPLY HEADER */}

          <div className="replyHeader">

            <div>

              <h2>
                Reply to Email
              </h2>

              <p>
                Replying to{" "}
                <strong>
                  {getEmailAddress(selectedEmail.from)}
                </strong>
              </p>

            </div>


            <button
              className="closeButton"
              onClick={() => {
                setSelectedEmail(null);
                setReplyText("");
                setStatus("");
              }}
            >
              ×
            </button>

          </div>


          {/* ORIGINAL EMAIL */}

          <div className="originalEmail">

            <div className="originalTitle">
              Original Email
            </div>

            <div className="originalFrom">
              From: {selectedEmail.from}
            </div>

            <div className="originalSubject">
              {selectedEmail.subject}
            </div>

            <div className="originalMessage">
              {selectedEmail.snippet}
            </div>

          </div>


          {/* TO */}

          <label>
            To
          </label>

          <input
            className="input"
            value={getEmailAddress(selectedEmail.from)}
            readOnly
          />


          {/* SUBJECT */}

          <label>
            Subject
          </label>

          <input
            className="input"
            value={`Re: ${selectedEmail.subject}`}
            readOnly
          />


          {/* CUSTOMIZE */}

          <div className="replyLabelRow">

            <label>
              Customize your reply
            </label>

            <button
              className="customizeButton"
              onClick={customizeReply}
            >
              ✨ Customize Reply
            </button>

          </div>


          {/* TEXTAREA */}

          <textarea
            className="textarea"
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />


          {/* ACTION BUTTONS */}

          <div className="actions">

            <button
              className="cancelButton"
              onClick={() => {
                setSelectedEmail(null);
                setReplyText("");
                setStatus("");
              }}
            >
              Cancel
            </button>


            <button
              className="sendButton"
              onClick={sendReply}
              disabled={sending}
            >
              {sending
                ? "Sending..."
                : "✈ Send Reply"}
            </button>

          </div>


          {/* STATUS */}

          {status && (

            <div
              className={`status ${
                status.includes("successfully")
                  ? "success"
                  : "error"
              }`}
            >
              {status}
            </div>

          )}

        </section>

      )}


      {/* =========================
          CSS
      ========================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        .page {
          min-height: 100vh;
          background: #f7f8fc;
          color: #101828;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          padding-bottom: 80px;
        }


        /* HERO */

        .hero {
          text-align: center;
          padding: 38px 20px 62px;
        }


        .hero h1 {
          margin: 0 0 10px;

          font-size: 34px;
          font-weight: 700;

          letter-spacing: -0.7px;
        }


        .hero p {
          margin: 0;

          color: #667085;

          font-size: 17px;
        }


        .fetchButton {
          margin-top: 30px;

          padding: 16px 30px;

          border: none;
          border-radius: 11px;

          background: #111827;
          color: white;

          font-size: 16px;
          font-weight: 650;

          cursor: pointer;

          transition: 0.2s;
        }


        .fetchButton:hover {
          background: #1f2937;
          transform: translateY(-1px);
        }


        .fetchButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }


        /* INBOX */

        .inboxCard {
          width: min(
            1125px,
            calc(100% - 40px)
          );

          margin: auto;

          background: white;

          border: 1px solid #e4e7ec;

          border-radius: 20px;

          box-shadow:
            0 12px 35px
            rgba(16, 24, 40, 0.05);

          overflow: hidden;
        }


        .inboxHeader {
          padding: 38px;

          display: flex;

          justify-content: space-between;

          align-items: center;
        }


        .inboxHeader h2 {
          margin: 0 0 10px;

          font-size: 27px;
          font-weight: 500;
        }


        .inboxHeader p {
          margin: 0;

          color: #667085;

          font-size: 16px;
        }


        .emailCount {
          background: #f2f4f7;

          padding: 11px 17px;

          border-radius: 30px;

          font-size: 14px;

          color: #344054;
        }


        /* EMAIL LIST */

        .emailList {
          border-top: 1px solid #eaecf0;
        }


        .emailRow {
          display: flex;

          padding: 23px 38px;

          border-bottom: 1px solid #eaecf0;

          cursor: pointer;

          transition: background 0.15s;
        }


        .emailRow:hover {
          background: #f9fafb;
        }


        .emailRow.selected {
          background: #f5f7ff;
        }


        .checkBoxContainer {
          width: 45px;

          padding-top: 2px;
        }


        .checkBoxContainer input {
          width: 25px;
          height: 25px;

          cursor: pointer;

          accent-color: #111827;
        }


        .emailDetails {
          flex: 1;

          min-width: 0;
        }


        .emailTop {
          display: flex;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 10px;
        }


        .emailTop strong {
          font-size: 16px;

          color: #101828;
        }


        .emailTop span {
          color: #667085;

          font-size: 14px;

          white-space: nowrap;
        }


        .subject {
          font-size: 18px;

          color: #101828;

          margin-bottom: 8px;
        }


        .snippet {
          color: #667085;

          font-size: 16px;

          line-height: 1.5;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }


        .empty {
          text-align: center;

          padding: 60px;

          color: #667085;
        }


        /* REPLY CARD */

        .replyCard {
          width: min(
            900px,
            calc(100% - 40px)
          );

          margin: 35px auto 0;

          background: white;

          border: 1px solid #e4e7ec;

          border-radius: 20px;

          padding: 32px;

          box-shadow:
            0 12px 35px
            rgba(16, 24, 40, 0.06);
        }


        .replyHeader {
          display: flex;

          justify-content: space-between;

          align-items: flex-start;

          margin-bottom: 25px;
        }


        .replyHeader h2 {
          margin: 0 0 8px;

          font-size: 25px;
        }


        .replyHeader p {
          margin: 0;

          color: #667085;
        }


        .closeButton {
          border: none;

          background: #f2f4f7;

          width: 38px;
          height: 38px;

          border-radius: 50%;

          font-size: 25px;

          cursor: pointer;
        }


        /* ORIGINAL EMAIL */

        .originalEmail {
          padding: 18px;

          background: #f8fafc;

          border: 1px solid #eaecf0;

          border-radius: 12px;

          margin-bottom: 25px;
        }


        .originalTitle {
          color: #667085;

          font-size: 13px;

          margin-bottom: 8px;
        }


        .originalFrom {
          font-size: 14px;

          color: #667085;

          margin-bottom: 8px;
        }


        .originalSubject {
          font-weight: 600;

          margin-bottom: 7px;
        }


        .originalMessage {
          color: #667085;

          line-height: 1.5;
        }


        /* FORM */

        .replyCard label {
          display: block;

          margin: 18px 0 7px;

          font-size: 14px;

          font-weight: 600;

          color: #344054;
        }


        .input,
        .textarea {
          width: 100%;

          border: 1px solid #d0d5dd;

          border-radius: 10px;

          padding: 13px 14px;

          font-size: 15px;

          outline: none;

          font-family: inherit;
        }


        .input {
          background: #f9fafb;
        }


        .textarea {
          min-height: 180px;

          resize: vertical;

          line-height: 1.5;
        }


        .input:focus,
        .textarea:focus {
          border-color: #667085;

          box-shadow:
            0 0 0 3px
            rgba(102, 112, 133, 0.1);
        }


        /* CUSTOMIZE */

        .replyLabelRow {
          display: flex;

          justify-content: space-between;

          align-items: center;
        }


        .replyLabelRow label {
          margin-bottom: 7px;
        }


        .customizeButton {
          border: 1px solid #d0d5dd;

          background: white;

          color: #344054;

          padding: 8px 13px;

          border-radius: 8px;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;
        }


        .customizeButton:hover {
          background: #f9fafb;
        }


        /* ACTIONS */

        .actions {
          display: flex;

          justify-content: flex-end;

          gap: 12px;

          margin-top: 22px;
        }


        .cancelButton,
        .sendButton {
          padding: 13px 22px;

          border-radius: 9px;

          font-size: 15px;

          font-weight: 600;

          cursor: pointer;
        }


        .cancelButton {
          background: white;

          border: 1px solid #d0d5dd;

          color: #344054;
        }


        .sendButton {
          border: none;

          background: #111827;

          color: white;
        }


        .sendButton:hover {
          background: #1f2937;
        }


        .sendButton:disabled {
          opacity: 0.6;

          cursor: not-allowed;
        }


        /* STATUS */

        .status {
          margin-top: 18px;

          padding: 12px 15px;

          border-radius: 9px;

          font-size: 14px;
        }


        .success {
          background: #ecfdf3;

          color: #027a48;
        }


        .error {
          background: #fef3f2;

          color: #b42318;
        }


        /* MOBILE */

        @media (max-width: 700px) {

          .hero h1 {
            font-size: 28px;
          }


          .inboxCard,
          .replyCard {
            width: calc(100% - 20px);
          }


          .inboxHeader {
            padding: 25px 20px;
          }


          .emailRow {
            padding: 20px;
          }


          .snippet {
            white-space: normal;

            display: -webkit-box;

            -webkit-line-clamp: 2;

            -webkit-box-orient: vertical;
          }


          .replyCard {
            padding: 22px;
          }


          .replyLabelRow {
            align-items: flex-end;

            gap: 10px;
          }

        }

      `}</style>

    </main>
  );
}
import { useState } from "react";
import { createPortal } from "react-dom";
import { apiRequest } from "../lib/backendApi";
import FloatingField from "./FloatingField";
import { hasText, isCommureEmail } from "../lib/validation";

const DeleteAccount = () => {
  const [form, setForm] = useState({ email: "", currentPassword: "" });
  const [status, setStatus] = useState({ kind: "idle", message: "" });
  const [showModal, setShowModal] = useState(false);

  const deleteProfile = async () => {
    setShowModal(false);

    setStatus({ kind: "loading", message: "Deleting profile..." });

    try {
      const data = await apiRequest("/users/profile", {
        method: "DELETE",
        body: {
          email: form.email,
          current_password: form.currentPassword,
        },
      });

      setStatus({ kind: "success", message: data?.message || "Profile deleted." });
    } catch (error) {
      setStatus({ kind: "error", message: error.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) {
      setStatus({ kind: "error", message: "Valid commure emails are able to avail this service." });
      return;
    }
    setShowModal(true);
  };

  const statusClasses = {
    idle: "text-gray-300",
    loading: "text-orange-200",
    success: "text-green-300",
    error: "text-red-300",
  };

  const buttonClass = "mt-4 min-h-[48px] w-full cursor-pointer rounded-md bg-red-500 px-4 py-2 font-semibold text-black transition-all duration-300 hover:bg-red-600";
  const buttonInteractiveClass = "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300";
  const canSubmit = isCommureEmail(form.email) && hasText(form.currentPassword);

  return (
    <div className="h-full space-y-4 rounded-xl border border-red-400/30 bg-black/20 p-6 text-left">
      <form onSubmit={handleSubmit} className="grid gap-1 md:grid-cols-2 w-full">
        <FloatingField
          label="Email"
          type="email"
          placeholder="name@commure.com"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <FloatingField
          label="Current Password"
          type="password"
          placeholder="Current password"
          value={form.currentPassword}
          onChange={(event) => setForm((current) => ({ ...current, currentPassword: event.target.value }))}
          required
        />
        <button type="submit" disabled={!canSubmit || status.kind === 'loading'} className={`md:col-span-2 ${buttonClass} ${buttonInteractiveClass} cursor-pointer`}>
          🗑️ Delete Profile
        </button>
        <p className={`md:col-span-2 mt-3 text-sm ${statusClasses[status.kind]}`}>{status.message}</p>
      </form>

      {showModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-red-400/30 bg-[#0c0c0c] p-6 text-left shadow-2xl">
            <h4 className="text-2xl font-semibold text-red-200">Confirm Delete</h4>
            <p className="mt-3 text-sm text-amber-100/80">
              Are you sure you want to delete <span className="font-semibold text-amber-50">{form.email}</span>? This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cursor-pointer rounded-md bg-white/10 px-4 py-2 font-semibold text-amber-100 transition hover:bg-white/15"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProfile}
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 font-semibold text-black transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DeleteAccount;

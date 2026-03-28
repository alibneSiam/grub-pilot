import { useState } from "react";
import { apiRequest } from "../lib/backendApi";
import FloatingField from "./FloatingField";
import { hasText, isCommureEmail, isStrongPassword } from "../lib/validation";

const UpdateUser = () => {
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [status, setStatus] = useState({ kind: "idle", message: "" });

  const submitPasswordUpdate = async (event) => {
    event.preventDefault();
    if (!canSubmit) {
      setStatus({ kind: "error", message: "Valid commure emails are able to avail this service." });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setStatus({ kind: "error", message: "Passwords do not match." });
      return;
    }

    setStatus({ kind: "loading", message: "Updating password..." });

    try {
      const data = await apiRequest("/users/password", {
        method: "PATCH",
        body: {
          email: form.email,
          current_password: form.currentPassword,
          new_password: form.newPassword,
        },
      });

      setStatus({ kind: "success", message: data?.message || "Password updated." });
      setForm((current) => ({ ...current, currentPassword: "", newPassword: "", confirmPassword: "" }));
    } catch (error) {
      setStatus({ kind: "error", message: error.message });
    }
  };

  const statusClasses = {
    idle: "text-gray-300",
    loading: "text-orange-200",
    success: "text-green-300",
    error: "text-red-300",
  };

  const buttonClass = "mt-4 min-h-[48px] w-full cursor-pointer rounded-md bg-orange-400 px-4 py-2 font-semibold text-black transition-all duration-300 hover:bg-orange-500";
  const buttonInteractiveClass = "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300";
  const canSubmit = isCommureEmail(form.email) && hasText(form.currentPassword) && isStrongPassword(form.newPassword) && form.newPassword === form.confirmPassword;

  return (
    <div className="h-full space-y-4 rounded-xl border border-orange-400/30 bg-black/20 p-6 text-left">
      <form onSubmit={submitPasswordUpdate} className="grid flex-1 gap-1 md:grid-cols-2 w-full">
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
          placeholder="Enter Old Password"
          value={form.currentPassword}
          onChange={(event) => setForm((current) => ({ ...current, currentPassword: event.target.value }))}
          required
        />
        <FloatingField
          label="New Password"
          type="password"
          placeholder="Enter New Password"
          value={form.newPassword}
          onChange={(event) => setForm((current) => ({ ...current, newPassword: event.target.value }))}
          required
        />
        <FloatingField
          label="Confirm Password"
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
          required
        />
        <button type="submit" disabled={!canSubmit || status.kind === 'loading'} className={`md:col-span-2 ${buttonClass} ${buttonInteractiveClass} cursor-pointer`}>
          🔒 Update Password
        </button>
        <p className={`md:col-span-2 mt-3 text-sm ${statusClasses[status.kind]}`}>{status.message}</p>
      </form>

    </div>
  );
};

export default UpdateUser;

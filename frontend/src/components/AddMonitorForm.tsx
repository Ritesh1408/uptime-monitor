import { useState } from "react";

interface Props {
  onSubmit: (
    url: string
  ) => Promise<void>;
}

export default function AddMonitorForm({
  onSubmit,
}: Props) {
  const [url, setUrl] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!url.trim()) return;

    try {
      setIsSubmitting(true);

      await onSubmit(url);

      setUrl("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="url"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          placeholder="https://example.com"
          className="
            flex-1
            px-4
            py-3
            border
            border-slate-300
            rounded-lg
            bg-white
            outline-none
            transition
            focus:ring-2
            focus:ring-slate-900
            focus:border-slate-900
          "
        />

        <button
          type="submit"
          disabled={
            !url.trim() || isSubmitting
          }
          className="
            px-6
            py-3
            rounded-lg
            bg-slate-900
            text-white
            font-medium
            transition
            hover:bg-slate-800
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isSubmitting
            ? "Adding..."
            : "Add URL"}
        </button>
      </div>

      <p className="text-sm text-slate-500">
        Enter a valid website URL to
        monitor uptime and response time.
      </p>
    </form>
  );
}
interface Props {
  status: "UP" | "DOWN" | "UNKNOWN";
}

export default function StatusBadge({
  status,
}: Props) {
  if (status === "UP") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-green-100
          px-3
          py-1
          text-sm
          font-semibold
          text-green-700
        "
      >
        <span className="h-2 w-2 rounded-full bg-green-500" />
        UP
      </span>
    );
  }

  if (status === "DOWN") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-red-100
          px-3
          py-1
          text-sm
          font-semibold
          text-red-700
        "
      >
        <span className="h-2 w-2 rounded-full bg-red-500" />
        DOWN
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-slate-100
        px-3
        py-1
        text-sm
        font-semibold
        text-slate-600
      "
    >
      <span className="h-2 w-2 rounded-full bg-slate-400" />
      UNKNOWN
    </span>
  );
}
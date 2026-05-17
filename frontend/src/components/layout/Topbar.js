export default function Topbar() {

  return (
    <div
      className="
        h-[72px]
        border-b
        border-border
        px-8
        flex
        items-center
        justify-between
      "
    >

      <div>

        <h2 className="text-lg font-semibold">
          AI Workspace
        </h2>

        <p className="text-sm text-textSecondary">
          Analyze datasets with natural language
        </p>

      </div>

      {/* AI STATUS */}
      <div
        className="
          bg-surface
          px-4
          py-2
          rounded-full
          flex
          items-center
          gap-2
        "
      >

        <div className="w-2 h-2 rounded-full bg-green-500" />

        <span className="text-sm text-textSecondary">
          AI Ready
        </span>

      </div>

    </div>
  );
}
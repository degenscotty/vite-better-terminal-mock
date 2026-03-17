export function StatusBar() {
  return (
    <div className="h-6 border-t border-[#333] bg-[#0d0d0d] flex items-center justify-between px-3 shrink-0">
      <span className="text-[10px] text-[#666] tracking-wider">BETTER TERMINAL</span>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
        <span className="text-[10px] text-terminal-green">CONNECTED</span>
      </div>
    </div>
  );
}

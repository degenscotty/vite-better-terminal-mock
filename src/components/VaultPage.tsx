import { useState } from "react";

type VaultTab = "OVERVIEW" | "PERFORMANCE" | "PORTFOLIO" | "RISK" | "ACTIVITY" | "TRANSPARENCY";

const vaultTabs: VaultTab[] = ["OVERVIEW", "PERFORMANCE", "PORTFOLIO", "RISK", "ACTIVITY", "TRANSPARENCY"];

export function VaultPage() {
  const [activeTab, setActiveTab] = useState<VaultTab>("OVERVIEW");
  const [depositAmount, setDepositAmount] = useState("100");
  const [withdrawShares, setWithdrawShares] = useState("");

  return (
    <div className="px-8 py-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-[22px] font-bold tracking-wider text-white">BETTER VAULT</h1>
            <span className="text-[10px] px-2 py-0.5 bg-terminal-blue text-white rounded-[2px] font-bold tracking-wider">PAPER</span>
            <span className="text-[10px] text-terminal-red font-medium tracking-wider">ENGINE OFF</span>
            <span className="text-[11px] text-white font-medium tracking-wider">BASE</span>
          </div>
          <div className="text-[11px] text-[#666] tracking-wider">
            POOLED QUANT STRATEGY // NAV-PRICED SHARES // EXECUTION VIA CLOB
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[#555] tracking-wider">NAV / SHARE</div>
          <div className="text-[28px] text-white font-bold tracking-tight">$101.0000</div>
        </div>
      </div>

      {/* Vault tabs */}
      <div className="flex gap-1.5 mb-4">
        {vaultTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-[11px] tracking-wider transition-colors border rounded-[2px] ${
              activeTab === tab
                ? "text-white bg-[#1a1a1a] border-[#555]"
                : "text-[#666] border-[#333] hover:text-white hover:border-[#555]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Updated timestamp + refresh */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] text-[#555] tracking-wider">UPDATED @ 23:48:07</span>
        <button className="btn-bracket text-[11px]">[REFRESH]</button>
      </div>

      {activeTab === "OVERVIEW" && (
        <div>
          {/* Stats cards row */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            <div className="border border-[#333] rounded-[2px] p-4 bg-[#111]">
              <div className="text-[10px] text-[#555] tracking-wider mb-1.5">AUM (TVL)</div>
              <div className="text-[18px] text-white font-bold">$20,411.00</div>
            </div>
            <div className="border border-[#333] rounded-[2px] p-4 bg-[#111]">
              <div className="text-[10px] text-[#555] tracking-wider mb-1.5">CASH (USDC)</div>
              <div className="text-[18px] text-white font-bold">$20,411.00</div>
              <div className="text-[10px] text-[#666] mt-1">100.0% CASH</div>
            </div>
            <div className="border border-[#333] rounded-[2px] p-4 bg-[#111]">
              <div className="text-[10px] text-[#555] tracking-wider mb-1.5">INVESTED</div>
              <div className="text-[18px] text-white font-bold">$0.00</div>
              <div className="text-[10px] text-[#666] mt-1">0.0% INVESTED</div>
            </div>
            <div className="border border-[#333] rounded-[2px] p-4 bg-[#111]">
              <div className="text-[10px] text-[#555] tracking-wider mb-1.5">TOTAL SHARES</div>
              <div className="text-[18px] text-white font-bold">202.089109</div>
            </div>
            <div className="border border-[#333] rounded-[2px] p-4 bg-[#111]">
              <div className="text-[10px] text-[#555] tracking-wider mb-1.5">MODE</div>
              <div className="text-[18px] text-white font-bold">PAPER</div>
              <div className="text-[10px] text-[#666] mt-1">ENGINE DISABLED</div>
            </div>
          </div>

          {/* Two-column layout: Left (position + deposit/withdraw) | Right (strategy + terms + notes) */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-5">
              {/* Your Position */}
              <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] text-[#555] tracking-wider font-bold">YOUR POSITION</h3>
                  <span className="text-[10px] text-[#555] font-mono">0x0a79...9ca5</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-[11px]">
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">SHARES</div>
                    <div className="text-white font-medium">0.000000</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">VALUE (USDC)</div>
                    <div className="text-white font-medium">$0.00</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">NAV / SHARE</div>
                    <div className="text-white font-medium">$101.0000</div>
                    <div className="text-[9px] text-[#555] mt-0.5">AS OF 2026-03-05 22:47:57</div>
                  </div>
                </div>
              </div>

              {/* Deposit */}
              <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] text-[#555] tracking-wider font-bold">DEPOSIT (ACCOUNTING ONLY)</h3>
                  <span className="text-[10px] text-[#666]">PREVIEW = 0.990099 SHARES</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-3 mb-3">
                  <div className="relative">
                    <input
                      className="w-full bg-[#0a0a0a] border border-[#333] rounded-[2px] px-3 py-2.5 text-[12px] text-white font-mono"
                      value="0x0a7905753607a6e112127ab2d92e1c6021ad9ca5"
                      readOnly
                    />
                  </div>
                  <input
                    className="bg-[#0a0a0a] border border-[#333] rounded-[2px] px-3 py-2.5 text-[12px] text-white text-center"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="100"
                  />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <button className="btn-bracket text-[11px]">[CONNECT METAMASK]</button>
                  <span className="text-[10px] text-[#555]">CHAIN 0x1</span>
                </div>
                <button className="w-full py-3 text-[13px] font-bold tracking-wider text-white bg-[#1a1a1a] border border-[#555] rounded-[2px] hover:bg-[#222] transition-colors relative overflow-hidden">
                  <span className="relative z-10">[DEPOSIT USDC]</span>
                  <div className="absolute inset-0 flex items-center justify-center text-[40px] text-[#222] font-bold tracking-[0.3em] opacity-30 select-none">
                    PAPER
                  </div>
                </button>
              </div>

              {/* Withdraw */}
              <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[11px] text-[#555] tracking-wider font-bold">WITHDRAW (ACCOUNTING ONLY)</h3>
                  <span className="text-[10px] text-[#666]">PREVIEW ---</span>
                </div>
                <div className="grid grid-cols-[1fr_120px] gap-3 mb-3">
                  <input
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-[2px] px-3 py-2.5 text-[12px] text-white font-mono"
                    value="0x0a7905753607a6e112127ab2d92e1c6021ad9ca5"
                    readOnly
                  />
                  <input
                    className="bg-[#0a0a0a] border border-[#333] rounded-[2px] px-3 py-2.5 text-[12px] text-white text-center"
                    value={withdrawShares}
                    onChange={(e) => setWithdrawShares(e.target.value)}
                    placeholder="shares"
                  />
                </div>
                <div className="text-[10px] text-[#555] mb-3">
                  NOTE: CASH-ONLY WITHDRAWALS (POSITION LIQUIDATION NOT IMPLEMENTED)
                </div>
                <button className="w-full py-3 text-[13px] font-bold tracking-wider text-white bg-[#1a1a1a] border border-[#555] rounded-[2px] hover:bg-[#222] transition-colors relative overflow-hidden">
                  <span className="relative z-10">[WITHDRAW]</span>
                  <div className="absolute inset-0 flex items-center justify-center text-[40px] text-[#222] font-bold tracking-[0.3em] opacity-30 select-none">
                    PAPER
                  </div>
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {/* Strategy Modules */}
              <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] text-[#555] tracking-wider font-bold">STRATEGY MODULES</h3>
                  <span className="text-[10px] text-[#555]">DISCLOSURE</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[12px] text-white font-bold mb-1">FAST15M (BTC/ETH/SOL/XRP)</div>
                    <div className="text-[11px] text-[#666] leading-relaxed">
                      Driftless lognormal p(UP), shrink-to-half conservatism, fractional Kelly, hard caps.
                    </div>
                  </div>
                  <div>
                    <div className="text-[12px] text-white font-bold mb-1">LONG (BRAID-bounded LLM)</div>
                    <div className="text-[11px] text-[#666] leading-relaxed">
                      Scout-first gating & 3-of-4 consensus; deterministic admissibility + cost-adjusted edge.
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] text-[#555] tracking-wider font-bold">TERMS (PLACEHOLDER)</h3>
                  <span className="text-[10px] text-white font-medium">PAPER</span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-[11px]">
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">MANAGEMENT FEE</div>
                    <div className="text-white">---</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">PERFORMANCE FEE</div>
                    <div className="text-white">---</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">LIQUIDITY</div>
                    <div className="text-white">T+0 (PAPER)</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#555] tracking-wider mb-0.5">CUSTODY</div>
                    <div className="text-white">ACCOUNTING ONLY</div>
                  </div>
                </div>
              </div>

              {/* Investor Notes */}
              <div className="border border-[#333] rounded-[2px] p-5 bg-[#111]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] text-[#555] tracking-wider font-bold">INVESTOR NOTES</h3>
                  <span className="text-[10px] text-terminal-amber font-medium">IMPORTANT</span>
                </div>
                <div className="space-y-2 text-[11px] text-[#666] leading-relaxed">
                  <div>PAPER MODE: NO ON-CHAIN DEPOSITS/WITHDRAWALS.</div>
                  <div>LONG ENGINE USES OPENROUTER KEY FROM ENV ONLY (NEVER STORED IN UI).</div>
                  <div>PERFORMANCE/PORTFOLIO/ACTIVITY ARE POWERED BY PERSISTED NAV SNAPSHOTS + ACTIVITY LOG.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer footer */}
          <div className="text-center text-[10px] text-[#555] mt-8 pb-4">
            PAST PERFORMANCE DOES NOT GUARANTEE FUTURE RESULTS. THIS UI IS ACCOUNTING-ONLY UNTIL ON-CHAIN DEPOSITS/WITHDRAWALS ARE WIRED.
          </div>
        </div>
      )}

      {activeTab !== "OVERVIEW" && (
        <div className="flex flex-col items-center justify-center py-20 text-[#555]">
          <div className="text-[15px] mb-2">{activeTab}</div>
          <div className="text-[11px]">Coming soon</div>
        </div>
      )}
    </div>
  );
}

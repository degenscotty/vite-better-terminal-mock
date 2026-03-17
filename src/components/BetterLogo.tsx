import logoSvg from "@/assets/logo-better.svg";

export function BetterLogo({ height = 32 }: { height?: number }) {
  return (
    <img
      src={logoSvg}
      alt="BETTER"
      style={{ height }}
      className="select-none"
      draggable={false}
    />
  );
}

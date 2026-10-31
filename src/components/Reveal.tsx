interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}

/**
 * A wrapper that fades + lifts its content into view on scroll.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const Tag = as;
  return (
    <Tag
      className={`opacity-0 ${className}`}
      style={{
        animation: `fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both`,
        animationDelay: `${delay}ms`,
      }}
      // Triggered by IntersectionObserver via a small inline init
      ref={(node: HTMLElement | null) => {
        if (!node) return;
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                node.style.opacity = "1";
                io.disconnect();
              }
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
        );
        io.observe(node);
      }}
    >
      {children}
    </Tag>
  );
}

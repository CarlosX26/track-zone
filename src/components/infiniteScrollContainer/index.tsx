import { useInView } from "react-intersection-observer";

interface IInfiniteScrollContainerProps {
  children: React.ReactNode;
  onBottomReached: () => void;
  className?: string;
}

export const InfiniteScrollContainer = ({
  children,
  onBottomReached,
  className,
}: IInfiniteScrollContainerProps) => {
  const { ref } = useInView({
    rootMargin: "100px",
    onChange(inView) {
      if (inView) onBottomReached();
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

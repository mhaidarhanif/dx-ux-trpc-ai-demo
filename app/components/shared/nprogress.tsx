import { useNProgress } from "@tanem/react-nprogress";
import { Spinner } from "@/components/ui/spinner-icon";
import { useIsLoading } from "@/hooks/use-is-loading";

export function IndicatorNProgress() {
  const isLoading = useIsLoading();

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating: isLoading,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      <Spinner className="text-primary" variant="circle" />
    </Container>
  );
}

function Container({
  animationDuration,
  isFinished,
  children,
}: {
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  );
}

function Bar({
  animationDuration,
  progress,
}: {
  animationDuration: number;
  progress: number;
}) {
  return (
    <div
      className="fixed top-0 left-0 z-50 h-0.5 w-full animate-pulse bg-primary"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    />
  );
}

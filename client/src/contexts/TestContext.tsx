import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface TestState {
  part1Answers: Record<number, string>;
  part2Answers: Record<number, boolean>;
  setPart1Answer: (questionId: number, letter: string) => void;
  setPart2Answer: (questionId: number, value: boolean) => void;
  resetTest: () => void;
  isLoaded: boolean;
}

const TestContext = createContext<TestState | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id;
  
  const p1Key = userId ? `hartspraak-${userId}-karaktertest-part1` : null;
  const p2Key = userId ? `hartspraak-${userId}-karaktertest-part2` : null;

  const [part1Answers, setPart1Answers] = useState<Record<number, string>>({});
  const [part2Answers, setPart2Answers] = useState<Record<number, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (!userId) return;
    try {
      if (p1Key) {
        const saved1 = localStorage.getItem(p1Key);
        if (saved1) setPart1Answers(JSON.parse(saved1));
      }
      if (p2Key) {
        const saved2 = localStorage.getItem(p2Key);
        if (saved2) setPart2Answers(JSON.parse(saved2));
      }
    } catch (e) {
      console.error("Failed to load test state:", e);
    }
    setIsLoaded(true);
  }, [userId, p1Key, p2Key]);

  // Save Part 1 to localStorage
  useEffect(() => {
    if (!isLoaded || !p1Key) return;
    localStorage.setItem(p1Key, JSON.stringify(part1Answers));
  }, [part1Answers, isLoaded, p1Key]);

  // Save Part 2 to localStorage
  useEffect(() => {
    if (!isLoaded || !p2Key) return;
    localStorage.setItem(p2Key, JSON.stringify(part2Answers));
  }, [part2Answers, isLoaded, p2Key]);

  const setPart1Answer = (questionId: number, letter: string) => {
    setPart1Answers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const setPart2Answer = (questionId: number, value: boolean) => {
    setPart2Answers((prev) => ({ ...prev, [questionId]: value }));
  };

  const resetTest = () => {
    setPart1Answers({});
    setPart2Answers({});
    if (p1Key) localStorage.removeItem(p1Key);
    if (p2Key) localStorage.removeItem(p2Key);
  };

  return (
    <TestContext.Provider
      value={{ part1Answers, part2Answers, setPart1Answer, setPart2Answer, resetTest, isLoaded }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error("useTest must be used within TestProvider");
  return ctx;
}

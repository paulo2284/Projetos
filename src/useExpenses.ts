import { useEffect, useState } from "react";
import type { Expense } from "./types";

const STORAGE_KEY = "financial-control:expenses";

function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Expense[]) : [];
  } catch {
    return [];
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(expense: Omit<Expense, "id">) {
    setExpenses((prev) => [
      { ...expense, id: crypto.randomUUID() },
      ...prev,
    ]);
  }

  function removeExpense(id: string) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  return { expenses, addExpense, removeExpense };
}

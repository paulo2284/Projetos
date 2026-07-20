import type { Expense } from "../types";

interface ExpenseListProps {
  expenses: Expense[];
  onRemove: (id: string) => void;
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ExpenseList({ expenses, onRemove }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className="empty">Nenhum gasto cadastrado ainda.</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-item">
          <div className="expense-info">
            <span className="expense-description">{expense.description}</span>
            <span className="expense-meta">
              {expense.category} · {new Date(expense.date + "T00:00:00").toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div className="expense-actions">
            <span className="expense-amount">{currency.format(expense.amount)}</span>
            <button
              type="button"
              className="remove-button"
              onClick={() => onRemove(expense.id)}
              aria-label={`Remover ${expense.description}`}
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

import { CATEGORIES, type Expense } from "../types";

interface CategorySummaryProps {
  expenses: Expense[];
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const COLORS: Record<string, string> = {
  "Alimentação": "#f97316",
  "Transporte": "#3b82f6",
  "Moradia": "#a855f7",
  "Lazer": "#22c55e",
  "Saúde": "#ef4444",
  "Educação": "#eab308",
  "Outros": "#64748b",
};

export function CategorySummary({ expenses }: CategorySummaryProps) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const totalsByCategory = CATEGORIES.map((category) => ({
    category,
    total: expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0),
  })).filter((entry) => entry.total > 0);

  if (total === 0) {
    return <p className="empty">Adicione gastos para ver o resumo.</p>;
  }

  return (
    <div className="summary">
      <p className="summary-total">
        Total gasto: <strong>{currency.format(total)}</strong>
      </p>
      <div className="bar-chart">
        {totalsByCategory.map(({ category, total: catTotal }) => {
          const percentage = (catTotal / total) * 100;
          return (
            <div key={category} className="bar-row">
              <span className="bar-label">{category}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[category] ?? "#64748b",
                  }}
                />
              </div>
              <span className="bar-value">
                {currency.format(catTotal)} ({percentage.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from "react";
import type { FormEvent } from "react";
import { CATEGORIES, type Category, type Expense } from "../types";

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, "id">) => void;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [date, setDate] = useState(today());

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const parsedAmount = Number(amount.replace(",", "."));
    if (!description.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    onAdd({ description: description.trim(), amount: parsedAmount, category, date });

    setDescription("");
    setAmount("");
    setCategory(CATEGORIES[0]);
    setDate(today());
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Novo gasto</h2>
      <div className="field">
        <label htmlFor="description">Descrição</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Mercado"
          required
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="amount">Valor (R$)</label>
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Adicionar gasto</button>
    </form>
  );
}

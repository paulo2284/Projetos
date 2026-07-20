import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { CategorySummary } from "./components/CategorySummary";
import { useExpenses } from "./useExpenses";
import "./App.css";

function App() {
  const { expenses, addExpense, removeExpense } = useExpenses();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Controle Financeiro</h1>
        <p>Registre, classifique e visualize seus gastos.</p>
      </header>

      <main className="app-main">
        <section className="panel">
          <ExpenseForm onAdd={addExpense} />
        </section>

        <section className="panel">
          <h2>Resumo por categoria</h2>
          <CategorySummary expenses={expenses} />
        </section>

        <section className="panel panel-list">
          <h2>Gastos registrados</h2>
          <ExpenseList expenses={expenses} onRemove={removeExpense} />
        </section>
      </main>
    </div>
  );
}

export default App;

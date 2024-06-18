import css from "./HomePage.module.css";

export default function Home() {
  return (
    <div className={css.global}>
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
      </div>
    </div>
  );
}

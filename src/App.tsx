import { useRef, useState } from "react";
import styles from "./App.module.css";

type Category = "work" | "personal" | "away";

interface StatusEntry {
  message: string;
  category: Category;
  timestamp: Date;
}

const categoryStyles: Record<Category, string> = {
  work: styles.work,
  personal: styles.personal,
  away: styles.away,
};

function App() {
  const [statusEntries, setStatusEntries] = useState<Array<StatusEntry>>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(event.currentTarget);
    const newStatusEntry: StatusEntry = {
      message: formData.get("message") as string,
      category: formData.get("category") as Category,
      timestamp: new Date(),
    };

    if (!newStatusEntry.message || newStatusEntry.message.trim() === "") {
      alert("Message cannot be empty");
      return;
    }
    setStatusEntries((prevEntries) => [
      newStatusEntry,
      ...prevEntries.slice(0, 4),
    ]);
    formRef.current.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef} className={styles.form}>
        <input
          type="text"
          name="message"
          maxLength={100}
          placeholder="Enter message"
        />
        <select name="category" defaultValue="work">
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="away">Away</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {statusEntries.length === 0 && (
        <p>No status entries yet. Please add an entry!</p>
      )}
      <ul>
        {statusEntries.map((entry, index) => {
          const formattedDate = entry.timestamp.toLocaleString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          return (
            <li key={index}>
              <b>{formattedDate}</b>: {entry.message}{" "}
              <span className={categoryStyles[entry.category]}>
                ({entry.category})
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;

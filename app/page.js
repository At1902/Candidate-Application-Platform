import Filters from "@components/Filters";
import JobList from "@components/JobList";
import style from "@styles/HomePage.module.css";

export default function Home() {
  return (
    <main>
      <h1 className={style.title}>Candidate Application Platform</h1>
      <Filters />
      <JobList />
    </main>
  );
}

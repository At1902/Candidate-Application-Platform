import Filters from "@components/Filters";
import JobList from "@components/JobList";

export default function Home() {
  return (
    <main>
      <h1>Candidate Application Platform</h1>
      <Filters />
      <JobList />
    </main>
  );
}

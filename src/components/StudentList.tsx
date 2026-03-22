import { Link, useOutletContext } from "react-router-dom";
import { Student } from "../types";

interface OutletContext {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

function StudentList() {
  const { students } = useOutletContext<OutletContext>();

  if (students.length === 0) return <p>No students registered yet.</p>;

  return (
    <ul>
      {students.map((s) => (
        <li key={s.id}>
          <Link to={`/student/${s.id}`}>{s.name}</Link> — {s.course}
        </li>
      ))}
    </ul>
  );
}

export default StudentList;
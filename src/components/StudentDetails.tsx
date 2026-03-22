import { useParams, useOutletContext } from "react-router-dom";
import { Student } from "../types";

interface OutletContext {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const { students } = useOutletContext<OutletContext>();

  const student = students.find(s => s.id === Number(id));
  if (!student) return <h2>Student not found</h2>;

  return (
    <div>
      <h1>{student.name}</h1>
      <p>Email: {student.email}</p>
      <p>Course: {student.course}</p>
    </div>
  );
}

export default StudentDetails;
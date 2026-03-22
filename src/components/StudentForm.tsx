import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Student } from "../types";

interface OutletContext {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

function StudentForm() {
  const { students, setStudents } = useOutletContext<OutletContext>();
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = !form.email ? "Email required" : (!isValidEmail(form.email) ? "Invalid email" : "");
    if (!form.course) newErrors.course = "Course is required";
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newStudent: Student = { id: students.length + 1, ...form };
      setStudents([...students, newStudent]);
      alert("Student added successfully!");
      navigate("/home");
    }
  };

  const isValid = Object.keys(validateForm()).length === 0;

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <h2>Register Student</h2>

      <div>
        <label>Name:</label><br />
        <input type="text" name="name" value={form.name} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.name}</div>
      </div>

      <div>
        <label>Email:</label><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.email}</div>
      </div>

      <div>
        <label>Course:</label><br />
        <input type="text" name="course" value={form.course} onChange={handleChange} />
        <div style={{ color: "red" }}>{errors.course}</div>
      </div>

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
}

export default StudentForm;
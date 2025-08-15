import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Input } from "../src/components/ui/input";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, username, email, password } = form;

    if (!name || !username || !email || !password) {
      toast.error("Please fill all the fields");
      return false;
    }

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (username.length < 5) {
      toast.error("Username must be at least 5 characters");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch(`http://localhost:4000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Validation failed");
        return;
      }

      if (res.status === 409) {
        toast.error("A user with this username or email already exists");
        return;
      }

      toast.success("User registered successfully!");
      setForm({ name: "", username: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toaster />
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <Input
          name="name"
          placeholder="Name"
          type="text"
          value={form.name}
          maxLength={50}
          onChange={handleChange}
        />
        <Input
          name="username"
          placeholder="Username"
          type="text"
          value={form.username}
          maxLength={50}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          maxLength={50}
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

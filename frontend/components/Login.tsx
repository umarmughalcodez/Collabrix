import React, { useEffect, useState } from "react";
import { Input } from "../src/components/ui/input";
import { Button } from "../src/components/ui/button";
import toast from "react-hot-toast";

interface FormEvent {
  identifier: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<FormEvent>({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.identifier || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Failed to Login");
      }
      const data = await res.json();
      console.log("DATA", data);

      localStorage.setItem("token", data.token);

      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div>
      {/* <h1>Login</h1> */}
      <form onSubmit={handleSubmit}>
        <Input
          name="identifier"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Enter Username or Email"
          maxLength={50}
        />
        <br />
        <Input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
          maxLength={50}
          type="password"
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;

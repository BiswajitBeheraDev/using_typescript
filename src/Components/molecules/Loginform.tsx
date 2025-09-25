"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password); // ✅ parent callback
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <div>
        <Label className="block text-sm font-medium mb-1">Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">Password</Label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit" variant={"blue"} >
        Login
      </Button>
    </form>
  );
};

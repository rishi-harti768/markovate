"use client";
import { authLogin, authRegister } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthLogin = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await authLogin(credentials);

    // check empty fields
    if (res.status == 400 && res.responseText == "EMPTY_FIELDS") {
      setError("Error: Empty fields");
      return;
    }

    // email format
    if (res.status == 400 && res.responseText == "INVALID_EMAIL_FORMAT") {
      setError("Error: Invalid email format");
      return;
    }

    // password strength
    if (res.status == 400 && res.responseText == "WEAK_PASSWORD") {
      setError("Error: Weak password");
      return;
    }

    // check if acc exists
    if (
      res.status == 400 &&
      (res.responseText == "EMAIL_NOT_FOUND" ||
        res.responseText == "INCORRECT_PASSWORD")
    ) {
      setError("Error: Incorrect email or password");
      return;
    }

    // other errors
    if (res.status == 500) {
      setError("Error: Internal server error");
      return;
    }
    if (res.status == 200 && res.responseText == "AUTHED") {
      setError("");
      router.replace("/");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </>
  );
};

export default AuthLogin;
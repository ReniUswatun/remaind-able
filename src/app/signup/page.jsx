"use client";
import { register } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [user, setUser] = useState("Rizal Dwi Anggoro");
  const [email, setEmail] = useState("rizaldwianggoro@email.com");
  const [password, setPassword] = useState("rizal123");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();

  const signup = () => {
    console.log({ user, email, password });
    // validasi input
    if (!user && !email && !password && !emailRegex.test(email)) {
      alert("Please ensure all fields are filled");
    }

    const result = register(user, email, password);
    if (result.success) {
      router.replace("/login");
    } else {
      console.log(result.message);
    }
  };

  // const signup = () => {
  //   const data = localStorage.getItem("accounts");
  //   let account = [];
  //   if (data) {
  //     account = JSON.parse(data);
  //     if (!user && !email && !password && !emailRegex.test(email)) {
  //       alert("Please ensure all fields are filled");
  //       return;
  //     }
  //     // linear search
  //     let isExists = false;
  //     for (let a = 0; a < account.length; a++) {
  //       if (account[a].email == email) {
  //         isExists = true;
  //         break;
  //       }
  //     }
  //     if (isExists) {
  //       console.log("Gagal register, email sudah terdaftar!");
  //       alert("Failed to register, email is already registered");
  //       return;
  //     }
  //   }
  //   // Membuat Account Baru
  //   const newAccount = {
  //     user,
  //     email,
  //     password,
  //   };
  //   // menambahkan user baru ke array
  //   account.push(newAccount);

  //   // simpan array ke local storage
  //   localStorage.setItem("accounts", JSON.stringify(account));
  //   let key = `${email}`;
  //   localStorage.setItem(key, null);
  //   router.push("/login");
  // };

  return (
    <>
      <div className="bg-gradient-to-r from-violet-600 via-indigo-800 to-violet-600 flex items-center justify-center h-screen">
        <div className="w-full max-w-sm my-auto mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-200 dark:border-indigo-700">
          <div className="space-y-6">
            <h5 className="text-xl font-medium text-indigo-1000 dark:text-indigo">
              Sign Up to our platform
            </h5>
            <div>
              <label
                htmlFor="user"
                className="block mb-2 text-sm font-medium text-indigo-1000 dark:text-indigo"
              >
                Your name
              </label>
              <div className="grid grid-cols-12 items-center gap-1">
                <img src="./person.png" alt="" className="max-w-full h-auto" />
                <input
                  value={user}
                  onChange={(u) => setUser(u.target.value)}
                  type="name"
                  name="name"
                  id="name"
                  className="col-span-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray"
                  placeholder="user name"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-indigo-1000 dark:text-indigo"
              >
                Your email
              </label>
              <div className="grid grid-cols-12 items-center gap-1">
                <img src="./email.png" alt="" className="max-w-full h-auto" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="col-span-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-indigo-1000 dark:text-indigo"
              >
                Your password
              </label>
              <div className="grid grid-cols-12 items-center gap-1">
                <img
                  src="./password.png"
                  alt=""
                  className="max-w-full h-auto"
                />
                <input
                  value={password}
                  onChange={(p) => setPassword(p.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="col-span-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-indigo-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray"
                  required
                />
              </div>
            </div>
            <button
              onClick={signup}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Register
            </button>
            <div className="text-sm font-medium text-blue-700 dark:text-blue-600">
              <Link
                href="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Back To Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

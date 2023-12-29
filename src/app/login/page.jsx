"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = () => {
    if (!email && !password) {
      alert("Please ensure all fields are filled");
      console.log("data belum dimasukkan");
      return;
    }
    const data = localStorage.getItem("accounts");
    let account = [];
    if (data) {
      account = JSON.parse(data);

      //linear search
      for (let a = 0; a < account.length; a++) {
        if (account[a].email == email) {
          if (account[a].password == password) {
            console.log("Success");
            //disini logic kalo sukses
            router.push("/dashboard");
          } else {
            alert("Wrong password");
            console.log("Password salah");
          }
          return;
        }
      }
      alert("email not found");
      console.log("Email tidak ditemukan!");
    } else {
      console.log("Data tidak ada");
      return;
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-violet-600 via-indigo-800 to-violet-600 flex items-center justify-center h-screen">
        <div className="w-full max-w-sm my-auto mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-indigo-200 dark:border-indigo-700">
          <form className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-indigo-1000 dark:text-indigo">
              Login to our platform
            </h5>
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
              onClick={login}
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-blue-700 dark:text-blue-600">
              Not registered?{" "}
              <Link
                href="/signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";

const CORRECT_PASSWORD = "20820804";
const STORAGE_KEY = "aayusa_auth";

function PasswordGate({ children }) {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (authenticated) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-10 backdrop-blur-md shadow-2xl"
      >
        <div className="text-5xl">&#128274;</div>
        <h2 className="text-2xl font-semibold text-slate-100 tracking-wide">
          Enter Password
        </h2>
        <p className="text-sm text-slate-400 -mt-4">
          This site is password protected
        </p>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          autoFocus
          className="w-64 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-center text-lg text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
        />
        {error && (
          <p className="text-sm text-red-400 -mt-2">Incorrect password</p>
        )}
        <p className="text-sm text-amber-400/90 font-medium bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2 text-center -mt-2">
          Hint: First time we meet and exchange name and talk
        </p>
        <button
          type="submit"
          className="w-64 rounded-lg bg-cyan-600 px-4 py-3 text-lg font-medium text-white transition hover:bg-cyan-500 active:scale-95"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}

export default PasswordGate;

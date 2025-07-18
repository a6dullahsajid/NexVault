import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import vaultLogo from "../assets/vault2.svg";
import show from "../assets/hide.svg";
import hide from "../assets/unhide.svg";
import showPass from "../assets/hidePass.svg";
import hidePass from "../assets/showPass.svg";

export default function Manager() {
  const [showPassword, setShowPassword] = useState("hide");
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [visiblePassId, setVisiblePassId] = useState(null);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  function handlePasswordShow() {
    setShowPassword((prev) => (prev === "hide" ? "unhide" : "hide"));
  }

  function savePassword(e) {
    e.preventDefault();
    console.log(form.id);
    if (form.id) {
      toast("Password edited!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPasswordArray((prev) => {
        const indexOfExisting = prev.findIndex((item) => item.id === form.id);
        prev[indexOfExisting] = form;
        return prev;
      });
    } else {
      toast("Password saved!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setPasswordArray((prev) => {
        const updated = [...prev, { ...form, id: uuidv4() }];
        localStorage.setItem("passwords", JSON.stringify(updated));
        return updated;
      });
    }
    setForm({ site: "", username: "", password: "" });
  }

  function deletePassword(id) {
    toast("Password deleted!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setPasswordArray((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("passwords", JSON.stringify(updated));
      return updated;
    });
    setForm({ site: "", username: "", password: "" });
  }

  function copyText(text) {
    toast("Copied to clipboard!");
    navigator.clipboard.writeText(text);
  }

  function editPassword(passData) {
    setForm(passData);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleVisiblePass(id) {
    setVisiblePassId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full opacity-20 blur-[100px]"></div>
      </div>

      <div className="manager max-w-4xl  p-3 md:p-6 mycontainer">
        <h1 className="text-3xl mt-5 md:mt-0 md:text-4xl flex items-center justify-center font-bold text-center">
          <img src={vaultLogo} alt="logo" />
          Nex<span className="text-green-400">Vault</span>
        </h1>
        <p className="text-lime-500 text-sm md:text-lg text-center">Your own Password Manager</p>
        <form>
          <div className="flex flex-col p-8 md:p-4 text-black gap-3 md:gap-8 items-center">
            <input
              value={form.site}
              name="site"
              onChange={handleChange}
              placeholder="Enter Website URL"
              className="bg-white rounded-full border-2 text-blue-800 border-pink-300 w-full p-2 md:p-4 py-1"
              type="text"
              id="site"
            />
            <div className="flex w-full justify-between gap-1 md:gap-6">
              <input
                value={form.username}
                name="username"
                onChange={handleChange}
                placeholder="Enter User Name"
                className="bg-white rounded-full border-2 text-blue-800 border-pink-300 w-full p-2 md:p-4 py-1"
                type="text"
                id="username"
              />
              <div className="relative w-full">
                <input
                  value={form.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="bg-white rounded-full border-2 text-blue-800 border-pink-300 w-full p-2 md:p-4 py-1"
                  type={showPassword === "hide" ? "password" : "text"}
                  id="password"
                />
                <span className="absolute right-1.5 md:right-3 top-3 md:top-5">
                  <img
                    className="cursor-pointer"
                    src={showPassword === "hide" ? show : hide}
                    alt="Toggle visibility"
                    onClick={handlePasswordShow}
                  />
                </span>
              </div>
            </div>
            <button
              onClick={savePassword}
              className="flex justify-center cursor-pointer items-center border-1 border-pink-800 bg-pink-400 rounded-full w-fit md:gap-1 px-2 md:p-4 md:py-1 hover:bg-pink-500"
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
                className="w-6"
              ></lord-icon>
              Save
            </button>
          </div>
        </form>
        <div className="passwords">
          <h2 className="md:text-2xl text-lime-600 mt-8 md:mt-0 py-1 md:py-4 font-bold">
            Your Passwords
          </h2>
          {passwordArray.length === 0 ? (
            <div className="text-center text-blue-600">
              No Passwords to show
            </div>
          ) : (
            <table className="table-auto w-full rounded-lg bg-pink-200 text-white overflow-hidden">
              <thead className="rounded-xl bg-pink-600">
                <tr>
                  <th className="py-1 text-xs md:text-sm md:py-3">Site</th>
                  <th className="py-1 text-xs md:text-sm md:py-3">Username</th>
                  <th className="py-1 text-xs md:text-sm md:py-3">Password</th>
                  <th className="py-1 text-xs md:text-sm md:py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((password) => {
                  return (
                    <tr key={password.site}>
                      <td className="text-center text-xs md:text-sm text-blue-900">
                        <a
                          href={password.site}
                          target="_blank"
                          className="flex justify-center gap-1 items-center"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/yxwmgaav.json"
                            trigger="in"
                            delay="1500"
                            // state="in-ternd-flat"
                            className="w-4"
                          ></lord-icon>
                          {password.site}
                        </a>
                      </td>
                      <td className="text-center text-xs md:text-sm text-blue-600">
                        <div className="flex justify-center items-center md:gap-2">
                          {password.username}
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            className="w-4 cursor-pointer"
                            onClick={() => copyText(password.username)}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="text-center text-xs md:text-sm text-blue-600">
                        <div className="flex justify-center items-center md:gap-2">
                          {visiblePassId === password.id
                            ? password.password
                            : "*".repeat(password.password.length)}
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            className="w-4 cursor-pointer"
                            onClick={() => copyText(password.password)}
                          ></lord-icon>
                          <img
                            src={
                              visiblePassId === password.id
                                ? hidePass
                                : showPass
                            }
                            className="w-2 cursor-pointer"
                            alt="Toggle password"
                            onClick={() => toggleVisiblePass(password.id)}
                          />
                        </div>
                      </td>
                      <td className="text-center text-red-600">
                        <div className="flex justify-center items-center gap-1 md:gap-3">
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            className="w-4 cursor-pointer"
                            onClick={() => editPassword(password)}
                          ></lord-icon>
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            className="w-4 cursor-pointer"
                            onClick={() => deletePassword(password.id)}
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

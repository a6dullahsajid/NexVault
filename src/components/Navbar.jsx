import vaultLogo from "../assets/vault1.svg";

export default function Navbar() {
  return (
    <nav className="text-white">
      <div className="mycontainer flex justify-between items-center px-2 md:px-10 md:py-5 py-3 md:h-16 h-14">
        <div className="logo flex items-center font-bold md:text-3xl text-2xl"><img src={vaultLogo} alt="" />Nex<span className="text-green-400">Vault</span></div>
        {/* <ul>
          <li className="flex text-sm md:text-l gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              Usage
            </a>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

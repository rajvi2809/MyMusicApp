import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="group flex flex-row justify-start items-center my-3 text-sm font-medium text-cyan-600 hover:text-cyan-200 transition-colors duration-200"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2 text-cyan-600 group-hover:text-cyan-200 transition-colors duration-200" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="md:flex hidden flex-col w-[190px] py-5 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="h-14 w-32 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile Menu Button */}
      <div className="absolute md:hidden block top-6 right-3 z-20">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 h-screen w-60 bg-[#1b1b2f] backdrop-blur-sm z-10 p-6 md:hidden smooth-transition transform transition-transform duration-300 ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="h-14 w-32 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;

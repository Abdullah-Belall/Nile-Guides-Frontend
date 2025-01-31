"use client";
import logoo from "@/public/logoo.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "@/app/ui/nav-links.module.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/authContext";
import { IoIosArrowForward } from "react-icons/io";
import { CLIENT_COLLECTOR_REQ, LOGOUT_REQ } from "@/app/_utils/requests/client-requests-hub";

export default function NavBar({ children }: { children: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathname_ = pathname.split("/");
  pathname_.splice(0, 1);
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [userData, setUserData] = useState<any>();
  const authContext = useContext<any>(AuthContext);
  const { state, dispatch } = authContext;
  const allowedRoles = ["admin", "superadmin", "owner"];
  const baseLinks = [
    {
      name: "Home",
      to: "",
    },
    {
      name: "Profile",
      to: "profile",
    },
  ];
  const [Links, setLinks] = useState<any>(baseLinks);
  const [dashboardMenu, setDashboardMenu] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.scrollY > 80 ? true : false);
    };
  }, []);
  useEffect(() => {
    if (!state.role) {
      setUserData(undefined);
      return;
    }
    setUserData(state);
  }, [state]);

  useEffect(() => {
    const RolesLinks = () => {
      const role = state.role;
      if (!role) {
        setLinks(baseLinks);
      }
      if (role === "client") {
        setLinks([
          ...baseLinks,
          {
            name: "Orders",
            to: "orders",
          },
        ]);
      }
      if (role === "worker") {
        setLinks([
          ...baseLinks,
          {
            name: "Services",
            to: "services",
          },
          {
            name: "Posts",
            to: "posts",
          },
        ]);
      }
    };
    RolesLinks();
  }, [state.role]);
  const handleNavLinks = (goTo: string) => {
    router.push(`/${goTo}`);
    setMenu(false);
    setDashboardMenu(false);
  };
  const LogoutFunc = async () => {
    const response = await CLIENT_COLLECTOR_REQ(LOGOUT_REQ);
    if (response.done) {
      window.location.reload();
      dispatch({
        type: "LOGOUT",
      });
    }
  };
  const handleProfileMenuClicks = (goTo: string) => {
    router.push(goTo);
  };
  const handleCloseClick = () => {
    setTimeout(() => {
      setOpenProfileMenu(!openProfileMenu);
    }, 50);
  };
  return (
    <>
      <nav
        className={`${
          isScrolled ? "shadow-xl" : ""
        } flex fixed left-0 top-0 w-full bg-anotherLight justify-between pl-3 sm:pl-7 items-center z-50`}
        style={{ height: "88px" }}
      >
        <div
          className={
            styles.mobileIcon +
            " absolute flex flex-col justify-between gap-[5px] w-[25px] h-[21px] z-[2] xl:hidden cursor-pointer"
          }
          onClick={() => setMenu(!menu)}
        >
          <div
            className={`${
              menu ? styles.activeMenuOne : ""
            } w-[25px] h-[3px] sm:h-[4px] bg-maindark rounded-[6px] duration-300`}
          ></div>
          <div
            className={
              menu
                ? "duration-300"
                : styles.two + " w-[15px] h-[3px] sm:h-[4px] bg-maindark rounded-[6px] duration-300"
            }
          ></div>
          <div
            className={`${
              menu ? styles.activeMenuThree : styles.three
            } w-[8px] h-[3px] sm:h-[4px] bg-maindark rounded-[6px] duration-300`}
          ></div>
        </div>
        <div
          className={`w-[110px] py-5 min-h-[25px] sm:min-h-[34px] sm:w-[160px] min-h-[30px] relative`}
        >
          <Image
            src={logoo}
            onClick={() => router.push("/")}
            alt="logo"
            fill
            className="xl:ml-0 ml-7 cursor-pointer"
          />
        </div>
        <div
          className={`${
            menu ? "flex" : "hidden"
          } xl:py-5 xl:flex fixed w-full bg-anotherLight left-0 top-[88px] flex-col xl:w-fit xl:bg-transparent xl:static xl:flex-row`}
        >
          {Links.map((e: any, i: number) => {
            return (
              <button
                onClick={() => handleNavLinks(e.to)}
                key={i + "xq"}
                className={`${
                  pathname_.includes(e.to) ? "text-maindark bg-seclightblur" : "text-seclight"
                } text-start font-bold hover:text-maindark duration-200 border-b border-maindark hover:bg-seclightblur xl:hover:bg-transparent xl:bg-transparent xl:text-lg px-6 py-4 xl:p-3 xl:border-0`}
              >
                {e.name}
              </button>
            );
          })}
          <button
            onClick={() => setDashboardMenu(!dashboardMenu)}
            onBlur={() => setDashboardMenu(false)}
            className={`${!allowedRoles.includes(userData?.role) && "hidden"} ${
              pathname_.includes("dashboard") ? "text-maindark bg-seclightblur" : "text-seclight"
            } relative flex gap-2 items-center justify-between text-start font-bold hover:text-maindark duration-200 border-b border-maindark hover:bg-seclightblur xl:hover:bg-transparent xl:bg-transparent xl:text-lg px-6 py-4 xl:p-3 xl:border-0`}
          >
            Dashboard{" "}
            <IoIosArrowForward className={`${dashboardMenu && "rotate-90"} duration-200`} />
            <ul
              className={`absolute shadow-md bg-seclight text-base text-mainlight flex flex-col w-[150px] min-h-fit rounded-xl border border-seclight xl:top-[65px] top-[60px] left-[10px] ${
                dashboardMenu ? "" : "hidden"
              }`}
            >
              <div
                onClick={() => handleNavLinks("dashboard/users")}
                className="p-2 border-b cursor-pointer hover:bg-secdark duration-200 rounded-t-xl"
              >
                Users
              </div>
              <li
                className={
                  "p-2 border-b cursor-pointer hover:bg-secdark duration-200 w-full flex justify-between items-center relative " +
                  styles.tickets
                }
              >
                Tickets <IoIosArrowForward />
                <ul className="absolute shadow-md right-0 top-0 translate-x-[calc(100%+2px)] bg-seclight text-mainlight hidden flex-col w-[150px] min-h-fit rounded-xl border border-seclight">
                  <div
                    onClick={() => handleNavLinks("dashboard/clients-tickets")}
                    className="p-2 border-b cursor-pointer hover:bg-secdark duration-200 rounded-t-xl"
                  >
                    Clients tickets
                  </div>
                  <div
                    onClick={() => handleNavLinks("dashboard/workers-tickets")}
                    className="p-2 cursor-pointer hover:bg-secdark duration-200 rounded-b-xl"
                  >
                    Wokers tickets
                  </div>
                </ul>
              </li>
              <div
                onClick={() => handleNavLinks("dashboard/posts?status=pending")}
                className="p-2 border-b cursor-pointer hover:bg-secdark duration-200"
              >
                Posts
              </div>
              <div
                onClick={() => handleNavLinks("dashboard/orders")}
                className="p-2 cursor-pointer hover:bg-secdark duration-200 rounded-b-xl"
              >
                Orders
              </div>
            </ul>
          </button>
        </div>
        <button
          onClick={() => (state?.role ? handleCloseClick() : "")}
          onBlur={() => (state?.role ? setOpenProfileMenu(false) : "")}
          className={`${state?.role && "hover:bg-seclightblur"} ${
            openProfileMenu && "bg-seclightblur"
          } relative px-3 sm:px-7 py-5 duration-200`}
        >
          {children}
          <ul
            className={`${
              !openProfileMenu && "hidden"
            } absolute top-[88px] right-0 w-full rounded-lg bg-[#daceb7] flex flex-col shadow-md`}
          >
            <li
              onClick={() => handleProfileMenuClicks("/profile")}
              className="cursor-pointer w-full text-center py-2 border-b rounded-t-lg hover:bg-anotherLight text-sm truncate px-3"
            >
              {state?.gender !== "female" ? "Mr/" : "Mrs/"}{" "}
              {state?.first_name + " " + state?.last_name}
            </li>
            <li
              onClick={() => handleProfileMenuClicks(`/profile/tickets/${state?.role}`)}
              className={`${
                !["client", "worker"].includes(state?.role) && "hidden"
              } cursor-pointer w-full text-center py-2 border-b hover:bg-anotherLight text-sm`}
            >
              Tickets
            </li>
            <li
              onClick={() => handleProfileMenuClicks("/make-ticket")}
              className={`${
                !["client", "worker"].includes(state?.role) && "hidden"
              } cursor-pointer w-full text-center py-2 border-b hover:bg-anotherLight text-sm`}
            >
              Report
            </li>
            <li
              onClick={LogoutFunc}
              className="cursor-pointer w-full text-center py-2 rounded-b-lg hover:bg-anotherLight text-sm"
            >
              Log out
            </li>
          </ul>
        </button>
      </nav>
      <div
        className={`xl:hidden fixed left-0 top-0 w-full duration-300 h-screen bg-black ${
          menu ? "opacity-40" : "opacity-0 hidden"
        } z-[49]`}
        onClick={() => setMenu(false)}
      ></div>
    </>
  );
}

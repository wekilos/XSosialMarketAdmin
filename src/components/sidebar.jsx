import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { closeSidebar } from "./utils";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import { logout } from "../utils/index";

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const path = useLocation();
  const [openModal, setOpenModal] = React.useState(false);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userData"));
  return (
    <Sheet
      className="!p-[0px] !bg-[#F7F8FA]"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 100,
        padding: 0,
        height: "100dvh",
        width: "300px",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        // gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <div
        onClick={() => closeSidebar()}
        className="h-[100px] font-[600] text-[22px] border-b-[1px] border-[#E9EBF0] flex items-center justify-start pl-7"
      >
        Tanat Admin
      </div>

      <div className="min-h-[100px]  h-[100px] w-[80%] mx-auto border-b-[1px] border-[#E9EBF0] gap-4 font-[600] text-[22px]   flex items-center justify-center">
        <div className="min-w-[50px] min-h-[50px] rounded-[100%] bg-[#E9EBF0]">
          {/* <img
            className="w-[50px] h-[50px] rounded-[100%] bg-[#E9EBF0]"
            src=""
            alt=""
          /> */}
        </div>
        <div className="flex gap-1 flex-wrap w-full">
          <div className="text-[14px] w-full font-[500]">
            {user?.admin?.name}
          </div>
          <div className="text-[12px] font-[600] text-[#B8BFCC]">
            {user?.admin?.is_super ? "Super" : ""} Admin
          </div>
        </div>
      </div>

      <Box
        className="p-3"
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <h1 className="text-[14px] my-[10px] font-[600] text-[#98A2B2] px-3 ">
          Dolandyryş paneli
        </h1>
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              selected={path.pathname == "/home"}
              onClick={() => history.push({ pathname: "/home" })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM11.25 18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V15C12.75 14.5858 12.4142 14.25 12 14.25C11.5858 14.25 11.25 14.5858 11.25 15V18Z"
                  fill="#3B82F6"
                />
              </svg>

              <ListItemContent>
                <div className="text-[14px] font-[500] text-black">
                  Baş sahypa
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              selected={path.pathname.includes("/category")}
              onClick={() => history.push({ pathname: "/category" })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6.5C2 4.37868 2 3.31802 2.65901 2.65901C3.31802 2 4.37868 2 6.5 2C8.62132 2 9.68198 2 10.341 2.65901C11 3.31802 11 4.37868 11 6.5C11 8.62132 11 9.68198 10.341 10.341C9.68198 11 8.62132 11 6.5 11C4.37868 11 3.31802 11 2.65901 10.341C2 9.68198 2 8.62132 2 6.5Z"
                  fill="#3B82F6"
                />
                <path
                  d="M13 17.5C13 15.3787 13 14.318 13.659 13.659C14.318 13 15.3787 13 17.5 13C19.6213 13 20.682 13 21.341 13.659C22 14.318 22 15.3787 22 17.5C22 19.6213 22 20.682 21.341 21.341C20.682 22 19.6213 22 17.5 22C15.3787 22 14.318 22 13.659 21.341C13 20.682 13 19.6213 13 17.5Z"
                  fill="#3B82F6"
                />
                <path
                  d="M2 17.5C2 15.3787 2 14.318 2.65901 13.659C3.31802 13 4.37868 13 6.5 13C8.62132 13 9.68198 13 10.341 13.659C11 14.318 11 15.3787 11 17.5C11 19.6213 11 20.682 10.341 21.341C9.68198 22 8.62132 22 6.5 22C4.37868 22 3.31802 22 2.65901 21.341C2 20.682 2 19.6213 2 17.5Z"
                  fill="#3B82F6"
                />
                <path
                  d="M13 6.5C13 4.37868 13 3.31802 13.659 2.65901C14.318 2 15.3787 2 17.5 2C19.6213 2 20.682 2 21.341 2.65901C22 3.31802 22 4.37868 22 6.5C22 8.62132 22 9.68198 21.341 10.341C20.682 11 19.6213 11 17.5 11C15.3787 11 14.318 11 13.659 10.341C13 9.68198 13 8.62132 13 6.5Z"
                  fill="#3B82F6"
                />
              </svg>

              <ListItemContent>
                <div className="text-[14px] font-[500] text-black">
                  Kategoriýa
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem
            selected={
              path.pathname.includes("/brands") ||
              path.pathname.includes("/clothebrands")
            }
            nested
          >
            <Toggler
              defaultExpanded={
                path.pathname.includes("/brands") ||
                path.pathname.includes("/clothebrands")
              }
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  selected={
                    path.pathname.includes("/brands") ||
                    path.pathname.includes("/clothebrands")
                      ? true
                      : false
                  }
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.12264 12.816C2.41018 13.8186 3.18295 14.5914 4.72848 16.1369L6.55812 17.9665C9.24711 20.6555 10.5916 22 12.2623 22C13.933 22 15.2775 20.6555 17.9665 17.9665C20.6555 15.2775 22 13.933 22 12.2623C22 10.5916 20.6555 9.24711 17.9665 6.55812L16.1369 4.72848C14.5914 3.18295 13.8186 2.41018 12.816 2.12264C11.8134 1.83509 10.7485 2.08083 8.61875 2.57231L7.39057 2.85574C5.5988 3.26922 4.70292 3.47597 4.08944 4.08944C3.47597 4.70292 3.26922 5.59881 2.85574 7.39057L2.57231 8.61875C2.08083 10.7485 1.83509 11.8134 2.12264 12.816ZM10.1234 7.27098C10.911 8.05856 10.911 9.33549 10.1234 10.1231C9.33581 10.9107 8.05888 10.9107 7.27129 10.1231C6.48371 9.33549 6.48371 8.05856 7.27129 7.27098C8.05888 6.48339 9.33581 6.48339 10.1234 7.27098ZM19.0511 12.0511L12.0721 19.0303C11.7792 19.3232 11.3043 19.3232 11.0114 19.0303C10.7185 18.7375 10.7185 18.2626 11.0114 17.9697L17.9904 10.9904C18.2833 10.6975 18.7582 10.6975 19.0511 10.9904C19.344 11.2833 19.344 11.7582 19.0511 12.0511Z"
                      fill="#3B82F6"
                    />
                  </svg>

                  <ListItemContent>
                    <div className="text-[14px]  h-[38px] items-center flex font-[500] text-black">
                      Markalar
                    </div>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List
                className="border-l-[2px] !ml-3 !mt-1 border-[#E9EBF0]"
                sx={{ gap: 0.5 }}
              >
                <ListItem className="!pl-5" sx={{}}>
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/brands" })}
                    className={`h-[40px] hover:text-blue ${
                      path.pathname.includes("/brands") ? " !text-blue" : ""
                    }`}
                  >
                    Markalar
                  </ListItemButton>
                </ListItem>
                <ListItem className="!pl-5">
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/clothebrands" })}
                    className={`h-[40px] hover:text-blue ${
                      path.pathname.includes("/clothebrands")
                        ? " !text-blue"
                        : ""
                    }`}
                  >
                    Geýim markalar
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem
            selected={
              path.pathname.includes("/users") ||
              path.pathname.includes("/businessusers")
            }
            nested
          >
            <Toggler
              defaultExpanded={
                path.pathname.includes("/users") ||
                path.pathname.includes("/businessusers")
              }
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  selected={
                    path.pathname.includes("/users") ||
                    path.pathname.includes("/businessusers")
                      ? true
                      : false
                  }
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="9.00098" cy="6" r="4" fill="#3B82F6" />
                    <ellipse
                      cx="9.00098"
                      cy="17.001"
                      rx="7"
                      ry="4"
                      fill="#3B82F6"
                    />
                    <path
                      d="M20.9996 17.0005C20.9996 18.6573 18.9641 20.0004 16.4788 20.0004C17.211 19.2001 17.7145 18.1955 17.7145 17.0018C17.7145 15.8068 17.2098 14.8013 16.4762 14.0005C18.9615 14.0005 20.9996 15.3436 20.9996 17.0005Z"
                      fill="#3B82F6"
                    />
                    <path
                      d="M17.9996 6.00073C17.9996 7.65759 16.6565 9.00073 14.9996 9.00073C14.6383 9.00073 14.292 8.93687 13.9712 8.81981C14.4443 7.98772 14.7145 7.02522 14.7145 5.99962C14.7145 4.97477 14.4447 4.01294 13.9722 3.18127C14.2927 3.06446 14.6387 3.00073 14.9996 3.00073C16.6565 3.00073 17.9996 4.34388 17.9996 6.00073Z"
                      fill="#3B82F6"
                    />
                  </svg>

                  <ListItemContent>
                    <div className="text-[14px]  h-[38px] items-center flex font-[500] text-black">
                      Ulanyjylar
                    </div>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List
                className="border-l-[2px] !ml-3 !mt-1 border-[#E9EBF0]"
                sx={{ gap: 0.5 }}
              >
                <ListItem className="!pl-5" sx={{}}>
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/users" })}
                    className={`h-[40px] hover:text-blue ${
                      path.pathname.includes("/users") ? " !text-blue" : ""
                    }`}
                  >
                    Standard hasaplar
                  </ListItemButton>
                </ListItem>
                <ListItem className="!pl-5">
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/businessusers" })}
                    className={`h-[40px] hover:text-blue ${
                      path.pathname.includes("/businessusers")
                        ? " !text-blue"
                        : ""
                    }`}
                  >
                    Biznes hasaplar
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              onClick={() => history.push({ pathname: "/products" })}
              selected={path.pathname.includes("/products")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5777 4.43152L15.5777 3.38197C13.8221 2.46066 12.9443 2 12 2C11.0557 2 10.1779 2.46066 8.42229 3.38197L8.10057 3.5508L17.0236 8.64967L21.0403 6.64132C20.3941 5.90949 19.3515 5.36234 17.5777 4.43152Z"
                  fill="#3B82F6"
                />
                <path
                  d="M21.7484 7.96434L17.75 9.96353V13C17.75 13.4142 17.4142 13.75 17 13.75C16.5858 13.75 16.25 13.4142 16.25 13V10.7135L12.75 12.4635V21.904C13.4679 21.7252 14.2848 21.2965 15.5777 20.618L17.5777 19.5685C19.7294 18.4393 20.8052 17.8748 21.4026 16.8603C22 15.8458 22 14.5833 22 12.0585V11.9415C22 10.0489 22 8.86557 21.7484 7.96434Z"
                  fill="#3B82F6"
                />
                <path
                  d="M11.25 21.904V12.4635L2.25164 7.96434C2 8.86557 2 10.0489 2 11.9415V12.0585C2 14.5833 2 15.8458 2.5974 16.8603C3.19479 17.8748 4.27062 18.4393 6.42228 19.5685L8.42229 20.618C9.71524 21.2965 10.5321 21.7252 11.25 21.904Z"
                  fill="#3B82F6"
                />
                <path
                  d="M2.95969 6.64132L12 11.1615L15.4112 9.4559L6.52456 4.37785L6.42229 4.43152C4.64855 5.36234 3.6059 5.90949 2.95969 6.64132Z"
                  fill="#3B82F6"
                />
              </svg>

              <ListItemContent>
                <div className="text-[14px] font-[500] text-black">
                  Harytlar
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem
            selected={
              path?.pathname.includes("/colors") ||
              path?.pathname.includes("/sizes")
            }
            nested
          >
            <Toggler
              defaultExpanded={
                path?.pathname.includes("/colors") ||
                path?.pathname.includes("/sizes")
              }
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  selected={
                    path?.pathname.includes("/colors") ||
                    path?.pathname.includes("/sizes")
                      ? true
                      : false
                  }
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.8994 22C20.1086 22 21.8994 20.2091 21.8994 18C21.8994 15.7909 20.1086 14 17.8994 14H17.6797L11.878 19.798C11.636 20.0399 11.5 20.3391 11.5 20.6813C11.5 21.3936 12.0774 22 12.7897 22H17.8994Z"
                      fill="#3B82F6"
                    />
                    <path
                      d="M13.2839 4.95882L12.2291 6.01357C11.7633 6.48107 11.5012 7.11381 11.5 7.7738L11.5 16.0119C11.5 17.0666 11.5 17.5939 11.8135 17.7199C12.1271 17.8459 12.492 17.4653 13.2219 16.704L19.0599 10.6144C20.5819 9.02691 20.5554 6.51391 19.0003 4.95883C17.4218 3.38026 14.8624 3.38026 13.2839 4.95882Z"
                      fill="#3B82F6"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 6V18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6ZM6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19Z"
                      fill="#3B82F6"
                    />
                  </svg>

                  <ListItemContent>
                    <div className="text-[14px]  h-[38px] items-center flex font-[500] text-black">
                      Haryt goşmaçalary
                    </div>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List
                className="border-l-[2px] !ml-3 !mt-1 border-[#E9EBF0]"
                sx={{ gap: 0.5 }}
              >
                <ListItem className="!pl-5" sx={{}}>
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/colors" })}
                    className={`h-[40px] hover:text-blue ${
                      path?.pathname.includes("/colors") ? " !text-blue" : ""
                    }`}
                  >
                    Reňkler
                  </ListItemButton>
                </ListItem>
                <ListItem className="!pl-5">
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/sizes" })}
                    className={`h-[40px] hover:text-blue ${
                      path?.pathname.includes("/sizes") ? " !text-blue" : ""
                    }`}
                  >
                    Razmerler
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem
            selected={
              path?.pathname.includes("/reports") ||
              path?.pathname.includes("/postreports") ||
              path?.pathname.includes("/accountreports")
            }
            nested
          >
            <Toggler
              defaultExpanded={
                path?.pathname.includes("/reports") ||
                path?.pathname.includes("/postreports") ||
                path?.pathname.includes("/accountreports")
              }
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  selected={
                    path?.pathname.includes("/reports") ||
                    path?.pathname.includes("/postreports") ||
                    path?.pathname.includes("/accountreports")
                      ? true
                      : false
                  }
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                      fill="#3B82F6"
                    />
                  </svg>

                  <ListItemContent>
                    <div className="text-[14px]  h-[38px] items-center flex font-[500] text-black">
                      Reportlar
                    </div>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List
                className="border-l-[2px] !ml-3 !mt-1 border-[#E9EBF0]"
                sx={{ gap: 0.5 }}
              >
                <ListItem className="!pl-5" sx={{}}>
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/reports" })}
                    className={`h-[40px] hover:text-blue ${
                      path?.pathname.includes("/reports") ? " !text-blue" : ""
                    }`}
                  >
                    Report görnüşleri
                  </ListItemButton>
                </ListItem>
                <ListItem className="!pl-5">
                  <ListItemButton
                    onClick={() => history.push({ pathname: "/postreports" })}
                    className={`h-[40px] hover:text-blue ${
                      path?.pathname.includes("/postreports")
                        ? " !text-blue"
                        : ""
                    }`}
                  >
                    Post reportlar
                  </ListItemButton>
                </ListItem>
                <ListItem className="!pl-5">
                  <ListItemButton
                    onClick={() =>
                      history.push({ pathname: "/accountreports" })
                    }
                    className={`h-[40px] hover:text-blue ${
                      path?.pathname.includes("/accountreports")
                        ? " !text-blue"
                        : ""
                    }`}
                  >
                    Hasap reportlar
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              onClick={() => history.push({ pathname: "/locations" })}
              selected={path?.pathname?.includes("/locations")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C7.58172 2 4 6.00258 4 10.5C4 14.9622 6.55332 19.8124 10.5371 21.6744C11.4657 22.1085 12.5343 22.1085 13.4629 21.6744C17.4467 19.8124 20 14.9622 20 10.5C20 6.00258 16.4183 2 12 2ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                  fill="#3B82F6"
                />
              </svg>

              <ListItemContent>
                <div className="text-[14px] font-[500] text-black">
                  Ýerleşýän ýeri
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem className="h-[50px] hover:bg-[#3B82F6]">
            <ListItemButton
              onClick={() => history.push({ pathname: "/admins" })}
              selected={path?.pathname == "/admins"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z"
                  fill="#3B82F6"
                />
              </svg>

              <ListItemContent>
                <div className="text-[14px] font-[500] text-black">
                  Adminler
                </div>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <div className="border-t-[1px] border-[#E9EBF0] my-2"></div>
        <List
          className=""
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={path?.pathname == "/settings"}
              onClick={() => history.push({ pathname: "/settings" })}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4277 2C11.3139 2 10.2995 2.6007 8.27081 3.80211L7.58466 4.20846C5.55594 5.40987 4.54158 6.01057 3.98466 7C3.42773 7.98943 3.42773 9.19084 3.42773 11.5937V12.4063C3.42773 14.8092 3.42773 16.0106 3.98466 17C4.54158 17.9894 5.55594 18.5901 7.58466 19.7915L8.27081 20.1979C10.2995 21.3993 11.3139 22 12.4277 22C13.5416 22 14.5559 21.3993 16.5847 20.1979L17.2708 19.7915C19.2995 18.5901 20.3139 17.9894 20.8708 17C21.4277 16.0106 21.4277 14.8092 21.4277 12.4063V11.5937C21.4277 9.19084 21.4277 7.98943 20.8708 7C20.3139 6.01057 19.2995 5.40987 17.2708 4.20846L16.5847 3.80211C14.5559 2.6007 13.5416 2 12.4277 2ZM8.67773 12C8.67773 9.92893 10.3567 8.25 12.4277 8.25C14.4988 8.25 16.1777 9.92893 16.1777 12C16.1777 14.0711 14.4988 15.75 12.4277 15.75C10.3567 15.75 8.67773 14.0711 8.67773 12Z"
                  fill="#3B82F6"
                />
              </svg>
              <div className="text-[14px] leading-[40px] h-[40px]  font-[500] text-black">
                Sazlamalar
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setOpenModal(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z"
                  fill="#FF4D4D"
                />
                <path
                  d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z"
                  fill="#FF4D4D"
                />
              </svg>
              <div className="text-[14px] leading-[40px] h-[40px] font-[500] !text-[#FF4D4D]">
                Çykmak
              </div>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div className="flex w-[350px] border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
            <h1 className="text-[20px] font-[500]">Ulgamdan çykmak</h1>
            <button onClick={() => setOpenModal(false)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 1L1.00006 14.9999M0.999999 0.999943L14.9999 14.9999"
                  stroke="#B1B1B1"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div>
            <h1 className="text-[16px] text-center my-10 font-[400]">
              Ulgamdan çykmak isleýärsiňizmi?
            </h1>

            <div className="flex gap-[29px] justify-center">
              <button
                onClick={() => setOpenModal(false)}
                className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
              >
                Goýbolsun et
              </button>
              <button
                onClick={() => {
                  logout();
                  history.push({ pathname: "/login" });
                }}
                className="text-[14px] font-[500] text-white hover:bg-[#fd6060] bg-[#FF4D4D] rounded-[8px] px-6 py-3"
              >
                Ulgamdan çyk
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>
      <Divider />
    </Sheet>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import { IconButton, Input } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import PageLoading from "../../components/PageLoading";
import { validateEmail } from "../../utils/validator";

const ReportPostsUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [post, setPost] = useState({
    is_active: 1,
  });
  const [stockOpen, setStockOpen] = useState(false);
  const [oldPost, setOldPost] = useState({
    is_active: 1,
  });
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);
  const [valitMail, setValitMail] = useState(true);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getData();
    getBrands();
    getCategories();
    getDataofUsers();
  }, [id]);

  const getData = () => {
    axiosInstance
      .get("/posts/" + id)
      .then((data) => {
        console.log(data.data?.data);
        setPost(data.data.data);
        setOldPost(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataofUsers = () => {
    axiosInstance
      .post("/post/reports/" + id + "/users")
      .then((data) => {
        console.log("reported users", data.data?.data);
        setReports(data.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrands = () => {
    axiosInstance
      .post("/brands", {
        limit: 999,
        page: 1,
        search_query: "",
      })
      .then((data) => {
        // console.log(data.data);
        setBrands(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    axiosInstance
      .post("/categories", {
        limit: 999,
        page: 1,
        search_query: "",
      })
      .then((data) => {
        // console.log(data.data);
        setCategories(data.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    history.push({ pathname: "/postreports" });
  };

  const blockUser = () => {
    axiosInstance
      .post("users/block/" + id, {
        reason: reason,
      })
      .then((data) => {
        // console.log(data.data);
        setReason("");
        setPost({ ...post, has_blocked: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReports = () => {};

  return loading ? (
    <PageLoading />
  ) : (
    <div className="w-full">
      {/* alert */}
      {warning && (
        <Alert
          className="!fixed z-50 top-5 right-5"
          key={"title"}
          sx={{ alignItems: "flex-start" }}
          startDecorator={<WarningIcon />}
          variant="soft"
          color={"warning"}
          endDecorator={
            <IconButton
              onClick={() => setWarning(false)}
              variant="soft"
              color={"warning"}
            >
              <CloseRoundedIcon />
            </IconButton>
          }
        >
          <div>
            <div>{"Maglumat nädogry!"}</div>
            <Typography level="body-sm" color={"warning"}>
              Maglumatlary doly we dogry girizmeli!
            </Typography>
          </div>
        </Alert>
      )}
      {/* header section */}
      <div className="w-full pb-[30px] flex justify-between items-center">
        <h1 className="text-[30px] font-[700]">Harytlar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Harytlar maglumaty</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Harydyň suratlary</h1>
            <div className="flex gap-5 mt-5 justify-start  ">
              <input
                // onChange={(e) => fileHandler(e.target.files[0])}
                ref={fileRef}
                className="hidden"
                type="file"
              />
              {post?.media?.map((item, i) => {
                return (
                  <div key={"original_url" + i} className="relative">
                    <div
                      // onClick={() => setNewFile(true)}
                      className="absolute cursor-pointer -top-4 -right-4"
                    >
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_0_3500)">
                          <circle cx="18" cy="18" r="12" fill="white" />
                        </g>
                        <path
                          d="M21 15L15 21M15 15L21 21"
                          stroke="#B1B1B1"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <defs>
                          <filter
                            id="filter0_d_0_3500"
                            x="0.7"
                            y="0.7"
                            width="34.6"
                            height="34.6"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feMorphology
                              radius="1"
                              operator="dilate"
                              in="SourceAlpha"
                              result="effect1_dropShadow_0_3500"
                            />
                            <feOffset />
                            <feGaussianBlur stdDeviation="2.15" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_0_3500"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_0_3500"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>

                    <div className="  w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px]">
                      <img
                        className="w-[75px] h-[75px] object-cover rounded-[6px]"
                        src={item?.original_url}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Harydyň ady</h1>
            <input
              value={post?.caption}
              // onChange={(e) => {
              //   setPost({ ...post, caption: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%] h-[75px] items-end flex justify-between ">
            <div className="h-[48px] border-l-[1px] border-[#E9EBF0] w-[1px]"></div>
            <div className="flex w-full justify-evenly">
              <div>
                <h1 className="leading-[28px] text-center text-[16px] font-[500]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.7213 14.1831L7.18561 13.5941L6.7213 14.1831ZM9 4.12544L8.45963 4.64554C8.60102 4.79243 8.79612 4.87544 9 4.87544C9.20388 4.87544 9.39898 4.79243 9.54037 4.64554L9 4.12544ZM11.2787 14.1831L11.743 14.7721L11.2787 14.1831ZM7.18561 13.5941C6.03774 12.6892 4.81553 11.8294 3.84391 10.7353C2.898 9.67016 2.25 8.44232 2.25 6.85279H0.75C0.75 8.91045 1.60928 10.478 2.72234 11.7313C3.80969 12.9557 5.19812 13.9374 6.25699 14.7721L7.18561 13.5941ZM2.25 6.85279C2.25 5.30978 3.12161 4.02555 4.29622 3.48864C5.42355 2.97333 6.96414 3.09178 8.45963 4.64554L9.54037 3.60534C7.66098 1.65272 5.45157 1.31124 3.67262 2.1244C1.94095 2.91595 0.75 4.74858 0.75 6.85279H2.25ZM6.25699 14.7721C6.63944 15.0736 7.06194 15.4049 7.49302 15.6568C7.92386 15.9085 8.4346 16.125 9 16.125V14.625C8.8154 14.625 8.57614 14.5524 8.24981 14.3617C7.92371 14.1711 7.58186 13.9065 7.18561 13.5941L6.25699 14.7721ZM11.743 14.7721C12.8019 13.9374 14.1903 12.9557 15.2777 11.7313C16.3907 10.478 17.25 8.91045 17.25 6.85279H15.75C15.75 8.44232 15.102 9.67016 14.1561 10.7353C13.1845 11.8294 11.9623 12.6892 10.8144 13.5941L11.743 14.7721ZM17.25 6.85279C17.25 4.74858 16.059 2.91595 14.3274 2.1244C12.5484 1.31124 10.339 1.65272 8.45963 3.60534L9.54037 4.64554C11.0359 3.09178 12.5765 2.97333 13.7038 3.48864C14.8784 4.02555 15.75 5.30978 15.75 6.85279H17.25ZM10.8144 13.5941C10.4181 13.9065 10.0763 14.1711 9.75019 14.3617C9.42386 14.5524 9.1846 14.625 9 14.625V16.125C9.5654 16.125 10.0761 15.9085 10.507 15.6568C10.9381 15.4049 11.3606 15.0736 11.743 14.7721L10.8144 13.5941Z"
                      fill="#0075FF"
                    />
                  </svg>
                </h1>
                <p className="leading-[28px] text-center text-[16px] font-[500]">
                  {post?.favorites_count}
                </p>
              </div>
              <div>
                <h1 className="leading-[28px] text-center text-[16px] font-[500]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_0_1004)">
                      <path
                        d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 10.1998 1.78171 11.3337 2.2826 12.3394C2.4157 12.6066 2.46001 12.912 2.38284 13.2005L1.93613 14.87C1.74222 15.5947 2.40526 16.2578 3.13001 16.0639L4.79954 15.6172C5.08795 15.54 5.39341 15.5843 5.66065 15.7174C6.66627 16.2183 7.80024 16.5 9 16.5Z"
                        stroke="#0075FF"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M6 7.875H12"
                        stroke="#0075FF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 10.5H10.125"
                        stroke="#0075FF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_1004">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </h1>
                <p className="leading-[28px] text-center text-[16px] font-[500]">
                  {post?.comments_count}
                </p>
              </div>
              <div>
                <h1 className="leading-[28px] text-center text-[16px] font-[500]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 12.0682V8.32314C15.75 5.10668 15.75 3.49845 14.7615 2.49923C13.773 1.5 12.182 1.5 9 1.5C5.81802 1.5 4.22703 1.5 3.23851 2.49923C2.25 3.49845 2.25 5.10668 2.25 8.32314V12.0682C2.25 14.3906 2.25 15.5518 2.80058 16.0592C3.06316 16.3012 3.39461 16.4533 3.74769 16.4937C4.48801 16.5784 5.35255 15.8137 7.08162 14.2844C7.84592 13.6084 8.22806 13.2704 8.67021 13.1813C8.88793 13.1374 9.11207 13.1374 9.32979 13.1813C9.77194 13.2704 10.1541 13.6084 10.9184 14.2844C12.6474 15.8137 13.512 16.5784 14.2523 16.4937C14.6054 16.4533 14.9368 16.3012 15.1994 16.0592C15.75 15.5518 15.75 14.3906 15.75 12.0682Z"
                      stroke="#0075FF"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.25 4.5H6.75"
                      stroke="#0075FF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </h1>
                <p className="leading-[28px] text-center text-[16px] font-[500]">
                  {post?.bookmarks_count}
                </p>
              </div>
              <div>
                <h1 className="leading-[28px] text-center text-[16px] font-[500]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_0_1007)">
                      <path
                        d="M13.9768 11.7526L15.2641 7.8906C16.3887 4.51681 16.951 2.82992 16.0605 1.93947C15.1701 1.04901 13.4832 1.61131 10.1094 2.73591L6.2474 4.02324C3.52443 4.9309 2.16294 5.38473 1.77604 6.05024C1.40799 6.68334 1.40799 7.46527 1.77604 8.09837C2.16294 8.76388 3.52443 9.21771 6.2474 10.1254C6.68462 10.2711 6.90322 10.344 7.08595 10.4663C7.26303 10.5849 7.41515 10.737 7.5337 10.9141C7.65602 11.0968 7.7289 11.3154 7.87463 11.7526C8.78229 14.4756 9.23611 15.8371 9.90162 16.224C10.5347 16.592 11.3167 16.592 11.9498 16.224C12.6153 15.8371 13.0691 14.4756 13.9768 11.7526Z"
                        stroke="#0075FF"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12.2906 6.76972C12.5852 6.47845 12.5878 6.00358 12.2965 5.70907C12.0053 5.41456 11.5304 5.41193 11.2359 5.70319L12.2906 6.76972ZM8.12895 10.8855L12.2906 6.76972L11.2359 5.70319L7.07418 9.81902L8.12895 10.8855Z"
                        fill="#0075FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_1007">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </h1>
                <p className="leading-[28px] text-center text-[16px] font-[500]">
                  {post?.bookmarks_count}
                </p>
              </div>
              <div>
                <h1 className="leading-[28px] text-center text-[16px] font-[500]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_0_1010)">
                      <path
                        d="M6.86487 4.05628C7.81486 2.35209 8.28985 1.5 9 1.5C9.71015 1.5 10.1851 2.35209 11.1351 4.05628L11.3809 4.49717C11.6509 4.98145 11.7858 5.22359 11.9963 5.38336C12.2068 5.54312 12.4689 5.60243 12.9931 5.72104L13.4703 5.82902C15.3151 6.24642 16.2375 6.45511 16.4569 7.1608C16.6764 7.86648 16.0476 8.6018 14.7899 10.0724L14.4646 10.4529C14.1072 10.8708 13.9285 11.0798 13.8481 11.3383C13.7677 11.5968 13.7947 11.8756 13.8488 12.4332L13.898 12.9408C14.0881 14.9029 14.1832 15.884 13.6086 16.3202C13.0341 16.7563 12.1705 16.3587 10.4432 15.5634L9.99639 15.3576C9.50556 15.1316 9.26014 15.0186 9 15.0186C8.73986 15.0186 8.49444 15.1316 8.00362 15.3576L7.55676 15.5634C5.82951 16.3587 4.96588 16.7563 4.39136 16.3202C3.81684 15.884 3.91191 14.9029 4.10205 12.9408L4.15124 12.4332C4.20527 11.8756 4.23228 11.5968 4.1519 11.3383C4.07151 11.0798 3.89282 10.8708 3.53544 10.4529L3.21007 10.0724C1.95244 8.6018 1.32362 7.86648 1.54307 7.1608C1.76251 6.45511 2.68489 6.24642 4.52965 5.82902L5.00691 5.72104C5.53114 5.60243 5.79325 5.54312 6.00371 5.38336C6.21417 5.22359 6.34914 4.98145 6.6191 4.49718L6.86487 4.05628Z"
                        stroke="#0075FF"
                        strokeWidth="1.5"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_1010">
                        <rect width="18" height="18" rx="5" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </h1>
                <p className="leading-[28px] text-center text-[16px] font-[500]">
                  {post?.rating}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]"> Bahasy</h1>
            <input
              value={post?.price + " TMT"}
              // onChange={(e) => {
              //   setPost({
              //     ...post,
              //     price: e.target.value,
              //   });
              // }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Satyjy</h1>
            <input
              value={post?.user}
              // onChange={(e) => {
              //   setPost({ ...post, phone: e.target.value });
              // }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-b-[1px]  pb-[30px]  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Maglumat</h1>
            <input
              value={post?.description}
              // onChange={(e) => {
              //   setPost({ ...post, email: e.target.value });
              // }}
              className={`  text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none `}
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Kategoriýa</h1>
            <Select
              value={post?.category}
              // onChange={(e, newValue) => {
              //   setPost({
              //     ...post,
              //     category: newValue,
              //   });
              // }}
              placeholder="Hemmesini görkez"
              className="text-[14px] w-full h-[47px] mt-1 text-[#98A2B2] font-[400]  border-[1px] !bg-white !border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              indicator={<KeyboardArrowDown className="!text-[16px]" />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              {categories?.map((item, i) => {
                return (
                  <Option key={"option" + i} value={item?.title}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="w-full flex flex-wrap items-center    pb-[30px] py-[30px]">
          <h1 className="w-full mb-3 text-[16px] font-[500]">
            Report eden ulanyjylar sanawy
          </h1>
          <div className="w-full">
            {/* Table header */}
            <div className="w-full gap-[30px] flex items-center px-4 h-[40px] rounded-[6px] bg-[#F7F8FA]">
              <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[40px] uppercase">
                №
              </h1>

              <h1 className="text-[14px] font-[500] text-[#98A2B2] min-w-[40px] w-[50px] uppercase">
                Surat
              </h1>

              <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[20%] uppercase">
                Ulanyjy ady
              </h1>

              <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[25%] uppercase">
                Ady
              </h1>

              <h1 className="text-[14px] font-[500]  text-[#98A2B2] w-[20%] uppercase">
                Report görnüşi
              </h1>

              <h1 className="text-[14px] font-[500] text-[#98A2B2] w-[20%]    whitespace-nowrap uppercase">
                Senesi
              </h1>
            </div>

            {/* Table body */}
            {reports?.map((item, i) => {
              return loading ? (
                <PageLoading />
              ) : (
                <div
                  key={"userrr" + i}
                  className="w-full gap-[30px] flex items-center px-4 h-[70px] rounded-[6px] bg-white border-b-[1px] border-[#E9EBF0]"
                >
                  <h1 className="text-[14px] font-[500] text-black w-[40px] uppercase">
                    {i + 1}
                  </h1>
                  <h1 className="rounded-[4px]  flex items-center justify-center min-w-[50px] w-[50px] h-[50px] bg-[#F7F8FA]">
                    <img
                      className="w-full  h-full object-cover rounded-[4px]"
                      src={item?.profile_image}
                      alt=""
                    />
                  </h1>

                  <h1 className="text-[14px] font-[500] text-black w-[20%] ">
                    {item?.username}
                  </h1>

                  <h1 className="text-[14px] font-[500] text-black w-[25%] ">
                    {item?.full_name}
                  </h1>

                  <h1 className="text-[14px] font-[500] text-black w-[20%] ">
                    {item?.report_type}
                  </h1>

                  <h1 className="text-[14px] font-[500] text-black w-[20%]   whitespace-nowrap uppercase">
                    {item?.created_at?.slice(0, 10) +
                      " / " +
                      item?.created_at?.slice(11, 16)}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex mt-1 items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Repordyň görkezilýändigini ýa-da görkezilmeýändigini kesgitlemek
              üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            <Switch
              checked={post.is_active == 1 ? true : false}
              onChange={(event) =>
                setPost({
                  ...post,
                  is_active: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Senesi</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Report edilen senesi
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            {post?.created_at?.slice(0, 10) +
              " / " +
              post?.created_at?.slice(11, 16)}
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Harydy aýyr</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Programmadan harydy pozmak üçin
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            <button
              onClick={() => deleteReports()}
              className="text-[16px] flex items-center gap-3 font-[500] text-white hover:bg-[#fd6060] bg-[#FF4D4D] rounded-[8px] px-5 py-2"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5001 6H3.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 11L10 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14.5 11L14 16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
              Aýyr
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="flex items-center gap-2">
          <h1 className="text-[14px] font-[400] text-[#98A2B2]">
            Soňky düzediş
          </h1>
          <h1 className="text-[14px] font-[400]">
            {post?.created_at?.slice(0, 10) +
              " / " +
              post?.created_at?.slice(11, 16)}
          </h1>
        </div>
        <div className="w-fit flex gap-6 items-center ">
          <button
            onClick={() => history.goBack()}
            className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
          >
            Goýbolsun et
          </button>
          <button
            onClick={() => updateUser()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>

      {/*  post Block */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={post?.has_blocked}
        onClose={() => setPost({ ...post, has_blocked: false })}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 600,
            width: "50%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <div className="flex w-full border-b-[1px] border-[#E9EBF0] pb-5 justify-between items-center">
            <h1 className="text-[20px] font-[500]">
              Hasaby bloklamanyň sebäbi
            </h1>
            <button onClick={() => setPost({ ...post, has_blocked: false })}>
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
            <h1 className="text-[16px] text-left mt-4 mb-1 font-[400]">
              Düşündiriş
            </h1>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              name=""
              placeholder="Text"
              id=""
              cols="30"
              rows="10"
              className="text-[14px] max-h-[400px] min-h-[100px] w-full mb-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
            ></textarea>

            <div className="flex w-full gap-[29px] justify-center">
              <button
                onClick={() => setPost({ ...post, has_blocked: false })}
                className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-[#fd6060] hover:text-white"
              >
                Goýbolsun et
              </button>
              <button
                onClick={() => blockUser()}
                className="text-[14px] font-[500] text-white hover:bg-opacity-90  bg-blue rounded-[8px] px-6 py-3"
              >
                Blokla
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>
    </div>
  );
};

export default React.memo(ReportPostsUpdate);

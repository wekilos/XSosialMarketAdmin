import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import Alert from "@mui/joy/Alert";
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

const UserUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [newFile, setNewFile] = useState(false);
  const [locations, setLocations] = useState([]);
  const [user, setUser] = useState({
    is_active: 1,
  });
  const [oldUser, setOldUser] = useState({
    is_active: 1,
  });
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);
  const [valitMail, setValitMail] = useState(true);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getData();
    getLocations();
  }, [id]);

  const getData = () => {
    axiosInstance
      .get("/users/" + id)
      .then((data) => {
        console.log(data.data?.data);
        setUser(data.data.data);
        setOldUser(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    // setLoading(true);
    console.log(user);
    const formData = new FormData();
    oldUser?.phone != user?.phone && formData.append("phone", user?.phone);
    oldUser?.username != user?.username &&
      formData.append("username", user?.username);

    setValitMail(validateEmail(user?.email));
    console.log("email:::", validateEmail(user?.email));
    oldUser?.email != user?.email && formData.append("email", user?.email);
    formData.append("is_active", user?.is_active ? 1 : 0);

    formData.append("profile[full_name]", user?.profile?.full_name);
    user?.profile?.bio && formData.append("profile[bio]", user?.profile?.bio);
    user?.profile?.birthdate &&
      formData.append(
        "profile[birthdate]",
        user?.profile?.birthdate?.slice(0, 10)
      );
    formData.append("profile[private]", user?.profile?.private ? 1 : 0);
    user?.profile?.location?.id &&
      formData.append("profile[location_id]", user?.profile?.location?.id);
    file && formData.append("profile[profile_image]", file);

    (file || !newFile) && validateEmail(user?.email)
      ? axiosInstance
          .post("/users/update/" + id, formData)
          .then((data) => {
            setLoading(false);
            console.log(data.data);
            history.push({ pathname: "/users" });
          })
          .catch((err) => {
            setLoading(false);
            setWarning(true);
            console.log(err);
          })
      : setWarning(true);
    setLoading(false);
  };

  const fileHandler = (f) => {
    console.log(f);

    let type = f.type?.split("/")[1];
    console.log(type);
    if (
      (type == "png" || type == "jpg" || type == "jpeg") &&
      f.size <= 100 * 1024
    ) {
      setFile(f);
    } else {
      alert("Olceg we type uns berin!");
    }
  };

  const blockUser = () => {
    axiosInstance
      .post("users/block/" + id, {
        reason: reason,
      })
      .then((data) => {
        console.log(data.data);
        setReason("");
        setUser({ ...user, has_blocked: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocations = () => {
    axiosInstance
      .post("/locations", {
        limit: 999,
        page: 1,
        search_query: "",
      })
      .then((data) => {
        console.log(data.data);
        setLocations(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <h1 className="text-[30px] font-[700]">Standard hasaplar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Hasap maglumaty</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Hasabyň suraty</h1>
            <div className="flex mt-5 justify-start  ">
              <input
                onChange={(e) => fileHandler(e.target.files[0])}
                ref={fileRef}
                className="hidden"
                type="file"
              />
              {!newFile && (
                <div className="relative">
                  <div
                    onClick={() => setNewFile(true)}
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

                  <div
                    onClick={() => fileRef.current.click()}
                    className="border-[1px] w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px]"
                  >
                    <img
                      className="w-[75px] h-[75px] object-contain"
                      src={user?.profile?.profile_image}
                      alt=""
                    />
                  </div>
                </div>
              )}
              {newFile &&
                (file ? (
                  <div className="relative">
                    <div
                      onClick={() => setFile()}
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

                    <div
                      onClick={() => fileRef.current.click()}
                      className="border-[1px] w-[75px] h-[75px] p-0 cursor-pointer border-[#98A2B2] rounded-[6px]"
                    >
                      <img
                        className="w-[75px] object-contain"
                        src={file && URL.createObjectURL(file)}
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current.click()}
                    className="border-[2px] cursor-pointer border-[#98A2B2] border-dashed p-[25px] rounded-[6px]"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M2 12.4999L3.75159 10.9673C4.66286 10.1699 6.03628 10.2156 6.89249 11.0719L11.1822 15.3616C11.8694 16.0488 12.9512 16.1425 13.7464 15.5837L14.0446 15.3741C15.1888 14.57 16.7369 14.6631 17.7765 15.5987L21 18.4999"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M15 5.5H18.5M18.5 5.5H22M18.5 5.5V9M18.5 5.5V2"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ulanyjy ady</h1>
            <input
              value={user?.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%] h-[75px] items-end flex justify-between ">
            <div className="h-[48px] border-l-[1px] border-[#E9EBF0] w-[1px]"></div>
            <div className="flex w-full justify-evenly">
              <div>
                <h1 className="leading-[28px] text-[16px] font-[500]">
                  Postlar
                </h1>
                <p className="leading-[28px] text-[16px] font-[500]">
                  {user?.posts_count}
                </p>
              </div>
              <div>
                <h1 className="leading-[28px] text-[16px] font-[500]">
                  Yzarlaýanlar
                </h1>
                <p className="leading-[28px] text-[16px] font-[500]">
                  {user?.followers_count}
                </p>
              </div>
              <div>
                <h1 className="leading-[28px] text-[16px] font-[500]">
                  Yzarlaýanlary
                </h1>
                <p className="leading-[28px] text-[16px] font-[500]">
                  {user?.followings_count}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]"> Ady</h1>
            <input
              value={user?.profile?.full_name}
              onChange={(e) => {
                setUser({
                  ...user,
                  profile: { ...user?.profile, full_name: e.target.value },
                });
              }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Telefon belgisi</h1>
            <input
              value={user?.phone}
              onChange={(e) => {
                setUser({ ...user, phone: e.target.value });
              }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">E-poçta</h1>
            <input
              value={user?.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              className={`${
                !valitMail && "border-red "
              } text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none `}
              placeholder="Girizilmedik"
              type="email"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ýerleşýän ýeri</h1>
            <Select
              value={user?.profile?.location?.id}
              onChange={(e, newValue) => {
                console.log(e?.target?.value, newValue);
                setUser({
                  ...user,
                  profile: {
                    ...user?.profile,
                    location: { ...user?.profile?.location, id: newValue },
                  },
                });
              }}
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
              {locations?.map((item, i) => {
                return (
                  <Option key={"option" + i} value={item?.id}>
                    {item?.title}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>

        <div className="flex items-center   justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Bio</h1>
            <input
              value={user?.profile?.bio}
              onChange={(e) => {
                setUser({
                  ...user,
                  profile: { ...user?.profile, bio: e.target.value },
                });
              }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Doglan ýyly</h1>

            <input
              format="YYYY-MM-DD"
              type="date"
              value={moment(user?.profile?.birthdate).format("YYYY-MM-DD")}
              // value={user?.profile?.birthday?.slice(0, 10)}
              onChange={(e) => {
                console.log(e.target.value);
                setUser({
                  ...user,
                  profile: {
                    ...user?.profile,
                    birthdate: e.target.value,
                  },
                });
              }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
            />
          </div>
        </div>

        <div className="flex mt-5 items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Ulanyjynyň görkezilýändigini ýa-da görkezilmeýändigini kesgitlemek
              üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            <Switch
              checked={user.is_active == 1 ? true : false}
              onChange={(event) =>
                setUser({
                  ...user,
                  is_active: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Programmadan blokla</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Ulanyjyny programmadan käbir sebäplere göra bloklamak üçin
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            <Switch
              checked={user?.blocked_at != (null || undefined) ? true : false}
              onChange={(event) =>
                setUser({
                  ...user,
                  has_blocked: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Gizlin hasap</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Ulanyjyny hasabynyň gizlin etmek.
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            <Switch
              checked={user?.profile?.private == 1 ? true : false}
              onChange={(e) => {
                setUser({
                  ...user,
                  profile: {
                    ...user?.profile,
                    private: e.target.checked ? 1 : 0,
                  },
                });
              }}
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Soňky aktiwlik</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Ulanyjynyň iň soňky aktiw bolan senesini wagtyny görkezýär.
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            {user?.last_activity?.slice(0, 10) +
              " / " +
              user?.last_activity?.slice(11, 16)}
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Goşulan senesi</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Ulanyjynyň hasap döreden senesi
            </p>
          </div>
          <div className="flex justify-start w-[49%]">
            {user?.created_at?.slice(0, 10) +
              " / " +
              user?.created_at?.slice(11, 16)}
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="flex items-center gap-2">
          <h1 className="text-[14px] font-[400] text-[#98A2B2]">
            Soňky düzediş
          </h1>
          <h1 className="text-[14px] font-[400]">
            {user?.updated_at?.slice(0, 10) +
              " / " +
              user?.updated_at?.slice(11, 16)}
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

      {/*  user Block */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={user?.has_blocked}
        onClose={() => setUser({ ...user, has_blocked: false })}
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
            <button onClick={() => setUser({ ...user, has_blocked: false })}>
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
                onClick={() => setUser({ ...user, has_blocked: false })}
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

export default React.memo(UserUpdate);

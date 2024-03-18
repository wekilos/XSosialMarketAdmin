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
  const [locations, setLocations] = useState([]);
  const [valitMail, setValitMail] = useState(true);
  const [user, setUser] = useState({
    is_active: 1,
  });

  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    getData();
    getDataofUsers();
    getLocations();
  }, [id]);

  const getData = () => {
    axiosInstance
      .get("/users/" + id)
      .then((data) => {
        console.log("user", data.data?.data);
        setUser(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataofUsers = () => {
    axiosInstance
      .post("/user/reports/" + id + "/users")
      .then((data) => {
        console.log("reports", data.data?.data);
        setReports(data.data?.data);
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

  const updateUser = () => {
    axiosInstance
      .post("/users/update/" + id, {
        is_active: user?.is_active,
      })
      .then((data) => {
        console.log(data.data);
        history.push({ pathname: "/accountreports" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const blockUser = () => {
    axiosInstance
      .post("users/block/" + id, {
        reason: reason,
      })
      .then((data) => {
        console.log(data.data);
        setReason("");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unblockUser = () => {
    axiosInstance
      .post("users/unblock/" + id)
      .then((data) => {
        console.log(data.data);

        getData();
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
        <h1 className="text-[30px] font-[700]">Hasap reportlar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Hasap maglumaty</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Hasabyň suraty</h1>
            <div className="flex gap-5 mt-5 justify-start  ">
              <div className="relative">
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
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
                    src={user?.original_url}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center  justify-between py-[15px]">
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Ulanyjy ady</h1>
            <input
              value={user?.username}
              disabled
              // onChange={(e) => {
              //   setUser({ ...user, caption: e.target.value });
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
              disabled
              // onChange={(e) => {
              //   setUser({
              //     ...user,
              //     profile: { ...user?.profile, full_name: e.target.value },
              //   });
              // }}
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
              type="text"
            />
          </div>
          <div className="w-[49%]">
            <h1 className="text-[16px] font-[500]">Telefon belgisi</h1>
            <input
              value={user?.phone}
              disabled
              // onChange={(e) => {
              //   setUser({ ...user, phone: e.target.value });
              // }}
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
              disabled
              // onChange={(e) => {
              //   setUser({ ...user, email: e.target.value });
              // }}
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
              disabled
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
              disabled
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
              value={
                user?.profile?.birthdate
                  ? moment(user?.profile?.birthdate).format("YYYY-MM-DD")
                  : null
              }
              // value={user?.profile?.birthday?.slice(0, 10)}
              disabled
              className="text-[14px] w-full mt-1 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Girizilmedik"
            />
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
              checked={user?.block_reason == null ? false : true}
              onChange={(event) => {
                setUser({
                  ...user,
                  block_reason: event.target.checked ? 1 : 0,
                  has_blocked: event.target.checked ? 1 : 0,
                });
                user?.block_reason &&
                  event?.target?.checked == false &&
                  unblockUser();
              }}
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
          {user?.blocked_at && (
            <div className="flex justify-start w-[49%]">
              {user?.blocked_at?.slice(0, 10) +
                " / " +
                user?.blocked_at?.slice(11, 16)}
            </div>
          )}
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

export default React.memo(ReportPostsUpdate);

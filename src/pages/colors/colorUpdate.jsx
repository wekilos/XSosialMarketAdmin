import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";

const ColorUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isDelete, setISDelete] = useState(false);
  const [color, setColor] = useState({
    title: "",
    is_active: 1,
  });
  const [file, setFile] = useState("");
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = () => {
    axiosInstance
      .get("/colors/" + id)
      .then((data) => {
        console.log(data.data.data);
        setColor(data.data.data);
        setFile(data.data.data.code);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateColor = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", color.title);
    formData.append("is_active", color.is_active ? 1 : 0);
    file?.length > 0 && formData.append("code", file);

    if (file?.length > 0 && color.title?.length > 0) {
      axiosInstance
        .post("/colors/update/" + id, formData)
        .then((data) => {
          setLoading(true);
          console.log(data.data);
          history.push({ pathname: "/colors" });
        })
        .catch((err) => {
          setLoading(true);
          console.log(err);
        });
    } else {
      setWarning(true);
      setLoading(false);
    }
  };

  const deleteColor = () => {
    setLoading(true);
    axiosInstance
      .post("/colors/delete", {
        colors: [id],
      })
      .then((data) => {
        setLoading(false);
        console.log(data.data);
        history.push({ pathname: "/colors" });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
        <h1 className="text-[30px] font-[700]">Reňkler</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Reňk maglumaty</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Reňk saýla </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Reňki bu ýerden saýlaň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <div className="text-[14px] w-full flex  items-center px-5 text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px]    ">
              <input
                onChange={(e) => {
                  setFile(e.target.value);
                  console.log(e.target.value);
                }}
                ref={fileRef}
                className="hidden"
                type="color"
              />
              {file?.length > 0 ? (
                <div
                  onClick={() => fileRef.current.click()}
                  style={{ backgroundColor: file }}
                  className={`w-6 h-6 rounded-[100%]`}
                ></div>
              ) : (
                <div
                  onClick={() => fileRef.current.click()}
                  className={`w-6 h-6 rounded-[100%] bg-[#d9d9d9]`}
                ></div>
              )}
              <input
                value={file}
                onChange={(e) => setFile(e.target.value)}
                className="text-[14px] w-full  text-[#98A2B2] font-[400]  rounded-[6px] px-3 py-3 outline-none"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Reňkiň ady</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýaň adyny girizeniňizde 30 simwoldan geçmäň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={color.title}
              onChange={(e) => {
                e.target.value?.length <= 30 &&
                  setColor({ ...color, title: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Reňkiň görkezilýändigini ýa-da görkezilmeýändigini kesgitlemek
              üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={color.is_active == 1 ? true : false}
              onChange={(event) =>
                setColor({
                  ...color,
                  is_active: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Reňki aýyr</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Programmadan reňki pozmak üçin
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <button
              onClick={() => setISDelete(true)}
              className="text-white bg-[#FF4D4D] hover:bg-opacity-90  text-[16px] font-[500] px-6 py-[6px] flex items-center gap-2 rounded-[6px] leading-[28px]"
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
                  d="M18.8337 8.5L18.3737 15.3991C18.1967 18.054 18.1082 19.3815 17.2432 20.1907C16.3782 21 15.0478 21 12.387 21H11.6136C8.95284 21 7.62244 21 6.75743 20.1907C5.89242 19.3815 5.80393 18.054 5.62693 15.3991L5.16699 8.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
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
                  stroke-width="1.5"
                />
              </svg>
              Aýyr
            </button>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isDelete}
        onClose={() => setISDelete(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
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
            <h1 className="text-[20px] font-[500]">Reňk aýyrmak</h1>
            <button onClick={() => setISDelete(false)}>
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
              Reňki aýyrmak isleýärsiňizmi?
            </h1>

            <div className="flex gap-[29px] justify-center">
              <button
                onClick={() => setISDelete(false)}
                className="text-[14px] font-[500] px-6 py-3 text-[#98A2B2] rounded-[8px] hover:bg-blue hover:text-white"
              >
                Goýbolsun et
              </button>
              <button
                onClick={() => deleteColor()}
                className="text-[14px] font-[500] text-white hover:bg-[#fd6060] bg-[#FF4D4D] rounded-[8px] px-6 py-3"
              >
                Aýyr
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>

      <div className="w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="flex items-center gap-2">
          <h1 className="text-[14px] font-[400] text-[#98A2B2]">
            Soňky düzediş
          </h1>
          <h1 className="text-[14px] font-[400]">
            {color?.updated_at?.slice(0, 10) +
              " / " +
              color?.updated_at?.slice(11, 16)}
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
            onClick={() => updateColor()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ColorUpdate);

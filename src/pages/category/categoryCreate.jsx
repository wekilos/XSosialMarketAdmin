import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import PageLoading from "../../components/PageLoading";

const CategoryCreate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    title: "",
    description: "",
    is_active: 1,
    has_product: 1,
  });
  const [file, setFile] = useState();
  const fileRef = useRef(null);
  const [warning, setWarning] = useState(false);

  const createCategory = () => {
    const formData = new FormData();
    formData.append("title", category.title);
    formData.append("is_active", category.is_active);
    formData.append("icon", file);
    formData.append("has_product", category.has_product);
    formData.append("description", category.description);

    file && category.title?.length > 0
      ? axiosInstance
          .post("/categories/create", formData)
          .then((data) => {
            console.log(data.data);
            history.push({ pathname: "/category" });
          })
          .catch((err) => {
            console.log(err);
          })
      : setWarning(true);
  };

  const fileHandler = (f) => {
    console.log(f);

    let type = f?.type?.split("/")[1];
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
        <h1 className="text-[30px] font-[700]">Kategoriýa</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Kategoriýa goş</h1>
        </div>

        <div className="flex items-center object-contain justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Kategoriýa şekili </h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Diňe * .png, * .jpg we * .jpeg surat faýllary kabul edilýär. Iň
              kiçi ölçegi 50px X 50px, iň uly göwrümi 100KB
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              onChange={(e) => fileHandler(e.target.files[0])}
              ref={fileRef}
              className="hidden"
              type="file"
            />
            {file ? (
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

                <div
                  onClick={() => fileRef.current.click()}
                  className="border-[1px]  p-[16px] cursor-pointer border-[#98A2B2] rounded-[6px]"
                >
                  <img
                    className="w-[50px] object-contain"
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
            )}
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Kategoriýa ady</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýaň adyny girizeniňizde 30 simwoldan geçmäň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={category.title}
              onChange={(e) => {
                e.target.value?.length <= 30 &&
                  setCategory({ ...category, title: e.target.value });
              }}
              className="text-[14px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Adyny giriz"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Kategoriýa description</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýaň adyny girizeniňizde 30 simwoldan geçmäň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <textarea
              value={category.description}
              onChange={(e) => {
                setCategory({ ...category, description: e.target.value });
              }}
              col={5}
              className="text-[14px] min-h-[100px] w-full text-[#98A2B2] font-[400]  border-[1px] border-[#98A2B2] rounded-[6px] px-5 py-3 outline-none "
              placeholder="Description"
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Status</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň görkezilýändigini ýa-da görkezilmeýändigini
              kesgitlemek üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={category.is_active == 1 ? true : false}
              onChange={(event) =>
                setCategory({
                  ...category,
                  is_active: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Haryt barmy</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Kategoriýanyň görkezilýändigini ýa-da görkezilmeýändigini
              kesgitlemek üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={category.has_product == 1 ? true : false}
              onChange={(event) =>
                setCategory({
                  ...category,
                  has_product: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-end items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="w-fit flex gap-6 items-center ">
          <button
            onClick={() => history.goBack()}
            className="text-blue text-[14px] font-[500] py-[11px] px-[27px] hover:bg-red hover:text-white rounded-[8px]"
          >
            Goýbolsun et
          </button>
          <button
            onClick={() => createCategory()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CategoryCreate);

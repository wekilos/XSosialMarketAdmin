import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/joy/Switch";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WarningIcon from "@mui/icons-material/Warning";
import { axiosInstance } from "../../utils/axiosIntance";
import { useHistory, useParams } from "react-router-dom";
import PageLoading from "../../components/PageLoading";

const BrandUpdate = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [brand, setBrand] = useState({
    title: "",
    is_active: 1,
  });
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = () => {
    axiosInstance
      .get("/brands/" + id)
      .then((data) => {
        console.log(data.data.data);
        setBrand(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBrand = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", brand.title);
    formData.append("is_active", brand.is_active ? 1 : 0);

    brand.title?.length > 0
      ? axiosInstance
          .post("/brands/update/" + id, formData)
          .then((data) => {
            setLoading(true);
            console.log(data.data);
            history.push({ pathname: "/brands" });
          })
          .catch((err) => {
            setLoading(true);
            console.log(err);
          })
      : setWarning(true);
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
        <h1 className="text-[30px] font-[700]">Markalar</h1>
      </div>

      <div className="w-full min-h-[60vh] p-5 bg-white rounded-[8px]">
        <div className=" flex items-center gap-4 pb-5 border-b-[1px] border-b-[#E9EBF0]">
          <div className="border-l-[3px] border-blue h-[20px]"></div>
          <h1 className="text-[20px] font-[500]">Marka maglumaty</h1>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Marka ady</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Harydyň markasynyň adyny giriziň.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <input
              value={brand.title}
              onChange={(e) => {
                setBrand({ ...brand, title: e.target.value });
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
              Markanyň görkezilýändigini ýa-da görkezilmeýändigini kesgitlemek
              üçin status düzüň
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <Switch
              checked={brand.is_active == 1 ? true : false}
              onChange={(event) =>
                setBrand({
                  ...brand,
                  is_active: event.target.checked ? 1 : 0,
                })
              }
            />
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Haryt sany</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Bu marka degişli harytlaryň sanyny görkezýär.
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <h1 className="text-[16px] font-[400]">
              {brand?.products_count} haryt
            </h1>
          </div>
        </div>

        <div className="flex items-center border-t-[1px] justify-between py-[30px]">
          <div className="w-[380px]">
            <h1 className="text-[18px] font-[500]">Goşulan senesi</h1>
            <p className="text-[14px] mt-2 font-[500] text-[#98A2B2]">
              Markanyň döredilen senesi
            </p>
          </div>
          <div className="flex justify-start w-[550px]">
            <h1 className="text-[16px] font-[400]">
              {brand?.updated_at?.slice(0, 10) +
                " / " +
                brand?.updated_at?.slice(11, 16)}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 flex justify-between items-center bg-white py-4 px-5 border-[1px] border-[#E9EBF0] rounded-[8px]">
        <div className="flex items-center gap-2">
          <h1 className="text-[14px] font-[400] text-[#98A2B2]">
            Soňky düzediş
          </h1>
          <h1 className="text-[14px] font-[400]">
            {brand?.updated_at?.slice(0, 10) +
              " / " +
              brand?.updated_at?.slice(11, 16)}
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
            onClick={() => updateBrand()}
            className="text-white text-[14px] font-[500] py-[11px] px-[27px] bg-blue rounded-[8px] hover:bg-opacity-90"
          >
            Ýatda sakla
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BrandUpdate);

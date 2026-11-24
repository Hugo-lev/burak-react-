import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";

// Foydalanuvchi ma'lumotlarini (rasm, ism, telefon, manzil, bio) o'zgartirish shakli
export function Settings() {
  return (
    <Box className={"settings"}>
      {/* Profil rasmini yuklash bo'limi */}
      <Box className={"member-media-frame"}>
        <img src={"/icons/default-user.svg"} className={"mb-image"} alt="user" />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label">
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>

      {/* Username kiritish maydoni */}
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={"Martin"}
            value={"Martin"}
            name="memberNick"
          />
        </div>
      </Box>

      {/* Telefon raqami va Manzil kiritish maydonlari */}
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={"no phone"}
            value={"821024694424"}
            name="memberPhone"
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={"no address"}
            value={"no address"}
            name="memberAddress"
          />
        </div>
      </Box>

      {/* Qo'shimcha tavsif (bio) va Saqlash tugmasi */}
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={"no description"}
            value={"no description"}
            name="memberDesc"
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"}>Save</Button>
      </Box>
    </Box>
  );
}

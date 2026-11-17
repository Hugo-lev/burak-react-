import { Box, Container, Stack, CardContent } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardCover from "@mui/joy/CardCover";

// ❌ ESKI: qo'lda yozilgan soxta ro'yxat (endi izohga olingan)
// const activeUsers = [
//   { memberNick: "Martin", memberImage: "/img/martin.webp" },
//   { memberNick: "Robin", memberImage: "/img/justin.webp" },
//   { memberNick: "Ross", memberImage: "/img/rose.webp" },
//   { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
//   { memberNick: "Micheal", memberImage: "/img/me.webp" },
// ];
import { useSelector } from "react-redux"; // ✅ YANGI
import { createSelector } from "reselect"; // ✅ YANGI
import { retrieveTopUsers } from "./selector"; // ✅ YANGI: top userlarni o'quvchi selector
import { serverApi } from "../../../lib/config"; // ✅ YANGI
import { Member } from "../../../lib/types/member"; // ✅ YANGI

/** REDUX SLICE & SELECTOR **/
// ✅ YANGI: STOREdan topUsers ni olib, { topUsers } obyektiga o'raydi
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));
export default function ActiveUsers() {
  // ✅ YANGI: STOREdan o'qiymiz
  const { topUsers } = useSelector(topUsersRetriever);
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            {/* ❌ ESKI: activeUsers.length !== 0 ? ( activeUsers.map((ele, index) => { */}
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                // ✅ YANGI: user rasmi ham serverda turadi → server manzilini oldiga qo'shamiz
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  // ❌ ESKI: key={index} → ✅ YANGI: key={member._id}
                  <CssVarsProvider key={member._id}>
                    <Card className={"card"}>
                      <CardCover>
                        {/* ❌ ESKI: src={ele.memberImage} alt="" → ✅ YANGI: */}
                        <img src={imagePath} alt="bu yerda member rasmi" />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent />
                      <CardOverflow className={"member-nickname"}>
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#000000eb"
                        >
                          {/* ❌ ESKI: {ele.memberNick} → ✅ YANGI: */}
                          {member.memberNick}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">No Active Users !</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

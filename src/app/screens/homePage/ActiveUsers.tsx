import { Box, Container, Stack, CardContent } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import CardCover from "@mui/joy/CardCover";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR **/
// Redux STORE'dan topUsers (eng faol a'zolar) ro'yxatini ajratib oluvchi selektor
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

// Bosh sahifadagi eng faol foydalanuvchilar (Active Users) kartalarini ko'rsatuvchi komponent
export default function ActiveUsers() {
  // Redux store'dan topUsers holatini olamiz
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            {/* Foydalanuvchilar mavjud bo'lsa har biriga karta chizamiz, yo'q bo'lsa 'No Active Users' */}
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member) => {
                const imagePath = `${serverApi}/${member.memberImage}`;
                return (
                  <CssVarsProvider key={member._id}>
                    <Card className={"card"}>
                      <CardCover>
                        <img src={imagePath} alt={member.memberNick} />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent />
                      <CardOverflow className={"member-nickname"}>
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#000000eb"
                        >
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

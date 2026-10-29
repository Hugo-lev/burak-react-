import { Box, Container, Stack, CardContent } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import CardCover from "@mui/joy/CardCover";

const activeUsers = [
  { memberNick: "Martin", memberImage: "/img/martin.webp" },
  { memberNick: "Robin", memberImage: "/img/justin.webp" },
  { memberNick: "Ross", memberImage: "/img/rose.webp" },
  { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            {activeUsers.length !== 0 ? (
              activeUsers.map((ele, index) => {
                return (
                  <CssVarsProvider key={index}>
                    <Card className={"card"}>
                      <CardCover>
                        <img src={ele.memberImage} alt="" />
                      </CardCover>
                      <CardCover className={"card-cover"} />
                      <CardContent />
                      <CardOverflow className={"member-nickname"}>
                        <Typography
                          level="h2"
                          fontSize="lg"
                          textColor="#000000eb"
                        >
                          {ele.memberNick}
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

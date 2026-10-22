import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
// Yuqorida yozgan RippleBadge komponentimiz
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return (
    <Container sx={{ background: "orange" }}>
      <Stack direction={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h4"}>
            Create React App on TypeScript with REDUX
          </Typography>
        </Box>

        <Box>
          {/* badgeContent={4}: badge ichida "4" raqami chiqadi */}
          <RippleBadge badgeContent={4}>
            <Button variant="contained">Contained</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;

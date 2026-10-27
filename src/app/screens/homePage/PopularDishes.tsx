import React from "react";
// Hammasi BITTA paketdan (@mui/material) olinadi, aralashma yo'q
import { Stack, Container, Box, Card, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

// Vaqtincha statik ma'lumotlar. Keyin backend'dan keladi
const list = [
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

export default function PopularDishes() {
  return (
    // CSS dagi ".popular-dishes-frame" shu div'ga tushadi
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>

          {/* .cards-frame: kartalarni yonma-yon joylashtiradi (CSS beradi) */}
          <Stack className="cards-frame">
            {/* map: ro'yxatdagi HAR BIR element uchun bitta karta chizadi */}
            {list.map((ele) => (
              // key: React elementlarni farqlashi uchun noyob qiymat
              <Card
                key={ele.imagePath}
                className="card"
                sx={{
                  position: "relative", // ichidagi "absolute" elementlar shu kartaga nisbatan turadi
                  overflow: "hidden", // rasm kartadan chiqib ketmasin
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end", // matn kartaning PASTIDA turadi
                  borderRadius: "12px",
                }}
              >
                {/* 1-qatlam: rasm. absolute + 100% = butun kartani to'ldiradi,
                    objectFit "cover" = rasm cho'zilmasdan, kesilib joylashadi */}
                <Box
                  component="img"
                  src={ele.imagePath}
                  alt={ele.productName}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* 2-qatlam: qoraytiruvchi gradient (rangini CSS dagi
                    .card-cover beradi), faqat joylashuvi shu yerda */}
                <Box
                  className="card-cover"
                  sx={{ position: "absolute", inset: 0 }}
                />

                {/* 3-qatlam: matn. zIndex: 1 = rasm va gradient USTIDA turadi */}
                <Box sx={{ position: "relative", zIndex: 1, color: "#fff" }}>
                  {/* Nom chapda, ko'rishlar soni o'ngda */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                    }}
                  >
                    <Typography variant="h4" sx={{ color: "#fff" }}>
                      {ele.productName}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      20
                      <VisibilityIcon
                        sx={{ fontSize: 25, marginLeft: "5px" }}
                      />
                    </Box>
                  </Box>

                  {/* Pastki chiziqli qism: tavsif */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      height: "60px",
                      borderTop: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <DescriptionOutlinedIcon />
                    This is delicious meal
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

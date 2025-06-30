
import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import React from "react";

const Exervideo = ({ exercisevideo, name }) => {
  if (!exercisevideo?.length) return "Loading...";

  return (
    <Box sx={{ marginTop: { lg: "100px", xs: "20px" }, p: "20px" }}>
      <Typography variant="h4" mb="33px" textAlign="center">
        Watch <span style={{ color: "#FF2625", textTransform: "capitalize" }}>{name}</span> exercise videos
      </Typography>

      <Grid 
        container 
        spacing={4} 
        justifyContent="center"
      >
        {exercisevideo.slice(0, 4).map((item, ind) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            lg={6} 
            key={ind} 
            display="flex" 
            justifyContent="center"
          >
            <Card 
              sx={{
                width: "100%", 
                maxWidth: 400, 
                borderRadius: "10px", 
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" }
              }}
            >
              <a 
                href={`https://www.youtube.com/watch?v=${item.video.videoId}`} 
                target="_blank" 
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <CardMedia 
                  component="img"
                  height="200"
                  image={item.video.thumbnails[0].url} 
                  alt={item.video.title}
                  sx={{ borderRadius: "10px 10px 0 0" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold" color="black">
                    {item.video.title}
                  </Typography>
                  <Typography variant="subtitle1" color="gray">
                    {item.video.channelName}
                  </Typography>
                </CardContent>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Exervideo;


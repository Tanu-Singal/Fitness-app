
import { Box, Typography, Card, CardContent, CardMedia, Button, Stack } from "@mui/material";
import React from "react";
import Loader from "./Loader";

const Similar = ({ targetmuscleexer }) => {
  console.log(targetmuscleexer)
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" }, p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Exercises that target the muscle group
      </Typography>
      
      {targetmuscleexer.length ? (
        <Box sx={{ display: "flex", overflowX: "auto", gap: 5, p: 1 }}>
          {targetmuscleexer.map((exercise, index) => (
            <Card 
              key={index} 
              sx={{ 
                minWidth: 420, 
                p: 1, 
                
                flexShrink: 0, 
                borderTop: "4px solid #FF2625" // Red border on top
              }}
            >
              <CardMedia
                component="img"
                height="380" 
                image={exercise.gifUrl || "https://via.placeholder.com/150"}
                alt={exercise.name}
                sx={{ borderRadius: "10px", objectFit: "cover" }} // Styled image
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
                  <Button 
                    sx={{
                      color: "#FFF",
                      background: "#FFA9A9",
                      fontSize: "14px",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      px: 2, 
                      py: 0.5,
                    }}
                  >
                    {exercise.bodyPart}
                  </Button>
                  <Button 
                    sx={{
                      color: "#FFF",
                      background: "#FCC757",
                      fontSize: "14px",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      px: 2, 
                      py: 0.5,
                    }}
                  >
                    {exercise.target}
                  </Button>
                </Stack>
                <Typography variant="h6" fontWeight="bold" textTransform="capitalize">
                  {exercise.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default Similar;

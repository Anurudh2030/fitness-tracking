// import React from "react";
// import { Drawer, List, ListItem, ListItemText, Box, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: 250,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 250,
//           boxSizing: "border-box",
//           backgroundColor: "#1976d2",
//           color: "white",
//           padding: "10px"
//         }
//       }}
//     >
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//           Fitness Tracker
//         </Typography>
//         <List>
//         <ListItem button component={Link} to="/dashboard" sx={{ color: "white" }}>
//   <ListItemText primary="Dashboard" />
// </ListItem>
// <ListItem button component={Link} to="/profile" sx={{ color: "white" }}>
//   <ListItemText primary="Profile" />
// </ListItem>
// <ListItem button component={Link} to="/workouts" sx={{ color: "white" }}>
//   <ListItemText primary="Workouts" />
// </ListItem>

//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;



import React from "react";
import { Drawer, List, ListItem, ListItemText, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#1976d2",
          color: "white",
          padding: "10px"
        }
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Fitness Tracker
        </Typography>
        <List>
          <ListItem component={Link} to="/dashboard" sx={{ color: "white" }}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/profile" sx={{ color: "white" }}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem component={Link} to="/workouts" sx={{ color: "white" }}>
            <ListItemText primary="Workouts" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

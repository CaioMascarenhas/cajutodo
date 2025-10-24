"use client";

import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import PlaceIcon from "@mui/icons-material/Place";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Filmes from "../components/Filmes";
import Restaurantes from "../components/Restaurantes";
import Series from "../components/Series";
import Lugares from "../components/lugares";
import Aleatorios from "../components/Aleatorios";
import { Quiz } from "@mui/icons-material";


const drawerWidth = 240;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const menuItems = [
    {
      label: "Filmes",
      icon: <MovieIcon sx={{ color: '#e53935' }} />, // vermelho
      component: <Filmes />,
    },
    {
      label: "Séries",
      icon: <TvIcon sx={{ color: '#8e24aa' }} />, // roxo
      component: <Series />,
    },
    {
      label: "Lugares",
      icon: <PlaceIcon sx={{ color: '#039be5' }} />, // azul claro
      component: <Lugares />,
    },
    {
      label: "Restaurantes",
      icon: <RestaurantIcon sx={{ color: '#43a047' }} />, // verde
      component: <Restaurantes />,
    },
    {
      label: "Aleatorios",
      icon: <Quiz sx={{ color: '#fbc02d' }} />, // amarelo
      component: <Aleatorios />,
    },
  ];

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index);
                if (window.innerWidth < 600) setMobileOpen(false);
              }}
            >
              {item.icon}
              <ListItemText primary={item.label} sx={{ ml: 2 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#1976d2",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
            {menuItems[selectedIndex].label}
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => router.push("/")}
            aria-label="Ir para Home"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Menu Lateral */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Drawer Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8, // espaço abaixo do AppBar
        }}
      >
        {menuItems[selectedIndex].component}
      </Box>
    </Box>
  );
}

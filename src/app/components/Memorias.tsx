
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Card, CardContent, GridLegacy as Grid, CardMedia, Typography, Chip, IconButton, Avatar, Stack, CardHeader } from "@mui/material";

const memoriasMock = [
    {
        id: 1,
        foto:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        titulo:
            "Viagem inesquecível para a Chapada Diamantina com amigos.",
        data: "2023-07-15",
        local: "Chapada Diamantina, BA",
        categoria: "Viagem",
    },
    {
        id: 2,
        foto:
            "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        titulo:
            "Aniversário surpresa da minha mãe",
        data: "2024-03-22",
        local: "Casa da família",
        categoria: "Família",
    },
    {
        id: 3,
        foto:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        titulo:
            "Primeiro emprego conquistado! Um novo ciclo cheio de desafios e aprendizados.",
        data: "2022-11-01",
        local: "São Paulo, SP",
        categoria: "Conquista",
    },
];

const categoriaCores = {
    Viagem: "#1976d2",
    Família: "#43a047",
    Conquista: "#fbc02d",
};

const Memorias = () => {


    return (
        <>
            <Grid container spacing={2}>
                {memoriasMock.map((memoria) => (
                    <Grid item xs={12} sm={6} md={4} key={memoria.id}>
                        <Card>
                            <CardHeader
                                title={memoria.titulo}
                                subheader={`${memoria.data} - ${memoria.local}`}
                                sx={{
                                    "& .MuiCardHeader-title": { fontSize: "1rem", fontFamily: 'Inter', fontWeight: 'bold' },
                                    "& .MuiCardHeader-subheader": { fontSize: "0.85rem", fontFamily: 'Inter' }
                                }}
                            />
                            <CardMedia
                                component="img"
                                height="200"
                                image={memoria.foto}
                                alt={memoria.titulo}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Memorias;
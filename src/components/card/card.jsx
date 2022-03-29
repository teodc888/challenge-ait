import * as React from 'react';

//Mui
import { CardActionArea, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function CardCh({imagen, titulo, descripcion}) {
  return (
    <Card sx={{ maxWidth: 345, margin:"auto" }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imagen}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
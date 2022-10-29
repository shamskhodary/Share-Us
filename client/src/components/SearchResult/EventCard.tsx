import { FC } from 'react'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material'
import dayjs from 'dayjs'
import { IEventCard } from '../../interfaces'

const getStatusClassName = (status :string |undefined):string => {
  if (status === 'in-progress') {
    return 'green'
  } if (status === 'upcoming') {
    return 'orange'
  } if (status === 'closed') {
    return 'red'
  }
  return 'transparent'
}
const EventCard:FC<IEventCard> = ({
  image,
  eventname,
  startTime,
  status,
  Hashtags,
  button,
  description,
}) => (
  <Card sx={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  }}
  >
    <CardMedia
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '40%',
      }}
      component="img"
      alt="Event Image"
      image={image}
    />
    <CardContent sx={{ flex: '1 1 auto' }}>
      <Typography gutterBottom variant="h5" component="div">
        {eventname}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        { `Date: ${dayjs(startTime).format('DD/MM/YYYY')}`}
        { ` | Time: ${dayjs(startTime).format('HH:mm:ss a')}`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      <Typography
        className={getStatusClassName(status)}
        gutterBottom
        variant="body2"
        component="div"
      >
        {status}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        { Hashtags?.map((ele:any) => (
          <Typography
            key={ele.id}
            sx={{
              padding: '3px',
              margin: '5px 5px 5px 0',
              backgroundColor: ele.color,
              borderRadius: '5px',
            }}
            variant="body2"
            color="text.secondary"
          >
            {`# ${ele.title}`}
          </Typography>
        ))}
      </Box>
    </CardContent>
    <CardActions>
      <Button
        sx={{
          color: 'white',
          margin: '10px',
          padding: '10px',
          backgroundColor: '#256D85',
          '&:hover': {
            backgroundColor: '#256D85',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        size="small"
      >
        {button}
      </Button>
    </CardActions>
  </Card>
)
export default EventCard

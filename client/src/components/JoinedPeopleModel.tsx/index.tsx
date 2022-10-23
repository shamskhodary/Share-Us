/* eslint-disable no-unused-vars */
import { FC, useState } from 'react'
import {
  Button, Typography, TextField, Box,
} from '@mui/material'
import Modal from '@mui/material/Modal'
import './style.css'
import IModalProps from '../../interfaces/props/IModalProps'

const JoinedPeopleModel:FC<IModalProps> = ({ handleClose, open, joinedPeople }) => {
  console.log('***************', joinedPeople)
  return (
    <div className="following-popup">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="joined-container"
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontWeight: '600',
              fontSize: '1.4rem',
              lineHeight: '49px',
              color: ' #2A2A2A',
              textAlign: 'center',
            }}
          >
            Joined People
          </Typography>
          <hr />

          {
          joinedPeople.map((ele):any => (
            <div className="user">
              <div className="username">
                <img
                  src={ele.User.profileImg}
                  alt=""
                />
                <Typography sx={{ fontWeight: 600 }}>{ele.User.username}</Typography>
              </div>
              <Button className="follow-btn">
                Follow
              </Button>
            </div>
          ))
        }

        </Box>
      </Modal>
    </div>
  )
}

export default JoinedPeopleModel

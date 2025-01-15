// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
// //   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// export default function ConfirmationModal({handleOpen, handleClose ,message, handleAccept , handleReject,rejectModalOpen}) {

//   return (
//     <div>
//       <Modal
//         open={handleOpen || rejectModalOpen}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//           Are You Sure Want To {message}
//           </Typography>
//          {rejectModalOpen &&<Button onClick={handleReject}>Yes</Button>} 
//          {handleAccept &&<Button onClick={handleAccept}>Yes</Button>} 
//           <Button onClick={handleClose}>No</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 8, // Adding border radius for a softer look
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({
  handleOpen,
  handleClose,
  message,
  handleAccept,
  handleReject,
  rejectModalOpen,
  deleteModalOpen,
  handleDelete
}) {
  return (
    <Modal
      open={handleOpen || rejectModalOpen || deleteModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      
    >
      <Box sx={style} className='confirm-model'>
        <Typography className='confirm-model' id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 3 }}>
          Are you sure you want to {message} ?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {handleAccept && (
            <Button onClick={handleAccept} sx={{ marginRight: 1 }} variant="contained" color="primary">
              Yes
            </Button>
          )}
          {rejectModalOpen && (
            <Button onClick={handleReject} sx={{ marginRight: 1 }} variant="contained" color="error">
              Yes
            </Button>
          )}
          {deleteModalOpen && (
            <Button onClick={handleDelete} sx={{ marginRight: 1 }} variant="contained" color="error">
              Yes
            </Button>
          )}
          <Button onClick={handleClose} variant="outlined">
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

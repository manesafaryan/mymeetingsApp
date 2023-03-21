import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FunctionComponent } from "react";
import { ReactElement } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  acceptBtnName: string;
  modalBtnName: string;
  children: ReactElement<any | string>;
  onAccept: () => void;
}

const KeepMountedModal: FunctionComponent<IProps> = ({
  acceptBtnName,
  onAccept,
  children,
  modalBtnName,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAccept = () => {
    setOpen(false);
    onAccept();
  };

  return (
    <div>
      <Button onClick={handleOpen}>{modalBtnName}</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {children}
          <button onClick={handleAccept}>{acceptBtnName}</button>
        </Box>
      </Modal>
    </div>
  );
};

export default KeepMountedModal;

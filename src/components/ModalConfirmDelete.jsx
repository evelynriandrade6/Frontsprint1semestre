import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

function ModalConfirmDelete({ open, onConfirm, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir a reserva ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalConfirmDelete;

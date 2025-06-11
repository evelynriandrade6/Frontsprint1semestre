import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

function ModalConfirmDelete({ open, onConfirm, onClose, mensagem }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      // Evita conflitos de foco com o modal principal
      disableEnforceFocus
      disableRestoreFocus
      // Garante que fique acima do modal principal
      PaperProps={{
        sx: { zIndex: 3000 }
      }}
    >
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {mensagem || "Tem certeza que deseja excluir a reserva?"}
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

import React, { FC } from "react";
import { Dialog, DialogTitle, DialogContent, Button, TextareaAutosize } from "@mui/material";

interface JustificationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (justification: string) => void;
}

const JustificationDialog: FC<JustificationDialogProps> = ({ open, onClose, onConfirm }) => {
    const [justification, setJustification] = React.useState("");

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Justification du refus</DialogTitle>
            <DialogContent>
                <TextareaAutosize
                    minRows={3}
                    placeholder="Saisissez votre justification..."
                    style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                />
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                    <Button onClick={onClose} color="primary">
                        Annuler
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm(justification);
                            onClose();
                        }}
                        color="secondary"
                        variant="contained"
                        style={{ marginLeft: "10px" }}
                    >
                        Confirmer
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default JustificationDialog;

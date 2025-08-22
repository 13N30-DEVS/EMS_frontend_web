import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  TextField,
  Chip,
  Alert,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dayjs } from "dayjs";
import ClockPopover from "../Common/ClockPopover";

export type Shift = {
  name: string;
  inTime: Dayjs | null;
  outTime: Dayjs | null;
  desc: string;
};

type ShiftSelectorProps = {
  open: boolean;
  onClose: () => void;
  onSave: (selected: Shift[]) => void;
  selectedShifts: Shift[];
};

const PRIMARY_BLUE = "#355ad5";
const ACTION_GREEN = "#169f54";

const ShiftSelector: React.FC<ShiftSelectorProps> = ({
  open,
  onClose,
  onSave,
  selectedShifts,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));

  const maxModalWidth = useMemo(() => {
    if (isXs) return "92vw";
    if (isSmallScreen) return 380;
    return 440;
  }, [isXs, isSmallScreen]);

  const [newShift, setNewShift] = useState<Shift>({
    name: "",
    inTime: null,
    outTime: null,
    desc: "",
  });
  const [error, setError] = useState("");
  const [added, setAdded] = useState<Shift[]>(selectedShifts);

  useEffect(() => {
    if (open) {
      setAdded(selectedShifts);
      setNewShift({ name: "", inTime: null, outTime: null, desc: "" });
      setError("");
    }
  }, [open, selectedShifts]);

  const validateShift = useCallback(
    (shift: Shift) => {
      if (!shift.name.trim()) return "Please enter shift name.";
      if (!shift.inTime || !shift.outTime) return "Please select both In-Time and Out-Time.";
      if (
        added.find(
          (s) => s.name.trim().toLowerCase() === shift.name.trim().toLowerCase()
        )
      )
        return "This shift already exists.";
      if (shift.inTime.isSame(shift.outTime))
        return "In-Time and Out-Time cannot be the same.";
      return "";
    },
    [added]
  );

  const handleAdd = () => {
    const errorMsg = validateShift(newShift);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setAdded((prev) => [...prev, { ...newShift }]);
    setNewShift({ name: "", inTime: null, outTime: null, desc: "" });
    setError("");
  };

  const handleChipDelete = useCallback(
    (name: string) => setAdded((prev) => prev.filter((item) => item.name !== name)),
    []
  );

  const handleCancel = () => {
    setError("");
    setAdded(selectedShifts);
    onClose();
  };

  const handleSave = () => {
    if (added.length === 0) {
      setError("Please add at least one shift before saving.");
      return;
    }
    setError("");
    onSave(added);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="shift-modal-title"
      BackdropProps={{
        sx: { bgcolor: "rgba(30,41,80,0.28)", backdropFilter: "blur(7px)" },
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={16}
          sx={{
            width: "100%",
            maxWidth: maxModalWidth,
            maxHeight: "90vh",
            overflowY: "auto",
            borderRadius: 2,
            boxShadow: "0 12px 42px #223caa32",
            pb: 3,
            position: "relative",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#c1c1c1", borderRadius: 2 },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: PRIMARY_BLUE,
              color: "#fff",
              px: 3,
              py: 2,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderBottom: "3px solid #5084f1",
              position: "sticky",
              top: 0,
              zIndex: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="shift-modal-title" fontWeight={700} fontSize={18} noWrap sx={{ userSelect:"none" }}>
              Setup Shifts
            </Typography>
            <IconButton size="small" onClick={handleCancel} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Add Shift Form */}
          <Box sx={{ px: 3, pt: 3, pb: 2 }}>
            <Typography fontWeight={700} fontSize={16} pb={2}>
              Add Shift
            </Typography>

            <Box mb={2}>
              <TextField
                placeholder="Enter your shift name"
                label="Shift Name"
                value={newShift.name}
                onChange={(e) => setNewShift((p) => ({ ...p, name: e.target.value }))}
                size="small"
                fullWidth
              />
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2} width="100%">
              <ClockPopover label="In-Time" value={newShift.inTime} onChange={(val) => setNewShift((p) => ({ ...p, inTime: val }))} />
              <ClockPopover label="Out-Time" value={newShift.outTime} onChange={(val) => setNewShift((p) => ({ ...p, outTime: val }))} />
            </Stack>

            <Box mb={2}>
              <TextField
                label="Description"
                placeholder="Description (Optional)"
                value={newShift.desc}
                onChange={(e) => setNewShift((p) => ({ ...p, desc: e.target.value }))}
                size="small"
                multiline
                minRows={2}
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleAdd}
                variant="contained"
                sx={{ bgcolor: ACTION_GREEN, fontWeight: 600, px: 4, borderRadius: 1, "&:hover": { bgcolor: "#0c8f4f" } }}
              >
                Add
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mx: 2, mb: 2 }} />

          {/* Selected shifts */}
          <Box
            sx={{
              minHeight: 50,
              mx: 2,
              px: 1,
              pb: 1,
              border: "1px solid #dadada",
              borderRadius: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
              bgcolor: "#fff",
            }}
          >
            {added.length === 0 ? (
              <Typography sx={{ color: "#b5b8c5", fontSize: 15 }}>
                No shift added yet.
              </Typography>
            ) : (
              added.map((shift) => (
                <Chip
                  key={shift.name}
                  label={shift.name}
                  onDelete={() => handleChipDelete(shift.name)}
                  deleteIcon={<CloseIcon fontSize="small" />}
                  sx={{ fontWeight: 500, fontSize: 14, height: 32 }}
                />
              ))
            )}
          </Box>

          {error && <Alert severity="error" sx={{ mx: 3, my: 1.5 }}>{error}</Alert>}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3, px: 3 }}>
            <Button
              onClick={handleCancel}
              variant="outlined"
              sx={{ minWidth: 110, fontSize: { xs: 14, sm: 15 }, fontWeight: 600, borderRadius: 1, borderColor: "#b2b2b2", color: "#333", "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" }}}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ minWidth: 110, fontSize: { xs: 14, sm: 15 }, fontWeight: 600, borderRadius: 1, bgcolor: ACTION_GREEN, color: "#fff", "&:hover": { bgcolor: "#0c8f4f" } }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ShiftSelector;

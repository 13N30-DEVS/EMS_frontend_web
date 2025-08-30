import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Typography,
  Button,
  Modal,
  Paper,
  TextField,
  Chip,
  Alert,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';

const PRIMARY_BLUE = '#355ad5';

// Mock API for designations:
const fetchDesignations = async (): Promise<string[]> =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve([
          'Manager',
          'Team Lead',
          'Senior Developer',
          'Junior Developer',
          'Intern',
        ]),
      300
    )
  );

type DesignationSelectorProps = {
  open: boolean;
  onClose: () => void;
  onSave: (selected: string[]) => void;
  selectedDesignations: string[];
};

/* -------------------- Subcomponents -------------------- */

const DesignationList: React.FC<{
  items: string[];
  selected: string[];
  search: string;
  onSelect: (d: string) => void;
  onAddNew: () => void;
}> = memo(({ items, selected, search, onSelect, onAddNew }) => {
  const filtered = useMemo(
    () =>
      items.filter(
        d =>
          !selected.includes(d) &&
          d.toLowerCase().includes(search.toLowerCase().trim())
      ),
    [items, selected, search]
  );

  const noResults = search.trim() && filtered.length === 0;

  if (noResults) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          color: '#b5b8c5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span>Oops, there is no result match.</span>
        <Button
          startIcon={<AddIcon sx={{ color: PRIMARY_BLUE, fontSize: 20 }} />}
          onClick={onAddNew}
          sx={{
            mt: 1,
            fontWeight: 600,
            color: PRIMARY_BLUE,
            px: 2,
            bgcolor: '#eff3fd',
            borderRadius: 2,
            fontSize: { xs: 13, sm: 14 },
            '&:hover': { bgcolor: '#e5ecfb' },
          }}
        >
          Add New Designation
        </Button>
      </Box>
    );
  }

  if (!filtered.length) {
    return (
      <Box sx={{ py: 3, textAlign: 'center', color: '#b5b8c5' }}>
        No data found
      </Box>
    );
  }

  return (
    <List sx={{ p: 0, maxHeight: 180, overflowY: 'auto' }}>
      {filtered.map(d => (
        <ListItemButton
          key={d}
          onClick={() => onSelect(d)}
          sx={{
            px: 3,
            py: 1,
            borderBottom: '1px solid #f3f3f3',
            '&:last-child': { borderBottom: 0 },
          }}
        >
          <ListItemText primary={d} primaryTypographyProps={{ fontSize: 14 }} />
        </ListItemButton>
      ))}
    </List>
  );
});

const SelectedChips: React.FC<{
  selected: string[];
  onRemove: (d: string) => void;
}> = ({ selected, onRemove }) => (
  <Box
    sx={{
      bgcolor: '#fff',
      border: '1px solid #dadada',
      borderRadius: 2,
      minHeight: 40,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 1,
      p: 2,
      mb: 3,
    }}
  >
    {selected.length ? (
      selected.map(d => (
        <Chip
          key={d}
          label={d}
          onDelete={() => onRemove(d)}
          variant='outlined'
          sx={{
            bgcolor: '#fff',
            borderColor: '#e0e0e0',
            fontSize: 14,
            height: 30,
          }}
        />
      ))
    ) : (
      <Typography sx={{ color: '#b5b8c5', fontSize: 14 }}>
        No designation selected.
      </Typography>
    )}
  </Box>
);

const AddDesignationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (name: string, desc: string) => void;
}> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), desc.trim());
    setName('');
    setDesc('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: { bgcolor: 'rgba(40,51,90,0.26)', backdropFilter: 'blur(8px)' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: 360 },
          maxWidth: '96vw',
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 12px 40px #223caa30',
          mx: 'auto',
          my: { xs: 4, sm: 8 },
        }}
      >
        <Box sx={{ bgcolor: PRIMARY_BLUE, color: '#fff', py: 2, px: 3 }}>
          <Typography fontSize={{ xs: 16, sm: 18 }} fontWeight={700}>
            Add Designation
          </Typography>
        </Box>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <TextField
            fullWidth
            label='Designation Name'
            value={name}
            onChange={e => setName(e.target.value)}
            size='small'
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label='Description (optional)'
            value={desc}
            onChange={e => setDesc(e.target.value)}
            size='small'
            multiline
            minRows={3}
            sx={{ mb: 3 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Button onClick={onClose} variant='outlined'>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant='contained'
              disabled={!name.trim()}
              sx={{ bgcolor: '#0c8f4fff', '&:hover': { bgcolor: '#169f54' } }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

/* -------------------- Main Component -------------------- */

const DesignationSelector: React.FC<DesignationSelectorProps> = ({
  open,
  onClose,
  onSave,
  selectedDesignations,
}) => {
  const [designations, setDesignations] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    fetchDesignations().then(setDesignations);
  }, []);

  useEffect(() => {
    if (open) {
      setSelected(selectedDesignations);
      setSearch('');
      setError('');
    }
  }, [open, selectedDesignations]);

  const handleSave = () => {
    if (!selected.length) {
      setError('Please select at least one designation.');
      return;
    }
    onSave(selected);
    onClose();
  };

  const handleAddDesignation = (name: string) => {
    if (designations.includes(name)) {
      alert('This designation already exists.');
      return;
    }
    setDesignations(prev => [...prev, name]);
    setSelected(prev => [...prev, name]);
    setAddModalOpen(false);
  };

  const handleRemove = useCallback(
    (d: string) => setSelected(s => s.filter(x => x !== d)),
    []
  );
  const handleSelect = useCallback(
    (d: string) => setSelected(s => [...s, d]),
    []
  );

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        BackdropProps={{
          sx: { bgcolor: 'rgba(30,41,80,0.20)', backdropFilter: 'blur(6px)' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            px: 1,
          }}
        >
          <Paper
            sx={{
              width: { xs: '100%', sm: 420 },
              maxWidth: '96vw',
              maxHeight: '90vh',
              overflow: 'auto',
              borderRadius: 2,
              boxShadow: '0 12px 40px #223caa30',
            }}
          >
            {/* Header (no + symbol) */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: PRIMARY_BLUE,
                color: '#fff',
                px: 2,
                py: 1.5,
                borderBottom: '4px solid #5084f1',
              }}
            >
              <Typography fontWeight={700} fontSize={{ xs: 16, sm: 18 }}>
                Setup Designations
              </Typography>
              <Button
                onClick={() => setSelected(designations)}
                sx={{ color: '#fff', fontWeight: 700, textTransform: 'none' }}
              >
                Select All
              </Button>
            </Box>

            {/* Content */}
            <Box sx={{ px: 2, py: 3, bgcolor: '#fafbfc' }}>
              {/* Search and Add button */}
              <Box
                sx={{
                  border: '1px solid #dadada',
                  borderRadius: 2,
                  bgcolor: '#fff',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    borderBottom: '1px solid #eaeaea',
                  }}
                >
                  <SearchIcon sx={{ color: '#838383', fontSize: 22, mr: 1 }} />
                  <TextField
                    variant='standard'
                    placeholder='Search your designation'
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setError('');
                    }}
                    InputProps={{ disableUnderline: true, sx: { flex: 1 } }}
                  />
                </Box>

                <DesignationList
                  items={designations}
                  selected={selected}
                  search={search}
                  onSelect={handleSelect}
                  onAddNew={() => setAddModalOpen(true)}
                />
              </Box>

              {/* Selected chips */}
              <SelectedChips selected={selected} onRemove={handleRemove} />

              {/* Error */}
              {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Actions */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={onClose} variant='outlined'>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  variant='contained'
                  sx={{
                    bgcolor: '#0c8f4fff',
                    '&:hover': { bgcolor: '#169f54' },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>

      {/* Add Designation Modal */}
      <AddDesignationModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddDesignation}
      />
    </>
  );
};

export default DesignationSelector;

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  TextField,
  IconButton,
  Popover,
  InputAdornment,
  Button,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState, useEffect } from 'react';

type AmPm = 'AM' | 'PM';
export interface TimeParts {
  hour: number;
  minute: number;
  ampm: AmPm;
}
function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function getTimeParts(d: Dayjs | null): TimeParts {
  if (!d) return { hour: 9, minute: 0, ampm: 'AM' };
  let hour = d.hour() % 12;
  hour = hour === 0 ? 12 : hour;
  return { hour, minute: d.minute(), ampm: d.hour() >= 12 ? 'PM' : 'AM' };
}
function buildDayjsFromParts({ hour, minute, ampm }: TimeParts): Dayjs {
  const h =
    ampm === 'PM' ? (hour === 12 ? 12 : hour + 12) : hour === 12 ? 0 : hour;
  return dayjs().hour(h).minute(minute).second(0).millisecond(0);
}
function formatTime(d: Dayjs | null) {
  return d ? d.format('hh:mm A') : '';
}

type ClockPopoverProps = {
  label: string;
  value: Dayjs | null;
  onChange: (t: Dayjs) => void;
};

const TimeSpinner: React.FC<{
  value: TimeParts;
  onChange: (t: TimeParts) => void;
}> = ({ value, onChange }) => {
  const [internal, setInternal] = useState<TimeParts>(value);
  useEffect(() => {
    setInternal(value);
  }, [value]);
  const { hour, minute, ampm } = internal;
  const setTime = (h: number, m: number, ap: AmPm) =>
    setInternal({ hour: h, minute: m, ampm: ap });

  // Minimal spinner field style
  const fieldStyle = {
    width: 24,
    textAlign: 'center' as const,
    padding: 0,
    fontSize: 14,
    fontFamily: 'inherit',
    background: 'transparent',
    height: 24,
    lineHeight: '24px',
    verticalAlign: 'middle' as const,
    border: 'none',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 0.5, // reduced padding between spinner and popover edge
        py: 0.5,
        bgcolor: 'transparent',
        minWidth: 0,
      }}
    >
      {/* Hour */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 0,
        }}
      >
        <IconButton
          size='small'
          sx={{ p: '1px', m: 0, height: 13 }}
          onClick={() => setTime(hour === 12 ? 1 : hour + 1, minute, ampm)}
        >
          <ArrowDropUpIcon fontSize='small' />
        </IconButton>
        <TextField
          value={pad(hour)}
          size='small'
          inputProps={{
            style: fieldStyle,
            readOnly: true,
          }}
          variant='standard'
          sx={{
            '& .MuiInputBase-root': { justifyContent: 'center', height: 22 },
          }}
        />
        <IconButton
          size='small'
          sx={{ p: '1px', m: 0, height: 13 }}
          onClick={() => setTime(hour === 1 ? 12 : hour - 1, minute, ampm)}
        >
          <ArrowDropDownIcon fontSize='small' />
        </IconButton>
      </Box>

      {/* Colon */}
      <Box
        sx={{
          px: 0.3,
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '24px',
          color: '#444',
          userSelect: 'none',
        }}
      >
        :
      </Box>

      {/* Minute */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 0,
        }}
      >
        <IconButton
          size='small'
          sx={{ p: '1px', m: 0, height: 13 }}
          onClick={() => setTime(hour, minute === 59 ? 0 : minute + 1, ampm)}
        >
          <ArrowDropUpIcon fontSize='small' />
        </IconButton>
        <TextField
          value={pad(minute)}
          size='small'
          inputProps={{
            style: fieldStyle,
            readOnly: true,
          }}
          variant='standard'
          sx={{
            '& .MuiInputBase-root': { justifyContent: 'center', height: 22 },
          }}
        />
        <IconButton
          size='small'
          sx={{ p: '1px', m: 0, height: 13 }}
          onClick={() => setTime(hour, minute === 0 ? 59 : minute - 1, ampm)}
        >
          <ArrowDropDownIcon fontSize='small' />
        </IconButton>
      </Box>

      {/* AM/PM */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          ml: 0.2,
        }}
      >
        <IconButton
          size='small'
          sx={{ p: '1px', m: 0, height: 13 }}
          onClick={() => setTime(hour, minute, ampm === 'AM' ? 'PM' : 'AM')}
        >
          <ArrowDropUpIcon fontSize='small' />
        </IconButton>
        <TextField
          value={ampm}
          size='small'
          inputProps={{
            style: {
              ...fieldStyle,
              width: 27,
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: 12,
            },
            readOnly: true,
          }}
          variant='standard'
          sx={{
            '& .MuiInputBase-root': { justifyContent: 'center', height: 22 },
          }}
        />
        <IconButton
          size='small'
          sx={{ p: '1px', m: 0, height: 13 }}
          onClick={() => setTime(hour, minute, ampm === 'AM' ? 'PM' : 'AM')}
        >
          <ArrowDropDownIcon fontSize='small' />
        </IconButton>
      </Box>

      {/* SET */}
      <Box
        sx={{
          minHeight: 24,
          height: 24,
          ml: 0.7,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            color: '#2962ff',
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: 1,
            cursor: 'pointer',
            height: 24,
            lineHeight: '24px',
            userSelect: 'none',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
          onClick={() => onChange(internal)}
        >
          SET
        </Button>
      </Box>
    </Box>
  );
};

const ClockPopover: React.FC<ClockPopoverProps> = ({
  label,
  value,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        label={label}
        value={formatTime(value)}
        InputProps={{
          readOnly: true,
          sx: { fontSize: 14, height: 35, p: 0.5 }, // more compact input
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={handleOpen}
                size='small'
                sx={{ color: '#355ad5' }}
              >
                <AccessTimeIcon fontSize='small' />
              </IconButton>
            </InputAdornment>
          ),
        }}
        size='small'
        fullWidth
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            boxShadow: 2,
            borderRadius: 1.3, // slightly less round for tight look
            border: '1px solid #edeef0', // subtle border
            minWidth: 0,
            maxWidth: 'none',
            p: 0, // *** no extra popover padding!
            bgcolor: '#fff',
            mt: '2px', // hugs the input even closer
          },
        }}
      >
        <TimeSpinner
          value={getTimeParts(value)}
          onChange={(parts: TimeParts) => {
            onChange(buildDayjsFromParts(parts));
            handleClose();
          }}
        />
      </Popover>
    </>
  );
};

export default ClockPopover;

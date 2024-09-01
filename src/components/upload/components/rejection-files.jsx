import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { varAlpha } from 'src/theme/styles';

import { fileData } from '../../file-thumbnail';

// ----------------------------------------------------------------------

export function RejectionFiles({ files }) {
  if (!files.length) {
    return null;
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        textAlign: 'left',
        borderStyle: 'dashed',
        borderColor: 'error.main',
        bgcolor: (theme) => varAlpha(theme.vars.palette.error.mainChannel, 0.08),
      }}
    >
      {files.map(({ file, errors }) => {
        // const { path, size } = fileData(file);
        const { path } = fileData(file);

        return (
          <Box key={path} sx={{ my: 1 }}>


            {errors.map((error) => (
              <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
                - {error.message}
              </Box>
            ))}
          </Box>
        );
      })}
    </Paper>
  );
}

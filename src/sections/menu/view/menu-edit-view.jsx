import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import fa from 'src/locales/fa';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { MenuNewEditForm } from '../menu-new-edit-form';

// ----------------------------------------------------------------------

export function MenuEditView({ menu: currentMenu, Loading }) {
  const t = fa;
  const navigate = useNavigate();
  return (
    <DashboardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CustomBreadcrumbs
          heading={t.dashboard.tableCommon.edit}
          links={[
            { name: t.dashboard.title, href: paths.dashboard.root },
            { name: t.dashboard.pages.menu, href: paths.dashboard.menu.list },
            { name: currentMenu?.title },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Button
          onClick={() => navigate(-1)}
          type="button"
          variant="contained"
          sx={{ height: 'fit-content' }}
        >
          {t.store.common.back}
        </Button>
      </Box>
      <MenuNewEditForm Loading={Loading} currentMenu={currentMenu} />
    </DashboardContent>
  );
}
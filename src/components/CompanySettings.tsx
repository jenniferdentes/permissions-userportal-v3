import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useColorScheme } from '@mui/material/styles';
import { CubXLogo } from '../icons';

// ─── Theme toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        size="small"
        sx={{ color: 'var(--portal-icon-base)', '&:hover': { bgcolor: 'action.hover' } }}
      >
        {mode === 'dark'
          ? <LightModeOutlinedIcon fontSize="small" />
          : <DarkModeOutlinedIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

// ─── Sidebar nav item ─────────────────────────────────────────────────────────

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Box
      component="a"
      href="#"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textDecoration: 'none' }}
    >
      <Box sx={(t) => ({
        width: '100%', height: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '6px',
        bgcolor: active ? 'secondary.dark' : 'transparent',
        color: active ? 'primary.main' : 'action.active',
        '&:hover': { bgcolor: active ? 'secondary.dark' : 'action.hover' },
        transition: 'background-color 150ms ease',
        ...(active && t.applyStyles('dark', {
          bgcolor: 'action.selected',
          '&:hover': { bgcolor: 'action.selected' },
        })),
      })}>
        {icon}
      </Box>
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', textAlign: 'center', width: '66px', letterSpacing: '0.4px', lineHeight: 1.66, mt: 0.25 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Sidebar content (shared between desktop nav + mobile Drawer) ─────────────

function SidebarContent() {
  return (
    <>
      {/* Logo + collapse toggle */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2.5 }}>
        <CubXLogo className="w-7 h-7" />
        <Tooltip title="Expand sidebar" placement="right">
          <IconButton size="small" sx={{ color: 'action.active', '&:hover': { bgcolor: 'action.hover' } }}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Primary nav */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
        <NavItem icon={<HomeOutlinedIcon />}           label="Home"            active />
        <NavItem icon={<SecurityOutlinedIcon />}       label="Quarantine" />
        <NavItem icon={<ImportContactsOutlinedIcon />} label="Directory" />
        <NavItem icon={<LockOutlinedIcon />}           label="Security Center" />
        <NavItem icon={<DashboardOutlinedIcon />}      label="Apps" />
      </Box>

      <Divider sx={{ my: 3, mx: 1 }} />

      {/* Company tools */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 1 }}>
        <Typography
          variant="overline"
          sx={{ textAlign: 'center', color: 'text.secondary', lineHeight: 1.2, px: 0.5, display: 'block' }}
        >
          Company{'\n'}Tools
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <NavItem icon={<PeopleOutlinedIcon />}      label="Manage Users" />
          <NavItem icon={<CheckCircleOutlinedIcon />} label="Requests" />
        </Box>
      </Box>
    </>
  );
}

// ─── Info field ───────────────────────────────────────────────────────────────

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: { xs: '100%', sm: 248 } }}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, color: 'text.primary' }}>
        {value}
      </Typography>
    </Box>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: { xs: '8px', md: '12px' },
        p: { xs: 2, md: 3 },
        boxShadow: '0px 1px 1px rgba(16,24,40,0.05)',
      }}
    >
      {children}
    </Paper>
  );
}

// ─── Shared outlined button style ─────────────────────────────────────────────

const logoButtonSx = {
  bgcolor: 'background.default',
  border: '1px solid var(--portal-primary-states-outlined-border)',
  color: 'var(--portal-primary-text-outline)',
  fontWeight: 500,
  fontSize: '0.8125rem',
  lineHeight: '22px',
  px: '14px',
  py: '4px',
  borderRadius: '8px',
  boxShadow: '0px 1px 2px rgba(16,24,40,0.05)',
  '&:hover': { bgcolor: 'var(--portal-primary-states-hover)', boxShadow: 'none' },
} as const;

// ─── Main component ───────────────────────────────────────────────────────────

export default function CompanySettings() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'var(--portal-elevation-1)' }}>

      {/* ── Mobile Drawer ── */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 83,
              bgcolor: 'background.default',
              borderRight: '1px solid var(--mui-palette-divider)',
            },
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* ── Desktop sidebar ── */}
      <Box
        component="nav"
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: 83,
          flexShrink: 0,
          bgcolor: 'background.default',
          borderRight: '1px solid var(--mui-palette-divider)',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflowY: 'auto',
        }}
      >
        <SidebarContent />
      </Box>

      {/* ── Right column ── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>

        {/* ── Top bar ── */}
        <Box sx={{
          bgcolor: 'var(--portal-elevation-1)',
          borderBottom: '1px solid var(--mui-palette-divider)',
          height: { xs: 60, md: 80 },
          px: { xs: 2, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          {/* Left: hamburger on mobile */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--portal-icon-base)' }}
          >
            <MenuIcon />
          </IconButton>

          {/* Right: controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 }, ml: 'auto' }}>
            <ThemeToggle />

            {/* Submit a Ticket */}
            <Button
              startIcon={<ConfirmationNumberOutlinedIcon />}
              sx={(t) => ({
                bgcolor: 'secondary.light',
                border: '1px solid var(--portal-secondary-outlined-border)',
                color: 'secondary.main',
                fontWeight: 500,
                borderRadius: '8px',
                boxShadow: '0px 1px 2px rgba(16,24,40,0.05)',
                fontSize: '1rem',
                lineHeight: '26px',
                py: '8px',
                '&:hover': { bgcolor: 'secondary.dark', boxShadow: 'none' },
                '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 } },
                px: { xs: '10px', sm: '22px' },
                minWidth: { xs: 40, sm: 'auto' },
                ...t.applyStyles('dark', {
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover', boxShadow: 'none' },
                }),
              })}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Submit a Ticket
              </Box>
            </Button>

            {/* Company logo + name */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: 'background.paper',
              }}>
                <CubXLogo className="w-6 h-6" />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                RiverStone Insurance
              </Typography>
            </Box>

            {/* User avatar */}
            <Avatar sx={{
              width: 40, height: 40,
              bgcolor: 'var(--portal-accent1-light)',
              color: 'var(--portal-accent1-dark)',
              fontWeight: 400,
              fontSize: '1.25rem',
              letterSpacing: '0.14px',
              cursor: 'pointer',
            }}>
              GH
            </Avatar>
          </Box>
        </Box>

        {/* ── Main content ── */}
        <Box sx={{ flex: 1, p: { xs: 2, sm: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* Page title */}
          <Typography sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
            fontWeight: 700,
            letterSpacing: '0.25px',
            lineHeight: 1.235,
            color: 'text.primary',
          }}>
            Company Settings
          </Typography>

          {/* ── Card: Company Info ── */}
          <SettingsCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ApartmentOutlinedIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                  Company Info
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', gap: 3 }}>
                  <InfoField label="Company Name" value="RiverStone Insurance" />
                  <InfoField label="Joined"       value="Jan 15, 2023" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap', gap: 3 }}>
                  <InfoField label="Website" value="www.riverstone.com" />
                  <InfoField label="Phone"   value="(671) 555-0110" />
                </Box>
              </Box>
            </Box>
          </SettingsCard>

          {/* ── Card: Company Logo ── */}
          <SettingsCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PermMediaOutlinedIcon sx={{ fontSize: 20, color: 'text.primary' }} />
                <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                  Company Logo
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{
                  width: 48, height: 48, borderRadius: '8px',
                  border: '1px solid var(--mui-palette-divider)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, overflow: 'hidden',
                }}>
                  <CubXLogo className="w-8 h-8" />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: '20px' }}>
                    riverstone-logo.png
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: '20px' }}>
                    4KB
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button startIcon={<FileUploadOutlinedIcon sx={{ fontSize: '18px !important' }} />} sx={logoButtonSx}>
                  Change Logo
                </Button>
                <Button startIcon={<DeleteOutlinedIcon sx={{ fontSize: '18px !important' }} />} sx={logoButtonSx}>
                  Remove Logo
                </Button>
              </Box>
            </Box>
          </SettingsCard>

        </Box>
      </Box>
    </Box>
  );
}

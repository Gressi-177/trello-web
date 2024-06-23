import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='label-select-dark-light-mode'>Mode</InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='dark-light-mode'
        value={mode}
        label='Mode'
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon fontSize='small' />
            Light
          </div>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlined fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightness fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box
        sx={{
          backgroundColor: 'primary.light',
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ModeSelect />
      </Box>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        Board bar
      </Box>
      <Box
        sx={{
          width: '100%',
          height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
          backgroundColor: 'primary.main'
        }}
      >
        Board Content
      </Box>
    </Container>
  )
}

export default App

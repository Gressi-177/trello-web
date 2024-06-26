import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
          icon={<DashboardIcon />}
          label='Viet Doan'
          clickable
        />
        <Chip
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
          icon={<VpnLockIcon />}
          label='Public / Private Workspace'
          clickable
        />
        <Chip
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
          icon={<AddToDriveIcon />}
          label='Add to Google Drive'
          clickable
        />
        <Chip
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
          icon={<BoltIcon />}
          label='Automation'
          clickable
        />
        <Chip
          sx={{
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '.MuiSvgIcon-root': {
              color: 'white'
            },
            '&:hover': {
              bgColor: 'primary.50'
            }
          }}
          icon={<FilterListIcon />}
          label='Filters'
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            borderColor: 'white',
            color: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { backgroundColor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title='vietdoan'>
            <Avatar
              alt='vietdoan'
              src='https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-1/442410842_1547368989153636_6278656583367096292_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YaaIx-L1IYIQ7kNvgHpQF6v&_nc_ht=scontent-sin6-2.xx&oh=00_AYAwC9Xr-2VwdEILQ06ptm9S4Y7EDd7E4xBiQlj5G3ZZnQ&oe=667F0BD9'
            />
          </Tooltip>
          <Tooltip title='vietdoan'>
            <Avatar
              alt='vietdoan'
              src='https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-1/442410842_1547368989153636_6278656583367096292_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YaaIx-L1IYIQ7kNvgHpQF6v&_nc_ht=scontent-sin6-2.xx&oh=00_AYAwC9Xr-2VwdEILQ06ptm9S4Y7EDd7E4xBiQlj5G3ZZnQ&oe=667F0BD9'
            />
          </Tooltip>
          <Tooltip title='vietdoan'>
            <Avatar
              alt='vietdoan'
              src='https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-1/442410842_1547368989153636_6278656583367096292_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YaaIx-L1IYIQ7kNvgHpQF6v&_nc_ht=scontent-sin6-2.xx&oh=00_AYAwC9Xr-2VwdEILQ06ptm9S4Y7EDd7E4xBiQlj5G3ZZnQ&oe=667F0BD9'
            />
          </Tooltip>
          <Tooltip title='vietdoan'>
            <Avatar
              alt='vietdoan'
              src='https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-1/442410842_1547368989153636_6278656583367096292_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YaaIx-L1IYIQ7kNvgHpQF6v&_nc_ht=scontent-sin6-2.xx&oh=00_AYAwC9Xr-2VwdEILQ06ptm9S4Y7EDd7E4xBiQlj5G3ZZnQ&oe=667F0BD9'
            />
          </Tooltip>
          <Tooltip title='vietdoan'>
            <Avatar
              alt='vietdoan'
              src='https://scontent-sin6-2.xx.fbcdn.net/v/t39.30808-1/442410842_1547368989153636_6278656583367096292_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YaaIx-L1IYIQ7kNvgHpQF6v&_nc_ht=scontent-sin6-2.xx&oh=00_AYAwC9Xr-2VwdEILQ06ptm9S4Y7EDd7E4xBiQlj5G3ZZnQ&oe=667F0BD9'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

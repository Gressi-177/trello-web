import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Columns/Column'

export default function ListColumns({ columns }) {
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          backgroundColor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {columns.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Add new column */}
        <Box
          sx={{
            maxWidth: '200px',
            minWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            backgroundColor: '#ffffff3d'
          }}
        >
          <Button
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
            startIcon={<NoteAddIcon />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

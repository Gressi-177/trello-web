import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'

function BoardContent({ board }) {
  //Yêu cầu chuột di chuyển ít nhất 10px trước khi kích hoạt sự kiện
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhấn giữ 250ms và dung sai cảm ứng 500px trước khi kích hoạt sự kiện
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // Ưu tiên sử dụng kết hợp cảm biến chuột và cảm biến chạm để có trải nghiệm tốt nhất trên cả máy tính và thiết bị di động
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumnsState.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
      // console.log('🚀 ~ handleDragEnd ~ dndOrderedColumns:', dndOrderedColumns)
      // const dndColumnOrderIds = dndOrderedColumns.map((c) => c._id)
      // console.log('🚀 ~ handleDragEnd ~ dndColumnOrderIds:', dndColumnOrderIds)
      setOrderedColumnsState(dndOrderedColumns)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumnsState} />
      </Box>
    </DndContext>
  )
}

export default BoardContent

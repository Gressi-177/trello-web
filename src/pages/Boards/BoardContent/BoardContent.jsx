import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import cloneDeep from 'lodash/cloneDeep'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Columns/Column'
import Card from './ListColumns/Columns/ListCards/Card/Card'
import ListColumns from './ListColumns/ListColumns'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  //Yêu cầu chuột di chuyển ít nhất 10px trước khi kích hoạt sự kiện
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // Nhấn giữ 250ms và dung sai cảm ứng 500px trước khi kích hoạt sự kiện
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  // Ưu tiên sử dụng kết hợp cảm biến chuột và cảm biến chạm để có trải nghiệm tốt nhất trên cả máy tính và thiết bị di động
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column?.cards?.map((card) => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    console.log('🚀 ~ handleDragStart ~ event:', event)

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //Card
    const { over, active } = event
    if (!over || !active) return

    const {
      id: activeDragingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDragingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại cột hoặc thẻ đang kéo thì không làm gì cả
    if (!activeColumn || !overColumn) return

    //Xử lý logic ở đây chỉ khi thẻ đang kéo qua cột khác, nếu kéo card trong cùng 1 cột thì không cần xử lý
    //Xử lý lúc kéo (handle drag over)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        //Tìm vị trí của thẻ của over card trong cột đích
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

        //Logic tính toán vị trí mới của thẻ đang kéo (trên hoặc dưới over card) lấy chuẩn từ code của thư viện
        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        //Clone mảng orderedColumnsState hiện tại ra một cái mới để tránh thay đổi trực tiếp state
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

        if (nextActiveColumn) {
          //Xóa card đang kéo khỏi cột hiện tại
          nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDragingCardId)

          //Cập nhật lại cardOrderIds của cột hiện tại
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
        }

        if (nextOverColumn) {
          // Kiểm tra xem thẻ đang kéo đã có trong cột đích chưa (nếu có thì xóa đi trước khi thêm vào vị trí mới)
          nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDragingCardId)

          // Thêm card đang kéo vào vị trí mới trong cột đích
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          //Cập nhật order
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
        }
        return nextColumns
      })
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: 0.5 } } })
  }
  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemId || !activeDragItemType) && null}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

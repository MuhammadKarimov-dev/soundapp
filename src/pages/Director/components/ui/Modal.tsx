import * as React from "react"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Orqa fon overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
          {/* Modal header */}
          <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal body */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 76px)' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
} 
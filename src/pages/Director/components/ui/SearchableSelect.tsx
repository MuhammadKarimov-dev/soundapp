import * as React from "react"
import { Search, X } from "lucide-react"

interface Option {
  id: number
  fullName: string
  position: string
}

interface SearchableSelectProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder: string
  multiple?: boolean
}

export function SearchableSelect({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder,
  multiple = true 
}: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchTerm("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredOptions = options.filter(option => 
    option.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (value: string) => {
    if (multiple) {
      onChange(
        selectedValues.includes(value)
          ? selectedValues.filter(v => v !== value)
          : [...selectedValues, value]
      )
    } else {
      onChange([value])
      setIsOpen(false)
      setSearchTerm("")
    }
  }

  const removeSelected = (value: string) => {
    onChange(selectedValues.filter(v => v !== value))
  }

  const getSelectedOptions = () => 
    options.filter(opt => selectedValues.includes(opt.id.toString()))

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className="w-full p-2 border rounded-md min-h-[42px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {getSelectedOptions().map(option => (
              <span 
                key={option.id} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {option.fullName}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSelected(option.id.toString())
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b sticky top-0 bg-white">
            <div className="flex items-center gap-2 bg-gray-50 rounded-md px-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 outline-none bg-transparent"
                placeholder="Qidirish..."
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>

          <div className="p-1">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`flex items-center justify-between p-2 hover:bg-gray-50 cursor-pointer rounded-md ${
                  selectedValues.includes(option.id.toString()) ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleSelect(option.id.toString())}
              >
                <div>
                  <div className="font-medium">{option.fullName}</div>
                  <div className="text-sm text-gray-500">{option.position}</div>
                </div>
                {selectedValues.includes(option.id.toString()) && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-center text-gray-500">
                Natija topilmadi
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 
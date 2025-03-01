import * as React from "react"

interface Option {
  id: number
  fullName: string
}

interface SearchableSelectProps {
  options: Option[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  multiple?: boolean
}

export function SearchableSelect({
  options,
  selectedValues,
  onChange,
  placeholder = "Tanlang",
  multiple = true
}: SearchableSelectProps) {
  const [search, setSearch] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)

  const filteredOptions = options.filter(option => 
    option.fullName.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (value: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      onChange(newValues)
    } else {
      onChange([value])
      setIsOpen(false)
    }
  }

  return (
    <div className="relative">
      <div 
        className="w-full p-2 border rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full outline-none"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selectedValues.includes(String(option.id)) ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleSelect(String(option.id))}
            >
              {option.fullName}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1 mt-2">
        {selectedValues.map((value) => {
          const option = options.find(o => String(o.id) === value)
          if (!option) return null
          return (
            <span 
              key={value}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {option.fullName}
              <button
                className="ml-1 text-blue-600 hover:text-blue-800"
                onClick={() => handleSelect(value)}
              >
                ×
              </button>
            </span>
          )
        })}
      </div>
    </div>
  )
} 
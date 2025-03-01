import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { LogOut } from "lucide-react"

export function UserNav() {
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2">
        <AvatarPrimitive.Root className="h-8 w-8 rounded-full bg-gray-200">
          <AvatarPrimitive.Image
            src="/placeholder-avatar.jpg"
            alt="Director"
            className="h-full w-full rounded-full object-cover"
          />
          <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-gray-100">
            D
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content className="w-56 rounded-md border bg-white p-2 shadow-md">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Director</p>
            <p className="text-xs text-gray-500">director@seezntv.com</p>
          </div>
          <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-200" />
          <DropdownMenuPrimitive.Item 
            className="flex cursor-pointer items-center px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Chiqish
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
} 
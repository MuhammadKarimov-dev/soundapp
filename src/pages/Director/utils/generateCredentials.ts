export function generateCredentials(fullName: string, position: string) {
  // Lotin harflarga o'tkazish
  const latinName = fullName
    .toLowerCase()
    .replace(/[^a-zA-Z\s]/g, '')
    .replace(/\s+/g, '_')

  // Pozitsiyaga qarab prefix
  const prefixMap: { [key: string]: string } = {
    "Rejissor": "director",
    "Sound rejissor": "sound",
    "Ovoz aktyori": "voice",
    "Tahrirchi": "editor"
  }

  const prefix = prefixMap[position] || "user"
  
  // Random raqam (100-999)
  const randomNum = Math.floor(Math.random() * 900 + 100)

  return {
    username: `${prefix}_${latinName}`,
    password: `${prefix}${randomNum}` // Masalan: director123
  }
} 
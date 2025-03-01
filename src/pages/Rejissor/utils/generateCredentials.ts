export function generateRejissorCredentials(fullName: string) {
  // Lotin harflarga o'tkazish
  const latinName = fullName
    .toLowerCase()
    .replace(/[^a-zA-Z\s]/g, '')
    .replace(/\s+/g, '_')
  
  // Random raqam (100-999)
  const randomNum = Math.floor(Math.random() * 900 + 100)

  return {
    username: `rejissor_${latinName}`,
    password: `rej${randomNum}` // Masalan: rej123
  }
} 
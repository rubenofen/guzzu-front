export function shortWalletId(id: string): string {
  if (!id) return 'none'
  if (id.length < 6) return id

  return `${id.slice(0, 6)}...${id.slice(id.length - 4)}`
}

export function copyToClipboard(text: string) {
  /* Select the text field */
  const TempText = document.createElement('input')
  TempText.value = text
  document.body.appendChild(TempText)
  TempText.select()

  document.execCommand('copy')
  document.body.removeChild(TempText)
}

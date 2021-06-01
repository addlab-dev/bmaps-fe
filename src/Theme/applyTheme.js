import mapTheme from './mapTheme'

const applyTheme = (theme) => {
  const themeObject = mapTheme(theme)

  if (!themeObject) {
    return null
  }

  const root = document.documentElement

  Object.keys(themeObject).forEach((property) => {
    root.style.setProperty(property, themeObject[property])
  })

  return theme
}

export default applyTheme
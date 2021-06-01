const mapTheme = (theme) => {
    return {
      '--gl-font-main': `${theme.fontMain}, sans-serif` || '',
      '--gl-font-title': `${theme.fontTitle}, sans-serif` || '',
      '--gl-color-primary': theme.primaryColor || '',
      '--gl-color-secondary': theme.secondaryColor || '',
    }
  }
  
  export default mapTheme
  
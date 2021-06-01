import Api from '../Api/Api'
import React,{useEffect,useState} from 'react'
import { useQuery } from 'react-query'
import applyTheme from '../Theme/applyTheme'
import PropTypes from 'prop-types'
import WebFont from 'webfontloader'
import defaultTheme from '../Theme/defaultTheme'
import Pages from '../Pages'


const Wrapper = ({ shopId }) => {
    const [data, setData] = useState(null);
  
  useEffect((id) => {
    Api.getData(shopId).then((res) => {
        setData(res.customizations[0])
        WebFont.load({
            google: {
              families: [`${res.customizations[0].body_font}:400,700`, `${res.customizations[0].title_font}:400,700`],
            },
          })
          const theme = {
            ...defaultTheme,
            fontMain: res.customizations[0].body_font,
            fontTitle: res.customizations[0].title_font,
            primaryColor: res.customizations[0].primary_color,
            secondaryColor: res.customizations[0].secondary_color,
          }
          applyTheme(theme)
    })
}, [])
  return <Pages  />
}

Wrapper.propTypes = {
  shopId: PropTypes.string.isRequired,
}

export default Wrapper

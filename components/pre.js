import { Prism } from 'react-syntax-highlighter'
import { funky } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const Pre = ({ children, className }) => {
  const lang = className.split('-')[1]

  return (
    <Prism language={lang} style={funky}>
      {children}
    </Prism>
  )
}

export default Pre

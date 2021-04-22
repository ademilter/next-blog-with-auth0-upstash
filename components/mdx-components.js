import Pre from './pre'

export const mdxComponents = {
  pre: ({ children }) => <Pre {...children.props} />
  // p: (props) => <p className="text-blue-900" {...props} />
}

## styled-as-components

A simple and [tiny](https://bundlephobia.com/result?p=styled-as-components) wrapper around styled-components that additionally allows you to do this:

```
const MyComponent = () => (<>
  <ChildA />
  <ChildB />
</>)

export default styled(MyComponent).as.div`
  display: flex;
`
```
Where '`<></>`' is the shorthand syntax for [React.Fragment](https://reactjs.org/docs/fragments.html).

This will render
```
  <div.styled>
    <ChildA/>
    <ChildB/>
  <div.styled>
```

All element types supported by styled-components are supported here.


#### Motivation
To create a container element with styled components you must create a styled component, and pull that in as the outer node of your component. E.g.:

```
import MyComponentWrapper from './MyComponentWrapper'

const MyComponent = (props) => (
  <MyComponentWrapper {...props}>
    <ChildA>
    <ChildB>
  </MyComponentWrapper>
)
```
styled-as-components allows you to skip this step and create the containing element on the fly in a single step with simply the `styled(MyComponent).as.element` syntax.

#### Considerations
When you consider your component a styled element container with contents, this pattern can be useful.

This pattern is not always suitable if you want to pass custom props to the styled-element, e.g. `onClick` or `isSpecialCase={a && b && !c}`. This pattern will require these props to be passed in different places or derived from within the styled-component itself. This may make refactoring if you want to revert from this pattern less obvious.

Note refs only work on class components. Since styled-as-components always wraps the provided component with a function component this will not work with refs.

## styled-as-components

A simple and tiny wrapper around styled-components that additionally allows you to do this:

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
styled-as-components allows you to skip this step and create the containing element on the fly in a single step with simply the `styled.as.element` syntax.

## styled-as-components

A simple and [tiny](https://bundlephobia.com/result?p=styled-as-components) wrapper around styled-components that additionally allows you to do this:

```javascript
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
```javascript
  <div.styled>
    <ChildA/>
    <ChildB/>
  <div.styled>
```

All element types supported by styled-components are supported here.

#### What is the problem being solved?
Styled-components allows you to create components that _have_ a styled element wrapper. Styled-as-components allows you to create components that _are_ a styled element wrapper. It's a conceptual tweak that can be nice in some cases, and stop you having to write `Wrapper` everywhere. In more detail:

To create a container element with styled components you create a named styled component, and pull that in as the outer node of your component. E.g.:

```javascript
const MyComponent = (props) => (
  <MyComponentWrapper {...props}>
    <ChildA>
  </MyComponentWrapper>
)

const MyComponentWrapper = styled.div`

`
// Ensure here the .eslintrc rule is like "no-use-before-define": ["error", { "variables": false }]
```
styled-as-components allows you to skip this step and create the containing element on the fly in a single step with simply the `styled(MyComponent).as.element` syntax:

```javascript
const MyComponent = (props) => (
  <ChildA>
)

export default(MyComponent).styled.as.div`

`
```

It's a small win, but it can be rather nice.

#### Considerations
This pattern stops being suitable if yould have wanted to pass custom props to the styled-element e.g. `isDerivedProp={a && b && !c}` that you feel should be managed from within the component, not the parent. I find this pretty rare when using proper separation of container and display components.

innerRef's should work the same, but just be aware the wrapped component is a stateless function component, so ref's won't work. This will all be updated soon anyway with the new 16.3 ref's api.

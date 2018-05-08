import React from 'react'
import styled from 'styled-components'

const domElements = Object.keys(styled)

function as(Target) {
  this.Target = Target
}

const styledAs = Target => {
  const templateFunction = styled(Target)
  templateFunction.as = new as(Target)
  return templateFunction
}

const createComponent = (StyledElement, Target) => {
  const comp = props => (
    <StyledElement {...props}>
      <Target {...props} />
    </StyledElement>
  )
  comp.displayName = `styled.${Target.name}.as.${StyledElement.displayName.slice(7)}`
  return comp
}

domElements.forEach(element => {
  function asTemplateFunction(...args) {
    const Target = this.Target
    const StyledElement = styled[element](...args)
    return createComponent(StyledElement, Target)
  }

  function asTemplateFunctionWithAttrs(attrs) {
    const Target = this.Target
    return function (...args) {
      const StyledElement = styled[element].attrs(attrs)(...args)
      return createComponent(StyledElement, Target)
    }
  }

  Object.defineProperty(as.prototype, element, {
    get() {
      this.bound = this.bound || Object.assign(asTemplateFunction, {
        attrs: asTemplateFunctionWithAttrs.bind(this),
      })
      return this.bound
    }
  });

  styledAs[element] = styled[element]
})

export * from 'styled-components'
export default styledAs

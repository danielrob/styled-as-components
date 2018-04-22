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

domElements.forEach(element => {
  as.prototype[element] = function(...args) {
    const StyledElement = styled[element](...args)
    const Target = this.Target
    return props => (
      <StyledElement {...props}>
        <Target {...props} />
      </StyledElement>
    )
  }
  styledAs[element] = styled[element]
})

export * from 'styled-components'
export default styledAs

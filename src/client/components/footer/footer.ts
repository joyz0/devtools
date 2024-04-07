import './footer.css'

export interface FooterProps {
  container: HTMLElement
}

export class Footer {
  protected _element: HTMLElement

  constructor(container: HTMLElement) {
    this._element = document.createElement('footer')
    this._element.classList.add('storybook-footer')
    // this._element.tabIndex = 0
    // this._element.setAttribute('role', 'button')
    this._element.style.backgroundColor = 'gray'
    this._element.innerText = 'Footer'
    container.appendChild(this._element)
  }

  get element() {
    return this._element
  }
}

export function createFooter(container: HTMLElement) {
  return new Footer(container)
}

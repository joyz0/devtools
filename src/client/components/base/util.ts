const userAgent = navigator.userAgent

export const isWebKit = userAgent.indexOf('AppleWebKit') >= 0

export function isIterable<T = any>(thing: any): thing is Iterable<T> {
  return (
    thing &&
    typeof thing === 'object' &&
    typeof thing[Symbol.iterator] === 'function'
  )
}

export function createSVG(url: string) {
  const img = document.createElement('img')
  img.src = url
  return img
}

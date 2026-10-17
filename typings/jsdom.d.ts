declare module 'jsdom' {
  export class JSDOM {
    window: {
      document: {
        querySelector(selector: string): {
          querySelectorAll(
            selector: string
          ): Iterable<{ textContent: string | null }>
        } | null
      }
    }
    constructor(html: string)
  }
}

import { type ProblemDetailDTO } from './dto'

export default class ProblemDetail extends Error {
  constructor(
    readonly status: number,
    public type: string = 'about:blank',
    public title?: string,
    public detail?: string,
    public instance?: string,
    public record?: Record<string, any>,
  ) {
    super(detail)
    this.checkIfStatusIsValid()
  }

  private checkIfStatusIsValid(): void {
    if (!Number.isInteger(this.status) || this.status < 100 || this.status > 599) {
      throw Error(`Status code ${this.status} is invalid`)
    }
  }

  /**
   * Transform this instance to a Data Transfer Object (DTO)
   */
  toDTO(): ProblemDetailDTO {
    const { type, title, detail, instance, record } = this
    return { type, title, detail, instance, ...record }
  }

  /**
   * Get an instance of ProblemDetail providing the HTTP status code.
   *
   * @param {number} status HTTP status code
   * @returns {ProblemDetail} Problem detail object
   */
  static forStatus(status: number): ProblemDetail {
    return new ProblemDetail(status)
  }

  /**
   * Get an instance of ProblemDetail providing the HTTP status code
   * and detail message.
   *
   * @param {number} status HTTP status code
   * @param {string} detail detail message
   * @returns {ProblemDetail} Problem detail object
   */
  static forStatusAndDetail(status: number, detail: string): ProblemDetail {
    return new ProblemDetail(status, undefined, undefined, detail)
  }
}

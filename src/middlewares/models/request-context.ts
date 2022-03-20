import { getNamespace } from 'node-request-context';

export const APP_NAMESPACE = 'city.library.namespace';
export class RequestContext {
  public readonly id: number;
  public request: Request;
  public response: Response;

  constructor(request: Request, response: Response) {
    this.id = Math.random();
    this.request = request;
    this.response = response;
  }

  public static currentRequestContext(): RequestContext {
    const namespace = getNamespace(APP_NAMESPACE);
    const rc = namespace.get('tid');
    return rc;
  }

  public static currentRequest(): Request {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request;
  }

  public static currentResponse(): Response {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.response;
  }

  public static currentUser() {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request['user'];
  }

  public static getMemberIdFromRequest(): string {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request['user']?.memberId;
  }

  public static getMemberNameFromRequest(): string {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request['user']?.memberName;
  }

  public static getUserAgentFromRequestHeader(): string {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request.headers['user-agent'];
  }

  public static getClientIpFromRequest(): string {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request?.['ip'];
  }

  public static getLangFromRequestHeader(): string {
    const requestContext = RequestContext.currentRequestContext();
    return requestContext.request.headers['x-custom-lang'] ?? 'en';
  }
}

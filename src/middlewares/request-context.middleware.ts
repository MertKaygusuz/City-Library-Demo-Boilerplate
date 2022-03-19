import { getNamespace, createNamespace } from 'node-request-context';
import { APP_NAMESPACE, RequestContext } from './models/request-context';

export function RequestContextMiddleware(req, res, next) {
  const rc = new RequestContext(req, res);

  const namespace =
    getNamespace(APP_NAMESPACE) || createNamespace(APP_NAMESPACE);

  namespace.run(() => {
    namespace.set('tid', rc);
    next();
  });
}

'use strict';

define('mbc/tests/adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('mbc/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('mbc/tests/authenticators/oauth2.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authenticators/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/oauth2.js should pass jshint.');
  });
});
define('mbc/tests/authenticators/torii.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authenticators/torii.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authenticators/torii.js should pass jshint.');
  });
});
define('mbc/tests/authorizers/oauth2.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | authorizers/oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/oauth2.js should pass jshint.');
  });
});
define('mbc/tests/components/permafocus-input.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/permafocus-input.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/permafocus-input.js should pass jshint.\ncomponents/permafocus-input.js: line 3, col 12, \'set\' is defined but never used.\ncomponents/permafocus-input.js: line 3, col 17, \'observer\' is defined but never used.\ncomponents/permafocus-input.js: line 3, col 27, \'A\' is defined but never used.\n\n3 errors');
  });
});
define('mbc/tests/controllers/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 3, col 9, \'computed\' is defined but never used.\ncontrollers/application.js: line 3, col 19, \'get\' is defined but never used.\ncontrollers/application.js: line 3, col 24, \'getProperties\' is defined but never used.\n\n3 errors');
  });
});
define('mbc/tests/controllers/customer.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/customer.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/customer.js should pass jshint.\ncontrollers/customer.js: line 3, col 9, \'computed\' is defined but never used.\ncontrollers/customer.js: line 3, col 19, \'get\' is defined but never used.\ncontrollers/customer.js: line 3, col 24, \'getProperties\' is defined but never used.\n\n3 errors');
  });
});
define('mbc/tests/controllers/login.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('mbc/tests/controllers/orders.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/orders.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/orders.js should pass jshint.\ncontrollers/orders.js: line 7, col 1, \'_\' is defined but never used.\ncontrollers/orders.js: line 3, col 24, \'getProperties\' is defined but never used.\n\n2 errors');
  });
});
define('mbc/tests/controllers/products.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/products.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/products.js should pass jshint.');
  });
});
define('mbc/tests/controllers/products/load.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/products/load.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/products/load.js should pass jshint.\ncontrollers/products/load.js: line 36, col 69, \'identification\' is not defined.\ncontrollers/products/load.js: line 36, col 85, \'password\' is not defined.\n\n2 errors');
  });
});
define('mbc/tests/helpers/date-format.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/date-format.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/date-format.js should pass jshint.');
  });
});
define('mbc/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('mbc/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('mbc/tests/helpers/dollar-format.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/dollar-format.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/dollar-format.js should pass jshint.\nhelpers/dollar-format.js: line 7, col 40, Missing semicolon.\n\n1 error');
  });
});
define('mbc/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }
});
/* global wait */
define('mbc/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'mbc/tests/helpers/start-app', 'mbc/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _mbcTestsHelpersStartApp, _mbcTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _mbcTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _mbcTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('mbc/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('mbc/tests/helpers/resolver', ['exports', 'mbc/resolver', 'mbc/config/environment'], function (exports, _mbcResolver, _mbcConfigEnvironment) {

  var resolver = _mbcResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _mbcConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _mbcConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('mbc/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('mbc/tests/helpers/start-app', ['exports', 'ember', 'mbc/app', 'mbc/config/environment'], function (exports, _ember, _mbcApp, _mbcConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    // use defaults, but you can override
    var attributes = _ember['default'].assign({}, _mbcConfigEnvironment['default'].APP, attrs);

    _ember['default'].run(function () {
      application = _mbcApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('mbc/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('mbc/tests/helpers/torii', ['exports', 'mbc/config/environment'], function (exports, _mbcConfigEnvironment) {
  exports.stubValidSession = stubValidSession;
  var sessionServiceName = _mbcConfigEnvironment['default'].torii.sessionServiceName;

  function stubValidSession(application, sessionData) {
    var session = application.__container__.lookup('service:' + sessionServiceName);

    var sm = session.get('stateMachine');
    Ember.run(function () {
      sm.send('startOpen');
      sm.send('finishOpen', sessionData);
    });
  }
});
define('mbc/tests/helpers/uppercase.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/uppercase.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/uppercase.js should pass jshint.');
  });
});
define('mbc/tests/models/customer.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/customer.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/customer.js should pass jshint.\nmodels/customer.js: line 4, col 24, \'getProperties\' is defined but never used.\nmodels/customer.js: line 5, col 24, \'belongsTo\' is defined but never used.\n\n2 errors');
  });
});
define('mbc/tests/models/order.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/order.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/order.js should pass jshint.\nmodels/order.js: line 4, col 19, \'get\' is defined but never used.\nmodels/order.js: line 4, col 24, \'getProperties\' is defined but never used.\nmodels/order.js: line 4, col 39, \'isEmpty\' is defined but never used.\n\n3 errors');
  });
});
define('mbc/tests/models/product.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/product.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/product.js should pass jshint.');
  });
});
define('mbc/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('mbc/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('mbc/tests/routes/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('mbc/tests/routes/customer.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/customer.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/customer.js should pass jshint.\nroutes/customer.js: line 4, col 19, \'transition\' is defined but never used.\n\n1 error');
  });
});
define('mbc/tests/routes/login.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('mbc/tests/routes/orders.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/orders.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/orders.js should pass jshint.\nroutes/orders.js: line 4, col 19, \'transition\' is defined but never used.\nroutes/orders.js: line 4, col 11, \'params\' is defined but never used.\n\n2 errors');
  });
});
define('mbc/tests/routes/products.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/products.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/products.js should pass jshint.');
  });
});
define('mbc/tests/routes/products/load.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/products/load.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/products/load.js should pass jshint.');
  });
});
define('mbc/tests/serializers/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | serializers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass jshint.');
  });
});
define('mbc/tests/test-helper', ['exports', 'mbc/tests/helpers/resolver', 'ember-qunit'], function (exports, _mbcTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_mbcTestsHelpersResolver['default']);
});
define('mbc/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('mbc/tests/torii-providers/quickbooks-oauth2.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | torii-providers/quickbooks-oauth2.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'torii-providers/quickbooks-oauth2.js should pass jshint.\ntorii-providers/quickbooks-oauth2.js: line 24, col 13, Forgotten \'debugger\' statement?\n\n1 error');
  });
});
define('mbc/tests/unit/routes/customers-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:customers', 'Unit | Route | customers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mbc/tests/unit/routes/customers-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/customers-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/customers-test.js should pass jshint.');
  });
});
define('mbc/tests/unit/routes/orders-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:orders', 'Unit | Route | orders', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mbc/tests/unit/routes/orders-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/orders-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/orders-test.js should pass jshint.');
  });
});
define('mbc/tests/unit/routes/products-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:products', 'Unit | Route | products', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('mbc/tests/unit/routes/products-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/products-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/products-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('mbc/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map

/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */
const { series, rimraf, } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps start',
    /**
     * Starts the builded app from the dist directory.
     */
    start: {
      script: 'cross-env NODE_ENV=production node -r dotenv/config dist/server.js',
      description: 'Starts the builded app',
    },
    /**
     * Serves the current app and watches for changes to restart it
     */
    serve: {
      inspector: {
        script: series(
          'nps banner.serve',
          'nodemon -r dotenv/config --watch src --watch .env --inspect'
        ),
        description: 'Serves the current app and watches for changes to restart it, you may attach inspector to it.'
      },
      script: series(
        'nps banner.serve',
        'nodemon -r dotenv/config --watch src --watch .env'
      ),
      description: 'Serves the current app and watches for changes to restart it'
    },
    /**
     * Builds the app into the dist directory
     */
    build: {
      script: series(
        'nps banner.build',
        'nps lint',
        'nps clean.dist',
        'nps transpile'
      ),
      description: 'Builds the app into the dist directory'
    },
    /**
     * Runs ESLint over your project
     */
    lint: {
      script: tslint(`./src/**/*.ts`),
      hiddenFromHelp: true
    },
    /**
     * Transpile your app into javascript
     */
    transpile: {
      script: `tsc --project ./tsconfig.json`,
      hiddenFromHelp: true
    },
    /**
     * Clean files and folders
     */
    clean: {
      default: {
        script: series(
          `nps banner.clean`,
          `nps clean.dist`
        ),
        description: 'Deletes the ./dist folder'
      },
      dist: {
        script: rimraf('./dist'),
        hiddenFromHelp: true
      }
    },
    /**
     * These run various kinds of tests. Default is unit.
     */
    test: {
      default: 'nps test.unit',
      unit: {
        default: {
          script: series(
            'nps banner.testUnit',
            'nps test.unit.pretest',
            'nps test.unit.run'
          ),
          description: 'Runs the unit tests'
        },
        watcher: {
          script: series(
            'nps banner.testUnit',
            'nps test.unit.pretest',
            'nps test.unit.watch'
          ),
          description: 'Runs the unit tests in watch mode'
        },
        pretest: {
          script: tslint(`./test/unit/**/*.ts`),
          hiddenFromHelp: true
        },
        run: {
          script: 'cross-env NODE_ENV=test jest --testPathPattern=unit --passWithNoTests',
          hiddenFromHelp: true
        },
        watch: {
          script: 'cross-env NODE_ENV=test jest --watch --testPathPattern=unit --passWithNoTests',
          hiddenFromHelp: true
        },
        verbose: {
          script: 'nps "test --verbose"',
          hiddenFromHelp: true
        },
        coverage: {
          script: 'nps "test.unit.run --coverage"',
          hiddenFromHelp: true
        }
      },
      integration: {
        default: {
          script: series(
            'nps banner.testIntegration',
            'nps test.integration.pretest',
            'nps test.integration.run'
          ),
          description: 'Runs the integration tests'
        },
        pretest: {
          script: tslint(`./test/integration/**.ts`),
          hiddenFromHelp: true
        },
        run: {
          // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
          script: 'cross-env NODE_ENV=test jest --testPathPattern=integration -i',
          hiddenFromHelp: true
        },
        verbose: {
          script: 'nps "test --verbose"',
          hiddenFromHelp: true
        },
        coverage: {
          script: 'nps "test --coverage"',
          hiddenFromHelp: true
        }
      },
      e2e: {
        default: {
          script: series(
            'nps banner.testE2E',
            'nps test.e2e.pretest',
            'nps test.e2e.run'
          ),
          description: 'Runs the e2e tests'
        },
        pretest: {
          script: tslint(`./test/e2e/**.ts`),
          hiddenFromHelp: true
        },
        run: {
          // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
          script: 'cross-env NODE_ENV=test jest --testPathPattern=e2e -i',
          hiddenFromHelp: true
        },
        verbose: {
          script: 'nps "test --verbose"',
          hiddenFromHelp: true
        },
        coverage: {
          script: 'nps "test --coverage"',
          hiddenFromHelp: true
        }
      },
    },
    /**
     * This creates pretty banner to the terminal
     */
    banner: {
      build: banner('build'),
      serve: banner('serve'),
      testUnit: banner('test.unit'),
      testIntegration: banner('test.integration'),
      testE2E: banner('test.e2e'),
      clean: banner('clean')
    }
  }
};

function banner(name) {
  return {
    hiddenFromHelp: true,
    silent: true,
    description: `Shows ${name} banners to the console`,
    script: runFast(`./commands/banner.ts ${name}`)
  };
}

function runFast(path) {
  return `ts-node-transpile-only ${path}`;
}

function tslint(path) {
  return `tslint -c ./tslint.json -p tsconfig.json '${path}' --format stylish`;
}

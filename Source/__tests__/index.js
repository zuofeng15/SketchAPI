// ********************************
// # Tester.js
// # Sketch Javascript API.
//
// All code (C) 2016 Bohemian Coding.
// ********************************
import { Document } from '../components/Document'

import { ApplicationTests } from './Application.test'
import { ArtboardTests } from '../components/__tests__/Artboard.test'
import { DocumentTests } from '../components/__tests__/Document.test'
import { GroupTests } from '../components/__tests__/Group.test'
import { ImageTests } from '../components/__tests__/Image.test'
import { LayerTests } from '../components/__tests__/Layer.test'
import { PageTests } from '../components/__tests__/Page.test'
import { RectangleTests } from './Rectangle.test'
import { SelectionTests } from './Selection.test'
import { SettingsTests } from '../api/__tests__/Settings.test'
import { ShapeTests } from '../components/__tests__/Shape.test'
import { StyleTests } from './Style.test'
import { TextTests } from '../components/__tests__/Text.test'
import { WrappedObjectTests } from './WrappedObject.test'

/**
 * Very simple unit testing utility.
 *
 *
 * At some point we may switch to using Mocha or some other test framework, but for
 * now we want to be able to invoke the tests from the Sketch side or from a plugin
 * command, so it's simpler to use a simple test framework of our own devising.
 */
module.exports = function runTests(context) {
  const _tests = []

  const testSuites = {
    suites: {
      Application: ApplicationTests,
      Artboard: ArtboardTests,
      Document: DocumentTests,
      Group: GroupTests,
      Image: ImageTests,
      Layer: LayerTests,
      Page: PageTests,
      Rectangle: RectangleTests,
      Selection: SelectionTests,
      Settings: SettingsTests,
      Shape: ShapeTests,
      Text: TextTests,
      WrappedObject: WrappedObjectTests,
      Style: StyleTests,
    },
  }

  /**
   * Run a collection of tests.
   *
   * The method takes a dictionary describing the tests to run.
   * The dictionary can contain two keys:
   * - suites: this is a dictionary of sub-collections, each of which is recursively run by calling this method again.
   * - tests: this is a dictionary of test functions, each of which is executed.
   *
   * The test functions are passed this tester object when they are executed, and should use the assertion methods on it
   * to perform tests.
   *
   * @param {dictionary} specification A dictionary describing the tests to run. See discussion.
   * @param {string} suiteName The name of the suite, if we're running a sub-collection. This will be null for the top level tests.
   * @return {dictionary} Returns a dictionary indicating how many tests ran, and a list of the passed, failed, and crashed tests.
   */
  function runUnitTests(specification = {}, suiteName) {
    const { suites = {}, tests = {} } = specification

    Object.keys(suites).forEach(suite => {
      runUnitTests(suites[suite], suite)
    })

    Object.keys(tests).forEach(name => {
      const test = tests[name]
      /** @type {array} List of failures in the currently running test. */
      let _testFailure
      try {
        test(context, Document.fromNative(MSDocumentData.new()))
      } catch (err) {
        _testFailure = err
      }

      if (_testFailure) {
        _tests.push({
          name,
          type: 'failed',
          suite: suiteName,
          reason: _testFailure,
        })
      } else {
        _tests.push({ name, type: 'passed', suite: suiteName })
      }
    })

    return _tests
  }

  const results = runUnitTests(testSuites)
  log(`${results.length} tests ran.`)
  log(`${results.filter(t => t.type === 'passed').length} tests succeeded.`)
  log(`${results.filter(t => t.type === 'failed').length} tests failed.`)
  log(`json results: ${JSON.stringify(results)}`)
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DEFAULT_INTERPOLATION_CONFIG, HtmlParser} from '@angular/compiler';

import {computeMsgId, decimalDigest, decimalIgnorePhDigest, sha1, sha1Digest} from '../../src/i18n/digest';
import {extractMessages} from '../../src/i18n/extractor_merger';
import * as i18n from '../../src/i18n/i18n_ast';

export function main(): void {
  describe('digest', () => {
    describe('digest', () => {
      it(`must return the ID if it's explicit`, () => {
        expect(sha1Digest({
          id: 'i',
          nodes: [],
          placeholders: {},
          placeholderToMessage: {},
          meaning: '',
          description: '',
          sources: [],
        })).toEqual('i');
      });
    });

    describe('decimalIgnorePhDigest', () => {
      function extractFirstMsg(html: string): i18n.Message {
        const htmlParser = new HtmlParser();
        const parseResult = htmlParser.parse(html, 'digest spec', true);
        return extractMessages(parseResult.rootNodes, DEFAULT_INTERPOLATION_CONFIG, [], {})
            .messages[0];
      }

      it('should returns the same id even if the placeholder/icu expression is different', () => {
        const HTML1 =
            `<div i18n>some element {{placeholder}} and {count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>`;
        const HTML2 =
            `<div i18n>some element {{ placeholder }} and { count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>} }</div>`;
        const HTML3 =
            `<div i18n>some element {{placeholder2}} and {count2, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>`;

        const id = decimalIgnorePhDigest(extractFirstMsg(HTML1));

        expect(decimalIgnorePhDigest(extractFirstMsg(HTML2))).toEqual(id);
        expect(decimalIgnorePhDigest(extractFirstMsg(HTML3))).toEqual(id);
      });

      it('should generate different ids from other digest functions', () => {
        const HTML =
            `<div i18n>some element {{placeholder}} and {count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>`;

        expect(sha1Digest(extractFirstMsg(HTML))).not.toEqual(decimalDigest(extractFirstMsg(HTML)));
        expect(decimalIgnorePhDigest(extractFirstMsg(HTML)))
            .not.toEqual(decimalDigest(extractFirstMsg(HTML)));
        expect(sha1Digest(extractFirstMsg(HTML)))
            .not.toEqual(decimalIgnorePhDigest(extractFirstMsg(HTML)));
      });
    });

    describe('sha1', () => {
      it('should work on empty strings',
         () => { expect(sha1('')).toEqual('da39a3ee5e6b4b0d3255bfef95601890afd80709'); });

      it('should returns the sha1 of "hello world"',
         () => { expect(sha1('abc')).toEqual('a9993e364706816aba3e25717850c26c9cd0d89d'); });

      it('should returns the sha1 of unicode strings',
         () => { expect(sha1('你好，世界')).toEqual('3becb03b015ed48050611c8d7afe4b88f70d5a20'); });

      it('should support arbitrary string size', () => {
        // node.js reference code:
        //
        // var crypto = require('crypto');
        //
        // function sha1(string) {
        //   var shasum = crypto.createHash('sha1');
        //   shasum.update(string, 'utf8');
        //   return shasum.digest('hex', 'utf8');
        // }
        //
        // var prefix = `你好，世界`;
        // var result = sha1(prefix);
        // for (var size = prefix.length; size < 5000; size += 101) {
        //   result = prefix + sha1(result);
        //   while (result.length < size) {
        //     result += result;
        //   }
        //   result = result.slice(-size);
        // }
        //
        // console.log(sha1(result));
        const prefix = `你好，世界`;
        let result = sha1(prefix);
        for (let size = prefix.length; size < 5000; size += 101) {
          result = prefix + sha1(result);
          while (result.length < size) {
            result += result;
          }
          result = result.slice(-size);
        }
        expect(sha1(result)).toEqual('24c2dae5c1ac6f604dbe670a60290d7ce6320b45');
      });
    });

    describe('decimal fingerprint', () => {
      it('should work on well known inputs w/o meaning', () => {
        const fixtures: {[msg: string]: string} = {
          '  Spaced  Out  ': '3976450302996657536',
          'Last Name': '4407559560004943843',
          'First Name': '6028371114637047813',
          'View': '2509141182388535183',
          'START_BOLDNUMEND_BOLD of START_BOLDmillionsEND_BOLD': '29997634073898638',
          'The customer\'s credit card was authorized for AMOUNT and passed all risk checks.':
              '6836487644149622036',
          'Hello world!': '3022994926184248873',
          'Jalape\u00f1o': '8054366208386598941',
          'The set of SET_NAME is {XXX, ...}.': '135956960462609535',
          'NAME took a trip to DESTINATION.': '768490705511913603',
          'by AUTHOR (YEAR)': '7036633296476174078',
          '': '4416290763660062288',
        };

        Object.keys(fixtures).forEach(
            msg => { expect(computeMsgId(msg, '')).toEqual(fixtures[msg]); });
      });

      it('should work on well known inputs with meaning', () => {
        const fixtures: {[msg: string]: [string, string]} = {
          '7790835225175622807': ['Last Name', 'Gmail UI'],
          '1809086297585054940': ['First Name', 'Gmail UI'],
          '3993998469942805487': ['View', 'Gmail UI'],
        };

        Object.keys(fixtures).forEach(
            id => { expect(computeMsgId(fixtures[id][0], fixtures[id][1])).toEqual(id); });
      });

      it('should support arbitrary string size', () => {
        const prefix = `你好，世界`;
        let result = computeMsgId(prefix, '');
        for (let size = prefix.length; size < 5000; size += 101) {
          result = prefix + computeMsgId(result, '');
          while (result.length < size) {
            result += result;
          }
          result = result.slice(-size);
        }
        expect(computeMsgId(result, '')).toEqual('2122606631351252558');
      });

    });
  });
}

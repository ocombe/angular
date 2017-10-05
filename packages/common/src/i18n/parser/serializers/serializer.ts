/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Node} from '../ml_parser/ast';

export abstract class Serializer {
  abstract load(content: string): I18nMessagesById;
}

export type I18nMessagesById = {[msgId: string]: (string | IcuContent)[]};

export type IcuContent = {
  cases: {[value: string]: Node},
  expression: string,
  type: string
};

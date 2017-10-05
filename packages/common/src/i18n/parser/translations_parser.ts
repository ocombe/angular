/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {I18nMessagesById, Serializer} from './serializers/serializer';

// dans l'out les indices impairs sont les strings et les pairs les ph.
// `decode("bonjour <ph name="monde"/>") -> ['bonjour', 'monde']`

export class TranslationsParser {
  constructor(private parser: Serializer) {}

  parse(translations: string): I18nMessagesById {
    const i18nMessagesByMsgId = this.parser.load(translations);
    console.log(JSON.stringify(i18nMessagesByMsgId));
    return i18nMessagesByMsgId;
  }
}

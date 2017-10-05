/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ml from '../ml_parser/ast';
import {I18nError} from '../ml_parser/parse_util';
import {Parser} from '../ml_parser/parser';
import {getXmlTagDefinition} from '../ml_parser/xml_tags';
import {IcuContent, Serializer, I18nMessagesById} from './serializer';

const _PLACEHOLDER_TAG = 'x';
const _FILE_TAG = 'file';
const _SOURCE_TAG = 'source';
const _TARGET_TAG = 'target';
const _UNIT_TAG = 'trans-unit';

// http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
// http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
export class Xliff extends Serializer {
  load(content: string): I18nMessagesById {
    // xliff to xml nodes
    const xliffParser = new XliffParser();
    const {msgIdToHtml, errors} = xliffParser.parse(content);

    // xml nodes to i18n messages
    const i18nMessagesById: {[msgId: string]: string[]} = {};
    const converter = new XmlToI18n();

    Object.keys(msgIdToHtml).forEach(msgId => {
      const {i18nMessages, errors: e} = converter.convert(msgIdToHtml[msgId]);
      errors.push(...e);
      i18nMessagesById[msgId] = i18nMessages;
    });

    if (errors.length) {
      throw new Error(`xliff parse errors:\n${errors.join('\n')}`);
    }

    return i18nMessagesById;
  }
}

// TODO(vicb): add error management (structure)
// Extract messages as xml nodes from the xliff file
class XliffParser implements ml.Visitor {
  private _unitMlString: string | null;
  private _errors: I18nError[];
  private _msgIdToHtml: {[msgId: string]: string};

  parse(xliff: string) {
    this._unitMlString = null;
    this._msgIdToHtml = {};

    const xml = new Parser(getXmlTagDefinition).parse(xliff, false);

    this._errors = xml.errors;
    ml.visitAll(this, xml.rootNodes, null);

    return {
      msgIdToHtml: this._msgIdToHtml,
      errors: this._errors,
    };
  }

  visitElement(element: ml.Element, context: any): any {
    switch(element.name) {
      case _UNIT_TAG:
        this._unitMlString = null !;
        const idAttr = element.attrs.find((attr) => attr.name === 'id');
        if (!idAttr) {
          this._addError(element, `<${_UNIT_TAG}> misses the "id" attribute`);
        } else {
          const id = idAttr.value;
          if (this._msgIdToHtml.hasOwnProperty(id)) {
            this._addError(element, `Duplicated translations for msg ${id}`);
          } else {
            ml.visitAll(this, element.children, null);
            if (typeof this._unitMlString === 'string') {
              this._msgIdToHtml[id] = this._unitMlString;
            } else {
              this._addError(element, `Message ${id} misses a translation`);
            }
          }
        }
        break;

      case _SOURCE_TAG:
        // ignore source message
        break;

      case _TARGET_TAG:
        const innerTextStart = element.startSourceSpan !.end.offset;
        const innerTextEnd = element.endSourceSpan !.start.offset;
        const content = element.startSourceSpan !.start.file.content;
        const innerText = content.slice(innerTextStart, innerTextEnd);
        this._unitMlString = innerText;
        break;

      case _FILE_TAG:
        ml.visitAll(this, element.children, null);
        break;

      default:
        // TODO(vicb): assert file structure, xliff version
        // For now only recurse on unhandled nodes
        ml.visitAll(this, element.children, null);
    }
  }

  visitAttribute(attribute: ml.Attribute, context: any): any {
  }

  visitText(text: ml.Text, context: any): any {
  }

  visitComment(comment: ml.Comment, context: any): any {
  }

  visitExpansion(expansion: ml.Expansion, context: any): any {
  }

  visitExpansionCase(expansionCase: ml.ExpansionCase, context: any): any {
  }

  private _addError(node: ml.Node, message: string): void {
    this._errors.push(new I18nError(node.sourceSpan !, message));
  }
}

// Convert ml nodes (xliff syntax) to i18n nodes
class XmlToI18n implements ml.Visitor {
  private _errors: I18nError[];

  convert(message: string) {
    const xmlIcu = new Parser(getXmlTagDefinition).parse(message, true);
    this._errors = xmlIcu.errors;

    const i18nMessages = this._errors.length > 0 || xmlIcu.rootNodes.length == 0 ?
      [] :
      ml.visitAll(this, xmlIcu.rootNodes);

    if (xmlIcu.rootNodes[0] instanceof ml.Text) {
      i18nMessages.unshift("");
    }

    return {
      i18nMessages,
      errors: this._errors,
    };
  }

  visitText(text: ml.Text, context: any): string {
    return text.value;
  }

  visitElement(el: ml.Element, context: any): string|null {
    if (el.name === _PLACEHOLDER_TAG) {
      const nameAttr = el.attrs.find((attr) => attr.name === 'id');
      if (nameAttr) {
        return nameAttr.value;
      }

      this._addError(el, `<${_PLACEHOLDER_TAG}> misses the "id" attribute`);
    } else {
      this._addError(el, `Unexpected tag`);
    }
    return null;
  }

  visitExpansion(icu: ml.Expansion, context: any): IcuContent {
    const caseMap: {[value: string]: ml.Node} = {};
    ml.visitAll(this, icu.cases).forEach((c: any) => {
      caseMap[c.value] = c.nodes;
    });
    return {expression: icu.switchValue, type: icu.type, cases: caseMap};
  }

  visitExpansionCase(icuCase: ml.ExpansionCase, context: any): {value: string, nodes: ml.Node[]} {
    const nodes = ml.visitAll(this, icuCase.expression);
    if (icuCase.expression[0] instanceof ml.Text) {
      nodes.unshift("");
    }

    return {
      value: icuCase.value,
      nodes: nodes,
    };
  }

  visitComment(comment: ml.Comment, context: any) {
  }

  visitAttribute(attribute: ml.Attribute, context: any) {
  }

  private _addError(node: ml.Node, message: string): void {
    this._errors.push(new I18nError(node.sourceSpan !, message));
  }
}

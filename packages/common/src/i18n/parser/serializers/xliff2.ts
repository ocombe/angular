/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ml from '../ml_parser/ast';
import {Parser} from '../ml_parser/parser';
import {getXmlTagDefinition} from '../ml_parser/xml_tags';
import {I18nError} from '../ml_parser/parse_util';
import {Serializer, IcuContent, I18nMessagesById} from './serializer';

const _PLACEHOLDER_TAG = 'ph';
const _PLACEHOLDER_SPANNING_TAG = 'pc';
const _XLIFF_TAG = 'xliff';
const _SOURCE_TAG = 'source';
const _TARGET_TAG = 'target';
const _UNIT_TAG = 'unit';

// http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
export class Xliff2 extends Serializer {
  load(content: string): I18nMessagesById {
    // xliff to xml nodes
    const xliff2Parser = new Xliff2Parser();
    const {msgIdToHtml, errors} = xliff2Parser.parse(content);

    // xml nodes to i18n messages
    const i18nMessagesById: {[msgId: string]: string[]} = {};
    const converter = new XmlToI18n();

    Object.keys(msgIdToHtml).forEach(msgId => {
      const {i18nMessages, errors: e} = converter.convert(msgIdToHtml[msgId]);
      const flatNodes: string[] = [];
      i18nMessages.forEach((i18nMessage: string | string[]) => {
        if(Array.isArray(i18nMessage)) {
          flatNodes.push(...i18nMessage);
        } else {
          flatNodes.push(i18nMessage);
        }
      });
      errors.push(...e);
      i18nMessagesById[msgId] = flatNodes;
    });

    if (errors.length) {
      throw new Error(`xliff2 parse errors:\n${errors.join('\n')}`);
    }

    return i18nMessagesById;
  }
}

// Extract messages as xml nodes from the xliff file
class Xliff2Parser implements ml.Visitor {
  private _unitMlString: string|null;
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
    switch (element.name) {
      case _UNIT_TAG:
        this._unitMlString = null;
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

      case _XLIFF_TAG:
        const versionAttr = element.attrs.find((attr) => attr.name === 'version');
        if (versionAttr) {
          const version = versionAttr.value;
          if (version !== '2.0') {
            this._addError(
                element,
                `The XLIFF file version ${version} is not compatible with XLIFF 2.0 serializer`);
          } else {
            ml.visitAll(this, element.children, null);
          }
        }
        break;
      default:
        ml.visitAll(this, element.children, null);
    }
  }

  visitAttribute(attribute: ml.Attribute, context: any): any {}

  visitText(text: ml.Text, context: any): any {}

  visitComment(comment: ml.Comment, context: any): any {}

  visitExpansion(expansion: ml.Expansion, context: any): any {}

  visitExpansionCase(expansionCase: ml.ExpansionCase, context: any): any {}

  private _addError(node: ml.Node, message: string): void {
    this._errors.push(new I18nError(node.sourceSpan, message));
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
        [].concat(...ml.visitAll(this, xmlIcu.rootNodes));

    if (xmlIcu.rootNodes[0] instanceof ml.Text) {
      i18nMessages.unshift("");
    }

    return {
      i18nMessages,
      errors: this._errors,
    };
  }

  visitText(text: ml.Text, context: any): string { return text.value; }

  visitElement(el: ml.Element, context: any): string|string[]|null {
    switch (el.name) {
      case _PLACEHOLDER_TAG:
        const nameAttr = el.attrs.find((attr) => attr.name === 'equiv');
        if (nameAttr) {
          return nameAttr.value;
        }

        this._addError(el, `<${_PLACEHOLDER_TAG}> misses the "equiv" attribute`);
        break;
      case _PLACEHOLDER_SPANNING_TAG:
        const startAttr = el.attrs.find((attr) => attr.name === 'equivStart');
        const endAttr = el.attrs.find((attr) => attr.name === 'equivEnd');

        if (!startAttr) {
          this._addError(el, `<${_PLACEHOLDER_TAG}> misses the "equivStart" attribute`);
        } else if (!endAttr) {
          this._addError(el, `<${_PLACEHOLDER_TAG}> misses the "equivEnd" attribute`);
        } else {
          return [
            startAttr.value,
            ...el.children.map(node => node.visit(this, null)),
            endAttr.value
          ];
        }
        break;
      default:
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

  visitExpansionCase(icuCase: ml.ExpansionCase, context: any): any {
    let nodes = [];
    if (icuCase.expression[0] instanceof ml.Text) {
      nodes.push("");
    }
    nodes = nodes.concat(...ml.visitAll(this, icuCase.expression));

    return {
      value: icuCase.value,
      nodes: nodes,
    };
  }

  visitComment(comment: ml.Comment, context: any) {}

  visitAttribute(attribute: ml.Attribute, context: any) {}

  private _addError(node: ml.Node, message: string): void {
    this._errors.push(new I18nError(node.sourceSpan, message));
  }
}

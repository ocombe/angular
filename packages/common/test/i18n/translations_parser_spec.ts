import {Xliff} from '../../src/i18n/parser/serializers/xliff';
import {Xliff2} from '../../src/i18n/parser/serializers/xliff2';
import {Xtb} from '../../src/i18n/parser/serializers/xtb';
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {TranslationsParser} from '../../src/i18n/parser/translations_parser';

export function main() {
  const XLIFF = `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" target-language="fr" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="983775b9a51ce14b036be72d4cfd65d68d64e231" datatype="html">
        <source>translatable attribute</source>
        <target>etubirtta elbatalsnart</target>
      </trans-unit>
      <trans-unit id="ec1d033f2436133c14ab038286c4f5df4697484a" datatype="html">
        <source>translatable element <x id="START_BOLD_TEXT" ctype="b"/>with placeholders<x id="CLOSE_BOLD_TEXT" ctype="b"/> <x id="INTERPOLATION"/></source>
        <target><x id="INTERPOLATION"/> footnemele elbatalsnart <x id="START_BOLD_TEXT" ctype="x-b"/>sredlohecalp htiw<x id="CLOSE_BOLD_TEXT" ctype="x-b"/></target>
      </trans-unit>
      <trans-unit id="e2ccf3d131b15f54aa1fcf1314b1ca77c14bfcc2" datatype="html">
        <source>{VAR_PLURAL, plural, =0 {<x id="START_PARAGRAPH" ctype="x-p"/>test<x id="CLOSE_PARAGRAPH" ctype="x-p"/>} }</source>
        <target>{VAR_PLURAL, plural, =0 {<x id="START_PARAGRAPH" ctype="x-p"/>TEST<x id="CLOSE_PARAGRAPH" ctype="x-p"/>} }</target>
      </trans-unit>
      <trans-unit id="db3e0a6a5a96481f60aec61d98c3eecddef5ac23" datatype="html">
        <source>foo</source>
        <target>oof</target>
      </trans-unit>
      <trans-unit id="i" datatype="html">
        <source>foo</source>
        <target>toto</target>
      </trans-unit>
      <trans-unit id="bar" datatype="html">
        <source>foo</source>
        <target>tata</target>
      </trans-unit>
      <trans-unit id="d7fa2d59aaedcaa5309f13028c59af8c85b8c49d" datatype="html">
        <source><x id="LINE_BREAK" ctype="lb"/><x id="TAG_IMG" ctype="image"/><x id="START_TAG_DIV" ctype="x-div"/><x id="CLOSE_TAG_DIV" ctype="x-div"/></source>
        <target><x id="START_TAG_DIV" ctype="x-div"/><x id="CLOSE_TAG_DIV" ctype="x-div"/><x id="TAG_IMG" ctype="image"/><x id="LINE_BREAK" ctype="lb"/></target>
      </trans-unit>            
      <trans-unit id="empty target" datatype="html">
        <source><x id="LINE_BREAK" ctype="lb"/><x id="TAG_IMG" ctype="image"/><x id="START_TAG_DIV" ctype="x-div"/><x id="CLOSE_TAG_DIV" ctype="x-div"/></source>
        <target/>
      </trans-unit>
      <trans-unit id="baz" datatype="html">
        <source>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<x id="START_PARAGRAPH" ctype="x-p"/>deeply nested<x id="CLOSE_PARAGRAPH" ctype="x-p"/>} } } }</source>
        <target>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<x id="START_PARAGRAPH" ctype="x-p"/>profondément imbriqué<x id="CLOSE_PARAGRAPH" ctype="x-p"/>} } } }</target>
      </trans-unit>
      <trans-unit id="52ffa620dcd76247a56d5331f34e73f340a43cdb" datatype="html">
        <source>Test: <x id="ICU" equiv-text="{ count, plural, =0 {...} =other {...}}"/></source>
        <target>Test: <x id="ICU" equiv-text="{ count, plural, =0 {...} =other {...}}"/></target>
      </trans-unit>
      <trans-unit id="1503afd0ccc20ff01d5e2266a9157b7b342ba494" datatype="html">
        <source>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<x id="START_PARAGRAPH" ctype="x-p"/>deeply nested<x id="CLOSE_PARAGRAPH" ctype="x-p"/>} } } =other {a lot} }</source>
        <target>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<x id="START_PARAGRAPH" ctype="x-p"/>profondément imbriqué<x id="CLOSE_PARAGRAPH" ctype="x-p"/>} } } =other {beaucoup} }</target>
      </trans-unit>
      <trans-unit id="fcfa109b0e152d4c217dbc02530be0bcb8123ad1" datatype="html">
        <source>multi
lines</source>
        <target>multi
lignes</target>
      </trans-unit>
    </body>
  </file>
</xliff>
`;

  const XLIFF2 = `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="2.0" xmlns="urn:oasis:names:tc:xliff:document:2.0" srcLang="en" trgLang="fr">
  <file original="ng.template" id="ngi18n">
    <unit id="1933478729560469763">
      <notes>
        <note category="location">file.ts:2</note>
      </notes>
      <segment>
        <source>translatable attribute</source>
        <target>etubirtta elbatalsnart</target>
      </segment>
    </unit>
    <unit id="7056919470098446707">
      <notes>
        <note category="location">file.ts:3</note>
      </notes>
      <segment>
        <source>translatable element <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">with placeholders</pc> <ph id="1" equiv="INTERPOLATION" disp="{{ interpolation}}"/></source>
        <target><ph id="1" equiv="INTERPOLATION" disp="{{ interpolation}}"/> <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">sredlohecalp htiw</pc> tnemele elbatalsnart</target>
      </segment>
    </unit>
    <unit id="2981514368455622387">
      <notes>
        <note category="location">file.ts:4</note>
      </notes>
      <segment>
        <source>{VAR_PLURAL, plural, =0 {<pc id="0" equivStart="START_PARAGRAPH" equivEnd="CLOSE_PARAGRAPH" type="other" dispStart="&lt;p&gt;" dispEnd="&lt;/p&gt;">test</pc>} }</source>
        <target>{VAR_PLURAL, plural, =0 {<pc id="0" equivStart="START_PARAGRAPH" equivEnd="CLOSE_PARAGRAPH" type="other" dispStart="&lt;p&gt;" dispEnd="&lt;/p&gt;">TEST</pc>} }</target>
      </segment>
    </unit>
    <unit id="i">
      <notes>
        <note category="description">d</note>
        <note category="meaning">m</note>
        <note category="location">file.ts:5</note>
      </notes>
      <segment>
        <source>foo</source>
        <target>oof</target>
      </segment>
    </unit>
    <unit id="6440235004920703622">
      <notes>
        <note category="description">nested</note>
        <note category="location">file.ts:6</note>
      </notes>
      <segment>
        <source><pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;"><pc id="1" equivStart="START_UNDERLINED_TEXT" equivEnd="CLOSE_UNDERLINED_TEXT" type="fmt" dispStart="&lt;u&gt;" dispEnd="&lt;/u&gt;"><ph id="2" equiv="INTERPOLATION" disp="{{interpolation}}"/> Text</pc></pc></source>
        <target><pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;"><pc id="1" equivStart="START_UNDERLINED_TEXT" equivEnd="CLOSE_UNDERLINED_TEXT" type="fmt" dispStart="&lt;u&gt;" dispEnd="&lt;/u&gt;">txeT <ph id="2" equiv="INTERPOLATION" disp="{{interpolation}}"/></pc></pc></target>
      </segment>
    </unit>
    <unit id="8779402634269838862">
      <notes>
        <note category="description">ph names</note>
        <note category="location">file.ts:7</note>
      </notes>
      <segment>
        <source><ph id="0" equiv="LINE_BREAK" type="fmt" disp="&lt;br/&gt;"/><ph id="1" equiv="TAG_IMG" type="image" disp="&lt;img/&gt;"/><ph id="2" equiv="TAG_IMG_1" type="image" disp="&lt;img/&gt;"/></source>
        <target><ph id="2" equiv="TAG_IMG_1" type="image" disp="&lt;img/&gt;"/><ph id="1" equiv="TAG_IMG" type="image" disp="&lt;img/&gt;"/><ph id="0" equiv="LINE_BREAK" type="fmt" disp="&lt;br/&gt;"/></target>
      </segment>
    </unit>
    <unit id="6536355551500405293">
      <notes>
        <note category="description">empty element</note>
        <note category="location">file.ts:8</note>
      </notes>
      <segment>
        <source>hello <pc id="0" equivStart="START_TAG_SPAN" equivEnd="CLOSE_TAG_SPAN" type="other" dispStart="&lt;span&gt;" dispEnd="&lt;/span&gt;"></pc></source>
        <target><pc id="0" equivStart="START_TAG_SPAN" equivEnd="CLOSE_TAG_SPAN" type="other" dispStart="&lt;span&gt;" dispEnd="&lt;/span&gt;"></pc> olleh</target>
      </segment>
    </unit>
    <unit id="baz">
      <notes>
        <note category="location">file.ts:9</note>
      </notes>
      <segment>
        <source>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<pc id="0" equivStart="START_PARAGRAPH" equivEnd="CLOSE_PARAGRAPH" type="other" dispStart="&lt;p&gt;" dispEnd="&lt;/p&gt;">deeply nested</pc>} } } }</source>
        <target>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<pc id="0" equivStart="START_PARAGRAPH" equivEnd="CLOSE_PARAGRAPH" type="other" dispStart="&lt;p&gt;" dispEnd="&lt;/p&gt;">profondément imbriqué</pc>} } } }</target>
      </segment>
    </unit>
    <unit id="6997386649824869937">
      <notes>
        <note category="location">file.ts:10</note>
      </notes>
      <segment>
        <source>Test: <ph id="0" equiv="ICU" disp="{ count, plural, =0 {...} =other {...}}"/></source>
        <target>Test: <ph id="0" equiv="ICU" disp="{ count, plural, =0 {...} =other {...}}"/></target>
      </segment>
    </unit>
    <unit id="5229984852258993423">
      <notes>
        <note category="location">file.ts:10</note>
      </notes>
      <segment>
        <source>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<pc id="0" equivStart="START_PARAGRAPH" equivEnd="CLOSE_PARAGRAPH" type="other" dispStart="&lt;p&gt;" dispEnd="&lt;/p&gt;">deeply nested</pc>} } } =other {a lot} }</source>
        <target>{VAR_PLURAL, plural, =0 {{VAR_SELECT, select, other {<pc id="0" equivStart="START_PARAGRAPH" equivEnd="CLOSE_PARAGRAPH" type="other" dispStart="&lt;p&gt;" dispEnd="&lt;/p&gt;">profondément imbriqué</pc>} } } =other {beaucoup} }</target>
      </segment>
    </unit>
    <unit id="2340165783990709777">
      <notes>
        <note category="location">file.ts:11,12</note>
      </notes>
      <segment>
        <source>multi
lines</source>
        <target>multi
lignes</target>
      </segment>
    </unit>
  </file>
</xliff>
`;

  const XTB = `
<translationbundle>
  <translation id="615790887472569365">attributs i18n sur les balises</translation>
  <translation id="3707494640264351337">imbriqué</translation>
  <translation id="5539162898278769904">imbriqué</translation>
  <translation id="3780349238193953556"><ph name="START_ITALIC_TEXT"/>avec des espaces réservés<ph name="CLOSE_ITALIC_TEXT"/></translation>
  <translation id="5415448997399451992"><ph name="START_TAG_DIV"><ex>&lt;div&gt;</ex></ph>avec <ph name="START_TAG_DIV"><ex>&lt;div&gt;</ex></ph>des espaces réservés<ph name="CLOSE_TAG_DIV"><ex>&lt;/div&gt;</ex></ph> imbriqués<ph name="CLOSE_TAG_DIV"><ex>&lt;/div&gt;</ex></ph></translation>
  <translation id="5525133077318024839">sur des balises non traductibles</translation>
  <translation id="8670732454866344690">sur des balises traductibles</translation>
  <translation id="4593805537723189714">{VAR_PLURAL, plural, =0 {zero} =1 {un} =2 {deux} other {<ph name="START_BOLD_TEXT"/>beaucoup<ph name="CLOSE_BOLD_TEXT"/>}}</translation>
  <translation id="4360321700965841752"><ph name="ICU"/></translation>
  <translation id="5460933846928880074">{VAR_SELECT, select, 0 {autre} m {homme} f {femme} }</translation>
  <translation id="1746565782635215"><ph name="ICU"/></translation>
  <translation id="5868084092545682515">{VAR_SELECT, select, m {homme} f {femme}}</translation>
  <translation id="4851788426695310455"><ph name="INTERPOLATION"/></translation>
  <translation id="9013357158046221374">sexe = <ph name="INTERPOLATION"/></translation>
  <translation id="8324617391167353662"><ph name="CUSTOM_NAME"/></translation>
  <translation id="7685649297917455806">dans une section traductible</translation>
  <translation id="2387287228265107305"><ph name="START_HEADING_LEVEL1"/>Balises dans les commentaires html<ph name="CLOSE_HEADING_LEVEL1"/><ph name="START_TAG_DIV"/><ph name="CLOSE_TAG_DIV"/><ph name="START_TAG_DIV_1"/><ph name="ICU"/><ph name="CLOSE_TAG_DIV"></ph></translation>
  <translation id="1491627405349178954">ca <ph name="START_BOLD_TEXT"/>devrait<ph name="CLOSE_BOLD_TEXT"/> marcher</translation>
  <translation id="i18n16">avec un ID explicite</translation>
  <translation id="i18n17">{VAR_PLURAL, plural, =0 {zero} =1 {un} =2 {deux} other {<ph 
  name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>beaucoup<ph name="CLOSE_BOLD_TEXT"><ex>&lt;/b&gt;</ex></ph>} }</translation>
  <translation id="4085484936881858615">{VAR_PLURAL, plural, =0 {Pas de réponse} =1 {une réponse} other {<ph name="INTERPOLATION"><ex>INTERPOLATION</ex></ph> réponse} }</translation>
  <translation id="4035252431381981115">FOO<ph name="START_LINK"><ex>&lt;a&gt;</ex></ph>BAR<ph name="CLOSE_LINK"><ex>&lt;/a&gt;</ex></ph></translation>
  <translation id="5339604010413301604"><ph name="MAP_NAME"><ex>MAP_NAME</ex></ph></translation>
</translationbundle>`;

  describe('translations parser', () => {
    beforeAll(() => {
    });

    describe('decode', () => {
      fit('should decode xliff', () => {
        const parser = new TranslationsParser(new Xliff());
        expect(parser.parse(XLIFF)).toEqual({
          "983775b9a51ce14b036be72d4cfd65d68d64e231": ["", "etubirtta elbatalsnart"],
          "ec1d033f2436133c14ab038286c4f5df4697484a": ["INTERPOLATION", " footnemele elbatalsnart ", "START_BOLD_TEXT", "sredlohecalp htiw", "CLOSE_BOLD_TEXT"],
          "e2ccf3d131b15f54aa1fcf1314b1ca77c14bfcc2": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {"=0": ["START_PARAGRAPH", "TEST", "CLOSE_PARAGRAPH"]}
          }],
          "db3e0a6a5a96481f60aec61d98c3eecddef5ac23": ["", "oof"],
          "i": ["", "toto"],
          "bar": ["", "tata"],
          "d7fa2d59aaedcaa5309f13028c59af8c85b8c49d": ["START_TAG_DIV", "CLOSE_TAG_DIV", "TAG_IMG", "LINE_BREAK"],
          "empty target": [],
          "baz": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": [{
                expression: "VAR_SELECT",
                type: "select",
                cases: {"other": ["START_PARAGRAPH", "profondément imbriqué", "CLOSE_PARAGRAPH"]}
              }, " "]
            }
          }],
          "52ffa620dcd76247a56d5331f34e73f340a43cdb": ["", "Test: ", "ICU"],
          "1503afd0ccc20ff01d5e2266a9157b7b342ba494": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": [{
                expression: "VAR_SELECT",
                type: "select",
                cases: {"other": ["START_PARAGRAPH", "profondément imbriqué", "CLOSE_PARAGRAPH"]}
              }, " "], "=other": ["", "beaucoup"]
            }
          }],
          "fcfa109b0e152d4c217dbc02530be0bcb8123ad1": ["", `multi
lignes`]
        });
      });

      fit('should decode xliff2', () => {
        const parser = new TranslationsParser(new Xliff2());
        expect(parser.parse(XLIFF2)).toEqual({
          "1933478729560469763": ["", "etubirtta elbatalsnart"],
          "7056919470098446707": ["INTERPOLATION", " ", "START_BOLD_TEXT", "sredlohecalp htiw", "CLOSE_BOLD_TEXT", " tnemele elbatalsnart"],
          "2981514368455622387": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {"=0": ["START_PARAGRAPH", "TEST", "CLOSE_PARAGRAPH"]}
          }],
          "i": ["", "oof"],
          "6440235004920703622": ["START_BOLD_TEXT", "START_UNDERLINED_TEXT", "txeT ", "INTERPOLATION", "CLOSE_UNDERLINED_TEXT", "CLOSE_BOLD_TEXT"],
          "8779402634269838862": ["TAG_IMG_1", "TAG_IMG", "LINE_BREAK"],
          "6536355551500405293": ["START_TAG_SPAN", "CLOSE_TAG_SPAN", " olleh"],
          "baz": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": [{
                expression: "VAR_SELECT",
                type: "select",
                cases: {"other": ["START_PARAGRAPH", "profondément imbriqué", "CLOSE_PARAGRAPH"]}
              }, " "]
            }
          }],
          "6997386649824869937": ["", "Test: ", "ICU"],
          "5229984852258993423": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": [{
                expression: "VAR_SELECT",
                type: "select",
                cases: {"other": ["START_PARAGRAPH", "profondément imbriqué", "CLOSE_PARAGRAPH"]}
              }, " "], "=other": ["", "beaucoup"]
            }
          }],
          "2340165783990709777": ["", `multi
lignes`]
        });
      });

      fit('should decode xtb', () => {
        const parser = new TranslationsParser(new Xtb());
        expect(parser.parse(XTB)).toEqual({
          "615790887472569365": ["attributs i18n sur les balises"],
          "3707494640264351337": ["imbriqué"],
          "5539162898278769904": ["imbriqué"],
          "3780349238193953556": ["START_ITALIC_TEXT", "avec des espaces réservés", "CLOSE_ITALIC_TEXT"],
          "5415448997399451992": ["START_TAG_DIV", "avec ", "START_TAG_DIV", "des espaces réservés", "CLOSE_TAG_DIV", " imbriqués", "CLOSE_TAG_DIV"],
          "5525133077318024839": ["sur des balises non traductibles"],
          "8670732454866344690": ["sur des balises traductibles"],
          "4593805537723189714": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": ["", "zero"],
              "=1": ["", "un"],
              "=2": ["", "deux"],
              "other": ["START_BOLD_TEXT", "beaucoup", "CLOSE_BOLD_TEXT"]
            }
          }],
          "4360321700965841752": ["", "ICU"],
          "5460933846928880074": [{
            expression: "VAR_SELECT",
            type: "select",
            cases: {"0": ["", "autre"], "m": ["", "homme"], "f": ["", "femme"]}
          }],
          "1746565782635215": ["ICU"],
          "5868084092545682515": [{
            expression: "VAR_SELECT",
            type: "select",
            cases: {"m": ["homme"], "f": ["femme"]}
          }],
          "4851788426695310455": ["", "INTERPOLATION"],
          "9013357158046221374": ["", "sexe = ", "INTERPOLATION"],
          "8324617391167353662": ["CUSTOM_NAME"],
          "7685649297917455806": ["", "dans une section traductible"],
          "2387287228265107305": ["START_HEADING_LEVEL1", "Balises dans les commentaires html", "CLOSE_HEADING_LEVEL1", "START_TAG_DIV", "CLOSE_TAG_DIV", "START_TAG_DIV_1", "ICU", "CLOSE_TAG_DIV"],
          "1491627405349178954": ["", "ca ", "START_BOLD_TEXT", "devrait", "CLOSE_BOLD_TEXT", " marcher"],
          "i18n16": ["", "avec un ID explicite"],
          "i18n17": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": ["", "zero"],
              "=1": ["", "un"],
              "=2": ["", "deux"],
              "other": ["START_BOLD_TEXT", "beaucoup", "CLOSE_BOLD_TEXT"]
            }
          }],
          "4085484936881858615": [{
            expression: "VAR_PLURAL",
            type: "plural",
            cases: {
              "=0": ["", "Pas de réponse"],
              "=1": ["", "une réponse"],
              "other": ["", "INTERPOLATION", " réponse"]
            }
          }],
          "4035252431381981115": ["FOO", "START_LINK", "BAR", "CLOSE_LINK"],
          "5339604010413301604": ["MAP_NAME"]
        });
      });
    });
  });
}

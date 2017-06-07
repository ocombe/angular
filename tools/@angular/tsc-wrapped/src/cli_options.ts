/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export class CliOptions {
  public basePath: string;
  constructor({basePath = null}: {basePath?: string}) { this.basePath = basePath; }
}

export class I18nExtractionCliOptions extends CliOptions {
  public i18nFormat: string|null;
  public locale: string|null;
  public outFile: string|null;
  public i18nVersion: string|null;

  constructor({i18nFormat = null, locale = null, outFile = null, i18nVersion = null}: {
    i18nFormat?: string,
    locale?: string,
    outFile?: string,
    i18nVersion?: string,
  }) {
    super({});
    this.i18nFormat = i18nFormat;
    this.locale = locale;
    this.outFile = outFile;
    this.i18nVersion = i18nVersion;
  }
}

export class I18nMigrationCliOptions extends CliOptions {
  public i18nFormat: string|null;
  public files: string|null;
  public i18nVersion: string|null;
  public mapping: string|null;
  public resolve: string|null;

  constructor({i18nFormat = null, i18nVersion = null, files = null, mapping = null,
               resolve = null}: {
    i18nFormat?: string,
    i18nVersion?: string,
    files?: string,
    mapping?: string,
    resolve?: string,
  }) {
    super({});
    this.i18nFormat = i18nFormat;
    this.i18nVersion = i18nVersion;
    this.files = files;
    this.mapping = mapping;
    this.resolve = resolve;
  }
}

export class NgcCliOptions extends CliOptions {
  public i18nFormat: string|null;
  public i18nFile: string|null;
  public locale: string|null;
  public missingTranslation: string|null;
  public i18nVersion: string|null;

  constructor({i18nFormat = null, i18nFile = null, locale = null, missingTranslation = null,
               i18nVersion = null, basePath = null}: {
    i18nFormat?: string,
    i18nFile?: string,
    locale?: string,
    missingTranslation?: string,
    i18nVersion?: string,
    basePath?: string,
  }) {
    super({basePath: basePath});
    this.i18nFormat = i18nFormat;
    this.i18nFile = i18nFile;
    this.locale = locale;
    this.missingTranslation = missingTranslation;
    this.i18nVersion = i18nVersion;
  }
}

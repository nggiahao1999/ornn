/**
 * Usage: Str.camel('hello_world') => 'helloWorld'
 */
export class Str {
  /**
   * Convert a string to camelCase
   */
  static camel(value: string): string {
    return value
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
      .replace(/^(.)/, (c) => c.toLowerCase());
  }

  /**
   * Convert a string to StudlyCase (PascalCase)
   */
  static studly(value: string): string {
    return value
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
      .replace(/^(.)/, (c) => c.toUpperCase());
  }

  /**
   * Convert a string to snake_case
   */
  static snake(value: string, delimiter = "_"): string {
    return value
      .replace(/([a-z])([A-Z])/g, `$1${delimiter}$2`)
      .replace(/[\s-]+/g, delimiter)
      .toLowerCase();
  }

  /**
   * Convert a string to kebab-case
   */
  static kebab(value: string): string {
    return Str.snake(value, "-");
  }

  /**
   * Convert a string to Title Case
   */
  static title(value: string): string {
    return value
      .toLowerCase()
      .replace(/(?:^|\s|[-_])\w/g, (match) => match.toUpperCase());
  }

  /**
   * Convert the first character of a string to uppercase
   */
  static ucfirst(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  /**
   * Convert the first character of a string to lowercase
   */
  static lcfirst(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }

  /**
   * Limit the number of characters in a string
   */
  static limit(value: string, length = 100, end = "..."): string {
    if (value.length <= length) return value;
    return value.slice(0, length).trimEnd() + end;
  }

  /**
   * Limit the number of words in a string
   */
  static words(value: string, wordCount = 100, end = "..."): string {
    const wordsArray = value.split(/\s+/);
    if (wordsArray.length <= wordCount) return value;
    return wordsArray.slice(0, wordCount).join(" ") + end;
  }

  /**
   * Generate a URL-friendly "slug" from a string
   */
  static slug(value: string, separator = "-"): string {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/[\s_]+/g, separator)
      .replace(new RegExp(`${separator}+`, "g"), separator)
      .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
  }

  /**
   * Determine if a string starts with a given substring
   */
  static startsWith(value: string, needle: string | string[]): boolean {
    const needles = Array.isArray(needle) ? needle : [needle];
    return needles.some((n) => value.startsWith(n));
  }

  /**
   * Determine if a string ends with a given substring
   */
  static endsWith(value: string, needle: string | string[]): boolean {
    const needles = Array.isArray(needle) ? needle : [needle];
    return needles.some((n) => value.endsWith(n));
  }

  /**
   * Determine if a string contains a given substring
   */
  static contains(
    value: string,
    needle: string | string[],
    ignoreCase = false,
  ): boolean {
    const needles = Array.isArray(needle) ? needle : [needle];
    const haystack = ignoreCase ? value.toLowerCase() : value;
    return needles.some((n) =>
      haystack.includes(ignoreCase ? n.toLowerCase() : n),
    );
  }

  /**
   * Determine if a string contains all given substrings
   */
  static containsAll(
    value: string,
    needles: string[],
    ignoreCase = false,
  ): boolean {
    const haystack = ignoreCase ? value.toLowerCase() : value;
    return needles.every((n) =>
      haystack.includes(ignoreCase ? n.toLowerCase() : n),
    );
  }

  /**
   * Get the portion of a string before the first occurrence of a given value
   */
  static before(value: string, search: string): string {
    const index = value.indexOf(search);
    return index === -1 ? value : value.slice(0, index);
  }

  /**
   * Get the portion of a string before the last occurrence of a given value
   */
  static beforeLast(value: string, search: string): string {
    const index = value.lastIndexOf(search);
    return index === -1 ? value : value.slice(0, index);
  }

  /**
   * Get the portion of a string after the first occurrence of a given value
   */
  static after(value: string, search: string): string {
    const index = value.indexOf(search);
    return index === -1 ? value : value.slice(index + search.length);
  }

  /**
   * Get the portion of a string after the last occurrence of a given value
   */
  static afterLast(value: string, search: string): string {
    const index = value.lastIndexOf(search);
    return index === -1 ? value : value.slice(index + search.length);
  }

  /**
   * Get the portion of a string between two values
   */
  static between(value: string, from: string, to: string): string {
    if (from === "" || to === "") return value;
    return Str.beforeLast(Str.after(value, from), to);
  }

  /**
   * Get the smallest possible portion of a string between two values
   */
  static betweenFirst(value: string, from: string, to: string): string {
    if (from === "" || to === "") return value;
    return Str.before(Str.after(value, from), to);
  }

  /**
   * Cap a string with a single instance of a given value
   */
  static finish(value: string, cap: string): string {
    return value.endsWith(cap) ? value : value + cap;
  }

  /**
   * Begin a string with a single instance of a given value
   */
  static start(value: string, prefix: string): string {
    return value.startsWith(prefix) ? value : prefix + value;
  }

  /**
   * Determine if a given string is a valid UUID
   */
  static isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    );
  }

  /**
   * Determine if a given string is a valid ULID
   */
  static isUlid(value: string): boolean {
    return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(value);
  }

  /**
   * Determine if a string is a valid JSON
   */
  static isJson(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Determine if a string is a valid URL
   */
  static isUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Determine if a string is empty
   */
  static isEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value === "";
  }

  /**
   * Determine if a string is not empty
   */
  static isNotEmpty(value: string | null | undefined): boolean {
    return !Str.isEmpty(value);
  }

  /**
   * Convert a string to lowercase
   */
  static lower(value: string): string {
    return value.toLowerCase();
  }

  /**
   * Convert a string to uppercase
   */
  static upper(value: string): string {
    return value.toUpperCase();
  }

  /**
   * Pad both sides of a string with another
   */
  static padBoth(value: string, length: number, pad = " "): string {
    const padLength = length - value.length;
    if (padLength <= 0) return value;
    const leftPad = Math.floor(padLength / 2);
    const rightPad = padLength - leftPad;
    return pad.repeat(leftPad) + value + pad.repeat(rightPad);
  }

  /**
   * Pad the left side of a string with another
   */
  static padLeft(value: string, length: number, pad = " "): string {
    return value.padStart(length, pad);
  }

  /**
   * Pad the right side of a string with another
   */
  static padRight(value: string, length: number, pad = " "): string {
    return value.padEnd(length, pad);
  }

  /**
   * Parse a Class@method style callback into class and method
   */
  static parseCallback(
    callback: string,
    defaultMethod?: string,
  ): [string, string | undefined] {
    const [className, method] = callback.split("@");
    return [className, method || defaultMethod];
  }

  /**
   * Get the plural form of an English word (basic implementation)
   */
  static plural(value: string, count = 2): string {
    if (count === 1) return value;

    const irregulars: Record<string, string> = {
      child: "children",
      person: "people",
      man: "men",
      woman: "women",
      tooth: "teeth",
      foot: "feet",
      mouse: "mice",
      goose: "geese",
    };

    const lower = value.toLowerCase();
    if (irregulars[lower]) {
      return value[0] === value[0].toUpperCase()
        ? Str.ucfirst(irregulars[lower])
        : irregulars[lower];
    }

    if (/(s|x|z|ch|sh)$/i.test(value)) return value + "es";
    if (/[^aeiou]y$/i.test(value)) return value.slice(0, -1) + "ies";
    if (/f$/i.test(value)) return value.slice(0, -1) + "ves";
    if (/fe$/i.test(value)) return value.slice(0, -2) + "ves";
    return value + "s";
  }

  /**
   * Get the singular form of an English word (basic implementation)
   */
  static singular(value: string): string {
    const irregulars: Record<string, string> = {
      children: "child",
      people: "person",
      men: "man",
      women: "woman",
      teeth: "tooth",
      feet: "foot",
      mice: "mouse",
      geese: "goose",
    };

    const lower = value.toLowerCase();
    if (irregulars[lower]) {
      return value[0] === value[0].toUpperCase()
        ? Str.ucfirst(irregulars[lower])
        : irregulars[lower];
    }

    if (/ies$/i.test(value)) return value.slice(0, -3) + "y";
    if (/ves$/i.test(value)) return value.slice(0, -3) + "f";
    if (/(ses|xes|zes|ches|shes)$/i.test(value)) return value.slice(0, -2);
    if (/s$/i.test(value) && !/ss$/i.test(value)) return value.slice(0, -1);
    return value;
  }

  /**
   * Generate a random, secure alpha-numeric string
   */
  static random(length = 16): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    return result;
  }

  /**
   * Generate a UUID v4
   */
  static uuid(): string {
    return crypto.randomUUID();
  }

  /**
   * Repeat a string n times
   */
  static repeat(value: string, times: number): string {
    return value.repeat(times);
  }

  /**
   * Replace the first occurrence of a given value in the string
   */
  static replaceFirst(value: string, search: string, replace: string): string {
    const index = value.indexOf(search);
    if (index === -1) return value;
    return value.slice(0, index) + replace + value.slice(index + search.length);
  }

  /**
   * Replace the last occurrence of a given value in the string
   */
  static replaceLast(value: string, search: string, replace: string): string {
    const index = value.lastIndexOf(search);
    if (index === -1) return value;
    return value.slice(0, index) + replace + value.slice(index + search.length);
  }

  /**
   * Replace text within a portion of a string
   */
  static replaceArray(
    value: string,
    search: string,
    replacements: string[],
  ): string {
    let result = value;
    for (const replacement of replacements) {
      result = Str.replaceFirst(result, search, replacement);
    }
    return result;
  }

  /**
   * Replace all occurrences of a string
   */
  static replace(
    value: string,
    search: string | string[],
    replace: string | string[],
  ): string {
    const searches = Array.isArray(search) ? search : [search];
    const replaces = Array.isArray(replace) ? replace : [replace];

    let result = value;
    searches.forEach((s, i) => {
      const r = replaces[i] ?? replaces[replaces.length - 1] ?? "";
      result = result.split(s).join(r);
    });
    return result;
  }

  /**
   * Reverse a string
   */
  static reverse(value: string): string {
    return [...value].reverse().join("");
  }

  /**
   * Remove any occurrence of the given string in the subject
   */
  static remove(
    value: string,
    search: string | string[],
    caseSensitive = true,
  ): string {
    const searches = Array.isArray(search) ? search : [search];
    let result = value;
    for (const s of searches) {
      const regex = new RegExp(
        s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        caseSensitive ? "g" : "gi",
      );
      result = result.replace(regex, "");
    }
    return result;
  }

  /**
   * Remove all whitespace from both ends and reduce multiple spaces to single
   */
  static squish(value: string): string {
    return value.trim().replace(/\s+/g, " ");
  }

  /**
   * Return the portion of a string
   */
  static substr(value: string, start: number, length?: number): string {
    return length === undefined
      ? value.slice(start)
      : value.slice(start, start + length);
  }

  /**
   * Return the number of substring occurrences
   */
  static substrCount(
    value: string,
    search: string,
    caseSensitive = true,
  ): number {
    if (!search) return 0;
    const str = caseSensitive ? value : value.toLowerCase();
    const needle = caseSensitive ? search : search.toLowerCase();
    let count = 0;
    let pos = 0;
    while ((pos = str.indexOf(needle, pos)) !== -1) {
      count++;
      pos += needle.length;
    }
    return count;
  }

  /**
   * Replace a part of a string with another
   */
  static substrReplace(
    value: string,
    replace: string,
    start: number,
    length?: number,
  ): string {
    const len = length ?? value.length - start;
    return value.slice(0, start) + replace + value.slice(start + len);
  }

  /**
   * Swap multiple keywords in a string
   */
  static swap(value: string, map: Record<string, string>): string {
    const pattern = Object.keys(map)
      .map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    return value.replace(new RegExp(pattern, "g"), (match) => map[match]);
  }

  /**
   * Trim the string with specific characters
   */
  static trim(value: string, chars = " "): string {
    const regex = new RegExp(
      `^[${chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+|[${chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+$`,
      "g",
    );
    return value.replace(regex, "");
  }

  /**
   * Left trim the string with specific characters
   */
  static ltrim(value: string, chars = " "): string {
    const regex = new RegExp(
      `^[${chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+`,
    );
    return value.replace(regex, "");
  }

  /**
   * Right trim the string with specific characters
   */
  static rtrim(value: string, chars = " "): string {
    const regex = new RegExp(
      `[${chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]+$`,
    );
    return value.replace(regex, "");
  }

  /**
   * Count the number of words in a string
   */
  static wordCount(value: string): number {
    return value.trim().split(/\s+/).filter(Boolean).length;
  }

  /**
   * Wrap a string at a given number of characters
   */
  static wordWrap(
    value: string,
    width = 75,
    breakStr = "\n",
    cut = false,
  ): string {
    if (!cut) {
      const regex = new RegExp(`(.{1,${width}})(\\s|$)`, "g");
      return value.trim().replace(regex, `$1${breakStr}`).trim();
    }
    const regex = new RegExp(`.{1,${width}}`, "g");
    return (value.match(regex) || []).join(breakStr);
  }

  /**
   * Convert a value to ASCII
   */
  static ascii(value: string): string {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^\x00-\x7F]/g, "");
  }

  /**
   * Mask a portion of a string with a repeated character
   */
  static mask(
    value: string,
    character: string,
    index: number,
    length?: number,
  ): string {
    const segment =
      length === undefined
        ? value.slice(index)
        : value.slice(index, index + length);
    const masked = character.repeat(segment.length);
    return (
      value.slice(0, index) +
      masked +
      (length === undefined ? "" : value.slice(index + length))
    );
  }

  /**
   * Get an excerpt from a string around a phrase
   */
  static excerpt(
    value: string,
    phrase: string,
    options: { radius?: number; omission?: string } = {},
  ): string {
    const { radius = 100, omission = "..." } = options;
    const index = value.toLowerCase().indexOf(phrase.toLowerCase());
    if (index === -1) return "";

    const start = Math.max(0, index - radius);
    const end = Math.min(value.length, index + phrase.length + radius);

    let result = value.slice(start, end);
    if (start > 0) result = omission + result;
    if (end < value.length) result = result + omission;

    return result;
  }

  /**
   * Convert a string into a headline
   */
  static headline(value: string): string {
    return value
      .replace(/[-_]/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .split(" ")
      .map((word) => Str.ucfirst(word.toLowerCase()))
      .join(" ");
  }

  /**
   * Determine if a given string matches a given pattern
   */
  static is(value: string, pattern: string | string[]): boolean {
    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    return patterns.some((p) => {
      if (p === value) return true;
      const regexPattern = p
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");
      return new RegExp(`^${regexPattern}$`).test(value);
    });
  }

  /**
   * Convert a string to APA title case
   */
  static apa(value: string): string {
    const minorWords = [
      "a",
      "an",
      "the",
      "and",
      "but",
      "or",
      "for",
      "nor",
      "on",
      "at",
      "to",
      "by",
      "of",
    ];
    return value
      .split(" ")
      .map((word, index) => {
        const lower = word.toLowerCase();
        if (index === 0 || !minorWords.includes(lower)) {
          return Str.ucfirst(lower);
        }
        return lower;
      })
      .join(" ");
  }

  /**
   * Wrap the string with the given strings
   */
  static wrap(value: string, before: string, after?: string): string {
    return before + value + (after ?? before);
  }

  /**
   * Unwrap the string with the given strings
   */
  static unwrap(value: string, before: string, after?: string): string {
    let result = value;
    if (result.startsWith(before)) {
      result = result.slice(before.length);
    }
    const suffix = after ?? before;
    if (result.endsWith(suffix)) {
      result = result.slice(0, -suffix.length);
    }
    return result;
  }

  /**
   * Convert string to boolean
   */
  static toBoolean(value: string): boolean {
    const trueValues = ["true", "1", "yes", "on"];
    return trueValues.includes(value.toLowerCase().trim());
  }

  /**
   * Convert string to number or return default
   */
  static toNumber(value: string, defaultValue = 0): number {
    const num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
  }

  /**
   * Convert string to integer or return default
   */
  static toInteger(value: string, defaultValue = 0): number {
    const num = parseInt(value, 10);
    return isNaN(num) ? defaultValue : num;
  }

  /**
   * Split a string by uppercase characters
   */
  static ucsplit(value: string): string[] {
    return value.split(/(?=[A-Z])/).filter(Boolean);
  }

  /**
   * Convert a string to its word array
   */
  static toWords(value: string): string[] {
    return value.trim().split(/\s+/).filter(Boolean);
  }

  /**
   * Determine if a string is all uppercase
   */
  static isUpper(value: string): boolean {
    return value === value.toUpperCase() && value !== value.toLowerCase();
  }

  /**
   * Determine if a string is all lowercase
   */
  static isLower(value: string): boolean {
    return value === value.toLowerCase() && value !== value.toUpperCase();
  }

  /**
   * Check if string contains only ASCII characters
   */
  static isAscii(value: string): boolean {
    return /^[\x00-\x7F]*$/.test(value);
  }

  /**
   * Escape HTML entities in a string
   */
  static escapeHtml(value: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return value.replace(/[&<>"']/g, (m) => map[m]);
  }

  /**
   * Unescape HTML entities in a string
   */
  static unescapeHtml(value: string): string {
    const map: Record<string, string> = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#039;": "'",
    };
    return value.replace(/&(amp|lt|gt|quot|#039);/g, (m) => map[m]);
  }

  /**
   * Convert a string to studly caps (same as studly)
   */
  static pascal(value: string): string {
    return Str.studly(value);
  }

  /**
   * Take the first n characters from a string
   */
  static take(value: string, length: number): string {
    return length < 0 ? value.slice(length) : value.slice(0, length);
  }

  /**
   * Convert the given string to Base64
   */
  static toBase64(value: string): string {
    return Buffer.from(value).toString("base64");
  }

  /**
   * Decode a Base64 string
   */
  static fromBase64(value: string): string {
    return Buffer.from(value, "base64").toString("utf-8");
  }

  /**
   * Check if string matches a regular expression
   */
  static test(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }

  /**
   * Match a regular expression against the string
   */
  static match(value: string, pattern: RegExp): RegExpMatchArray | null {
    return value.match(pattern);
  }

  /**
   * Match all occurrences of a regular expression
   */
  static matchAll(value: string, pattern: RegExp): RegExpMatchArray[] {
    return [...value.matchAll(new RegExp(pattern, "g"))];
  }

  /**
   * Generate a "password" string (random string with mixed characters)
   */
  static password(
    length = 32,
    options: {
      letters?: boolean;
      numbers?: boolean;
      symbols?: boolean;
    } = {},
  ): string {
    const { letters = true, numbers = true, symbols = true } = options;
    let chars = "";
    if (letters)
      chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let result = "";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    return result;
  }

  /**
   * Converts GitHub-flavored markdown to HTML (basic implementation)
   */
  static markdown(value: string): string {
    return value
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      .replace(/`(.*?)`/gim, "<code>$1</code>")
      .replace(/\n/gim, "<br>");
  }

  /**
   * Strip HTML tags from a string
   */
  static stripTags(value: string): string {
    return value.replace(/<[^>]*>/g, "");
  }

  /**
   * Truncate a string to a certain length and add an ellipsis
   */
  static truncate(value: string, length: number, end = "..."): string {
    return Str.limit(value, length, end);
  }

  /**
   * Wrap string with quotes
   */
  static quote(value: string, char = '"'): string {
    return Str.wrap(value, char);
  }

  /**
   * Remove quotes from string
   */
  static unquote(value: string, char = '"'): string {
    return Str.unwrap(value, char);
  }

  /**
   * Ensure a string starts with a prefix
   */
  static ensureStart(value: string, prefix: string): string {
    return value.startsWith(prefix) ? value : prefix + value;
  }

  /**
   * Ensure a string ends with a suffix
   */
  static ensureEnd(value: string, suffix: string): string {
    return value.endsWith(suffix) ? value : value + suffix;
  }

  /**
   * Check if string is numeric
   */
  static isNumeric(value: string): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
  }

  /**
   * Check if string is alphanumeric
   */
  static isAlphanumeric(value: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(value);
  }

  /**
   * Check if string is alphabetic
   */
  static isAlpha(value: string): boolean {
    return /^[a-zA-Z]+$/.test(value);
  }

  /**
   * Check if string is a valid email
   */
  static isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /**
   * Capitalize each word in a string
   */
  static capitalize(value: string): string {
    return value.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  /**
   * Convert a number of bytes to a human-readable string
   */
  static formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
    );
  }
}

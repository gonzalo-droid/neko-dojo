/** A paragraph, or a bulleted list. Emails and https:// URLs become links automatically. */
export type Block = string | { list: string[] };
export type Section = { heading: string; blocks: Block[] };
export type LegalDoc = { intro?: Block[]; sections: Section[] };

/**
 *
 * Copied from https://github.com/roxiness/routify/commit/fcf8cbbefb54d479e11e5215de443b6725662ead
 *
 * */
type SvelteComponent = import("svelte").SvelteComponent;
/**
 * ClientNode
 */
export type ClientNode = {
  [x: string]: any;
} & DefinedFile &
  ClientNodeSpecifics;
/**
 * ClientNode
 */
type ClientNodeSpecifics = {
  layouts: ClientNode[];
  parent: ClientNode | undefined;
  nextSibling: ClientNode | undefined;
  prevSibling: ClientNode | undefined;
  lineage: ClientNode[];
  ext: string;
  meta: Meta;
  id: string;
  path: string;
  shortPath: string;
  ranking: string;
  isIndexable: boolean;
  isNonIndexable: boolean;
  paramKeys: string[];
  regex: string;
  component: () => SvelteComponent | Promise<SvelteComponent>;
  last: ClientNode;
  api: ClientNodeApi;
};
/**
 * ClientNodeApi
 */
export type ClientNodeApi = {
  parent: ClientNodeApi | undefined;
  next: ClientNodeApi | undefined;
  prev: ClientNodeApi | undefined;
  children: ClientNodeApi[];
  isMeta: boolean;
  path: string;
  title: string;
  meta: Meta;
  __file: ClientNode;
};
/**
 * File
 */
type DefinedFile = {
  isFile?: boolean | undefined;
  isDir?: boolean | undefined;
  isPage?: boolean | undefined;
  isLayout?: boolean | undefined;
  isReset?: boolean | undefined;
  isIndex?: boolean | undefined;
  isFallback?: boolean | undefined;
};
type Meta = {
  [x: string]: any;
};

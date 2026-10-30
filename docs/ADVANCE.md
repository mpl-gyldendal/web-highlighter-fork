# Internal workflows and hooks

English | [简体中文](./ADVANCE.zh_CN.md)

This guide explains:

- how web-highlighter creates and removes highlighted areas
- when each hook is called and how to use it

## Workflow

### Creating highlighted areas

![create highlighted areas](./img/create-flow.jpg)

### Removing highlighted areas

![remove highlighted areas](./img/remove-flow.jpg)

## Hooks - Usage example

```JavaScript
// UUID hook
const highlighter = new Highlighter();
highlighter.hooks.Render.UUID.tap(function (start, end, text) {
    // do something to generate your own id
    return id;
});
```

## Hooks - List

### `Render.UUID`

Hook into the process of generating a unique id.

**arguments:**

- start: DOM info of the start node
- end: DOM info of the end node
- text: text content in the highlighted area

**return value needed:**

- A new unique id. It must be unique among the highlights and must not contain a semicolon (`;`), which separates the ids of overlapping highlights.

### `Render.SelectedNodes`

Process all the text nodes in the highlighted area and return a new list.

**arguments:**

- id: id of the highlighted area
- selectedNodes: all the text nodes in the highlighted area

**return value needed:**

- the text nodes to be wrapped

### `Render.WrapNode`

Process the wrapping elements.

**arguments:**

- id: id of the highlighted area
- node: the wrapping elements

**return value needed:**

- the wrapping elements

### `Serialize.Restore`

Customize how a highlight is restored. When you tap this hook, the `HighlightSource` instance uses your function to calculate the start and end nodes' info.

**arguments:**

- hs: the current `HighlightSource` instance
- start: a [DomNode type](https://github.com/alienzhou/web-highlighter/blob/master/src/types/index.ts#L75-L78) object that records the start info
- end: a [DomNode type](https://github.com/alienzhou/web-highlighter/blob/master/src/types/index.ts#L75-L78) object that records the end info

**return value needed:**

- an array: the first element is the start info and the second is the end

### `Serialize.RecordInfo`

Add or modify extra info when the `HighlightRange` object is serialized.

**arguments:**

- start: meta info of the start node
- end: meta info of the end node
- root: the root element

**return value needed:**

- extra info: it will be added to the `extra` field in the `HighlightSource` object

### `Remove.UpdateNodes`

Process the affected wrapping elements when highlighted areas are removed.

**arguments:**

- id: id of the highlighted area
- nodes: the affected wrapping elements
- type: affected type or state, one of `remove`, `id-update` and `extra-update`

**return value needed:**

- `void`

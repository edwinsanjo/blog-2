---
title: "Obsidian Feature Test Blog"
date: "2026-05-12"
description: "A test blog to showcase all Obsidian features supported by our Next.js blog."
tags: ["test", "obsidian", "features"]
banner: "assets/banner.png"
---

# Heading 1

This is a paragraph with **bold** text and *italic* text. You can also combine them to make ***bold and italic*** text.

## Heading 2

Here is a list of features we support:

-   **Markdown Support**: Standard markdown features.
-   **GFM (GitHub Flavored Markdown)**: Tables, task lists, etc.
-   **Images**: Resolved relatively.
-   **Code Highlighting**: Using Prism or similar (handled by Tailwind prose).

### Heading 3

Here is an example of a blockquote:

> "The only way to do great work is to love what you do."
> — Steve Jobs

#### Heading 4 (Hyperlinks)

You can use [External Links](https://google.com) or internal links if you know the slug!
For example, link to [Standalone Blog 1](./standalone-blog1) or [Part 1 of Series 1](../series-1/part-1).

#### Code Blocks

```javascript
// This is a javascript code block
function helloWorld() {
  console.log("Hello, World!");
}
helloWorld();
```

```python
# This is a python code block
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

#### Tables

| Feature | Supported | Notes |
| :--- | :---: | :--- |
| Tables | Yes | GFM feature |
| Task Lists | Yes | GFM feature |
| Footnotes | Maybe | Depends on remark plugin |

#### Task Lists

- [x] Write the test blog
- [ ] Verify if everything looks good
- [ ] Push to GitHub

#### Images

Here is a sample image:

![Sample Image](assets/banner.png)

And another one with `./`:

![Sample Image](./assets/banner.png)

And one that doesn't exist to test fallback:

![Missing Image](assets/missing.png)

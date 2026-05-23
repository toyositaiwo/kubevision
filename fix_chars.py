import re

with open("frontend/index.html", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "\u2388": "K",
    "\u2192": "->",
    "\u21bb": "↻",
    "\u00b7": "-",
    "\u25c9": "●",
    "\u2b21": "◆",
    "\u229b": "✦",
    "\u21c6": "⇆",
    "\u21a5": "⇥",
    "\u25c8": "◈",
    "\u229f": "▣",
    "\u2295": "⊕",
    "Connect \u2192 Launch Dashboard": "Connect - Launch Dashboard",
    "Keys start with AIza": "Keys start with AIza",
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open("frontend/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("DONE")

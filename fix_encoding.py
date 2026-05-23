content = open("frontend/index.html", "rb").read()
# Try to detect and fix encoding
if content.startswith(b"\xef\xbb\xbf"):
    content = content[3:]  # Remove BOM
# Decode as latin-1 then re-encode as utf-8
try:
    fixed = content.decode("utf-8")
    print("Already UTF-8, just removed BOM")
except:
    fixed = content.decode("latin-1")
    print("Decoded from latin-1")

# Now replace all the broken sequences
fixes = {
    "\u00e2\u008f\u0088": "K",
    "\u00e2\u0086\u0092": "->",
    "\u00e2\u0086\u00bb": "R",
    "\u00c2\u00b7": "-",
    "\u00e2\u0097\u0089": "*",
    "\u00e2\u00ac\u00a1": "*",
    "\u00e2\u008a\u009b": "*",
    "\u00e2\u0087\u00a6": "<->",
    "\u00e2\u0087\u00a5": "->",
    "\u00e2\u0097\u0088": "*",
    "\u00e2\u008a\u009f": "*",
    "\u00e2\u008a\u0095": "*",
    "\u00f0\u009f\u0094\u0091": "Key",
    "\u00c2\u00b7": ".",
}
for old, new in fixes.items():
    fixed = fixed.replace(old, new)

with open("frontend/index.html", "w", encoding="utf-8") as f:
    f.write(fixed)
print("DONE - file rewritten cleanly")

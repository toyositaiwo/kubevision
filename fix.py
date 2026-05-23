content = open('README.md', 'r', encoding='utf-8').read()

old = 'Structure\n\n\\nkubevision/'
new = 'Structure\n\n```\nkubevision/'

old2 = 'README.md\n\n---'
new2 = 'README.md\n```\n\n---'

result = content.replace(old, new).replace(old2, new2)

if result == content:
    print('NOT FOUND')
else:
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(result)
    print('SUCCESS')

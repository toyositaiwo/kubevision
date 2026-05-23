content = open("README.md", "r", encoding="utf-8").read()
parts = content.split("## \U0001f4c1 Project Structure")
after = parts[1]
next_section = after.find("\n## ")
rest = after[next_section:]

new_section = "\n\n```\nkubevision/\n\u251c\u2500\u2500 frontend/\n\u2502   \u251c\u2500\u2500 index.html        # Full dashboard\n\u2502   \u251c\u2500\u2500 Dockerfile        # nginx container\n\u2502   \u2514\u2500\u2500 nginx.conf        # nginx config\n\u251c\u2500\u2500 backend/\n\u2502   \u251c\u2500\u2500 server.js         # Express API\n\u2502   \u251c\u2500\u2500 package.json\n\u2502   \u2514\u2500\u2500 Dockerfile\n\u251c\u2500\u2500 k8s/\n\u2502   \u2514\u2500\u2500 base/\n\u2502       \u251c\u2500\u2500 namespace.yaml\n\u2502       \u251c\u2500\u2500 configmap.yaml\n\u2502       \u251c\u2500\u2500 backend.yaml\n\u2502       \u2514\u2500\u2500 frontend.yaml\n\u2514\u2500\u2500 README.md\n```\n"

result = parts[0] + "## \U0001f4c1 Project Structure" + new_section + rest
open("README.md", "w", encoding="utf-8").write(result)
print("DONE")

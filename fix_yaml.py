with open("k8s/base/backend.yaml", "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace("YOUR_GITHUB_USERNAME/kubevision-backend:latest", "kubevision-backend:latest")
content = content.replace("imagePullPolicy: Always", "imagePullPolicy: Never")
with open("k8s/base/backend.yaml", "w", encoding="utf-8") as f:
    f.write(content)
print("backend.yaml updated")

import requests
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--argocd-url", required=True)
parser.add_argument("--argocd-user", required=True)
parser.add_argument("--argocd-password", required=True)

parser.add_argument("--argocd-project", default="tg-systems")
parser.add_argument("--repo", default="https://github.com/gathering/k8s-iac.git")
parser.add_argument("--repo-revision", default="main") # branch
parser.add_argument("--kustomize-path", required=True)

parser.add_argument("--name", required=True)
parser.add_argument("--image", required=True, type=str, nargs='+', action='extend')
parser.add_argument("--host", required=True)

args = parser.parse_args()

# Login
session_r = requests.post(f"https://{args.argocd_url}/api/v1/session", json={"username": args.argocd_user, "password": args.argocd_password})
if session_r.status_code != 200:
    print(session_r.text)
    raise SystemExit("Got error on login")

token = session_r.json()["token"]
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

# Create application object
application = {
  "metadata": {
    "name": args.name
  },
  "spec": {
    "destination": {
      "namespace": args.name,
      "server": "https://kubernetes.default.svc"
    },
    "project": args.argocd_project,
    "source": {
      "path": args.kustomize_path,
      "kustomize": {
        "namespace": args.name,
        "images": args.image,
        "patches": [{
            "patch": f"- op: replace\n  path: /spec/rules/0/host\n  value: {args.host}",
            "target": {
                "kind": "Ingress",
                "name": "tgno"
                }
            }],
      },
      "repoURL": args.repo,
      "targetRevision": args.repo_revision
    },
    "syncPolicy": {
        "syncOptions": [
            "CreateNamespace=true",
            "ServerSideApply=true",
            "PruneLast=true"
        ]
    }
  }
}

# Create (or update) application
create_r = requests.post(f"https://{args.argocd_url}/api/v1/applications?upsert=true", headers=headers, json=application)
if create_r.status_code != 200:
    print(create_r.text)
    raise SystemExit("Got error on create application")

# Sync application
sync_r = requests.post(f"https://{args.argocd_url}/api/v1/applications/{args.name}/sync", headers=headers)
if sync_r.status_code != 200:
    print(sync_r.text)
    raise SystemExit("Got error on sync application")

print("Application created/updated and synced")

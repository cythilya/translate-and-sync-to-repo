# Translate and Sync to Repo

This GitHub Action translates .md files from one repository and syncs them to another repository.

## Inputs

- `github-token`: (required) GitHub token.
- `target-repo`: (required) Target repository to sync translated files.

## Example Usage

```yaml
name: Use Translate and Sync to Repo EN Action

on:
  push:
    branches:
      - main

jobs:
  translate-and-sync:
    runs-on: ubuntu-latest

    steps:
      - name: Use Translate and Sync to Repo EN Action
        uses: your-username/your-repo-name@v1.0.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          target-repo: cythilya/front-end-testing-en

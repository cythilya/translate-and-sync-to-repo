# Translate and Sync to Repo

This GitHub Action translates .md files from one repository and syncs them to another repository.

## Inputs

- `github-token`: (required) GitHub token.
- `target-repo`: (required) Target repository to sync translated files.

## Example Usage

```yaml
name: Translate and Sync Workflow

on:
  push:
    branches:
      - main
    paths:
      - '**/*.md'

jobs:
  translate-and-sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Repository
        uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Use Translate and Sync to Repo Action
        uses: cythilya/translate-and-sync@main
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          target-repo: your-username/target-repo
```
